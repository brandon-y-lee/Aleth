import { createSlice } from '@reduxjs/toolkit';
import { ExampleType } from '../../types/state/exampleType';

const initialState: ExampleType = {
  value: 0,
};

export const exampleSlice = createSlice({
  name: 'exampleInfo',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: {},
});

export const { increment, decrement } = exampleSlice.actions;

export default exampleSlice.reducer;
