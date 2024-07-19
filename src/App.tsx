import { ConfigProvider } from "antd";
import { App as AntdApp } from "antd";
import zhTW from "antd/locale/zh_TW";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Signin from "./pages/auth/Signin";
import { ViewpointExplore } from "./pages/ViewpointExplore";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Explore from "./pages/temp";
import TripEdit from "./pages/TripEdit";
import TripShare from "./pages/TripShare";

const App: React.FunctionComponent = () => (
  <ConfigProvider
    locale={zhTW}
    theme={{
      components: {
        Layout: {
          headerBg: "#ffffff",
        },
      },
    }}
  >
    <AntdApp>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="edit" element={<TripEdit />} />
          <Route path="share" element={<TripShare />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="ViewpointExplore" element={<ViewpointExplore />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AntdApp>
  </ConfigProvider>
);

export default App;
