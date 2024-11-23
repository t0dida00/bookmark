import connectDB from '../../../utils/db';
import bookmarkSchema from '../../models/Bookmark';

export default async function handler(req, res) {
    await connectDB(); // Ensure the database is connected

    const { username } = req.query; // Extract the dynamic "username" parameter from the route

    try {
        if (req.method === 'GET') {
            // Fetch the user's folder structure from the database
            const user = await bookmarkSchema.findOne({ username });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user); // Return user data as JSON
        } else {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
