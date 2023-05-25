import { createSlice } from '@reduxjs/toolkit';
import { MainInitialStateType, MainTypeEnum } from '../../types/state/mainType';

const initialState: MainInitialStateType = {
  cards: [
    {
      id: 0,
      type: MainTypeEnum.MAINIMG1,
      mainHeading: 'Unique Digital Identities',
      mainDescription:
        'Create a story for each of your products, from sourcing to sale',
    },
    {
      id: 1,
      type: MainTypeEnum.MAINIMG2,
      mainHeading: 'Consumer Confidence',
      mainDescription:
        'Enable consumers to interact with the story of your product. From raw materials to end product, the transparency you provide fosters trust and loyalty.',
    },
  ],
};

export const mainSlice = createSlice({
  name: 'mainInfo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = mainSlice.actions;

export default mainSlice.reducer;
