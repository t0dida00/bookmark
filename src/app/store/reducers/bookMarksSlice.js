// src/slices/bookmarksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBookmarks } from '../../services/dataService';

// Async thunk for fetching bookmarks
export const fetchBookmarks = createAsyncThunk('bookmarks/fetchBookmarks', async () => {
    const response = await getBookmarks();
    return response;
});

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: {
        data: null,          // List of bookmarks
        status: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'
    },
    reducers: {},
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

export default bookmarksSlice.reducer;
