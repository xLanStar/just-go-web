import { Button } from "antd";
import React from "react";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../feature/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const Home: React.FunctionComponent = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

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
