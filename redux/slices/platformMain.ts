import { createSlice } from '@reduxjs/toolkit';
import {
  PlatformMainInitialStateType,
  PlatformMainTypeEnum,
} from '../../types/state/platformMainType';

const initialState: PlatformMainInitialStateType = {
  cards: [
    {
      id: 0,
      type: PlatformMainTypeEnum.PLATFORMMAINIMG1,
      platformMainHeading: 'Intuitively Designed for Web & Mobile',
      platformMainDescription:
        ' Collect, secure, and communicate essential supply chain data on one simple interface.',
      platformButton: null,
    },
    {
      id: 1,
      type: PlatformMainTypeEnum.PLATFORMMAINIMG2,
      platformMainHeading: 'Effortless supply chain mapping & onboarding',
      platformMainDescription:
        'Discover what goes on beyond Tier 1, and foster stronger relations with your upstream partners. Our team of experts will help you facilitate seamless supply chain mapping and stakeholder onboarding.',
      platformButton: null,
    },
    {
      id: 2,
      type: PlatformMainTypeEnum.PLATFORMMAINIMG3,
      platformMainHeading: 'Product Passports',
      platformMainDescription:
        'Product Passports guarantee an auditable record of every step in your product’s journey, from sourcing to sale. Passports contain unique digital identities that simplify compliance procedures, strengthen claims, and build trust along the supply chain.',
      platformButton: 'LEARN MORE',
    },
  ],
};

export const platformMainSlice = createSlice({
  name: 'platformMainInfo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = platformMainSlice.actions;

export default platformMainSlice.reducer;
