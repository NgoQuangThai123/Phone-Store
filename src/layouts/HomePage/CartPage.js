import { Button, Col, Modal, Row, Space, Table, Popconfirm, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../redux/actions/orderAction';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isEmpty, items, totalItems, totalUniqueItems, cartTotal, removeItem, updateItemQuantity, emptyCart } = useCart();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { profile } = useSelector(state => state.auth)
    const showModal = () => {
        if (!!profile.firstname && profile.password) {
            if (totalUniqueItems > 0) {
                setIsModalVisible(true);
            } else {
                setIsModalVisible(true)
            }
        } else {
            message.error('bạn chưa đăng nhập tài khoản')
        }

    };
    const handleOk = () => {
        if (isEmpty) {
            setIsModalVisible(false);
            message.error('thanh toán thất bại')
        } else {

            dispatch(addOrder({
                status: false,
                amount: totalItems,
                items: items,
                total: cartTotal,
                day: new Date(),
                idUser: profile
            }));
            setIsModalVisible(false);
            message.success('thanh toán thành công')
            emptyCart();
        }

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const handleDetails = (id) => {
        navigate(`/product/details/${id}`)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleRemoveItem = (id) => {
        removeItem(id);
        message.success("xóa thành công");
    }


    const columns = [
        {
            title: 'Sản phẩm',
            key: 'product',
            render: (_, record) => (
                <img onClick={() => handleDetails(record.id)} width={100} src={record.image} alt="" />
            ),
        },
        {
            title: 'Tên',
            key: 'name',
            render: (_, record) => (
                <span className='render-name'>
                    {record.name}
                </span>
            ),
        },


        {
            title: 'Giá',
            key: 'price',
            render: (_, record) => (
                <Space size="middle">
                    <span>
                        {new Intl.NumberFormat('vi').format(record.price * record.quantity)}đ
                    </span>
                </Space>
            ),
        },
        {
            title: 'Số lượng',
            key: 'amount',
            dataIndex: 'amount',
            render: (_, record) => (
                <div className='quantity'>
                    <Button onClick={() => updateItemQuantity(record.id, record.quantity - 1)}>-</Button>
                    <p style={{ margin: '2px 6px' }}>{record.quantity}</p>
                    <Button onClick={() => updateItemQuantity(record.id, record.quantity + 1)}>+</Button>
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Bạn có muốn xóa sản phẩm"
                        onConfirm={() => handleRemoveItem(record.id)}
                        okText="Có"
                        cancelText="không"
                    >
                        <Button type='primary' danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];



    return (

        <div>

            <div className='container-cart'>

                <Row gutter={[16, 16]}>
                    <Table columns={columns} dataSource={items} />
                    <h4>Tổng số mặt hàng: {totalItems}</h4>

                </Row>
                <Row>
                    <Col span={12}>
                        <span className='tongtien'>Tổng tiền:</span>
                    </Col>
                    <Col span={12}>
                        <span className='price'>
                            {new Intl.NumberFormat('vi').format(cartTotal)}đ
                        </span>
                    </Col>
                </Row>
                <Button block type='primary' size='large' onClick={showModal}>Thanh toán</Button><br />

                <Modal title="Thanh toán" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <h1>{isEmpty ? "Giỏ hàng rỗng" : "Bạn có muốn thanh toán hay không ?"}</h1>
                </Modal>
            </div>
        </div >
    )
}
