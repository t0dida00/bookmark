import mongoose from 'mongoose';

const bookmarkDataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: false },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const bookmarkGroupSchema = new mongoose.Schema({
    group: { type: String, required: true },
    slug: { type: String, required: true },
    data: [bookmarkDataSchema],
});

const bookmarkSchema = new mongoose.Schema({
    username: { type: String, required: true },
    bookmarks: [bookmarkGroupSchema],
});

module.exports = mongoose.models.Bookmarks || mongoose.model('Bookmarks', bookmarkSchema);
