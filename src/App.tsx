import { ConfigProvider } from "antd";
import { App as AntdApp } from "antd";
import zhTW from "antd/locale/zh_TW";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Signin from "./pages/auth/Signin";

const App: React.FunctionComponent = () => (
  <ConfigProvider locale={zhTW}>
    <AntdApp>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AntdApp>
  </ConfigProvider>
);

export default App;
