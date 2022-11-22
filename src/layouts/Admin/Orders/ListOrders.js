import { Button, Col, Input, Row, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, deleteOrder } from '../../../redux/actions/orderAction';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


const ListOrders = () => {
    const { orders } = useSelector(state => state.order)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    useEffect(() => {
        dispatch(loadOrders())
    }, [])
    const handleDelete = (id) => {
        dispatch(deleteOrder(id))
        dispatch(loadOrders());
        message.success('Xóa thành công');
    }
    console.log(orders);

    const columns = [
        {
            title: 'Id đơn hàng',
            dataIndex: 'id',
            key: 'amount',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Khách hàng ',
            key: 'khachang',
            render: (text, record, index) => {
                return (
                    <li>{record?.idUser?.nickname}</li>
                )
            }
        },
        {
            title: 'Địa chỉ',
            key: 'name',
            render: (text, record, index) => {
                return (
                    <li>{record?.idUser?.city}</li>
                )
            }
        },
        {
            title: 'Trang thái',
            key: 'trangthai',
            render: (text, record, index) => {
                return (
                    <Tag color={record.status ? "green" : "red"} >
                        {record.status ? "nhận hàng" : "chưa nhận hàng"}
                    </Tag>
                )
            }
        },
        {
            title: 'Ngày order',
            key: 'day',
            dataIndex: 'day',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => navigate(`/admin/orders/view/${record.id}`)} type='primary' >Xem</Button>
                    <Button onClick={() => handleDelete(record.id)} type='primary' danger>Xóa</Button>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Row>
                <Col span={8}>
                    <Input placeholder='tìm kiếm đơn hàng' value={search} onChange={e => setSearch(e.target.value)}></Input>
                </Col>
                <Col span={8}></Col>
                <Col span={8}></Col>
            </Row>
            <Table columns={columns} dataSource={
                // orders
                orders.filter(item => {
                    if (search === "") {
                        return item
                    } else if (item.idUser.nickname.toLowerCase().includes(search.toLowerCase()) || item.idUser.city.toLowerCase().includes(search.toLowerCase())) {
                        return item

                    }
                })
            } />;
        </div>
    )

}
export default ListOrders;