import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
}

export const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {
    loadtv: (state, action) => {
      state.info = action.payload;
    },
    removeTv: (state, action) => {
      state.info = null;
    },
  },
})

export const { loadtv, removeTv } = tvSlice.actions;

export default tvSlice.reducer;
