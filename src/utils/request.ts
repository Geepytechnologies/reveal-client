import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface RequestState {
  loading: Boolean,
  error: Boolean
}

const initialState: RequestState = {
  loading: false,
  error: false
}

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
   fetchStart: (state) =>{
    state.loading = true;
   },
   fetchSuccess: (state) =>{
    state.loading = false;
   },
   fetchFailure: (state) =>{
    state.loading = false;
    state.error = true;
   }
  },
})

export const {fetchStart, fetchSuccess, fetchFailure} = requestSlice.actions;

export default requestSlice.reducer;