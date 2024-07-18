import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ViewpointTypeState {
    value: String
}

const initialState: ViewpointTypeState = {
    value: '',
};

const ViewpointTypeSlice = createSlice({
    name: "ViewpointType",
    initialState,
    reducers: {
        setViewpointType: (state, action: PayloadAction<String>) => {
            state.value = action.payload;
        }
    },
})

export const { setViewpointType } = ViewpointTypeSlice.actions
export default ViewpointTypeSlice.reducer;