import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    videoid: ""
}

const deletevideo = createSlice({
    name:'menu',
    initialState: initialState,
    reducers: {
        assign: (state, action) => {
           state.videoid = action.payload;
        }
    }
})
export const {assign} = deletevideo.actions;
export default deletevideo.reducer;