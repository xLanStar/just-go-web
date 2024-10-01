import { Button, Col, Input, Layout, List, Row, Image, MenuProps, Dropdown } from 'antd';
import React, { useRef, useState } from 'react';
import "../assets/scss/shareSettingDialog.scss";
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import testImg from "../assets/image/taipei101.jpg"
import Sider from 'antd/es/layout/Sider';

interface Props {
    isOpen: boolean;
    onClose: () => void;
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

export const ShareSettingDialog = ({ isOpen, onClose }: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [shareMode, setShareMode] = useState<string[]>(['限制','asdf'])
    const shareModeMenuClick: MenuProps['onClick'] = (e) => {
        setShareMode([e.key,'asdf'])
    };
    const shareModeMenu = {
        items: [
            {
                key: '限制',
                label: '只有具備存取權的使用者可以透過連結檢視或編輯檔案',
            },
            {
                key: '所有-檢視',
                label: '所有使用者皆可以透過連結開啟並檢視檔案',
            },
            {
                key: '所有-編輯',
                label: '所有使用者皆可以透過連結開啟並編輯檔案',
            }
        ],
        onClick: shareModeMenuClick,
    };
    React.useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
            if (isOpen) {
                dialog.showModal(); // 開啟對話框
            } else {
                dialog.close(); // 關閉對話框
            }
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} className='shareSettingDialog'>
            <Layout >
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
                                        <Col span={4}>
                                            <Image
                                                width={30}
                                                height={30}
                                                preview={false}
                                                src={testImg}
                                                style={{ borderRadius: "30px" }} />
                                        </Col>
                                        <Col span={16}><h3>{item.userName}</h3></Col>
                                        <Col span={4}><h3>{item.permission}</h3></Col>
                                    </Row>
                                </List.Item>
                            );
                        }}
                    />
                    <h3>存取模式</h3>
                    {/* <Dropdown menu={shareModeMenu} >
                        <Button style={{ width: "100%", height:"80px", zIndex:6 }}>
                            <h3 style={{ width: "100%", height:"80px", zIndex:6 }}>{shareMode[0]}</h3>
                            <Layout style={{ width: "100%", height:"80px", zIndex:6 }}>
                                <Sider>{shareMode[0]}</Sider>
                                <Content>{shareMode[1]}</Content>
                            </Layout>
                        </Button>
                    </Dropdown> */}
                </Content>
                <Footer className='shareSettingDialog-footer'>
                    <Button icon={<SaveOutlined />}>儲存</Button>
                    <Button icon={<CloseOutlined />} onClick={onClose}>取消</Button>
                </Footer>
            </Layout>
        </dialog>
    );
};