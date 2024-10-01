import { Button, Layout, Upload } from 'antd';
import React, { useRef } from 'react';
import "../assets/scss/tripSettingDialog.scss";
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { CloseOutlined, PlusCircleOutlined, SaveOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TripSettingDialog = ({ isOpen, onClose }: Props) => {
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
    <dialog ref={dialogRef} className='tripSettingDialog'>
      <Layout >
        <Header className='tripSettingDialog-title'>Title</Header>
        <Content className='tripSettingDialog-content'>
          <Upload >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <h3>行程介紹</h3>
          <TextArea
            style={{
              width: "100%",
              height: "100px",
              resize: 'none',
              backgroundColor: "#D6D6D6"
            }}
            placeholder="請輸入文字" />
          <h3>hashtag</h3>


          <div className='tripSettingDialog-content-hashtagList'>
            <Button style={{
              width: "50px",
              height: "30px",
              color: "#FFFFFF",
              backgroundColor: "#97CBFF",
              borderRadius: "50px"
            }}>Tapei</Button>
            <PlusCircleOutlined width={"100px"} height={"100px"} style={{ color: "#97CBFF" }} />
          </div>
        </Content>
        <Footer className='tripSettingDialog-footer'>
          <Button icon={<SendOutlined />}>發布</Button>
          <Button icon={<SaveOutlined />}>儲存</Button>
          <Button icon={<CloseOutlined />} onClick={onClose}>取消</Button>
        </Footer>
      </Layout>
    </dialog>
  );
};