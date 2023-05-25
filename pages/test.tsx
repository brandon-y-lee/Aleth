import React, { useEffect } from 'react';
import Dropdown from '../components/Common/Dropdown/Dropdown.component';
import { useAppDispatch } from '../redux/store';
import { setShowDefaultHeader } from '../redux/slices/app';

export default function Test() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setShowDefaultHeader(false));
    return () => {
      dispatch(setShowDefaultHeader(true));
    };
  }, []);

  return (
    <div>
      <Dropdown />
    </div>
  );
}
