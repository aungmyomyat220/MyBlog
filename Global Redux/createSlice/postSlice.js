// postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        title: '',
        content: '',
        date: '',
        author: '',
        like : 0,
        image: null,
        showButton: false,
        isRotated: false,
        showText: false,
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setAuthor: (state, action) => {
            state.author = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setShowButton: (state, action) => {
            state.showButton = action.payload;
        },
        setIsRotated: (state, action) => {
            state.isRotated = action.payload;
        },
        setShowText: (state, action) => {
            state.showText = action.payload;
        },
    },
});

export const {
    setTitle,
    setContent,
    setDate,
    setAuthor,
    setImage,
    setShowButton,
    setIsRotated,
    setShowText,
} = postSlice.actions;

export default postSlice.reducer;
