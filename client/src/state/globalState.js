//createSlice: A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state

import { createSlice } from '@reduxjs/toolkit';

//interface ModeType {mode:'dark' | "light"}

const initialState = {
  mode: 'dark',
  // userId: '63701cc1f03239b7f700000e',
  userId: '63701cc1f032390a3400031a',
  // userId: '63701cc1f03239569400000f',
  //supposed to come from a login/auth process
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    //as a method
    setMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
