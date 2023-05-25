import { createSlice } from '@reduxjs/toolkit';
import {
  PassportInitialStateType,
  PassportTypeEnum,
} from '../../types/state/passportType';

const initialState: PassportInitialStateType = {
  cards: [
    {
      id: 0,
      type: PassportTypeEnum.PASSPORT1,
      passportHeading: 'Product Passports',
      passportDescription:
        'Empower your brand and customers with Aleth Product Passports. Foster unparalleled transparency and traceability, from raw materials to the end product, and build trust with verifiable sustainability claims. Welcome to a new era of conscious consumerism and sustainable future.',
      passportButtonDetail: 'SEE IT IN ACTION',
    },
  ],
};

export const passportSlice = createSlice({
  name: 'passportInfo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = passportSlice.actions;

export default passportSlice.reducer;
