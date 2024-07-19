import { GoogleMap } from "../components/GoogleMap";
import { TitleBar } from "../components/TitleBar";
import { Layout } from "antd";
import { Provider } from "react-redux";
import "./ViewpointExplore.css";
import { store } from "../store/store";
import { ViewpointSearchBox } from "../components/ViewpointSearchBox";
import { PlaceDetailWindow } from "../components/PlaceDetailWindow";
import { Collection } from "../components/temp2";

// const { Header, Content } = Layout;

export const ViewpointExplore = () => {
  return (
    // <Layout className='ViewpointExplore'>
    //   <Header className='ViewpointExplore-header'>
    //     <TitleBar />
    //   </Header>
    //   <Content className='ViewpointExplore-content'>
    //     <Provider store={store}>
    //       <PlaceDetailWindow />
    //       <ViewpointSearchBox />
    //       <Collection />
    //       <GoogleMap />
    //     </Provider>
    //   </Content>
    // </Layout>
    <div className="ViewpointExplore-content">
      <Provider store={store}>
        <PlaceDetailWindow />
        <ViewpointSearchBox />
        <Collection />
        <GoogleMap />
      </Provider>
    </div>
  );
};
