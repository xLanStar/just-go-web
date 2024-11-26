import { useEffect } from "react";
import { ConfigProvider, Flex, Input, Tabs } from "antd";
import { LeftOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import useDays from "../hooks/useDays";
import AttractionCard from "./AttractionCard";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Plan } from "../types/tripInterface";
import useAttractions from "../hooks/useAttractions";
import {
  setCurrentAttractions,
  setCurrentDay,
  setCurrentPlan,
} from "../store/trip/tripSlice";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useMarkList from "../hooks/useMarkList";

import type { TabsProps } from "antd";

import "../assets/scss/planDetail.scss";

interface Props {
  tripId: string;
  finalPlanId: string;
  plan: Plan;
  color: string;
  mode: "Edit" | "Read";
  closePlanDetail: () => void;
  onPlanNameChange: (name: string) => void;
}

const PlanDetail: React.FunctionComponent<Props> = ({
  tripId,
  finalPlanId,
  plan,
  color,
  mode,
  closePlanDetail,
  onPlanNameChange,
}) => {
  const dispatch = useAppDispatch();

  const { currentDay, days, changeDayStartAttraction } = useDays(
    tripId,
    plan.id
  );
  const {
    attractions,
    loadAttractions,
    deleteAttraction,
    changeAttractionOrder,
    changeAttractionTime,
    changeAttractionNote,
  } = useAttractions(tripId, plan.id);
  const { loadMarkList } = useMarkList();

  const currentTrip = useAppSelector((state) => state.trip.currentTrip);

  useEffect(() => {
    console.log("currentDay", currentDay);
    if (!currentDay) return;
    loadAttractions(currentDay.id, currentDay.startAttractionId);
  }, [currentDay]);

  useEffect(() => {
    loadMarkList();
  }, [attractions]);

  const daysTab: TabsProps["items"] =
    days.map((day, index) => ({
      key: day.id,
      label: `第 ${index + 1} 天`,
    })) || [];

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = attractions.findIndex((item) => item.id === active.id);
      const newIndex = attractions.findIndex((item) => item.id === over.id);

      const attractionId = attractions[oldIndex].id;
      const oldPreAttractionId =
        oldIndex === 0 ? null : attractions[oldIndex - 1].id;
      const newPreAttractionId =
        newIndex === 0 ? null : attractions[newIndex - 1].id;

      await changeAttractionOrder(
        currentDay?.id as string,
        attractionId,
        oldPreAttractionId,
        newPreAttractionId
      );

      const newAttractions = arrayMove(attractions, oldIndex, newIndex);
      dispatch(setCurrentAttractions(newAttractions));

      if (newIndex === 0) {
        changeDayStartAttraction(attractionId);
      }
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardBg: "white",
            horizontalItemPadding: "12px 12px",
            horizontalItemGutter: 16,
            inkBarColor: color,
            itemActiveColor: color,
            itemHoverColor: color,
            itemSelectedColor: color,
          },
        },
      }}
    >
      <Flex
        className="plan-detail"
        vertical
        justify="flex-start"
        align="center"
      >
        <Flex
          className="plan-detail-header"
          vertical={false}
          justify="center"
          align="center"
        >
          <Input
            className="plan-detail-title"
            style={{
              color: color,
            }}
            defaultValue={
              mode === "Read"
                ? currentTrip?.title
                : plan.name
                  ? plan.name
                  : "未命名方案"
            }
            disabled={mode === "Read" ? true : false}
            variant="borderless"
            size="large"
            onBlur={(e) => {
              if (mode === "Read") return;
              const newName = e.target.value;
              if (newName !== plan.name) {
                onPlanNameChange(newName);
              }
            }}
          />
          <LeftOutlined
            className="plan-detail-close-button"
            onClick={() => {
              dispatch(setCurrentDay(null));
              dispatch(setCurrentPlan(null));
              closePlanDetail();
            }}
            style={{
              color: color,
            }}
          />
          {finalPlanId === plan.id ? (
            <StarFilled
              className="plan-detail-final-plan"
              style={{
                color: color,
              }}
            />
          ) : (
            <StarOutlined
              className="plan-detail-final-plan"
              style={{
                color: color,
              }}
            />
          )}
        </Flex>
        <div className="plan-detail-content">
          <Tabs
            className="plan-detail-tabs"
            items={daysTab}
            onChange={(key: string) => {
              const day = days.find((day) => day.id === key);
              if (!day) return;
              dispatch(setCurrentDay(day));
            }}
          />
          {mode === "Edit" ? (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={attractions}
                strategy={verticalListSortingStrategy}
              >
                <Flex
                  className="plan-detail-attraction-list"
                  vertical
                  justify="flex-start"
                  align="center"
                  gap="middle"
                >
                  {attractions.map((attraction, index) => (
                    <AttractionCard
                      key={attraction.id}
                      attraction={attraction}
                      mode={mode}
                      onDelete={() => {
                        const preAttractionId =
                          index === 0 ? null : attractions[index - 1].id;
                        deleteAttraction(
                          currentDay?.id as string,
                          attraction.id,
                          preAttractionId
                        );
                        if (attraction.id === currentDay?.startAttractionId) {
                          changeDayStartAttraction(
                            attractions[index + 1]?.id as string
                          );
                        }
                      }}
                      onTimeChange={(value: any) => {
                        const startAt = value[0].format("HH:mm");
                        const endAt = value[1].format("HH:mm");

                        console.log("startAt", startAt);
                        console.log("endAt", endAt);

                        changeAttractionTime(
                          currentDay?.id as string,
                          attraction.id,
                          startAt,
                          endAt
                        );
                      }}
                      onNoteChange={(note: string) =>
                        changeAttractionNote(
                          currentDay?.id as string,
                          attraction.id,
                          note
                        )
                      }
                    />
                  ))}
                </Flex>
              </SortableContext>
            </DndContext>
          ) : (
            <Flex
              className="plan-detail-attraction-list"
              vertical
              justify="flex-start"
              align="center"
              gap="middle"
            >
              {attractions.map((attraction, index) => (
                <AttractionCard
                  key={attraction.id}
                  attraction={attraction}
                  mode={mode}
                  onDelete={() => {
                    const preAttractionId =
                      index === 0 ? null : attractions[index - 1].id;
                    deleteAttraction(
                      currentDay?.id as string,
                      attraction.id,
                      preAttractionId
                    );
                    if (attraction.id === currentDay?.startAttractionId) {
                      changeDayStartAttraction(
                        attractions[index + 1]?.id as string
                      );
                    }
                  }}
                  onTimeChange={(value: any) => {
                    const startAt = value[0].format("HH:mm");
                    const endAt = value[1].format("HH:mm");

                    console.log("startAt", startAt);
                    console.log("endAt", endAt);

                    changeAttractionTime(
                      currentDay?.id as string,
                      attraction.id,
                      startAt,
                      endAt
                    );
                  }}
                  onNoteChange={(note: string) =>
                    changeAttractionNote(
                      currentDay?.id as string,
                      attraction.id,
                      note
                    )
                  }
                />
              ))}
            </Flex>
          )}
        </div>
      </Flex>
    </ConfigProvider>
  );
};

export default PlanDetail;
