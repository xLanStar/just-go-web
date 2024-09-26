import { Flex, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { User } from "../types/userInterface";

import "../assets/scss/userInfo.scss";

interface Props {
  user: User;
}

const UserInfo: React.FunctionComponent<Props> = ({ user }) => {
  return (
    <Flex
      className="user_info"
      vertical={false}
      justify="flex-start"
      align="center"
      gap="middle"
    >
      {user.avatar ? (
        <Avatar src={<img src={user.avatar} alt="avatar" />} size={80} />
      ) : (
        <Avatar size={80} icon={<UserOutlined />} />
      )}
      <Flex vertical justify="center" align="flex-start">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </Flex>
    </Flex>
  );
};

export default UserInfo;
