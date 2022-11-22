import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import './login.scss';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers } from '../../redux/actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import { actLoginSuccess } from '../../redux/actions/authAction';


export default function AppLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.data2.users)

    useEffect(() => {
        dispatch(loadUsers())
    }, [])


    const onFinish = (values) => {
        const existedUserIndex = users.findIndex(todo => (todo.email === values.email && todo.password === values.password))
        if (existedUserIndex === -1) {
            message.error('Tài khoản mật khẩu không chính xác')
            return
        }

        dispatch(actLoginSuccess({
            profile: users[existedUserIndex],
            navigate: navigate
        }))

    };

    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])

    const onFinishFailed = (errorInfo) => {
    };
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
                <h1>Đăng nhập</h1>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn phải nhập email!',
                        },
                    ]}
                >
                    <Input placeholder='Email đăng nhập' />
                </Form.Item >

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn phải nhập mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password placeholder='mật khẩu' />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 2, span: 16 }}>
                    <Checkbox>xác nhận</Checkbox>
                </Form.Item>
                <Form.Item
                >
                    <Button type="primary" block htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
                <Link to='/register' >Đăng ký</Link>
            </Form>
        </div>
    );
}