import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct, updateProduct } from '../../../../redux/actions/productActions';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
    const [form] = Form.useForm()
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { product } = useSelector(state => state.data);

    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [])

    useEffect(() => {
        if (Object.entries(product).length) {
            form.setFieldsValue({ ...product })
        }
    }, [product])

    const onFinish = (values) => {
        if (!values.name || !values.price || !values.image) {
        } else {
            dispatch(updateProduct(values, id));
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
                form={form}
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
                <h1>Thay đổi sản phẩm</h1>
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
                        Cập nhật
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