import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppType, ThemeEnum } from '../../types/state/appType';

const initialState: AppType = {
  theme: ThemeEnum.DARK,
  showDefaultHeader: true,
  stateChanged: false,
};

export const appSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme =
        state.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
      state.stateChanged = true;
    },
    setShowDefaultHeader: (state, action: PayloadAction<boolean>) => {
      state.showDefaultHeader = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemeEnum>) => {
      state.theme = action.payload;
      state.stateChanged = true;
    },
  },
  extraReducers: {},
});

export const { changeTheme, setTheme, setShowDefaultHeader } = appSlice.actions;

export default appSlice.reducer;
