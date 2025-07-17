import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { getUserDietListRequest } from '@/services/diet';

const initialState = {
	dietList: {
		data: [],
		isPending: false,
		error: {},
	},
	currentDate: dayjs().format('D-M-YYYY'),
	activeKey: undefined,
	currentMeal: 0,
};

export const dietListSlice = createSlice({
	name: 'dietSlice',
	initialState,
	reducers: {
		setCurrentDate: (state, action) => {
			return {
				...state,
				currentDate: action.payload,
			};
		},
		setActiveKey: (state, action) => {
			return {
				...state,
				activeKey: action.payload,
			};
		},
		setCurrentMeal: (state, action) => {
			return {
				...state,
				currentMeal: action.payload,
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
				},
			};
		},
		[getUserDietListRequest.rejected]: (state, action) => {
			return {
				...state,
				dietList: {
					...state.dietList,
					error: action.payload,
					isPending: false,
				},
			};
		},
		[getUserDietListRequest.pending]: state => {
			return {
				...state,
				dietList: {
					...state.dietList,
					isPending: true,
				},
			};
		},
	},
});

export const { setCurrentDate, setActiveKey, setCurrentMeal } = dietListSlice.actions;
export default dietListSlice.reducer;
