import { Card, Row, Col, Flex } from "antd";
import { DeleteOutlined, LikeOutlined } from "@ant-design/icons";
import React from "react";
import { Color } from "../data/color";
import "../assets/scss/tripCard.scss";

interface Props {
  title: string;
  image: string;
  update: number;
  labels: string[];
  like: number;
  isShare: boolean;
}

const TripCard: React.FunctionComponent<Props> = ({
  title,
  image,
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

  const clickLike = () => {
    console.log("click like");
  };

  const clickDelete = () => {
    console.log("click delete");
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
          src={image}
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
            {labels.map((label, index) => (
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
                  onClick={clickLike}
                  style={{
                    fontSize: "24px",
                  }}
                />
                <h3>{like > 999 ? "999+" : like}</h3>
              </Flex>
            )}
            <DeleteOutlined
              onClick={clickDelete}
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
