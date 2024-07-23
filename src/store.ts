import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./store/user/userSlice";
import pageSlice from "./store/page/pageSlice";
import CurrentViewpointSlice from "./store/viewpointExplore/CurrentViewpointSlice";
import SearchPropsSlice from "./store/viewpointExplore/searchPropsSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  page: pageSlice.reducer,
  currentViewpoint: CurrentViewpointSlice.reducer,
  searchProps:SearchPropsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
