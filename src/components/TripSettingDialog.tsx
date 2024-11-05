import { Button, Layout, Modal, Upload } from 'antd';
import "../assets/scss/tripSettingDialog.scss";
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { CloseOutlined, PlusCircleOutlined, SaveOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
interface Props {
  isOpen: boolean;
  onCancel: () => void;
}

export const TripSettingDialog = ({ isOpen, onCancel }: Props) => {
  return (
    <Modal width={500} open={isOpen} closable={false} footer={null}>
      <Layout className='tripSettingDialog'>
        <Header className='tripSettingDialog-title'>Title</Header>
        <Content className='tripSettingDialog-content'>
          <Upload style={{height: "200px"}}>
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
          <Button icon={<CloseOutlined />} onClick={onCancel}>取消</Button>
        </Footer>
      </Layout>
    </Modal>

  );
};