import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import { User } from "../types/userInterface";
import { getUserInfo } from "../apis/user";
import { Avatar, Button, Flex } from "antd";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { TripInfo } from "../types/tripInterface";
import { loadTripsById } from "../apis/trip";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "../assets/scss/publisherInfo.scss";

const PublisherInfo: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { getItem } = useLocalStorage();

  const { id } = useParams();
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });
  const [trips, setTrips] = useState<TripInfo[]>([]);

  useEffect(() => {
    if (!getItem("jwtToken")) {
      navigate("/signin", { replace: true });
    }

    getUserInfo(id as string)
      .then((user) => {
        dispatch(setPage(user.name));
        dispatch(setMode("default"));
        setUser(user);
        return loadTripsById(user.id);
      })
      .then((trips) => {
        setTrips(trips);
      });
  }, [navigate]);

  return (
    <Flex
      className="publisher_info"
      vertical
      justify="flex-start"
      align="center"
    >
      <Flex
        className="publisher_info_user_box"
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
      <Flex
        className="publisher_info_tag_box"
        vertical={false}
        justify="center"
        align="center"
      >
        <Button
          className="publisher_info_tag"
          icon={<AppstoreOutlined />}
          type="text"
          size="large"
        >
          發布的行程
        </Button>
      </Flex>
      {/* 之後修改 */}
      {/* <TripList
        trips={trips}
        mode={TripInfoMode.Private}
        isPublic={true}
        isDelete={false}
      /> */}
    </Flex>
  );
};

export default PublisherInfo;
