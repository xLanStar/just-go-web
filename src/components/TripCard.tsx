import { useNavigate } from "react-router-dom";
import { Card, Avatar, Row, Col, Tag, Flex } from "antd";
import {
  DeleteOutlined,
  LikeOutlined,
  LikeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { TripInfo } from "../types/tripInterface";
import { TripInfoMode } from "../types/modeInterface";

import "../assets/scss/tripCard.scss";
import defaultTripImage from "/defaultTripImage.jpg";

interface Props {
  trip: TripInfo;
  mode: TripInfoMode;
  isDelete: boolean;
  toggleFavor: (id: string) => void;
  deleteTrip: (id: string) => void;
}

const TripCard: React.FunctionComponent<Props> = ({
  trip,
  mode,
  isDelete,
  toggleFavor,
  deleteTrip,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      className="trip-card"
      style={{ height: mode === TripInfoMode.Private ? "350px" : "380px" }}
      cover={
        <div
          className="trip-card-image-container"
          onClick={() =>
            mode === TripInfoMode.Public
              ? navigate(`/trip/${trip.id}/share`)
              : navigate(`/trip/${trip.id}`)
          }
        >
          <img
            className="trip-card-image"
            src={
              trip.image
                ? "https://voidcloud.net" + trip.image
                : defaultTripImage
            }
            alt="trip"
          />
        </div>
      }
      actions={
        isDelete
          ? [
              <Flex
                vertical={false}
                justify="center"
                align="center"
                gap="small"
                onClick={() => toggleFavor(trip.id)}
              >
                {trip.isLike ? <LikeTwoTone /> : <LikeOutlined />}
                <span>{trip.like > 999 ? "999+" : trip.like}</span>
              </Flex>,
              <DeleteOutlined
                onClick={() => deleteTrip(trip.id)}
                className="trip-card-action"
              />,
            ]
          : [
              <Flex
                vertical={false}
                justify="center"
                align="center"
                gap="small"
                onClick={() => toggleFavor(trip.id)}
              >
                {trip.isLike ? <LikeTwoTone /> : <LikeOutlined />}
                <span>{trip.like > 999 ? "999+" : trip.like}</span>
              </Flex>,
            ]
      }
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
        >
          {trip.avatar ? (
            <Avatar src={"https://voidcloud.net" + trip.avatar} size={36} />
          ) : (
            <Avatar icon={<UserOutlined />} size={36} />
          )}
          <span className="trip-card-username">{trip.username}</span>
        </Flex>
        <Flex
          className="trip-card-labels"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
        >
          {trip.labels.length > 0 ? (
            <>
              {trip.labels.map((label, index) => (
                <Tag key={index} color="blue" className="trip-card-label">
                  {label}
                </Tag>
              ))}
            </>
          ) : (
            <h3 className="trip-card-no-label">無標籤</h3>
          )}
        </Flex>
        {mode === TripInfoMode.Public && (
          <Flex
            className="trip-card-publish-day"
            vertical={false}
            justify="flex-start"
            align="center"
            gap="small"
          >
            <h3>
              {new Date(trip.publishDay).toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </h3>
            <h3>發布</h3>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default TripCard;
