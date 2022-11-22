import {

    BorderOuterOutlined,
    GiftOutlined,
    PicLeftOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import './admin.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';
const { Sider, Content } = Layout;

export default function Admin() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handlelogout = () => {
        dispatch({
            type: types.LOGOUT
        })
        navigate('/')
    }

    return (
        <Layout>
            <Sider trigger={null} >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <PicLeftOutlined />,
                            label: (
                                <Link to='/admin/dashboard' >Bảng điều khiển</Link>
                            ),

                        },
                        {
                            key: '2',
                            icon: <GiftOutlined />,
                            label: (
                                <Link to='/admin/Products' >Sản phẩm</Link>
                            ),
                        },
                        {
                            key: '3',
                            icon: <UserOutlined />,
                            label: (
                                <Link to='/admin/users' >Người dùng</Link>
                            ),
                        },
                        {
                            key: '4',
                            icon: <BorderOuterOutlined />,
                            label: (
                                <Link to='/admin/orders' >Đơn hàng</Link>
                            ),

                        },
                        {
                            key: '5',
                            icon: <BorderOuterOutlined />,
                            label: (
                                <Link to='/admin/comments' >Bình luận</Link>
                            ),

                        },
                        {
                            key: '6',
                            label: (
                                < Button onClick={handlelogout}>Đăng xuất</Button>

                            ),
                        },

                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
