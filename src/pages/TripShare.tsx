import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import { getJwtToken } from "../apis/auth";

const TripShare: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("別人的行程"));
    dispatch(setMode("share"));
  }, [navigate]);

  return <div>別人的行程</div>;
};

export default TripShare;
