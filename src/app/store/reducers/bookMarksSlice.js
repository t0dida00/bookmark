// src/slices/bookmarksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
        },
        clearBookmark: (state) => {
            state.data = {}
            state.status = 'idle'; // Reset the status when the bookmarks are cleared
        },
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
export const { addBookmark, updateBookmark, clearBookmark } = bookmarksSlice.actions;

export const bookmarksReducer = bookmarksSlice.reducer;
