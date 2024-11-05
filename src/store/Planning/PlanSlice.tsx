import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { attraction, Plan } from "../../types/PlanInterface";

interface currentPlan {
    value: {
        plan: Plan | null;
        colorStyle: string;
        currentAttractions: attraction[]
    }
}

const initialState: currentPlan = {
    value: {
        plan:null,
        colorStyle: "#000000",
        currentAttractions: []
    }
};

const currentPlanSlice = createSlice({
    name: "center",
    initialState,
    reducers: {
        setCurrentPlan: (state, action: PayloadAction<Plan>) => {
            state.value.plan = action.payload;
        },
        setColorStyle: (state, action: PayloadAction<string>) => {
            state.value.colorStyle = action.payload;
        },
        addCurrentAttraction:(state, action: PayloadAction<attraction>) => {
            state.value.currentAttractions.push(action.payload);
        }
    },
})

export const { setCurrentPlan, setColorStyle, addCurrentAttraction } = currentPlanSlice.actions
export default currentPlanSlice;