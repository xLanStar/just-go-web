import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Plan } from "../../types/PlanInterface";

interface currentPlan {
    value: Plan | null;
}

const initialState: currentPlan = {
    value: null,
};

const currentPlanSlice = createSlice({
    name: "center",
    initialState,
    reducers: {
        setCurrentPlan: (state, action: PayloadAction<Plan>) => {
            state.value = action.payload;
        }
    },
})

export const { setCurrentPlan } = currentPlanSlice.actions
export default currentPlanSlice;