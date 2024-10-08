import { Layout } from "antd";
import { Provider } from "react-redux";
import { SearchResult } from "../components/SearchResult";
import store from "../store";
import "./Result.css";
import { useAppDispatch } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";

const Result: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  dispatch(setPage("行程探索"));
  dispatch(setMode("default"));
  return (
    <Layout className="Result">
      <Provider store={store}>
        <SearchResult />
      </Provider>
    </Layout>

  );
};

export default Result;