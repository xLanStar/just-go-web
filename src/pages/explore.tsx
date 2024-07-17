import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { getJwtToken } from "../apis/auth";
import { setPage } from "../store/page/pageSlice";

const Explore: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("景點探索"));
  }, [navigate]);

  return <div>景點探索</div>;
};

export default Explore;
