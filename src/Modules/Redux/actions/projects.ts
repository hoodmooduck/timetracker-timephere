import { createSlice } from "@reduxjs/toolkit";

interface ProjectsState {
  projects: projectsTypes[];
}

const initialState: ProjectsState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action: { payload: projectsTypes }) {
      state.projects = [...state.projects, action.payload];
    },
    addProjects(state, action: { payload: projectsTypes[] }) {
      state.projects = action.payload;
    },
    deleteProject(state, action: { payload: number }) {
      const projectIdToDelete = action.payload;
      state.projects = state.projects.filter(
        (project) => project.id !== projectIdToDelete
      );
    },
  },
});

export const { addProject, addProjects, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;
