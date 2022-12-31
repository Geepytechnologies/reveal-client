import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    videotoedit: []
}

const editvideo = createSlice({
    name:'edit',
    initialState: initialState,
    reducers: {
        assignedit: (state, action) => {
           state.videotoedit = action.payload;
        }
    }
})
export const {assignedit} = editvideo.actions;
export default editvideo.reducer;