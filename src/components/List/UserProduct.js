import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../../redux/actions/productActions';
import './userproduct.scss'
import { Card, Checkbox, Col, List, message, Row } from 'antd';
import { FaStar, FaCartPlus } from 'react-icons/fa';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
import { Pagination, } from 'antd';
import { BiArrowToBottom, BiArrowToTop } from 'react-icons/bi';
const pageSize = 15;
export default function UserProduct() {
    const { addItem } = useCart();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.data)
    const [theloai, setTheloai] = useState('');
    const [sortProduct, setSortProduct] = useState('');
    const [hoatoc, setHoatoc] = useState(false);
    const [chuyenphat, setChuyenphat] = useState(false);
    const [ratings, setRatings] = useState(0);
    const [states, setStates] = useState(
        // hoàng việt update
        {

            totalPage: 0,
            current: 1,
            minIndex: 0,
            maxIndex: 0
        }
    );
    useEffect(() => {
        dispatch(loadProducts())
        setStates({
            totalPage: products.length / pageSize,
            minIndex: 0,
            maxIndex: pageSize
        })
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleChange = (page) => {
        setStates({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
    };
    const handleOnchangeCheckbox = () => {

    }
    const handleDetails = (id) => {
        navigate(`/product/details/${id}`)
    }
    const handleAddProduct = (item) => {
        addItem(item)
        message.success('thêm thành công')
    }



    if (sortProduct === 'tang') {
        products.sort((a, b) => {
            return a.price - b.price
        })
    }
    else if (sortProduct === 'giam') {
        products.sort((a, b) => {
            return b.price - a.price
        })
    }


    return (
        <div className='main'>
            <div className='sibar'>
                <div className="fixed">
                    <h3>Danh mục</h3>
                    <div>
                        <h4>Phương thức vận chuyển</h4>
                        <Checkbox.Group style={{ width: '100%' }} onChange={handleOnchangeCheckbox}>
                            <Row>
                                <Checkbox checked={hoatoc} onChange={e => setHoatoc(e.target.checked)} value="hoatoc">Hỏa tốc</Checkbox>
                            </Row>
                            <Row>
                                <Checkbox checked={chuyenphat} onChange={e => setChuyenphat(e.target.checked)} value="chuyenphat">Chuyển Phát tiêu</Checkbox>
                            </Row>
                        </Checkbox.Group>
                    </div>
                    <div>
                        <h4>Loại shop</h4>
                        <Checkbox.Group style={{ width: '100%' }} onChange={handleOnchangeCheckbox}>
                            <Row>
                                <Checkbox value="senmall">SenMall</Checkbox>
                            </Row>
                            <Row>
                                <Checkbox value="sum">Shop+</Checkbox>
                            </Row>
                            <Row>
                                <Checkbox value="tugiao">Shop tự giao</Checkbox>
                            </Row>
                            <Row>
                                <Checkbox value="uytin">Shop uy tín</Checkbox>
                            </Row>
                        </Checkbox.Group>
                    </div>
                    <div>
                        <h4>Ưu đãi</h4>
                        <Checkbox.Group style={{ width: '100%' }} onChange={handleOnchangeCheckbox}>
                            <Row>
                                <Checkbox value="ting">TING TING! SALE LI</Checkbox>
                            </Row>
                            <Row>
                                <Checkbox value="deal">DEAL SỐC TRONG N</Checkbox>
                            </Row>
                            <Row>
                                <Checkbox value="flash">Flash Sale</Checkbox>
                            </Row>
                            <Row>
                                <Checkbox value="voucher">Voucher Shop đến 50</Checkbox>
                            </Row>
                        </Checkbox.Group>
                    </div>
                    <div>
                        <h4>Đánh giá</h4>
                        <p className='ratings' onClick={() => setRatings(5)}>5 sao</p>
                        <p className='ratings' onClick={() => setRatings(4)}>4-5 sao</p>
                        <p className='ratings' onClick={() => setRatings(3)}>3-5sao</p>
                    </div>
                    <div>
                        <h4>Bộ lọc khác</h4>
                        <Checkbox.Group style={{ width: '100%' }} onChange={handleOnchangeCheckbox}>
                            <Row>
                                <Checkbox value="video">Có video</Checkbox>
                            </Row>
                        </Checkbox.Group>
                    </div>
                </div>
            </div>
            <div className="container-userproduct">
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <span className='filtername' onClick={() => setTheloai('')}>Tất cả</span>
                    </Col>
                    <Col span={6}>
                        <span className='filtername' onClick={() => setTheloai('phone')}>Điện thoại</span>
                    </Col>
                    <Col span={6}>
                        <span className='filtername' onClick={() => setTheloai('tainghe')}>Tai nghe</span>
                    </Col>
                    <Col span={6}>
                        <span className='filtername' onClick={() => setTheloai('laptop')}>Laptop</span>
                    </Col>
                </Row>
                <Row className='search__product'>
                    <li onClick={() => setSortProduct('giam')} type="radio" name='sort' >Giảm <BiArrowToBottom /> </li>
                    <li onClick={() => setSortProduct('tang')} type="radio" name='sort' >Tăng <BiArrowToTop /></li>
                </Row>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}

                    // search 
                    dataSource={
                        (theloai ? (products.filter(s => s.theloai === theloai)) :
                            ratings ? products.filter(s => s.trungbinh >= ratings) :
                                products)
                    }
                    renderItem={(item, index) =>
                        index >= states.minIndex &&
                        index < states.maxIndex &&
                        (
                            <List.Item>

                                <Card title={item.title}
                                    style={{ width: 220 }}
                                    cover={<img className='item-image' onClick={() => handleDetails(item.id)} alt="example" src={item.image} />}
                                >
                                    <p className='item-name'>{item.name}</p>
                                    <p className='item-price'>{new Intl.NumberFormat('vi').format(item.price)}đ</p>
                                    <div>
                                        <span>189.000đ</span>
                                        <span className='price-red'>{item.sale}</span>
                                    </div>
                                    <div className='hoatoc'>
                                        <img src="https://media3.scdn.vn/img4/2022/04_14/P8X20So6YTrWe466Xr7v.png" alt="" />
                                        <span className=''>{item.transport}</span>
                                    </div>
                                    <div className='sell'>
                                        <span>Đã bán {item.sell}</span>
                                        <div className='star'>
                                            <span><FaStar color='#ffc600' />{item.trungbinh}</span>
                                        </div>
                                        <FaCartPlus onClick={() => handleAddProduct(item)} color='brown' size={20} ></FaCartPlus>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                />
                <Pagination className='pagination' pageSize={pageSize}
                    defaultCurrent={2}
                    current={states.current}
                    total={products.length}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
