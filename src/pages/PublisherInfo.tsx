import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode, TripInfoMode } from "../types/modeInterface";
import { User } from "../types/userInterface";
import { getUserInfo } from "../apis/user";
import { Avatar, Button, Flex } from "antd";
import { Color } from "../data/color";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { TripInfo } from "../types/tripInterface";
import TripList from "../components/TripList";
import { loadTripsById } from "../apis/trip";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "../assets/scss/publisherInfo.scss";

const PublisherInfo: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localStorage = useLocalStorage();

  const { id } = useParams();
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });
  const [trips, setTrips] = useState<TripInfo[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/signin", { replace: true });
    }

    getUserInfo(id as string)
      .then((user) => {
        dispatch(setPage(user.name));
        dispatch(setMode(PageMode.Default));
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
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Flex
        className="user_info"
        vertical={false}
        justify="flex-start"
        align="center"
        gap="middle"
        style={{
          width: "100%",
          backgroundColor: Color.cyanHeavy,
          borderBottom: `1px solid ${Color.greyHeavy}`,
        }}
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
        vertical={false}
        justify="center"
        align="center"
        style={{
          padding: "12px 0px 24px 0px",
          width: "100%",
        }}
      >
        <Button
          icon={<AppstoreOutlined />}
          type="text"
          size="large"
          style={{
            borderEndStartRadius: "0px",
            borderEndEndRadius: "0px",
            borderBottom: "1px solid black",
          }}
        >
          發布的行程
        </Button>
      </Flex>
      <TripList
        trips={trips}
        mode={TripInfoMode.Private}
        isPublic={true}
        isDelete={false}
      />
    </Flex>
  );
};

export default PublisherInfo;
