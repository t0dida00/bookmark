// pages/api/getData.js
import connectDB from '@/app/utils/db';
import bookmarkSchema from '../../../models/Bookmark';

export async function POST(req, res) {
    try {
        const { username, group, slug } = await req.json();
        // Update bookmarks for the specific user
        if (!slug || !group) {
            return new Response(
                JSON.stringify({ message: 'Slug and group is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
        const newFolder = { group, slug, data: [] }

        const updatedDocument = await bookmarkSchema.findOneAndUpdate(
            { username },
            { $push: { 'bookmarks': newFolder } },
            { new: true } // Return the updated document
        );
        return new Response(
            JSON.stringify({ message: 'Bookmark updated successfully', data: updatedDocument }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
