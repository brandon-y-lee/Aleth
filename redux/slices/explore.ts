import { createSlice } from '@reduxjs/toolkit';
import {
  ExploreInitialStateType,
  ExploreTypeEnum,
} from '../../types/state/exploreType';

const initialState: ExploreInitialStateType = {
  cards: [
    {
      id: 0,
      type: ExploreTypeEnum.EXPLORE1,
      exploreHeading:
        'The future of transparent, carbon-neutral supply chains.',
      exploreSubHeading:
        'On ALETHX, a blockchain-based supply chain traceability platform dedicated for SMEs and Large Enterprises.',
      exploreButtonDetail: 'DISCOVERY CALL',
    },
    {
      id: 1,
      type: ExploreTypeEnum.EXPLORE2,
      exploreHeading: 'Aleth maps your supply chain network.',
      exploreSubHeading:
        'We connect you with your upstream partners and provide end-to-end visibility.',
      exploreButtonDetail: 'EXPLORE THE PLATFORM',
    },
    {
      id: 2,
      type: ExploreTypeEnum.EXPLORE3,
      exploreHeading: 'Aleth captures data directly from your stakeholders.',
      exploreSubHeading:
        'We onboard your suppliers and help you ensure ethical procurement, carbon emission reduction and ESG initiatives.',
      exploreButtonDetail: 'DISCOVER TRACEABILITY',
    },
  ],
};

export const exploreSlice = createSlice({
  name: 'exploreInfo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = exploreSlice.actions;

export default exploreSlice.reducer;
