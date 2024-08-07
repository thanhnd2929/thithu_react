import { createSlice } from "@reduxjs/toolkit";
import { addXeMayApi, updateXeMayApi, deleteXeMayApi, fetchXeMay } from "../action/XeMayAction";

//1. khai báo khởi tạo state
const initialState = {
    listXeMay: []
}

const xeMaySlice = createSlice({
    name: 'XeMay',
    initialState,
    reducers: {
        addXeMay(state, action) {
            state.listXeMay.push(action.payload)
        },
       
        
    },
    extraReducers: builder => {
        // Delete
        builder.addCase(deleteXeMayApi.fulfilled, (state, action) => {
            state.listXeMay = state.listXeMay.filter(row => row.id !== action.payload)
        })
            .addCase(deleteXeMayApi.rejected, (state, action) => {
                console.log('Delete rejected:', action.error.message);
            });

        // Add
        builder.addCase(addXeMayApi.fulfilled, (state, action) => {
            state.listXeMay.push(action.payload);
        })
            .addCase(addXeMayApi.rejected, (state, action) => {
                console.log('Add rejected: ', action.error.message);
            });

        // Update
        builder.addCase(updateXeMayApi.fulfilled, (state, action) => {
            const { id, ten_xe_ph45160, mau_sac_ph45160, gia_ban_ph45160, mo_ta_ph45160, hinh_anh_ph45160 } = action.payload;
            const xemay = state.listXeMay.find(item => item.id === id);
            if (xemay) {
                xemay.ten_xe_ph45160 = ten_xe_ph45160;
                xemay.mo_ta_ph45160 = mo_ta_ph45160;
                xemay.mau_sac_ph45160 = mau_sac_ph45160;
                xemay.hinh_anh_ph45160 = hinh_anh_ph45160;
                xemay.gia_ban_ph45160 = gia_ban_ph45160;
            }
        })
            .addCase(updateXeMayApi.rejected, (state, action) => {
                console.log('Update rejected:', action.error.message);
            });

         // Fetch
         builder.addCase(fetchXeMay.fulfilled, (state, action) => {
            state.listXeMay = action.payload;
        })
            .addCase(fetchXeMay.rejected, (state, action) => {
                console.log('Fetch rejected:', action.error.message);
            });
    }
})

// export các thành phần để bên screen có thể sử dụng
export const { addXeMay } = xeMaySlice.actions;
export default xeMaySlice.reducer;