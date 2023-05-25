import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HeaderType, SelectedNavLinkEnum } from '../../types/state/headerType';

const initialState: HeaderType = {
  selectedNavLink: SelectedNavLinkEnum.FEATURES,
};

export const headerSlice = createSlice({
  name: 'headerInfo',
  initialState,
  reducers: {
    selectNavLink: (
      state,
      action: PayloadAction<SelectedNavLinkEnum | undefined>,
    ) => {
      state.selectedNavLink = action.payload;
    },
  },
  extraReducers: {},
});

export const { selectNavLink } = headerSlice.actions;

export default headerSlice.reducer;
