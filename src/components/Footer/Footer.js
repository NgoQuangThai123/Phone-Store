import React from 'react';
import { BackTop, Col, List, Row } from 'antd';
import './footer.scss';

const data = [
    {
        image: "https://didongthongminh.vn/templates/default/images/visa.svg",
    },
    {
        image: "https://didongthongminh.vn/templates/default/images/master_card.svg",
    },
    {
        image: "https://didongthongminh.vn/templates/default/images/jbc.svg",
    },
    {
        image: "https://didongthongminh.vn/templates/default/images/inter.svg",
    },
    {
        image: "https://didongthongminh.vn/templates/default/images/inter.svg",
    },
    {
        image: "https://didongthongminh.vn/templates/default/images/tragop.svg",
    },
]

export default function AppFooter() {
    return (
        <div className='container-footer'>
            <div className="footer">
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <h3>Thông tin liên hệ</h3>
                        <ul>
                            <li>Giới thiệu công ty</li>
                            <li>Hệ thống cửa hàng</li>
                            <li>Chính sách bảo mật</li>
                            <li>Mail: ungnhohoangviet1@gmail.com</li>
                        </ul>
                        <h3>Hỗ trợ thanh toán</h3>
                        <List
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 3,
                                xl: 3,
                                xxl: 3,
                            }}
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item>
                                    <img src={item.image} alt="" />
                                </List.Item>
                            )}
                        />
                        <img style={{ marginLeft: '40px' }} src="https://didongthongminh.vn/templates/default/images/bct.svg" alt="" />
                    </Col>
                    <Col span={6}>
                        <h3>Thông tin khác</h3>
                        <ul>
                            <li>Chính sách đổi trả</li>
                            <li>Quy chế hoạt động</li>
                            <li>Chính Sách bảo hành</li>
                            <li>Tuyển dụng</li>
                            <li>Khách hàng Doanh nghiệp</li>
                            <li>Tin tức</li>
                            <li>Trade-in thu cũ lên đời</li>
                        </ul>
                    </Col>
                    <Col span={6}>
                        <h3>Thông tin hỗ trợ</h3>
                        <ul>
                            <li>Mua hàng và thanh toán Online</li>
                            <li>Mua hàng trả góp Online</li>
                            <li>Trung tâm bảo hành chính hãng</li>
                            <li>Quy định về việc sao lưu dữ liệu</li>
                            <li>Hướng dẫn thanh toán chuyển khoản</li>
                            <li>Dịch vụ bảo hành điện thoại</li>
                        </ul>
                    </Col>
                    <Col span={6}>
                        <h3>Gọi tư vấn & khiếu nại</h3>
                        <ul>
                            <li>Gọi mua hàng: 085 5100 001 (8h00 - 22h00)</li>
                            <li>Hỗ trợ kỹ thuật: 1800 6502 (8h00 - 21h00)</li>
                            <li>Hợp tác kinh doanh: 1900 6122 (8h00 - 22h00)</li>
                        </ul>
                        <h3>Kết nối với chúng tôi</h3>
                        <div className="info-img">
                            <img src="https://didongthongminh.vn/templates/default/images/fb.svg" alt="" />
                            <img src="https://didongthongminh.vn/templates/default/images/ytb.svg" alt="" />
                        </div>
                    </Col>
                </Row>
                <BackTop>
                    <div className='goTop'><i className='fas fa-arrow-circle-up'></i></div>
                </BackTop>
                <span>@ Bản quyền thuộc về Công Ty Cổ Phần Viễn Thông Di Động Thông Minh</span>
            </div>

        </div>
    )
}
