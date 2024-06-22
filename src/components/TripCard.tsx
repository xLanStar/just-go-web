import { Card, Row, Col, Flex } from "antd";
import React from "react";

import "../assets/scss/tripCard.scss";
import { DeleteOutlined, LikeOutlined } from "@ant-design/icons";
import { Color } from "../data/color";

interface Props {
  image: string;
  title: string;
  update: number;
  labels: string[];
  like: number;
  isShare: boolean;
}

const TripCard: React.FunctionComponent<Props> = ({
  image,
  title,
  update,
  labels,
  like,
  isShare,
}) => {
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
        width: "300px",
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
          src={image}
          alt="sights"
          width={260}
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
            <h1>{title}</h1>
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
              {update > 30 ? 30 : update} 天前更新
            </h3>
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col
          span={isShare ? 16 : 20}
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
            style={{
              ...tripFooter,
            }}
          >
            {labels.map((label) => (
              <h3
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
        <Col span={isShare ? 8 : 4}>
          <Flex
            vertical={false}
            justify="flex-end"
            align="center"
            style={tripFooter}
          >
            {isShare && (
              <Flex
                vertical={false}
                justify="center"
                align="center"
                gap="small"
                style={tripFooter}
              >
                <LikeOutlined
                  style={{
                    fontSize: "24px",
                  }}
                />
                <h3>{like > 999 ? "999+" : like}</h3>
              </Flex>
            )}
            <DeleteOutlined
              style={{
                fontSize: "24px",
              }}
            />
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default TripCard;
