import { Button, Flex, List } from "antd";
import { useState } from "react";
import { useAppSelector } from "../hooks";
import { CloseOutlined, PlusOutlined, StarOutlined } from "@ant-design/icons";
import PlanDetail from "./PlanDetail";

import "../assets/scss/planList.scss";

const colorList = [
  "#12d198",
  "#EA0000",
  "#7373B9",
  "#FF8000",
  "#272727",
  "#AD5A5A",
  "#8600FF",
  "#FFD306",
  "#8CEA00",
];

interface Props {
  closePlanList: () => void;
}

const PlanList: React.FunctionComponent<Props> = ({ closePlanList }) => {
  const tripInfo = useAppSelector((state) => state.trip.tripInfo);
  const plans = useAppSelector((state) => state.trip.plans);

  const [showPlanDetail, setShowPlanDetail] = useState<boolean>(false);
  const [planColor, setPlanColor] = useState<string>("");
  const [planId, setPlanId] = useState<string>("");

  return (
    <Flex className="plan-list" vertical justify="flex-start" align="center">
      <Flex
        className="plan-list-header"
        vertical={false}
        justify="flex-start"
        align="center"
      >
        <h1 className="plan-list-title">我的方案</h1>
        <CloseOutlined
          className="plan-list-close-button"
          onClick={closePlanList}
        />
      </Flex>
      <div className="plan-list-content">
        <List split={false}>
          {plans.map((plan, index) => (
            <List.Item key={plan.id}>
              <Flex
                className="plan-list-button-box"
                vertical={false}
                justify="center"
                align="center"
              >
                <Button
                  className="plan-list-button"
                  icon={
                    plan.id === tripInfo.finalPlanId ? <StarOutlined /> : null
                  }
                  style={{
                    color: colorList[index % 9],
                  }}
                  onClick={() => {
                    setPlanId(plan.id);
                    setPlanColor(colorList[index % 9]);
                    setShowPlanDetail(true);
                  }}
                >
                  {plan.name ? plan.name : "未命名方案"}
                </Button>
              </Flex>
            </List.Item>
          ))}
          <List.Item>
            <Flex
              className="plan-list-button-box"
              vertical={false}
              justify="center"
              align="center"
            >
              <Button className="plan-list-button" icon={<PlusOutlined />}>
                建立新方案
              </Button>
            </Flex>
          </List.Item>
        </List>
      </div>
      {showPlanDetail ? (
        <PlanDetail
          planId={planId}
          color={planColor}
          closePlanDetail={() => setShowPlanDetail(false)}
        />
      ) : null}
    </Flex>
  );
};

export default PlanList;
