import { createSlice } from '@reduxjs/toolkit';
import { fetchNoticeById } from './operations';

const initialState = {
  item: {
    name: '',
    category: '',
    dateOfBirth: '',
    breed: '',
    place: '',
    sex: '',
    comments: '',
    owner: '',
  },
  isLoading: false,
};

export const noticeItemSlice = createSlice({
  name: 'noticeItem',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchNoticeById.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchNoticeById.fulfilled, (_, action) => {
        return {
          item: { ...action.payload.data.notice },
          isLoading: false,
        };
      })
      .addCase(fetchNoticeById.rejected, state => {
        state.isLoading = false;
      });
  },
  reducers: {},
});
