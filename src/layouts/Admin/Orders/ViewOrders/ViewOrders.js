import React, { useEffect } from 'react';
import { getSingleOrder } from '../../../../redux/actions/orderAction';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Col, Row, Table } from 'antd';

export default function ViewOrders() {
    const { id } = useParams();
    const { order } = useSelector(state => state.order);
    const dispatch = useDispatch();
    const { items } = order
    const user = order.idUser

    useEffect(() => {
        dispatch(getSingleOrder(id))
    }, [])

    const columns = [
        {
            title: 'Tên sản phẩm',
            key: 'name',
            render: (record) => {
                return (
                    <li>{record.name}</li>
                )
            }
        },
        {
            title: 'Hình ảnh',
            key: 'image',
            render: (record) => {
                return (
                    <img src={record.image} width={60} alt=''></img>
                )
            }
        },
        {
            title: 'Giá sản phẩm',
            key: 'price',
            render: (record) => {
                return (
                    <li>{record.price}</li>
                )
            }
        },


    ];


    return (
        <div>
            <h1>Thông tin đơn hàng</h1>
            <Table columns={columns} dataSource={items} />
            <Row gutter={[16, 16]}>
                <Col span={3}><h3>{order.amount} (sản phẩm)</h3></Col>
                <Col span={10}><h1>Tổng tiền: {new Intl.NumberFormat('vi').format(order.total)}đ</h1></Col>
                <Col span={8}><h3>Ngày mua hàng: {order.day}</h3></Col>
            </Row>
            <h1>Thông tin khách hàng</h1>
            <Avatar src={user?.avatar}></Avatar>
            <h4>{user?.nickname}</h4>
            <h4>{user?.email}</h4>
            <h4>{user?.city}</h4>
            <h4>{user?.phone}</h4>
        </div>
    )
}
