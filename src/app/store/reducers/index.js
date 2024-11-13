// src/slices/index.js

import { combineReducers } from '@reduxjs/toolkit';
import bookmarksReducer from './bookMarksSlice'; // Example slice

const rootReducer = combineReducers({
    bookmarks: bookmarksReducer,
    // add other reducers here
});

export default rootReducer;
