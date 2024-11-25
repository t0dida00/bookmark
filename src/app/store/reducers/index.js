// src/slices/index.js

import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { bookmarksReducer } from './bookMarksSlice'; // Example slice

const rootReducer = combineReducers({
    auth: authReducer,
    bookmarks: bookmarksReducer,
});

export default rootReducer;
