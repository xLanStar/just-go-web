import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Flex, Avatar } from "antd";
import { DeleteOutlined, LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import React from "react";
import { TripInfo } from "../types/tripInterface";
import { TripInfoMode } from "../types/modeInterface";

import "../assets/scss/tripCard.scss";

interface Props {
  trip: TripInfo;
  mode: TripInfoMode;
  isPublic: boolean;
  isDelete: boolean;
  toggleFavor: (id: string) => void;
  removeTrip: (id: string) => void;
}

const TripCard: React.FunctionComponent<Props> = ({
  trip,
  mode,
  isPublic,
  isDelete,
  toggleFavor,
  removeTrip,
}) => {
  const navigate = useNavigate();

  const clickLike = () => {
    toggleFavor(trip.id);
  };

  const clickDelete = () => {
    removeTrip(trip.id);
  };

  return (
    <Card
      className="trip_card"
      style={
        mode === TripInfoMode.Private
          ? {
              height: "300px",
            }
          : {
              height: "340px",
            }
      }
    >
      <Flex
        className="trip_card_image_box"
        vertical
        justify="center"
        align="center"
        onClick={() => {
          navigate("/edit");
        }}
      >
        <img className="trip_card_image" src={trip.image} alt="image" />
      </Flex>
      <Row>
        <Col span={16}>
          <Flex
            className="trip_card_title_box"
            vertical={false}
            justify="flex-start"
            align="center"
          >
            <h1>{trip.title}</h1>
          </Flex>
        </Col>
        <Col span={8}>
          <Flex
            className="trip_card_day_box"
            vertical={false}
            justify="flex-end"
            align="center"
          >
            <h3 className="trip_card_day">
              {trip.day > 30 ? 30 : trip.day} 天的行程
            </h3>
          </Flex>
        </Col>
      </Row>
      {mode === TripInfoMode.Public ? (
        <Row>
          <Col
            span={14}
            className="trip_card_user_box"
            onClick={() => {
              navigate(`/user/${trip.userId}`);
            }}
          >
            <Flex
              className="trip_card_avatar"
              vertical={false}
              justify="flex-start"
              align="center"
              gap="small"
            >
              <Avatar
                src={<img src="src/assets/image/avatar.jpg" alt="avatar" />}
                size={36}
              />
              <h2>{trip.user}</h2>
            </Flex>
          </Col>
          <Col className="trip_card_label_box" span={10}>
            <Flex
              className="trip_card_label"
              vertical={false}
              justify="flex-start"
              align="center"
              gap="small"
            >
              {trip.labels.map((label, index) => (
                <h3 className="trip_card_label_name" key={index}>
                  {label}
                </h3>
              ))}
            </Flex>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col className="trip_card_day_or_label_box" span={isPublic ? 16 : 20}>
          <Flex
            className="trip_card_day_or_label"
            vertical={false}
            justify="flex-start"
            align="center"
            gap="small"
          >
            {mode === TripInfoMode.Private ? (
              <>
                {trip.labels.map((label, index) => (
                  <h3 className="trip_card_label_name" key={index}>
                    {label}
                  </h3>
                ))}
              </>
            ) : (
              <h3>{trip.publishDay} 發佈</h3>
            )}
          </Flex>
        </Col>
        <Col span={isPublic ? 8 : 4}>
          <Flex
            className="trip_card_action_box"
            vertical={false}
            justify="flex-end"
            align="center"
            gap="small"
          >
            {isPublic && (
              <Flex
                className="trip_card_action"
                vertical={false}
                justify="flex-end"
                align="center"
                gap="small"
              >
                {trip.isLike ? (
                  <LikeTwoTone
                    className="trip_card_action_icon"
                    onClick={clickLike}
                  />
                ) : (
                  <LikeOutlined
                    className="trip_card_action_icon"
                    onClick={clickLike}
                  />
                )}

                <h3>{trip.like > 999 ? "999+" : trip.like}</h3>
              </Flex>
            )}
            {isDelete && (
              <DeleteOutlined
                className="trip_card_action_icon"
                onClick={clickDelete}
              />
            )}
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default TripCard;
