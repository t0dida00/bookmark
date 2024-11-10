// models/Bookmark.js
import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    bookmarks: [
        {
            id: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            link: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

// Export the model
module.exports = mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema);
