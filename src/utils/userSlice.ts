import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface UserState {
  currentuser: null,
  loading: Boolean,
  error: Boolean
}

const initialState: UserState = {
  currentuser: null,
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   loginStart: (state) =>{
    state.loading = true;
   },
   loginSuccess: (state,action) =>{
    state.loading = false;
    state.currentuser = action.payload;
   },
   loginFailure: (state) =>{
    state.loading = false;
    state.error = true;
   },
   logout:(state) =>{
    state.currentuser = null;
    state.loading = false;
    state.error = false;
   }
  },
})

export const {loginStart, loginSuccess, loginFailure, logout} = userSlice.actions;

export default userSlice.reducer;