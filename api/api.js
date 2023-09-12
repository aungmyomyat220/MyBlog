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