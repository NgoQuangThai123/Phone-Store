import { Button, message, Popconfirm, Space, Table } from 'antd';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, loadUsers } from '../../../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';


const ListUsers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.data2.users)

    useEffect(() => {
        dispatch(loadUsers())
    }, [])


    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
        dispatch(loadUsers());
        message.success('Xóa thành công');
    }


    const handleView = (id) => {
        navigate(`/admin/users/view/${id}`)
    }

    const columns = [
        {
            title: 'Họ',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Tên',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Giới Tính',
            key: 'gender',
            dataIndex: 'gender',
        },
        {
            title: 'Quyền',
            key: 'role',
            render: (text, record) => (
                <span>{record.role === true ? "admin" : "user"}</span>
            )
        },
        {
            title: 'Hoạt động',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => handleView(record.id)}>Xem</Button>
                    <Popconfirm
                        title="Bạn có muốn xóa người dùng?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={users} />;
        </div>
    )

}

export default ListUsers;