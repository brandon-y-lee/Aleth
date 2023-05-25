import { createSlice } from '@reduxjs/toolkit';
import {
  PlatformInitialStateType,
  PlatformTypeEnum,
} from '../../types/state/platformType';

const initialState: PlatformInitialStateType = {
  cards: [
    {
      id: 0,
      type: PlatformTypeEnum.PLATFORM1,
      platformHeading: 'ALETH Platform',
      platformDescription:
        'Onboard your suppliers, trace your materials, and verify compliance with ease.',
      platformButtonDetail: 'DISCOVERY CALL',
    },
  ],
};

export const platformSlice = createSlice({
  name: 'platformInfo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = platformSlice.actions;

export default platformSlice.reducer;
