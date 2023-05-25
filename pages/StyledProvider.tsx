import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import GlobalStyles from '../styles/GlobalStyles';
import { setTheme } from '../redux/slices/app';
import { ThemeEnum } from '../types/state/appType';

export default function StyledProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if theme is set in local storage
    if (window.localStorage.getItem('theme')) {
      dispatch(setTheme(window.localStorage.getItem('theme') as ThemeEnum));
    } else {
      // if not set, set theme to system theme.
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
      if (systemTheme.matches) {
        dispatch(setTheme(ThemeEnum.DARK));
      } else {
        dispatch(setTheme(ThemeEnum.LIGHT));
      }
    }
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
    </>
  );
}
