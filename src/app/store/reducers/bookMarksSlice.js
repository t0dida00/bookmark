// src/slices/bookmarksSlice.js
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { getBookmarks } from '../../services/dataService';

// Async thunk for fetching bookmarks
export const fetchBookmarks = createAsyncThunk('bookmarks/fetchBookmarks', async (username) => {
    const response = await getBookmarks(username);
    return response;
});

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: {
        data: {},          // List of bookmarks
        status: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'
    },
    reducers: {
        addBookmark: (state, action) => {
            state.push(action.payload); // Adds the new bookmark to the state array
        },
        updateBookmark: (state, action) => {
            state.data = action.payload; // Updates the bookmarks list with the new data
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookmarks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookmarks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchBookmarks.rejected, (state) => {
                state.status = 'failed';
            });
    },
});
export const { addBookmark, updateBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
