import React, { useEffect } from 'react';
import { Row, Col, Image, Avatar } from 'antd';
import './profile.scss';
import { useSelector } from 'react-redux';
import Images from '../../constants/image';


export default function Profile() {
    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])
    const { profile } = useSelector(state => state.auth)
    return (
        <div className='container__profile'>
            <h1 className='information'>Thông tin cá nhân</h1>
            <Row >
                <Col span={12}>
                    <Avatar className='avatar' src={<Image src={profile.avatar || Images.emty} style={{ width: 200 }} />} />
                    <p className='email'>{profile.email}</p>
                </Col>
                <Col>
                    <p className='firstname'>First name: {profile.firstname}</p>
                    <p className='lastname'>Last name: {profile.lastname}</p>
                    <p className='nickname'>Nick name: {profile.nickname}</p>
                    <p className='phone'>Phone: 0{profile.phone}</p>
                    <p className='gender'>Gender: {profile.gender}</p>
                    <p className='district'>District: {profile.district}</p>
                    <p className='city'>City: {profile.city}</p>
                </Col>
                <Col span={12}></Col>
            </Row>
        </div>
    )
}
