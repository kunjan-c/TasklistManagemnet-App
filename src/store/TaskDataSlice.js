import { createSlice } from "@reduxjs/toolkit";
const initialDataState = {
  collectedTaskData: [],
};

const taskDataSlice = createSlice({
  name: "data",
  initialState: initialDataState,
  reducers: {
    createTask(state, action) {
      state.collectedTaskData.push(action.payload);
    },
    deleteTask(state, action) {
      console.log();
      for (var i = 0; i < state.collectedTaskData.length; i++) {
        if (state.collectedTaskData[i].id === action.payload) {
          state.collectedTaskData.splice(i, 1);
          break;
        }
      }
    },
  },
});

export default taskDataSlice;
