import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import branchReducer from "./branch/branchSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    branch: branchReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // 👈 Export AppDispatch
export default store;
