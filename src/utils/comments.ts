import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    commentarray: []
}

interface myaction{
    payload: string
}
interface Comment{
    commentarray: any
}
const comments = createSlice({
    name:'comment',
    initialState: initialState,
    reducers: {
        mycomments: (state, action) => {
           state.commentarray = action.payload;
        },
        addcomment: (state:Comment, action:myaction) => {
            state.commentarray.push(action.payload);

        },
        deletecomment: (state:Comment, action:myaction) => {
            state.commentarray.splice(state.commentarray.findIndex((commentID: string) => commentID === action.payload), 1);
        }
    }
})
export const {mycomments, addcomment, deletecomment} = comments.actions;
export default comments.reducer;