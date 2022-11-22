import { Button, message, Popconfirm, Space, Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, loadProducts } from '../../../redux/actions/productActions';
import './listproduct.scss';


const ListProduct = () => {
    const navigate = useNavigate();
    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        dispatch(loadProducts());
        message.success('xóa thành công');
    }
    const handleEdit = (id) => {
        navigate(`/admin/products/edit/${id}`)
    }
    const dispatch = useDispatch();
    const products = useSelector(state => state.data.products)

    useEffect(() => {
        dispatch(loadProducts())
    }, [])

    const columns = [
        {
            title: 'Tên',
            key: 'name',
            render: (text, record, index) => {
                return (
                    <span className='admin-list-name'>
                        {record.name}
                    </span>
                )
            }
        },
        {
            title: 'Giá tiền',
            key: 'price',
            render: (text, record) => {
                return (
                    <li>{new Intl.NumberFormat('vi').format(record.price)}đ</li>
                )
            }
        },
        {
            title: 'Hình ảnh',
            key: 'image',
            render: (text, record, index) => {
                return (
                    <img src={record.image} alt='' width={50} />
                )
            }
        },

        {
            title: 'Hoạt động',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <Space size="middle">

                        <Button
                            onClick={() => handleEdit(record.id)}
                            type='primary' >Sửa
                        </Button>
                        <Popconfirm onConfirm={() => handleDelete(record.id)} title="Bạn có muốn xóa sản phẩm?" okText="Có" cancelText="Không" >
                            <Button type='primary' danger>Xóa</Button>
                        </Popconfirm>

                    </Space>
                )
            }
        },
    ];

    return (
        <div>
            <Button type='primary'><Link to='/admin/products/add'>Thêm sản phẩm</Link></Button>
            <Table columns={columns} dataSource={products} />;
        </div>
    )
}

export default ListProduct;