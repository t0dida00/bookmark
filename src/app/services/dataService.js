// /app/services/apiService.js
export const addBookmark = async (bookmark) => {
    const username = 'trieuthienhkhoa';
    try {
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                bookmark
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update bookmark');
        }

        const data = await response.json();
        if (data.data && data.data.bookmarks) {
            // Sort bookmarks by `createdAt` in descending order
            data.data.bookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// /app/services/apiService.js
export const getBookmarks = async () => {
    try {
        const response = await fetch('/api/data');
        if (response.ok) {
            const data = await response.json();
            if (data[0] && data[0].bookmarks) {
                // Sort bookmarks by `createdAt` in descending order
                data[0].bookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
            return data[0]
        } else {
            console.error('Failed to fetch bookmarks');
        }

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
