import { configureStore } from "@reduxjs/toolkit";
import CenterReducer from "./viewpointExplore/CenterSlice";
import ViewpointTypeReducer from "./viewpointExplore/ViewpointTypeSlice";
import RadiusReducer from "./viewpointExplore/RadiusSlice";
import CurrentViewpointReducer from "./viewpointExplore/CurrentViewpointSlice";

export const store = configureStore({
    reducer: {
        center: CenterReducer,
        viewpointType: ViewpointTypeReducer,
        radius: RadiusReducer,
        currentViewpoint: CurrentViewpointReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
