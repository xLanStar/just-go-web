import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripEditInfo, Plan } from "../../types/tripInterface";

interface TripState {
  tripInfo: TripEditInfo;
  plans: Plan[];
}

const initialState: TripState = {
  tripInfo: {
    id: "",
    userId: "",
    title: "",
    image: "",
    personalEditPermission: 0,
    finalPlanId: "",
    departureDate: "",
    endDate: "",
    labels: [],
    like: 0,
    linkPermission: false,
    isPublic: false,
    publishDay: "",
  },
  plans: [],
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTripInfo: (state, action: PayloadAction<TripEditInfo>) => {
      state.tripInfo = action.payload;
    },
    setPlans: (state, action: PayloadAction<Plan[]>) => {
      state.plans = action.payload;
    },
  },
});

export const { setTripInfo, setPlans } = tripSlice.actions;

export default tripSlice;
