// loveSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loveSlice = createSlice({
    name: 'love',
    initialState: {
        // Initialize an empty object to store love data for each post
        loveData: {},
    },
    reducers: {
        loveToggle: (state, action) => {
            const postId = action.payload;
            if (state.loveData[postId]) {
                state.loveData[postId].isLoved = !state.loveData[postId].isLoved;
                if (state.loveData[postId].isLoved) {
                    state.loveData[postId].loveCount++;
                } else {
                    state.loveData[postId].loveCount--;
                }
            } else {
                state.loveData[postId] = {
                    isLoved: true,
                    loveCount: 1,
                };
            }
        },
    },
});

export const { loveToggle } = loveSlice.actions;
export default loveSlice.reducer;
