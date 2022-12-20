import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface VideoState {
  currentvideo: null,
  loading: Boolean,
  error: Boolean
}

const initialState: VideoState = {
  currentvideo: null,
  loading: false,
  error: false
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
   fetchStart: (state) =>{
    state.loading = true;
   },
   fetchSuccess: (state,action) =>{
    state.loading = false;
    state.currentvideo = action.payload;
   },
   fetchFailure: (state) =>{
    state.loading = false;
    state.error = true;
   }
  },
})

export const {fetchStart, fetchSuccess, fetchFailure} = videoSlice.actions;

export default videoSlice.reducer;