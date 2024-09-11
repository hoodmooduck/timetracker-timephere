import { createSlice } from "@reduxjs/toolkit";

interface ActiveProjectState {
    activeProjectId: number;
}

export const initialActiveTaskState: ActiveProjectState = {
    activeProjectId: -1,
};

const ActiveProjectSlice = createSlice({
    name: "activeProjectSlice",
    initialState: initialActiveTaskState,
    reducers: {
        setActiveProject(state, action) {
            state.activeProjectId = action.payload;
        },
    },
});

export const { setActiveProject } =
    ActiveProjectSlice.actions;
export default ActiveProjectSlice.reducer;
