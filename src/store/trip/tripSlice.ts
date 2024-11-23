import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attraction, Day, Plan, TripEditInfo } from "../../types/tripInterface";

interface TripState {
  currentTrip: TripEditInfo | null;
  currentPlan: Plan | null;
  currentDay: Day | null;
  currentAttractions: Attraction[];
}

const initialState: TripState = {
  currentTrip: null,
  currentPlan: null,
  currentDay: null,
  currentAttractions: [],
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setCurrentTrip(state, action: PayloadAction<TripEditInfo | null>) {
      state.currentTrip = action.payload;
    },
    setCurrentPlan(state, action: PayloadAction<Plan | null>) {
      state.currentPlan = action.payload;
    },
    setCurrentDay(state, action: PayloadAction<Day | null>) {
      state.currentDay = action.payload;
    },
    setCurrentAttractions(state, action: PayloadAction<Attraction[]>) {
      state.currentAttractions = action.payload;
    },
  },
});

export const {
  setCurrentTrip,
  setCurrentPlan,
  setCurrentDay,
  setCurrentAttractions,
} = tripSlice.actions;

export default tripSlice;
