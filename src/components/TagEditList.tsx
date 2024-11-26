import React, { useState } from "react";
import { Tag, Input, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagEditList: React.FunctionComponent<Props> = ({ tags, setTags }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState<number | null>(null);
  const [editInputValue, setEditInputValue] = useState("");

  // 新增 Tag
  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  // 刪除 Tag
  const handleCloseTag = (removedTag: string) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  // 確認編輯
  const handleEditConfirm = () => {
    if (editInputIndex !== null) {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      setTags(newTags);
      setEditInputIndex(null);
      setEditInputValue("");
    }
  };

  return (
    <div>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              onBlur={handleEditConfirm}
              onPressEnter={handleEditConfirm}
              autoFocus
              style={{ width: "78px" }}
            />
          );
        }

        const isLongTag = tag.length > 20;
        const tagElement = (
          <Tag
            key={tag}
            closable
            onClose={() => handleCloseTag(tag)}
            color="blue"
            style={{ userSelect: "none" }}
          >
            <span
              onDoubleClick={() => {
                setEditInputIndex(index);
                setEditInputValue(tag);
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );

        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElement}
          </Tooltip>
        ) : (
          tagElement
        );
      })}
      {inputVisible ? (
        <Input
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleAddTag}
          onPressEnter={handleAddTag}
          autoFocus
          style={{ width: "78px" }}
        />
      ) : (
        <Tag
          onClick={() => setInputVisible(true)}
          color="blue"
          style={{ background: "#fff", borderStyle: "dashed" }}
        >
          <PlusOutlined /> 新標籤
        </Tag>
      )}
    </div>
  );
};

export default TagEditList;
