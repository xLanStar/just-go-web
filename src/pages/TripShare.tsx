import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setMode, setPage } from "../store/page/pageSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TripShare: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { getItem } = useLocalStorage();

  useEffect(() => {
    if (!getItem("jwtToken")) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("別人的行程"));
    dispatch(setMode("share"));
  }, [navigate]);

  return <div>別人的行程</div>;
};

export default TripShare;
