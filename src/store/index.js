import { configureStore } from "@reduxjs/toolkit";
import taskDataSlice from "./TaskDataSlice";
import authSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    data: taskDataSlice.reducer,
    auth: authSlice.reducer,
  },
});
export const taskDataActions = taskDataSlice.actions;
export const authActtions = authSlice.actions;

export default store;
