// pages/api/getData.js
import connectDB from '../../utils/db';
import Bookmark from '../../models/Bookmark';

export async function GET(req) {
    try {
        // Ensure the database is connected
        await connectDB();

        // Fetch data from the Bookmark model
        const data = await Bookmark.find({}).limit(1);

        // Return JSON response
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
        // Connect to the database
        await connectDB();

        // Get the data from the request body
        const { username, bookmark } = await req.json();
        // Update bookmarks for the specific user
        const updatedUser = await Bookmark.findOneAndUpdate(
            { username }, // Find user by username
            { $push: { bookmarks: bookmark } }, // Update bookmarks array
            { new: true, upsert: true } // Return updated document; create if doesn't exist
        );
        return new Response(
            JSON.stringify({ message: 'Bookmark updated successfully', data: updatedUser }),
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