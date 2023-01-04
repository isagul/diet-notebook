import { createSlice } from '@reduxjs/toolkit';

import { getUserDietListRequest } from '@/services/diet';

const initialState = {
  dietList: {
    data: [],
    isPending: false,
    error: {},
  },
  currentDate: undefined,
  activeKey: undefined,
};

export const dietListSlice = createSlice({
  name: 'dietSlice',
  initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      return {
        ...state,
        currentDate: action.payload
      };
    },
    setActiveKey: (state, action) => {
      return {
        ...state,
        activeKey: action.payload
      };
    },
  },
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

export const { setCurrentDate, setActiveKey } = dietListSlice.actions;
export default dietListSlice.reducer;