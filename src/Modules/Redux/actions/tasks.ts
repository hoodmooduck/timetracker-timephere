import { createSlice } from '@reduxjs/toolkit';

interface TasksState {
    tasks: tasksType[];
}

const initialState: TasksState = {
    tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: { payload: tasksType }) {
      state.tasks = [...state.tasks, action.payload];
    },
    addTasks(state, action: { payload: tasksType[] }) {
      state.tasks = action.payload;
    },
    deleteTask(state, action: { payload: number }) {
      const taskIdToDelete = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
    },
    changeTask(state, action: { payload: tasksType }) {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    },
  },
});

export const { addTasks, addTask, deleteTask, changeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
