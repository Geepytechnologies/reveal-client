import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface VideoState {
  currentvideo: null,
  loading: Boolean,
  error: Boolean,
  likes: string[],
}

interface Video{
  currentvideo: any
  likes: string[]
}

interface myaction{
  payload: string
}

const initialState: VideoState = {
  currentvideo: null,
  loading: false,
  error: false,
  likes: []
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
   },
   like: (state: Video, action: myaction) =>{
    if(state.currentvideo && !state.currentvideo.likes.includes(action.payload)){
      state.currentvideo.likes.push(action.payload);
      state.currentvideo.dislikes.splice(state.currentvideo.dislikes.findIndex((userId: string)=> userId === action.payload), 1)
    }
   },
   dislike: (state: Video, action: myaction) =>{
    if(state.currentvideo && !state.currentvideo.dislikes.includes(action.payload)){
      state.currentvideo.dislikes.push(action.payload);
      state.currentvideo.likes.splice(state.currentvideo.likes.findIndex((userId: string)=> userId === action.payload), 1)
    }
   }
  },
})

export const {fetchStart, fetchSuccess, fetchFailure, like, dislike} = videoSlice.actions;

export default videoSlice.reducer;