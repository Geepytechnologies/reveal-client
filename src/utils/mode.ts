import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    darkMode: true
}

const modeSlice = createSlice({
    name:'mode',
    initialState: initialState,
    reducers: {
        toggleMode: (state) => {
           return{
            darkMode:!state.darkMode

           } 
        }
    }
})
export const {toggleMode} = modeSlice.actions;
export default modeSlice.reducer;