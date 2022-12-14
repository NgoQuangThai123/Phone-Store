import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../../redux/actions/productActions';
import { addComment, loadComments } from '../../../redux/actions/commentAction';
import { useParams } from 'react-router-dom';
import './productdetails.scss'
import { Avatar, Button, Col, List, message, Modal, Row } from 'antd';
import { AiFillCarryOut, AiTwotoneRedEnvelope, AiOutlineExclamationCircle } from "react-icons/ai";
import { useCart } from 'react-use-cart';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';
import TextArea from 'antd/lib/input/TextArea';
import { addOrder } from '../../../redux/actions/orderAction';


export default function ProductDetails() {
    const { profile } = useSelector(state => state.auth)
    const { comments } = useSelector(state => state.comment)
    const [mount, setMount] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState();
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(null);
    const { addItem } = useCart();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.data);
    const today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    const findComment = comments.filter(s => s.ad === product.id)
    const amountComment = findComment.length
    const trungbinh = () => {
        let sum = 0
        for (let i = 0; i < findComment.length; i++) {
            sum += findComment[i].rating
        }
        return sum / findComment.length

    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(getSingleProduct(id))
        dispatch(loadComments())

    }, [])


    const handleAddComment = () => {
        if (!!profile.firstname && !!profile.lastname && profile.email) {
            if (title) {
                dispatch(addComment({
                    rating: rating,
                    avatar: profile.avatar,
                    nickname: profile.nickname,
                    ad: product.id,
                    image: product.image,
                    title: title,
                    date: date,
                }))
                dispatch(loadComments())
                setTitle('');
            }
        } else {
            message.error('b???n ch??a ????ng nh???p t??i kho???n');
        }

    }

    const handleAddProduct = () => {
        addItem(product)
        message.success('th??m th??nh c??ng')
    }
    const handleOrder = () => {
        if (!!profile.firstname && !!profile.password) {
            setIsModalVisible(true)
        } else {
            message.error('b???n ch??a ????ng nh???p t??i kho???n');
        }

    }
    const handleOk = () => {
        dispatch(addOrder({
            amount: mount,
            total: product.price * mount,
            day: new Date(),
            name: 'hoang viet'
        }))
        setIsModalVisible(false);
        message.success('thanh to??n th??nh c??ng')
    }




    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <div className='productDetails'>
            <div className="headers">
                <span>Shopphone /</span>
                <span>??i???n tho???i - M??y t??nh b???ng /</span>
                <span>??i???n tho???i c?? /</span>
                <span>Smartphone c??</span>
            </div>
            <div className='container'>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <img width={340} src={product.image} alt="" />
                        <Row>
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1

                                return (
                                    <label key={i}>
                                        <input
                                            style={{ display: 'none' }}
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                        />
                                        <FaStar
                                            color={ratingValue <= (hover || rating) ? "#ffc107" : "black"}
                                            className='star' size={20}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    </label>
                                )
                            })}
                        </Row>
                        <Row gutter={[16, 16]}>
                            <h2>B??nh lu???n:</h2>
                            <TextArea value={title} placeholder='h??y n??u nh???n x??t c???a b???n' cols={45} rows={5} showCount maxLength={100} onChange={(e) => setTitle(e.target.value)} />
                            <Button onClick={handleAddComment} type='primary'>B??nh lu???n</Button>
                        </Row>
                        <List
                            itemLayout="horizontal"
                            dataSource={comments.filter(s => s.ad === product.id)}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={item.nickname}
                                        description={item?.title}
                                    />
                                    {/* rating */}
                                    {[...Array(item.rating)].map((star, i) => {
                                        return (
                                            <label key={i}>

                                                <FaStar
                                                    color="#ffc107"
                                                    className='star' size={14}
                                                />
                                            </label>
                                        )
                                    })}
                                    <span style={{ marginLeft: '10px' }}>{item.date}</span>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={16}>
                        <Row >
                            <h1 className='title-name'>{product.name}</h1>
                        </Row>
                        <Row>
                            <span className='title-price'>{new Intl.NumberFormat('vi').format(product.price)}??</span>
                        </Row>
                        <Row className='ant-row-4'>
                            <AiFillCarryOut size={16} /> <span className='purchases'>  20 l?????t mua</span>
                        </Row>
                        <Row className='ant-row-5'>
                            <Col span={6}>
                                <span className='purchases'>Ch???n s??? l?????ng:</span>
                            </Col>
                            <Col className='ant-col-4' span={12}>
                                <Button onClick={() => mount > 0 && setMount(mount - 1)}>_</Button>
                                <h3 className='amount-product'>{mount}</h3>
                                <Button onClick={() => setMount(mount + 1)}>+</Button>
                            </Col>
                        </Row>
                        <Row className='ant-row-6' gutter={[16, 16]}>
                            <Col span={12}>
                                <Button onClick={handleAddProduct} type='primary' size="large" block>Th??m v??o gi??? h??ng</Button>
                            </Col>
                            <Col span={12}>
                                <Button onClick={handleOrder} type='primary' size="large" block danger>Mua ngay</Button>
                            </Col>
                        </Row>
                        <Row className='ant-row-7'>
                            <Col span={21}>
                                <span className='endow'>??u ????i gi??nh cho b???n</span>
                            </Col>
                            <Col span={3}><AiOutlineExclamationCircle size={24} /></Col>
                        </Row>
                        <Row className='ant-row-8'>
                            <Col span={12}>
                                <AiTwotoneRedEnvelope size={20} />
                                <span className='sell-app'>Gi???m gi?? khi mua qua app</span>
                            </Col>
                            <Col span={12}><img src="https://media3.scdn.vn/img4/2022/04_14/P8X20So6YTrWe466Xr7v.png" alt="" />H???a t???c</Col>
                        </Row>
                        <Row className='ant-row-9'>
                            <Col span={21}>
                                <h3 className='endow'>Quy???n l???i kh??ch h??ng</h3>
                                <div className='endiw'>
                                    <AiFillSafetyCertificate color='green' size={30} />
                                    <p className='hours'>48 gi??? ho??n tr???</p>
                                </div>
                            </Col>
                            <Col span={3}>
                                <AiOutlineExclamationCircle size={24} />
                            </Col >
                        </Row>
                        <Row className='ant-row-9'>
                            <h3>M?? t??? s???n ph???m</h3>
                            <p>
                                M??n h??nh: LED-backlit IPS LCD4&#34;DVGA H??? ??i???u h??nh: iOS 11 Camera sau: 8 MP Camera tr?????c: 1.2 MP Chip: Apple A7 RAM: 1 GB B??? nh??? trong: 16 GB SIM: 1 Nano SIM Pin, S???c: 1560 mAh ???phone 5...
                            </p>
                            <h4>Th??ng tin c?? b???n</h4>
                        </Row>
                        <Row className='ant-row-10'>
                            <h4>????nh gi?? nh???n x??t v??? s???n ph???m ( {amountComment}  l?????t ????nh gi?? )  </h4>
                            <span className='danhgia'>{trungbinh() ? trungbinh().toFixed(1) : 'Ch??a c?? ????nh gi??'}</span>
                            <div>
                                <FaStar className='start__danhgia' size={20} style={{ marginTop: '0', marginLeft: '5px', color: '#ffc107' }} />
                            </div>

                        </Row>

                    </Col>
                </Row>
                <Modal title="Thanh to??n" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <h1>B???n c?? mu???n thanh to??n hay kh??ng ?</h1>
                </Modal>
            </div>

        </div>
    )
}
