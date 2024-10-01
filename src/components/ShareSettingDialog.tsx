import { Button, Col, Input, Layout, List, Row, Image } from 'antd';
import React, { useRef } from 'react';
import "../assets/scss/shareSettingDialog.scss";
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import testImg from "../assets/image/taipei101.jpg"

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
    // 當 `isOpen` 改變時，根據狀態開啟或關閉對話框
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
                                        <Col span={8}>
                                            <Image
                                                width={30}
                                                height={30}
                                                preview={false}
                                                src={testImg}
                                                style={{ borderRadius: "30px" }} />
                                        </Col>
                                        <Col span={8}><h3>{item.userName}</h3></Col>
                                        <Col span={8}><h3>{item.permission}</h3></Col>
                                    </Row>
                                </List.Item>
                            );
                        }}
                    />
                    <h3>存取模式</h3>
                </Content>
                <Footer className='shareSettingDialog-footer'>
                    <Button icon={<SaveOutlined />}>儲存</Button>
                    <Button icon={<CloseOutlined />} onClick={onClose}>取消</Button>
                </Footer>
            </Layout>
        </dialog>
    );
};