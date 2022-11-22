import { Avatar, Button, Col, Input, Row, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteComment, loadComments } from '../../../../redux/actions/commentAction';
import { FaStar } from 'react-icons/fa';
import { loadProducts } from '../../../../redux/actions/productActions';
const { Option } = Select;


const ListComments = () => {
    const { comments } = useSelector(state => state.comment)
    const [sortRaing, setSortRating] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    useEffect(() => {
        dispatch(loadComments())
        dispatch(loadProducts())
    }, [])
    const handleDelete = (id) => {
        dispatch(deleteComment(id))
        dispatch(loadComments());
        message.success('Xóa thành công');
    }

    const handleChange = (value) => {
        setSortRating(value)

    };

    if (sortRaing === 1) {
        comments.sort((a, b) => {
            return b.rating - a.rating
        }
        )
    }
    if (sortRaing === 2) {
        comments.sort((a, b) => {
            return a.rating - b.rating
        }
        )
    }
    if (sortRaing === 3) {
        comments.filter(a => a.rating === 5
        )
    }
    const columns = [
        {
            title: 'hình ảnh khách',
            key: 'amount',
            render: (text, record) => {
                return (
                    <Avatar src={record.avatar}></Avatar>
                )
            }
        },
        {
            title: 'hình ảnh sản phẩm',
            key: 'amount',
            render: (text, record) => {

                return (

                    <Avatar src={record.image}></Avatar>
                )
            }
        },
        {
            title: 'tên tài khoản',
            key: 'khachang',
            render: (text, record, index) => {
                return (
                    <li>{record.nickname}</li>
                )
            }
        },
        {
            title: 'Nội dung bình luận',
            key: 'name',
            render: (text, record, index) => {
                return (
                    <li>{record.title}</li>
                )
            }
        },
        {
            title: 'Ngày bình luận',
            key: 'trangthai',
            render: (text, record, index) => {
                return (
                    <li>{record.date}</li>
                )
            }
        },
        {
            title: 'số sao',
            key: 'rating',
            render: (text, record, index) => {
                return (
                    <div>
                        {[...Array(record.rating)].map((star, i) => {

                            return (
                                <label key={i}>
                                    <input
                                        style={{ display: 'none' }}
                                        type="radio"
                                        name="rating"
                                    />
                                    <FaStar
                                        color="#ffc107"
                                        className='star' size={15}
                                    />
                                </label>
                            )
                        })}
                    </div>
                )
            }
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleDelete(record.id)} type='primary' danger>Xóa</Button>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Row>
                <Col span={8}>
                    <Input placeholder='Tìm kiếm bình luận' value={search} onChange={e => setSearch(e.target.value)}></Input>
                </Col>
                <Col span={8}></Col>
                <Col span={8}>
                    <Select
                        defaultValue="Đánh giá"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                    >
                        <Option value={1}>Tăng sao</Option>
                        <Option value={2}>Giảm sao</Option>
                    </Select>
                </Col>
            </Row>
            <Table columns={columns} dataSource={
                // orders
                comments.filter(item => {
                    if (search === "") {
                        return item
                    } else if (item?.nickname.toLowerCase().includes(search.toLowerCase()) || item?.title.toLowerCase().includes(search.toLowerCase())) {
                        return item

                    }
                })
            } />;
        </div>
    )

}
export default ListComments;