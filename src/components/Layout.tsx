import { Layout as AntdLayout, Col, Flex, Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { useState } from "react";
import TripModal from "./TripModal";
import NavButtonList from "./NavButtonList";
import AvatarMenu from "./AvatarMenu";
import ActionButtonList from "./ActionButtonList";
import ActionMenu from "./ActionMenu";

import "../assets/scss/layout.scss";

const { Header, Footer, Content } = AntdLayout;

const Layout = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const page = useAppSelector((state) => state.page.name);
  const mode = useAppSelector((state) => state.page.mode);

  const [showTripModal, setShowTripModal] = useState<boolean>(false);

  return (
    <AntdLayout className="layout">
      <Header className="layout_header">
        <Row className="layout_header_box">
          <Col sm={9} xs={15}>
            <Flex
              className="layout_header_left"
              vertical={false}
              justify="flex-start"
              align="center"
            >
              <img
                className="layout_logo"
                src="/src/assets/image/logo.png"
                alt="logo"
                onClick={() => navigate("/")}
              />
              <NavButtonList className="layout_nav_button" mode="button" />
              <h2 className="layout_header_left_title">{page}</h2>
            </Flex>
          </Col>
          <Col sm={6} xs={0}>
            <Flex
              className="layout_header_center"
              vertical={false}
              justify="center"
              align="center"
            >
              <h2 className="layout_header_center_title">{page}</h2>
            </Flex>
          </Col>
          <Col sm={9} xs={9}>
            <Flex
              className="layout_header_right"
              vertical={false}
              justify="flex-end"
              align="center"
            >
              <ActionButtonList
                className="layout_action_button"
                mode={mode}
                addTrip={() => setShowTripModal(true)}
              />
              <ActionMenu
                className="layout_action_menu"
                mode={mode}
                addTrip={() => setShowTripModal(true)}
              />
              <NavButtonList className="layout_nav_menu" mode="menu" />
              <AvatarMenu avatarUrl={user.avatar} />
            </Flex>
          </Col>
        </Row>
      </Header>
      <Content className="layout_outlet">
        <Outlet />
        {showTripModal ? (
          <TripModal
            open={showTripModal}
            handleClose={() => setShowTripModal(false)}
          />
        ) : null}
      </Content>
      {mode === "default" ? (
        <Footer className="layout_footer">Copyright©2024 JustGo</Footer>
      ) : null}
    </AntdLayout>
  );
};

export default Layout;
