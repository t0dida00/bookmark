// src/slices/index.js

import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import bookmarksReducer from './bookMarksSlice'; // Example slice

const rootReducer = combineReducers({
    bookmarks: bookmarksReducer,
    auth: authSlice
    // add other reducers here
});

export default rootReducer;
