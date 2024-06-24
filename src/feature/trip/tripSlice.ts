import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Trip {
  type: string,
  id: number,
  title: string;
  image: string;
  update: number;
  labels: string[];
  like: number;
  isShare: boolean;
}

interface TripState {
  tripList: Trip[];
}

const initialState: TripState = {
  tripList: []
}

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTripList: (state, action: PayloadAction<Trip[]>) => {
      state.tripList = action.payload;
    }
  }
})

export const { setTripList } = tripSlice.actions;

export default tripSlice;
