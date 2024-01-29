import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '@/lib/axios';

export const getUserDietListRequest = createAsyncThunk(
  'dietSlice/getUserDietListRequest',
  async ({ data }, { rejectWithValue }) => {
    try {
      return axios({
        method: 'GET',
        url: '/diet/getUserDietList',
        params: data,
      }).then(response => {
        return response.data.dietList;
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createDietList = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/diet/createDietList',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateMealtoDiet = ({ data }) => {
  return axios({
    method: 'PUT',
    url: '/diet/updateMealtoDiet',
    data,
  }).then(response => {
    return response.data;
  });
};

export const deleteMealItem = ({ data }) => {
  return axios({
    method: 'DELETE',
    url: '/diet/deleteMealItem',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateMealItem = ({ data }) => {
  return axios({
    method: 'PUT',
    url: '/diet/updateMealItem',
    data,
  }).then(response => {
    return response.data;
  });
};

export const createDailyResults = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/diet/createDailyResults',
    data,
  }).then(response => {
    return response.data;
  });
};
