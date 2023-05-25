import { createSlice } from '@reduxjs/toolkit';
import {
  SolutionInitialStateType,
  SolutionTypeEnum,
} from '../../types/state/solutionType';

const initialState: SolutionInitialStateType = {
  cards: [
    {
      id: 0,
      type: SolutionTypeEnum.SOLUTION1,
      solutionNumber: '1',
      solutionTitle: 'Supply Chain Tracking',
      solutionDescription:
        'Access instant visibility and oversight of your entire supply chain ecosystem. Track the movement of your goods and materials from suppliers to customers. Gain advanced insights into operations to mitigate disruptions and intelligently forecast.',
    },
    {
      id: 1,
      type: SolutionTypeEnum.SOLUTION2,
      solutionNumber: '2',
      solutionTitle: 'Vendor Management',
      solutionDescription:
        'Manage relationships with your suppliers, including tracking performance metrics such as on-time delivery, quality, and cost. Access tools to collaborate and communicate across your supply chain. ',
    },
    {
      id: 2,
      type: SolutionTypeEnum.SOLUTION3,
      solutionNumber: '3',
      solutionTitle: 'Products Passports',
      solutionDescription:
        'Guarantee an auditable record of every step in your product’s journey, from sourcing to sale. Create unique digital fingerprints for each item to simplify compliance and strengthen claims along the supply chain. ',
    },
  ],
};

export const solutionSlice = createSlice({
  name: 'solutionInfo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = solutionSlice.actions;

export default solutionSlice.reducer;
