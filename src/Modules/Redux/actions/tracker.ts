import { createSlice } from "@reduxjs/toolkit";

interface TimeTrackerState {
  activeTaskId: number;
  time: number;
  trackedTime: number;
  isTracking: boolean;
}

export const initialActiveTaskState: TimeTrackerState = {
  activeTaskId: -1,
  time: 0,
  trackedTime: 0,
  isTracking: false,
};

const timeTrackerSlice = createSlice({
  name: "timeTracker",
  initialState: initialActiveTaskState,
  reducers: {
    setActiveTask(state, action) {
      state.activeTaskId = action.payload.id;
      state.time = action.payload.time;
    },
    startTracking(state) {
      state.isTracking = true;
    },
    stopTracking(state) {
      state.isTracking = false;
      state.trackedTime += Date.now() - state.trackedTime;
    },
    resetTracking(state) {
      state.activeTaskId = -1;
      state.trackedTime = 0;
      state.isTracking = false;
    },
  },
});

export const { setActiveTask, startTracking, stopTracking, resetTracking } =
  timeTrackerSlice.actions;
export default timeTrackerSlice.reducer;
