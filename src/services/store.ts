import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import branchReducer from "./branch/branchSlice";
import workerReducer from "./worker/workerSlice";
import managerReducer from "./manager/ManagerSlice";
import documentReducer from "./document/documentSlice";
import contractReducer from "./contract/contractSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    branch: branchReducer,
    worker: workerReducer,
    manager: managerReducer,
    documents: documentReducer,
    contracts: contractReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // 👈 Export AppDispatch
export default store;
