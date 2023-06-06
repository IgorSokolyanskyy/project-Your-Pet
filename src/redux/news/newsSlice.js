import { createSlice } from '@reduxjs/toolkit';
import { getOurNews } from './operations';

const initialState = {
  newsList: [],
  isLoading: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getOurNews.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOurNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newsList = action.payload;
      });
  },
});

export const newsReducer = newsSlice.reducer;
