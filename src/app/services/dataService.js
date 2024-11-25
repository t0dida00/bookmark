// /app/services/apiService.js


export const addBookmark = async (username, bookmark, slug) => {

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
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// /app/services/apiService.js
export const getBookmarks = async (username) => {
    try {
        const response = await fetch(`/api/data/?username=${username}`);
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

