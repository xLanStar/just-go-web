import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Flex, Avatar } from "antd";
import { DeleteOutlined, LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import React from "react";
import { Color } from "../data/color";
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
              width: "280px",
              height: "300px",
              borderRadius: "12px",
            }
          : {
              width: "280px",
              height: "340px",
              borderRadius: "12px",
            }
      }
    >
      <Flex
        vertical
        justify="center"
        align="center"
        onClick={() => {
          navigate("/edit");
        }}
        style={{
          width: "100%",
          cursor: "pointer",
        }}
      >
        <img
          src={trip.image}
          alt="image"
          width={240}
          height={180}
          style={{
            borderRadius: "8px",
          }}
        />
      </Flex>
      <Row>
        <Col span={16}>
          <Flex
            vertical={false}
            justify="flex-start"
            align="center"
            style={{ padding: "4px 0px", width: "100%", height: "52px" }}
          >
            <h1>{trip.title}</h1>
          </Flex>
        </Col>
        <Col span={8}>
          <Flex
            vertical={false}
            justify="flex-end"
            align="center"
            style={{ padding: "4px 0px", width: "100%", height: "52px" }}
          >
            <h3
              style={{
                color: Color.greyHeavy,
              }}
            >
              {trip.day > 30 ? 30 : trip.day} 天的行程
            </h3>
          </Flex>
        </Col>
      </Row>
      {mode === TripInfoMode.Public ? (
        <Row>
          <Col
            span={14}
            className="user_info"
            onClick={() => {
              navigate(`/user/${trip.userId}`);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <Flex
              vertical={false}
              justify="flex-start"
              align="center"
              gap="small"
              style={{
                padding: "4px 0px",
                width: "100%",
                height: "41px",
              }}
            >
              <Avatar
                src={<img src="src/assets/avatar.jpg" alt="avatar" />}
                size={36}
              />
              <h2>{trip.user}</h2>
            </Flex>
          </Col>
          <Col
            span={10}
            style={{
              paddingRight: "4px",
            }}
          >
            <Flex
              className="labels"
              vertical={false}
              justify="flex-start"
              align="center"
              gap="small"
              style={{
                padding: "4px 0px",
                width: "100%",
                height: "41px",
              }}
            >
              {trip.labels.map((label, index) => (
                <h3
                  key={index}
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    color: "white",
                    padding: "4px 8px",
                    backgroundColor: Color.cyan,
                    borderRadius: "20px",
                  }}
                >
                  {label}
                </h3>
              ))}
            </Flex>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col
          span={isPublic ? 16 : 20}
          style={{
            paddingRight: "12px",
          }}
        >
          <Flex
            className="labels"
            vertical={false}
            justify="flex-start"
            align="center"
            gap="small"
            style={{ width: "100%", height: "41px" }}
          >
            {mode === TripInfoMode.Private ? (
              <>
                {trip.labels.map((label, index) => (
                  <h3
                    key={index}
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      color: "white",
                      padding: "4px 8px",
                      backgroundColor: Color.cyan,
                      borderRadius: "20px",
                    }}
                  >
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
            vertical={false}
            justify="flex-end"
            align="center"
            gap="small"
            style={{ width: "100%", height: "41px" }}
          >
            {isPublic && (
              <Flex
                vertical={false}
                justify="flex-end"
                align="center"
                gap="small"
                style={{ width: "100%", height: "100%" }}
              >
                {trip.isLike ? (
                  <LikeTwoTone
                    onClick={clickLike}
                    style={{ fontSize: "24px" }}
                  />
                ) : (
                  <LikeOutlined
                    onClick={clickLike}
                    style={{ fontSize: "24px" }}
                  />
                )}

                <h3>{trip.like > 999 ? "999+" : trip.like}</h3>
              </Flex>
            )}
            {isDelete && (
              <DeleteOutlined
                onClick={clickDelete}
                style={{
                  fontSize: "24px",
                }}
              />
            )}
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default TripCard;
