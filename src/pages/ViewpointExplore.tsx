import { GoogleMap } from "../components/GoogleMap";
import { Provider } from "react-redux";
import "./ViewpointExplore.css";
import store from "../store";
import { ViewpointSearchBox } from "../components/ViewpointSearchBox";
import { PlaceDetailWindow } from "../components/PlaceDetailWindow";
import { Collection } from "../components/Collection";
import { Layout } from "antd";
// import { TitleBar } from '../components/TitleBar';


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
    <Layout className="ViewpointExplore">
      <Provider store={store}>
        <PlaceDetailWindow />
        <ViewpointSearchBox />
        <Collection />
        <GoogleMap />
      </Provider>
    </Layout>
  );
};
