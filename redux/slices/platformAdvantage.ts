import { createSlice } from '@reduxjs/toolkit';
import {
  PlatformAdvantageInitialStateType,
  PlatformAdvantageTypeEnum,
} from '../../types/state/platformAdvantageType';

const initialState: PlatformAdvantageInitialStateType = {
  cards: [
    {
      id: 0,
      type: PlatformAdvantageTypeEnum.PLATFORMADV1,
      platformAdvHeading: 'Blockchain-Enabled Security',
      platformAdvDescription:
        'Leverage the power of blockchain technology for secure, tamper-proof data storage and traceability.',
    },
    {
      id: 1,
      type: PlatformAdvantageTypeEnum.PLATFORMADV2,
      platformAdvHeading: 'Sustainability-Centric',
      platformAdvDescription:
        'Embrace sustainable practices and prove your commitment to customers and stakeholders with our platform designed for conscious brands.',
    },
    {
      id: 2,
      type: PlatformAdvantageTypeEnum.PLATFORMADV3,
      platformAdvHeading: 'User-Friendly Interface',
      platformAdvDescription:
        'Navigate and manage your supply chain with ease on our intuitive, web and mobile-friendly interface.',
    },
    {
      id: 3,
      type: PlatformAdvantageTypeEnum.PLATFORMADV4,
      platformAdvHeading: 'Dedicated Support',
      platformAdvDescription:
        'Benefit from our dedicated customer service team, always ready to guide you and answer your queries.',
    },
  ],
};

export const platformAdvantageSlice = createSlice({
  name: 'platformAdvantageInfo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = platformAdvantageSlice.actions;

export default platformAdvantageSlice.reducer;
