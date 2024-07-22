import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SearchPropsState {
  value: {
    center: google.maps.places.Place | null,
    radius: Number,
    viewpointType: String,
  }
}

const initialState: SearchPropsState = {
  value: {
    center: null,
    radius: 500,
    viewpointType: '',
  }
};

const SearchPropsSlice = createSlice({
  name: "ViewpointType",
  initialState,
  reducers: {

    setCenter: (state, action: PayloadAction<google.maps.places.Place>) => {
      state.value.center = action.payload;
    },

    setRadius: (state, action: PayloadAction<Number>) => {
      state.value.radius = action.payload;
    },

    setViewpointType: (state, action: PayloadAction<String>) => {
      state.value.viewpointType = action.payload;
    }

  },
})

export const { setCenter, setRadius, setViewpointType } = SearchPropsSlice.actions
export default SearchPropsSlice;
