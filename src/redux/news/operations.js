import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

axios.defaults.baseURL = process.env.REACT_APP_MAIN_URL;

const errorMsg = "Something's wrong. Please update page and try again";

export const getOurNews = createAsyncThunk(
  'api/news',
  async (news, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/news/our-news');
      return data;
    } catch (error) {
      toast.error(errorMsg);
      return thunkAPI.rejectWithValue('');
    }
  }
);
