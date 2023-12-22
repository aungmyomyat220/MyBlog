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
        }else if(response.status === 409){
            return{
                error: 'User already exists',
                statusCode: 409,
            }
        } else {
            console.error("Error creating user:", response.statusText);
        }
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

//Login API Function
export const Login = async (checkUser) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkUser),
        });

        if (response.status === 200) {
            const responseData = await response.json();
            return {
                user: responseData.user,
                statusCode: 200,
            };
        } else if (response.status === 401){
            return{
                error: 'Invalid Username or Password',
                statusCode: 401,
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        return {
            error: 'An unexpected error occurred',
            statusCode: 500,
        };
    }
};


export const createPost = async (postData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": true,
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
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error(`Failed to update post (status ${response.status})`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};
