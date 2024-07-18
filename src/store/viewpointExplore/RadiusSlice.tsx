import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface RadiusState {
    value: Number;
}

const initialState: RadiusState = {
    value: 500,
};

const RadiusSlice = createSlice({
    name: "radius",
    initialState,
    reducers: {
        setRadius: (state, action: PayloadAction<Number>) => {
            state.value = action.payload;
        }
    },
})

export const { setRadius } = RadiusSlice.actions
export default RadiusSlice.reducer;