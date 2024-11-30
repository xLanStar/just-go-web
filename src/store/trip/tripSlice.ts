import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attraction, Day, Plan, TripEditInfo } from "../../types/tripInterface";
import { Mark } from "../../types/googleMapInterface";

interface TripState {
  currentTrip: TripEditInfo | null;
  currentPlan: Plan | null;
  currentDays: Day[];
  currentDay: Day | null;
  currentAttractions: Attraction[];
  markList: Mark[];
}

const initialState: TripState = {
  currentTrip: null,
  currentPlan: null,
  currentDays: [],
  currentDay: null,
  currentAttractions: [],
  markList: [],
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
    setCurrentDays(state, action: PayloadAction<Day[]>) {
      state.currentDays = action.payload;
    },
    setCurrentDay(state, action: PayloadAction<Day | null>) {
      state.currentDay = action.payload;
    },
    setCurrentAttractions(state, action: PayloadAction<Attraction[]>) {
      state.currentAttractions = action.payload;
    },
    setMarkList(state, action: PayloadAction<Mark[]>) {
      state.markList = action.payload;
    },
  },
});

export const {
  setCurrentTrip,
  setCurrentPlan,
  setCurrentDays,
  setCurrentDay,
  setCurrentAttractions,
  setMarkList,
} = tripSlice.actions;

export default tripSlice;
