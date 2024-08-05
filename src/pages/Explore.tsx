import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { getJwtToken } from "../apis/auth";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode } from "../types/modeInterface";

const Explore: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("景點探索"));
    dispatch(setMode(PageMode.Explore));
  }, [navigate]);

  return <div>景點探索</div>;
};

export default Explore;
