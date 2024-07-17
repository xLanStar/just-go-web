import { Button } from "antd";
import React, { useEffect } from "react";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../store/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { getJwtToken } from "../apis/auth";
import { setPage } from "../store/page/pageSlice";

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  useEffect(() => {
    if (!getJwtToken()) {
      navigate("/signin", { replace: true });
    }
    dispatch(setPage("首頁"));
  }, [navigate]);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      {/* ++debug */}
      {count}
      <Button onClick={() => dispatch(increment())}>increment</Button>
      <Button onClick={() => dispatch(incrementByAmount(5))}>add</Button>
      <Button onClick={() => dispatch(decrement())}>decrement</Button>
      {/* --debug */}
    </div>
  );
};

export default Home;
