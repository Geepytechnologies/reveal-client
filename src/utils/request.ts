import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface RequestState {
  loading: Boolean,
  error: Boolean,
  errormessage: String
}

const initialState: RequestState = {
  loading: false,
  error: false,
  errormessage: ''
}

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
   requestStart: (state) =>{
    state.loading = true;
   },
   requestSuccess: (state) =>{
    state.loading = false;
   },
   requestFailure: (state, action) =>{
    state.loading = false;
    state.error = true;
    state.errormessage = action.payload;
   },
   requestinitial: (state) =>{
    state.loading = false;
    state.error = false;
    state.errormessage = '';
   }
  },
})

export const {requestStart, requestSuccess, requestFailure, requestinitial} = requestSlice.actions;

export default requestSlice.reducer;