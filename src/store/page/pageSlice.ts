import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  name: string;
}

const initialState: PageState = {
  name: "",
}

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  }
})

export const { setPage } = pageSlice.actions;

export default pageSlice;
