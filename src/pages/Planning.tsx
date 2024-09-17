import { Button, Layout } from "antd";
import { Provider } from "react-redux";
import store from "../store";
import "./Planning.css";
import { useAppDispatch } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode } from "../types/modeInterface";
import { PlanList } from "../components/PlanList";
import { PlanDetail } from "../components/PlanDetail";
import Sider from "antd/es/layout/Sider";
import { BarChartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

const Planning: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  dispatch(setPage(""));
  dispatch(setMode(PageMode.Planning));
  return (
    <Layout className="planning">
      <Provider store={store}>
        <Sider>
          <PlanList />
          <PlanDetail />
        </Sider>
        <Content>
          <Button icon={<BarChartOutlined />} className="planning-planCompare">方案比較</Button>
        </Content>
      </Provider>
    </Layout>
  );
};

export default Planning;