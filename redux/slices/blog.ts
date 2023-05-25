import { createSlice } from '@reduxjs/toolkit';
import { BlogInitialStateType, BlogTypeEnum } from '../../types/state/blogType';

const initialState: BlogInitialStateType = {
  cards: [
    {
      id: 0,
      type: BlogTypeEnum.BLOG1,
      blogName: 'Brandon Lee',
      blogDate: '19 Jan 2022',
      blogDescription:
        'How Blockchain Technology is Transforming Supply Chain Traceability',
      blogTag: '9 MIN READ',
    },
    {
      id: 1,
      type: BlogTypeEnum.BLOG2,
      blogName: 'Brandon Lee',
      blogDate: '19 Jan 2022',
      blogDescription: 'The Path to a Circular Economy in the Apparel Industry',
      blogTag: '7 MIN READ',
    },
    {
      id: 2,
      type: BlogTypeEnum.BLOG3,
      blogName: 'Brandon Lee',
      blogDate: '19 Jan 2022',
      blogDescription:
        'The Power of Traceability in  Deepening Customer Relationships',
      blogTag: '6 MIN READ',
    },
  ],
};

export const blogSlice = createSlice({
  name: 'blogInfo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;
