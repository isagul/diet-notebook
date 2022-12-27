import { createSlice } from '@reduxjs/toolkit';

import { getUserDietListRequest } from '@/services/diet';

const initialState = {
  dietList: {
    data: [],
    isPending: false,
    error: {},
  },
};

export const dietListSlice = createSlice({
  name: 'dietSlice',
  initialState,
  extraReducers: {
    [getUserDietListRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        dietList: {
          ...state.dietList,
          data: action.payload,
          isPending: false,
        }
      };
    },
    [getUserDietListRequest.rejected]: (state, action) => {
      return {
        ...state,
        dietList: {
          ...state.dietList,
          error: action.payload,
          isPending: false,
        }
      };
    },
    [getUserDietListRequest.pending]: (state, action) => {
      return {
        ...state,
        dietList: {
          ...state.dietList,
          isPending: true,
        }
      };
    },
  }
});

export default dietListSlice.reducer;