import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleUser } from '../../../../redux/actions/userActions';
import { Avatar, Button, Col, Row } from 'antd';
import './viewuser.scss';


export default function ViewUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.data2);

    useEffect(() => {
        dispatch(getSingleUser(id))
    }, [])



    return (
        <div className='container-view'>
            <Row >
                <Col span={18}>
                    <h1>Thông tin cá nhân</h1>
                </Col>
                <Col span={6}>
                    <Button onClick={() => navigate('/admin/users')} type='primary'>Trở lại</Button>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Họ:</Col>
                        <Col span={12}>{user.firstname}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Tên:</Col>
                        <Col span={12}>{user.lastname}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Email:</Col>
                        <Col span={12}>{user.email}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>NickName:</Col>
                        <Col span={12}>{user.nickname}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Số điện thoại:</Col>
                        <Col span={12}>0{user.phone}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Năm sinh:</Col>
                        <Col span={12}>{user.year}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Giới Tính:</Col>
                        <Col span={12}>{user.gender}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Quận / Huyện:</Col>
                        <Col span={12}>{user.district}</Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>Tỉnh / Thành Phố:</Col>
                        <Col span={12}>{user.city}</Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Avatar size={300} src={user.avatar} />
                </Col>
            </Row>


        </div>
    )
}
