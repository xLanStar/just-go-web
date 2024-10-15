import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/userInterface";

const user: string | null = localStorage.getItem("user");

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: user
    ? JSON.parse(user)
    : {
        id: "",
        name: "",
        email: "",
        avatar: "",
      },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { saveUser } = userSlice.actions;

export default userSlice;
