import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        nickName: null,
        email: null,
    },
    reducers: {},
})
