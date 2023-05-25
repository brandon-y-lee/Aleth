import { createSlice } from '@reduxjs/toolkit';
import {
  PassportAdvantageInitialStateType,
  PassportAdvantageTypeEnum,
} from '../../types/state/passportAdvantageType';

const initialState: PassportAdvantageInitialStateType = {
  cards: [
    {
      id: 0,
      type: PassportAdvantageTypeEnum.PASSPORTADV1,
      passportAdvHeading: 'Traceability at Your Fingertips',
      passportAdvDescription:
        'Track the entire life cycle of your product from sourcing to sales, providing full transparency and traceability.',
    },
    {
      id: 1,
      type: PassportAdvantageTypeEnum.PASSPORTADV2,
      passportAdvHeading: 'Verify Your Sustainability Claims',
      passportAdvDescription:
        'With Aleth Product Passports, your sustainability claims are backed by auditable and verifiable data, enhancing your brand credibility.',
    },
    {
      id: 2,
      type: PassportAdvantageTypeEnum.PASSPORTADV3,
      passportAdvHeading: 'Trust and Loyalty',
      passportAdvDescription:
        'By offering transparency, you empower consumers to make informed decisions, fostering trust and loyalty towards your brand.',
    },
    {
      id: 3,
      type: PassportAdvantageTypeEnum.PASSPORTADV4,
      passportAdvHeading: 'Simplify Your Compliance',
      passportAdvDescription:
        'Navigate the complexities of compliance with ease. Product Passports provide detailed product histories, making it easy to demonstrate compliance with ethical sourcing and sustainability regulations.',
    },
  ],
};

export const passportAdvantageSlice = createSlice({
  name: 'passportAdvantageInfo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = passportAdvantageSlice.actions;

export default passportAdvantageSlice.reducer;
