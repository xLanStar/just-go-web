import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  name: string;
  mode: string;
}

const initialState: PageState = {
  name: "",
  mode: "default",
}

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    }
  }
})

export const { setPage, setMode } = pageSlice.actions;

export default pageSlice;
