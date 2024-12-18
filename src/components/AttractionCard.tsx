import React, { useEffect, useState } from "react";
import { Card, Rate, TimePicker, Input, Flex } from "antd";
import { Attraction } from "../types/tripInterface";
import usePlaceDetail from "../hooks/usePlaceDetail";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dayjs from "dayjs";
import { convertToTraditional } from "../utils/textConverter";

import "../assets/scss/attractionCard.scss";

const { TextArea } = Input;

interface Props {
  attraction: Attraction;
  mode: "Edit" | "Read";
  onDelete: () => void;
  onTimeChange: (value: any) => void;
  onNoteChange: (value: string) => void;
}

const AttractionCard: React.FunctionComponent<Props> = ({
  attraction,
  mode,
  onDelete,
  onTimeChange,
  onNoteChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: attraction.id });
  const { placeDetail: place, getPlaceDetail } = usePlaceDetail();

  const [note, setNote] = useState<string>(attraction.note);
  const [currentNote, setCurrentNote] = useState<string>(attraction.note);
  const [isNoteVisible, setIsNoteVisible] = useState<boolean>(false);

  useEffect(() => {
    getPlaceDetail(attraction.googlePlaceId);
  }, []);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Card
      ref={setNodeRef}
      className="attraction-card"
      cover={
        <img
          className="attraction-card-photo"
          src={place.photo}
          alt={place.name}
          {...attributes}
          {...listeners}
        />
      }
      actions={
        mode === "Edit"
          ? [
              <Flex
                vertical={false}
                justify="center"
                align="center"
                gap="small"
              >
                {isNoteVisible ? (
                  <EyeInvisibleOutlined
                    onClick={() => setIsNoteVisible(false)}
                  />
                ) : (
                  <FormOutlined onClick={() => setIsNoteVisible(true)} />
                )}
              </Flex>,
              mode === "Edit" && (
                <Flex
                  vertical={false}
                  justify="center"
                  align="center"
                  gap="small"
                >
                  <DeleteOutlined onClick={onDelete} />
                </Flex>
              ),
            ]
          : [
              <Flex
                vertical={false}
                justify="center"
                align="center"
                gap="small"
              >
                {isNoteVisible ? (
                  <EyeInvisibleOutlined
                    onClick={() => setIsNoteVisible(false)}
                  />
                ) : (
                  <FormOutlined onClick={() => setIsNoteVisible(true)} />
                )}
              </Flex>,
            ]
      }
      style={style}
    >
      <Flex
        className="attraction-card-body"
        vertical
        justify="flex-start"
        align="center"
      >
        <Flex
          className="attraction-card-title"
          vertical={false}
          justify="flex-start"
          align="center"
        >
          <h2>{place.name}</h2>
        </Flex>
        <Flex
          className="attraction-card-address"
          vertical={false}
          justify="flex-start"
          align="center"
        >
          <h3>{convertToTraditional(place.address)}</h3>
        </Flex>
        <Flex
          className="attraction-card-rating"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
        >
          <h3>{place.rating}</h3>
          <Rate disabled allowHalf value={place.rating} />
        </Flex>
        <Flex
          className="attraction-card-time"
          vertical={false}
          justify="flex-start"
          align="center"
          gap="small"
        >
          <h3>時間：</h3>
          <TimePicker.RangePicker
            className="attraction-card-time-picker"
            format={"HH:mm"}
            defaultValue={[
              dayjs(attraction.startAt, "HH:mm"),
              dayjs(attraction.endAt, "HH:mm"),
            ]}
            disabled={mode === "Read" ? true : false}
            onChange={onTimeChange}
            allowClear={false}
          />
        </Flex>
        {isNoteVisible && (
          <Flex
            className="attraction-card-note"
            vertical={false}
            justify="flex-start"
            align="flex-start"
            gap="small"
          >
            <h3>備註：</h3>
            <TextArea
              className="attraction-card-note-textarea"
              rows={2}
              maxLength={50}
              value={note}
              placeholder={"請輸入備註..."}
              style={{ resize: "none" }}
              disabled={mode === "Read" ? true : false}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              onBlur={() => {
                if (note !== currentNote) {
                  setCurrentNote(note);
                  onNoteChange(note);
                }
              }}
            />
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default AttractionCard;
