import { DoubleRightOutlined, EditOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, List, Image, Row, Col } from "antd"
import testImg from "../assets/image/taipei101.jpg"
import '../assets/scss/memberList.scss'

const data = [
    {
        userName: 'user1',
        permission: 'manager',
        icon: <UserOutlined style={{ fontSize: "20px" }} />
    },
    {
        userName: 'user2',
        permission: 'edit',
        icon: <EditOutlined style={{ fontSize: "20px" }}/>
    },
    {
        userName: 'user3',
        permission: 'edit',
        icon: <EditOutlined style={{ fontSize: "20px" }}/>
    },
    {
        userName: 'user4',
        permission: 'read',
        icon: <ReadOutlined style={{ fontSize: "20px" }}/>
    },
    {
        userName: 'user5',
        permission: 'read',
        icon: <ReadOutlined style={{ fontSize: "20px" }}/>
    },
];
export const MemberList = () => {
    return (
        <Layout className="memberList" id="memberList">
            <DoubleRightOutlined style={{ fontSize: "20px" }} className="memberList-back" onClick={() => {
                document.getElementById("memberList")!.style.display = 'none';
            }} />
            <List
                split={false}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Row className="memberList-item">
                            <Col span={4}>
                                <Image
                                    width={30}
                                    height={30}
                                    preview={false}
                                    src={testImg}
                                    style={{ borderRadius: "30px" }}
                                />
                            </Col>
                            <Col span={16}><h3>{item.userName}</h3></Col>
                            <Col span={4}>{item.icon}</Col>
                        </Row>
                    </List.Item>
                )}
            />
        </Layout>
    )
}