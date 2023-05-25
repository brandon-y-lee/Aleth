import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FooterType, SelectedNavLinkEnum } from '../../types/state/footerType';
// import { FooterType, SelectedNavLinkEnum } from '../../types/state/footerTypes';

const initialState: FooterType = {
  selectedNavLink: SelectedNavLinkEnum.Home,
};

export const footerSlice = createSlice({
  name: 'footerInfo',
  initialState,
  reducers: {
    selectNavLink: (state, action: PayloadAction<SelectedNavLinkEnum>) => {
      state.selectedNavLink = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { selectNavLink } = footerSlice.actions;

export default footerSlice.reducer;
