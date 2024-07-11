import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../apis/auth";
import { User } from "../../types/userInterface";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: getUser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
