// pages/api/getData.js
import connectDB from '../../utils/db';
import bookmarkSchema from '../../models/Bookmark';
import { loadStateFromLocalStorage } from '@/app/utils/localStorage';

export async function GET(req, res) {
    try {        // Fetch data from the Bookmark model
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");
        let data = await bookmarkSchema.findOne({ "username": username }) // Convert to plain object right from query

        if (!data) {
            data = new bookmarkSchema({
                username,
                bookmarks: [
                    {
                        group: "Default",
                        slug: "default",
                        data: [],
                    },
                ],
            });

            // Save the new data to the database
            await data.save();
        }
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req, res) {
    try {
        const { username, bookmark, slug } = await req.json();
        // Update bookmarks for the specific user
        if (!slug) {
            return new Response(
                JSON.stringify({ message: 'Slug is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
        const updatedDocument = await bookmarkSchema.findOneAndUpdate(
            { username, 'bookmarks.slug': slug },
            { $push: { 'bookmarks.$.data': bookmark } },
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
