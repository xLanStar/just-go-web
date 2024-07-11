import { Card, Row, Col, Flex } from "antd";
import { DeleteOutlined, LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import React from "react";
import { Color } from "../data/color";
import { TripInfo } from "../types/tripInterface";
import "../assets/scss/tripCard.scss";

interface Props {
  trip: TripInfo;
  toggleFavor: (id: number) => void;
  removeTrip: (id: number) => void;
}

const TripCard: React.FunctionComponent<Props> = ({
  trip,
  toggleFavor,
  removeTrip,
}) => {
  const clickLike = () => {
    toggleFavor(trip.id);
  };

  const clickDelete = () => {
    removeTrip(trip.id);
  };

  const tripTitle = {
    padding: "4px 0px",
    width: "100%",
    height: "52px",
  };

  const tripFooter = {
    width: "100%",
    height: "41px",
  };

  return (
    <Card
      style={{
        width: "280px",
        height: "300px",
        borderRadius: "12px",
      }}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          width: "100%",
        }}
      >
        <img
          src={trip.image}
          alt="sights"
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
            style={tripTitle}
          >
            <h1>{trip.title}</h1>
          </Flex>
        </Col>
        <Col span={8}>
          <Flex
            vertical={false}
            justify="flex-end"
            align="center"
            style={tripTitle}
          >
            <h3
              style={{
                color: Color.greyHeavy,
              }}
            >
              {trip.update > 30 ? 30 : trip.update} 天前更新
            </h3>
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col
          span={trip.isShare ? 16 : 20}
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
            style={tripFooter}
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
        <Col span={trip.isShare ? 8 : 4}>
          <Flex
            vertical={false}
            justify="flex-end"
            align="center"
            gap="small"
            style={tripFooter}
          >
            {trip.isShare && (
              <Flex
                vertical={false}
                justify="flex-end"
                align="center"
                gap="small"
                style={tripFooter}
              >
                {trip.likeByMe ? (
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
            {trip.deletable && (
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
