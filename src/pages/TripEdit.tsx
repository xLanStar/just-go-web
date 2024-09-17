import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { useEffect } from "react";
import { setMode, setPage } from "../store/page/pageSlice";
import { PageMode } from "../types/modeInterface";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TripEdit: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localStorage = useLocalStorage();

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("行程安排"));
    dispatch(setMode(PageMode.Edit));
  }, [navigate]);

  return <div>行程安排</div>;
};

export default TripEdit;
