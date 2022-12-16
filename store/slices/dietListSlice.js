import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
}

export const dietListSlice = createSlice({
  name: 'dietList',
  initialState,
  reducers: {
    setDietList: (state, action) => {
      return {
        ...state,
        data: action.payload
      };
    },
  },
})

export const { setDietList } = dietListSlice.actions;

export default dietListSlice.reducer;