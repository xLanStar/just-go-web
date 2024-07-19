import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode } from "../../types/modeInterface";

interface PageState {
  name: string;
  mode: Mode;
}

const initialState: PageState = {
  name: "",
  mode: Mode.Default,
}

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    }
  }
})

export const { setPage, setMode } = pageSlice.actions;

export default pageSlice;
