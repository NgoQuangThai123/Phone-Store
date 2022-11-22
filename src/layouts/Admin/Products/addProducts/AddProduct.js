import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../../redux/actions/productActions';
import { useNavigate } from 'react-router-dom';
// import './login.scss';

export default function AddProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        if (!values.name || !values.price || !values.image) {
        } else {
            dispatch(addProduct(values));
            navigate('/admin/products');
        }
    };

    const onFinishFailed = (errorInfo) => {
    };

    const handleBack = () => {
        navigate('/admin/products')
    }

    return (
        <div className='container-login'>
            <Form
                name="basic"
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h1>Thêm sản phẩm</h1>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder='Tên sản phẩm' />
                </Form.Item >

                <Form.Item
                    name="price"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder='Giá sản phẩm' />
                </Form.Item>
                <Form.Item
                    name="image"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder='URL ảnh' />
                </Form.Item>
                <Form.Item
                >
                    <Button type="primary" block htmlType="submit">
                        Gửi
                    </Button>
                </Form.Item>
                <Form.Item
                >
                    <Button onClick={handleBack} type="primary" danger>
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}