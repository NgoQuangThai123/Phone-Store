import React, { useEffect } from 'react'
import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import { DatePicker } from 'antd';
import './register.scss'
import { addUser } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function AppRegister() {
    const { users } = useSelector(state => state.data2)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const { Option } = Select;
    const formItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 24,
            },
        },
    };
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onFinish = (data) => {
        const finIndex = users.findIndex(user => user.email === data.email)
        if (finIndex !== -1) {
            alert('email đã tồn tại')
        } else {
            data.role = false
            dispatch(addUser(data));
            navigate('/login');
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="84">+84</Option>
                <Option value="85">+85</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className='container-form'>
            <h1>Đăng ký</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item name={['firstname']} rules={[{ required: true, message: 'Bạn phải nhập họ!' }]}>
                    <Input placeholder='hãy nhập họ' />
                </Form.Item>
                <Form.Item name={['lastname']} rules={[{ required: true, message: 'Bạn phải nhập tên!' }]}>
                    <Input placeholder='hãy nhập tên' />
                </Form.Item>

                <Form.Item
                    name="email"

                    rules={[
                        {
                            type: 'email',
                            message: 'Email không hợp lệ!',
                        },
                        {
                            required: true,
                            message: 'Bạn phải nhập email!',
                        },
                    ]}
                >
                    <Input placeholder='hãy nhập email' />
                </Form.Item>

                <Form.Item
                    name="password"

                    rules={[
                        {
                            required: true,
                            message: 'Bạn phải nhập mật khẩu!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='hãy nhập password' />
                </Form.Item>

                <Form.Item
                    name="confirm"

                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Xác nhận mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Mật khẩu không trùng'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder='nhập lại password' />
                </Form.Item>

                <Form.Item
                    name="nickname"

                    tooltip="What do you want others to call you?"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập tên tài khoản!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input placeholder='hãy nhập tên tài khoản' />
                </Form.Item>


                <Form.Item
                    name="phone"

                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập số điện thoại!',
                        },
                    ]}
                >
                    <Input
                        placeholder='nhập số điện thoại'
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="year"
                        rules={[{ required: true, message: 'Hãy nhập ngày sinh' }]}
                        style={{ display: 'inline-block' }}
                    >
                        <DatePicker style={{ width: 200 }} placeholder='Ngày sinh' />
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    name="gender"

                    rules={[
                        {
                            required: true,
                            message: 'Hãy chọn giới tính!',
                        },
                    ]}
                >
                    <Select placeholder="Giới tính">
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="other">Khác</Option>
                    </Select>
                </Form.Item>

                <Form.Item l>
                    <Input.Group compact>
                        <Form.Item
                            name={['district']}
                            noStyle
                            rules={[{ required: true, message: 'hãy nhập Quận / Huyện' }]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Quận / Huyện" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>

                <Form.Item >
                    <Input.Group compact>
                        <Form.Item
                            name={['city']}
                            noStyle
                            rules={[{ required: true, message: 'Hãy nhập Tỉnh / Thành phố' }]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Tỉnh / Thành Phố" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary"
                        block htmlType="submit">
                        Đăng ký
                    </Button>
                </Form.Item>
                <Link to='/login'>Đăng nhập</Link>
            </Form>
        </div>
    )
}
