import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageMode } from "../../types/modeInterface";

interface PageState {
  name: string;
  mode: PageMode;
}

const initialState: PageState = {
  name: "",
  mode: PageMode.Default,
}

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setMode: (state, action: PayloadAction<PageMode>) => {
      state.mode = action.payload;
    }
  }
})

export const { setPage, setMode } = pageSlice.actions;

export default pageSlice;
