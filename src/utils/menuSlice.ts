import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    show: false
}

const menuSlice = createSlice({
    name:'menu',
    initialState: initialState,
    reducers: {
        toggleMenu: (state) => {
           return{
               show:!state.show

           } 
        }
    }
})
export const {toggleMenu} = menuSlice.actions;
export default menuSlice.reducer;