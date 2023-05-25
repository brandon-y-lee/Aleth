import { createSlice } from '@reduxjs/toolkit';
import {
  ManagementInitialStateType,
  ManagementTypeEnum,
} from '../../types/state/managementType';

const initialState: ManagementInitialStateType = {
  cards: [
    {
      id: 0,
      type: ManagementTypeEnum.MANAGEMENTIMG1,
      managementHeading: 'Vendor Management Tracking',
      managementDescription:
        'Find and get connected with sustainably certified producers with the quality that you need.',
    },
    {
      id: 1,
      type: ManagementTypeEnum.MANAGEMENTIMG2,
      managementHeading: 'Comprehensive Compliance Tracking',
      managementDescription:
        'Save time on your compliance process with a full suite of tools to help track, assess, and manage vendor compliance with sustainability standards and regulations.',
    },
  ],
};

export const managementSlice = createSlice({
  name: 'managementInfo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = managementSlice.actions;

export default managementSlice.reducer;
