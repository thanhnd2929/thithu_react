import { createAsyncThunk } from "@reduxjs/toolkit";
import { addXeMay } from "../reducer/XeMayReducer";

const api_url = 'http://10.0.2.2:3000/xe_may';

export const fetchXeMay = createAsyncThunk('XeMay/fetchXeMay', async () => {
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const deleteXeMayApi = createAsyncThunk('XeMay/deleteXeMayApi',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                return id;
            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addXeMayApi = createAsyncThunk(
    'XeMay/addXeMayAPI',
    async (objXeMay, thunkAPI) => {
        console.log(objXeMay);
        try {
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objXeMay)
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateXeMayApi = createAsyncThunk(
    'XeMay/updateXeMayApi',
    async (objUpdate, thunkAPI) => {
       try {
        const response = await fetch(`${api_url}/${objUpdate.id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objUpdate.data)
        });
        const data = await response.json();
        if (response.ok) {
           return data; 
        } else {
          const errorData = await response.json();
          return thunkAPI.rejectWithValue(errorData);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );