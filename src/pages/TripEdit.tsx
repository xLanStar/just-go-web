import { useNavigate } from "react-router-dom";
import { Flex, FloatButton } from "antd";
import { useAppDispatch } from "../hooks";
import { useEffect, useState } from "react";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode } from "../types/modeInterface";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BookOutlined, RobotOutlined } from "@ant-design/icons";
import ChatBox from "../components/ChatBox";

import "../assets/scss/tripEdit.scss";

const TripEdit: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localStorage = useLocalStorage();
  const [showChatBox, setShowChatBox] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("行程安排"));
    dispatch(setMode(PageMode.Edit));
  }, [navigate]);

  return (
    <Flex className="trip_edit" vertical justify="flex-start" align="center">
      <FloatButton
        className="trip_edit_chatbox_button"
        type="primary"
        icon={<RobotOutlined />}
        onClick={() => setShowChatBox(true)}
      />
      <FloatButton
        className="trip_edit_collection_button"
        type="primary"
        icon={<BookOutlined />}
      />
      {showChatBox ? <ChatBox /> : null}
    </Flex>
  );
};

export default TripEdit;
