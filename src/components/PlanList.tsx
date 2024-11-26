import { Button, Flex, List } from "antd";
import { useState } from "react";
import { CloseOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import usePlans from "../hooks/usePlans";
import PlanDetail from "./PlanDetail";
import { Plan, TripEditInfo } from "../types/tripInterface";
import { useAppDispatch, useAppSelector } from "../hooks";

import "../assets/scss/planList.scss";
import { setCurrentPlan } from "../store/trip/tripSlice";

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
  tripInfo: TripEditInfo;
  closePlanList: () => void;
}

const PlanList: React.FunctionComponent<Props> = ({
  tripInfo,
  closePlanList,
}) => {
  const dispatch = useAppDispatch();

  const { plans, changePlanName } = usePlans(tripInfo.id);

  const currentPlan = useAppSelector((state) => state.trip.currentPlan);

  const [showPlanDetail, setShowPlanDetail] = useState<boolean>(false);
  const [planColor, setPlanColor] = useState<string>("");

  console.log(plans);

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
          onClick={() => closePlanList()}
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
                    plan.id === tripInfo.finalPlanId ? <StarFilled /> : null
                  }
                  style={{
                    color: colorList[index % 9],
                  }}
                  onClick={() => {
                    dispatch(setCurrentPlan(plan));
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
          tripId={tripInfo.id}
          finalPlanId={tripInfo.finalPlanId}
          plan={currentPlan as Plan}
          color={planColor}
          mode="Edit"
          closePlanDetail={() => setShowPlanDetail(false)}
          onPlanNameChange={(name: string) =>
            changePlanName(currentPlan?.id as string, name)
          }
        />
      ) : null}
    </Flex>
  );
};

export default PlanList;
