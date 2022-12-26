import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User{
  currentuser: any
  subscribedUsers: string[]
  channelId: string
}

interface myaction{
  payload: string
}

export interface UserState {
  currentuser: null,
  loading: Boolean,
  error: Boolean,
  subscribedUsers: string[],
  channelId: string
}

const initialState: UserState = {
  currentuser: null,
  loading: false,
  error: false,
  subscribedUsers: [],
  channelId: ''
  
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
   },
   subscription: (state: User, action: myaction) =>{
    if(state.currentuser.subscribedUsers.includes(action.payload)){
      state.currentuser.subscribedUsers.splice(state.currentuser.subscribedUsers.findIndex((channelId: { id: string }) => channelId.id === action.payload), 1);
    }else{
      state.currentuser.subscribedUsers.push(action.payload);
    }
   }
  },
})

export const {loginStart, loginSuccess, loginFailure, logout, subscription} = userSlice.actions;

export default userSlice.reducer;