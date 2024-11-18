import { useNavigate } from "react-router-dom";
import { Card, Avatar, Row, Col, Tooltip, Tag, Flex } from "antd";
import { DeleteOutlined, LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import React from "react";
import { TripInfo } from "../types/tripInterface";
import { TripInfoMode } from "../types/modeInterface";
import { useAppSelector } from "../hooks";

import "../assets/scss/tripCard.scss";

interface Props {
  trip: TripInfo;
  mode: TripInfoMode;
  isPublic: boolean;
  isDelete: boolean;
  toggleFavor: (id: string) => void;
  deleteTrip: (id: string) => void;
}

const TripCard: React.FunctionComponent<Props> = ({
  trip,
  mode,
  isPublic,
  isDelete,
  toggleFavor,
  deleteTrip,
}) => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  const labels = ["美食", "景點", "住宿", "交通", "活動"];

  console.log("trip", trip);

  return (
    <Card
      className="trip-card"
      style={{ height: mode === TripInfoMode.Private ? "350px" : "380px" }}
      cover={
        <div
          className="trip-card-image-container"
          onClick={() => navigate(`/trip/${trip.id}`)}
        >
          <img className="trip-card-image" src={trip.image} alt="trip" />
        </div>
      }
      actions={[
        isPublic && (
          <Tooltip title="點讚">
            <Flex
              vertical={false}
              justify="center"
              align="center"
              gap="small"
              onClick={() => toggleFavor(trip.id)}
            >
              {trip.isLike ? <LikeTwoTone /> : <LikeOutlined />}
              <span>{trip.like > 999 ? "999+" : trip.like}</span>
            </Flex>
          </Tooltip>
        ),
        isDelete && (
          <Tooltip title="刪除">
            <DeleteOutlined
              onClick={() => deleteTrip(trip.id)}
              className="trip-card-action"
            />
          </Tooltip>
        ),
      ]}
    >
      <Flex
        className="trip-card-body"
        vertical
        justify="flex-start"
        align="center"
        gap={4}
      >
        <Row
          className="trip-card-title-box"
          justify="space-between"
          align="middle"
        >
          <Col span={16}>
            <h2 className="trip-card-title">{trip.title}</h2>
          </Col>
          <Col span={8}>
            <div className="trip-card-days">
              {trip.day > 30 ? "30+" : trip.day} 天的行程
            </div>
          </Col>
        </Row>
        <Flex
          className="trip-card-user"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
          onClick={() => navigate(`/user/${trip.userId}`)}
        >
          <Avatar src={user.avatar} size={36} />
          <span className="trip-card-username">{user.name}</span>
        </Flex>
        <Flex
          className="trip-card-labels"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
        >
          {labels.map((label, index) => (
            <Tag key={index} color="blue" className="trip-card-label">
              {label}
            </Tag>
          ))}
        </Flex>
        {mode === TripInfoMode.Public && (
          <Flex
            className="trip-card-publish-day"
            vertical={false}
            justify="flex-start"
            align="center"
          >
            {trip.publishDay} 發佈
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default TripCard;
