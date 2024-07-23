import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { useEffect } from "react";
import { getJwtToken } from "../apis/auth";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode } from "../types/modeInterface";

const TripEdit: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("行程安排"));
    dispatch(setMode(PageMode.Edit));
  }, [navigate]);

  return <div>行程安排</div>;
};

export default TripEdit;
