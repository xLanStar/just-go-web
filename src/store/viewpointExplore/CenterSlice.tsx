import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface centerState {
    value: google.maps.places.Place | null;
}

const initialState: centerState = {
    value: null
};

const centerSlice = createSlice({
    name: "center",
    initialState,
    reducers: {
        setCenter: (state, action: PayloadAction<google.maps.places.Place>) => {
            state.value = action.payload;
        }
    },
})

export const { setCenter } = centerSlice.actions
export default centerSlice.reducer;