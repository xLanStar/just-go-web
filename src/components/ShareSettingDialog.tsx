import { Button, Col, Input, Layout, List, Row, Image, MenuProps, Dropdown, Modal, ConfigProvider } from 'antd';
import React, { useRef, useState } from 'react';
import "../assets/scss/shareSettingDialog.scss";
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import testImg from "../assets/image/taipei101.jpg"

interface Props {
    isOpen: boolean;
    onCancel: () => void;
}

let data = [
    {
        userName: 'user1',
        permission: 'manager',
    },
    {
        userName: 'user2',
        permission: 'edit',
    },
    {
        userName: 'user3',
        permission: 'edit',
    },
    {
        userName: 'user4',
        permission: 'read',
    },
    {
        userName: 'user5',
        permission: 'read',
    },
];

export const ShareSettingDialog = ({ isOpen, onCancel }: Props) => {
    const [shareMode, setShareMode] = useState<string>('限制：只有具備存取權的使用者可以透過連結檢視或編輯檔案')
    const shareModeMenuClick: MenuProps['onClick'] = (e) => {
        setShareMode(e.key)
    };
    const shareModeMenu = {
        items: [
            {
                label: '限制：只有具備存取權的使用者可以透過連結檢視或編輯檔案',
                key:'限制：只有具備存取權的使用者可以透過連結檢視或編輯檔案'
            },
            {
                label: '所有-檢視：所有使用者皆可以透過連結開啟並檢視檔案',
                key: '所有-檢視：所有使用者皆可以透過連結開啟並檢視檔案'
            },
            {
                label: '所有-編輯：所有使用者皆可以透過連結開啟並編輯檔案',
                key: '所有-編輯：所有使用者皆可以透過連結開啟並編輯檔案'
            }
        ],
        onClick: shareModeMenuClick,
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        contentBg: "#d2e9ff",
                    },
                },
            }}
        >
            <Modal width={500} open={isOpen} closable={false} footer={null}>
                <Layout className='shareSettingDialog'>
                    <Header className='shareSettingDialog-title'>
                        <Input
                            style={{ width: "100%", borderRadius: "20px" }}
                            placeholder='搜尋使用者'
                        />
                    </Header>
                    <Content className='shareSettingDialog-content'>
                        <h3>具有存取權的使用者</h3>
                        <List
                            className="shareSettingDialog-content-list"
                            split={false}
                            dataSource={data}

                            renderItem={(item) => {
                                return (
                                    <List.Item>
                                        <Row className="shareSettingDialog-content-list-item">
                                            <Col span={6}>
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    preview={false}
                                                    src={testImg}
                                                    style={{ borderRadius: "30px" }} />
                                            </Col>
                                            <Col span={12}><h3>{item.userName}</h3></Col>
                                            <Col span={6}><h3>{item.permission}</h3></Col>
                                        </Row>
                                    </List.Item>
                                );
                            }}
                        />
                        <h3>存取模式</h3>
                        <Dropdown menu={shareModeMenu} >
                            <Button style={{ width: "100%", height: "50px", }}>{shareMode}</Button>
                        </Dropdown>
                    </Content>
                    <Footer className='shareSettingDialog-footer'>
                        <Button icon={<SaveOutlined />}>儲存</Button>
                        <Button icon={<CloseOutlined />} onClick={onCancel}>取消</Button>
                    </Footer>
                </Layout>
            </Modal>
        </ConfigProvider>
    );
};