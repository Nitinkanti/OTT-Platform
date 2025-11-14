import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    loadmovie: (state,action) => {
      state.info =  action.payload;
    },
    removemovie: (state,action) => {
      state.value = null;
    },
  },
})

export const { loadmovie , removemovie } = movieSlice.actions

export default movieSlice.reducer