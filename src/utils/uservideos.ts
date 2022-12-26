import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface VideoState {
  videos: null,
  loading: Boolean,
  error: Boolean,
}

interface Video{
  videos: any
}

interface myaction{
  payload: string
}

const initialState: VideoState = {
  videos: null,
  loading: false,
  error: false,
}

export const uservideos = createSlice({
  name: 'uservideo',
  initialState,
  reducers: {
   fetchStart: (state) =>{
    state.loading = true;
   },
   fetchSuccess: (state,action) =>{
    state.loading = false;
    state.videos = action.payload;
   },
   fetchFailure: (state) =>{
    state.loading = false;
    state.error = true;
   }
  },
})

export const {fetchStart, fetchSuccess, fetchFailure} = uservideos.actions;

export default uservideos.reducer;