import { configureStore } from "@reduxjs/toolkit";
import xeMaySlice from '../reducer/XeMayReducer'

export default configureStore({
    reducer: {
        listXeMay: xeMaySlice
    }
});