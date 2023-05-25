import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import exampleSlice from './slices/example';
import headerSlice from './slices/header';
import solutionSlice from './slices/solution';
import blogSlice from './slices/blog';
import footerSlice from './slices/footer';
import appSlice from './slices/app';
import exploreSlice from './slices/explore';
import passportSlice from './slices/passport';
import passportAdvantageSlice from './slices/passportAdvantage';
import mainSlice from './slices/main';
import managementSlice from './slices/management';
import platformAdvantageSlice from './slices/platformAdvantage';
import platformSlice from './slices/platform';
import platformMainSlice from './slices/platformMain';

export const store = configureStore({
  devTools: true,
  reducer: {
    appInfo: appSlice,
    exampleInfo: exampleSlice,
    headerInfo: headerSlice,
    solutionInfo: solutionSlice,
    blogInfo: blogSlice,
    footerInfo: footerSlice,
    exploreInfo: exploreSlice,
    passportInfo: passportSlice,
    passportAdvantageInfo: passportAdvantageSlice,
    mainInfo: mainSlice,
    managementInfo: managementSlice,
    platformAdvantageInfo: platformAdvantageSlice,
    platformInfo: platformSlice,
    platformMainInfo: platformMainSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
