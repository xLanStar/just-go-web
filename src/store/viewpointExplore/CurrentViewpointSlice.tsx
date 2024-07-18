import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface currentViewpointState {
    value: google.maps.places.Place | null;
}

const initialState: currentViewpointState = {
    value: null,
};

const currentViewpointSlice = createSlice({
    name: "center",
    initialState,
    reducers: {
        setCurrentViewpoint: (state, action: PayloadAction<google.maps.places.Place>) => {
            state.value = action.payload;
        }
    },
})

export const { setCurrentViewpoint } = currentViewpointSlice.actions
export default currentViewpointSlice.reducer;