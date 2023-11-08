const API_BASE_URL = "http://localhost:8000";

export const createUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error creating user:", response.statusText);
        }
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

export const createPost = async (postData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error creating post:", response.statusText);
        }
    } catch (error) {
        console.error("Error creating post:", error);
    }
};

export const getUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        return await response.json();
    } catch (error) {
        console.error("Error getting users:", error);
    }
};

export const getPost = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        return await response.json();
    } catch (error) {
        console.error("Error getting posts:", error);
    }
};

export const updatePost = async (postId, updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'PUT', // Use 'PUT' for updating data
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Provide the updated data in JSON format
        });

        if (!response.ok) {
            throw new Error(`Failed to update post (status ${response.status})`);
        }
        return await response.json(); // Optionally, you can return the updated post data
    } catch (error) {
        console.error("Error updating post:", error);
        throw error; // Rethrow the error to handle it elsewhere if needed
    }
};
