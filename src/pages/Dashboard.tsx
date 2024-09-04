import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { App, Avatar, Button, Flex } from "antd";
import {
  AppstoreOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Color } from "../data/color";
import { useAppDispatch, useAppSelector } from "../hooks";
import TripList from "../components/TripList";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode, TripInfoMode } from "../types/modeInterface";
import { TripInfo } from "../types/tripInterface";
import { loadTripsByMe } from "../apis/trip";
import { useLocalStorage } from "../hooks/useLocalStorage";

import "../assets/scss/dashboard.scss";

enum Tag {
  Own,
  Keep,
}

interface OwnTripList {
  own: TripInfo[];
  coEdit: TripInfo[];
}

const Dashboard: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localStorage = useLocalStorage();
  const user = useAppSelector((state) => state.user.user);
  const { message } = App.useApp();

  const [publishTrips, setPublishTrips] = useState<TripInfo[]>([]);
  const [ownTrips, setOwnTrips] = useState<TripInfo[]>([]);
  const [coEditTrips, setCoEditTrips] = useState<TripInfo[]>([]);
  const [favorTrips, setFavorTrips] = useState<TripInfo[]>([]);
  const [listMode, setListMode] = useState<Tag>(Tag.Own);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/", { replace: true });
    }
    dispatch(setPage("行程管理"));
    dispatch(setMode(PageMode.Default));
  }, []);

  useEffect(() => {
    if (listMode === Tag.Own) {
      loadTripsByMe(user.id, "own")
        .then((response: OwnTripList | TripInfo[]) => {
          setPublishTrips(
            (response as OwnTripList).own.filter((trip) => trip.isPublic)
          );
          setOwnTrips(
            (response as OwnTripList).own.filter((trip) => !trip.isPublic)
          );
          setCoEditTrips((response as OwnTripList).coEdit);
        })
        .catch((error: any) => {
          if (error.name === "ResponseError") {
            message.error("載入行程失敗");
          } else {
            console.error(error.message);
          }
        });
    } else {
      loadTripsByMe(user.id, "keep")
        .then((response: OwnTripList | TripInfo[]) => {
          setFavorTrips(response as TripInfo[]);
        })
        .catch((error: any) => {
          if (error.name === "ResponseError") {
            message.error("載入行程失敗");
          } else {
            message.error(error.message);
          }
        });
    }
  }, [listMode]);

  return (
    <Flex
      className="dashboard"
      vertical
      justify="flex-start"
      align="center"
      style={{
        width: "100%",
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
          padding: "12px 0px",
          width: "100%",
        }}
      >
        <Button
          icon={<AppstoreOutlined />}
          type="text"
          size="large"
          style={
            listMode === Tag.Own
              ? {
                  borderEndStartRadius: "0px",
                  borderEndEndRadius: "0px",
                  borderBottom: "1px solid black",
                }
              : {
                  borderEndStartRadius: "0px",
                  borderEndEndRadius: "0px",
                }
          }
          onClick={() => {
            setListMode(Tag.Own);
          }}
        >
          我的行程
        </Button>
        <Button
          icon={<StarOutlined />}
          type="text"
          size="large"
          style={
            listMode === Tag.Keep
              ? {
                  borderEndStartRadius: "0px",
                  borderEndEndRadius: "0px",
                  borderBottom: "1px solid black",
                }
              : {
                  borderEndStartRadius: "0px",
                  borderEndEndRadius: "0px",
                }
          }
          onClick={() => {
            setListMode(Tag.Keep);
          }}
        >
          我的收藏
        </Button>
      </Flex>
      {listMode === Tag.Own ? (
        <>
          <Flex
            className="trip_title"
            vertical={false}
            justify="flex-start"
            align="center"
          >
            <h1>已發布行程</h1>
          </Flex>
          <TripList
            trips={publishTrips}
            mode={TripInfoMode.Private}
            isPublic={true}
            isDelete={true}
          />
          <Flex
            className="trip_title"
            vertical={false}
            justify="flex-start"
            align="center"
          >
            <h1>我的行程</h1>
          </Flex>
          <TripList
            trips={ownTrips}
            mode={TripInfoMode.Private}
            isPublic={false}
            isDelete={true}
          />
          <Flex
            className="trip_title"
            vertical={false}
            justify="flex-start"
            align="center"
          >
            <h1>與我共編</h1>
          </Flex>
          <TripList
            trips={coEditTrips}
            mode={TripInfoMode.Private}
            isPublic={false}
            isDelete={false}
          />
        </>
      ) : (
        <>
          <Flex
            className="trip_title"
            vertical={false}
            justify="flex-start"
            align="center"
          >
            <h1>我的收藏</h1>
          </Flex>
          <TripList
            trips={favorTrips}
            mode={TripInfoMode.Private}
            isPublic={true}
            isDelete={false}
          />
        </>
      )}
    </Flex>
  );
};

export default Dashboard;
