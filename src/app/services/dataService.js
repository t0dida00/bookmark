// /app/services/apiService.js
export const addBookmark = async (bookmark, slug) => {
    const username = 'trieuthienhkhoa';
    try {
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                bookmark,
                slug
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to update bookmark');
        }

        const data = await response.json();
        // if (data.data && data.data.bookmarks) {
        //     // Sort bookmarks by `createdAt` in descending order
        //     data.data.bookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // }
        return data.data;
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
            return data
        } else {
            console.error('Failed to fetch bookmarks');
        }

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const getBookmarksBySlug = async (slug) => {
    try {
        const response = await fetch(`/api/data`);
        if (response.ok) {
            const data = await response.json();

            return data
        } else {

            console.error('Failed to fetch bookmarks');
        }

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
