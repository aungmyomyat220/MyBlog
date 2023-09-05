const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// MongoDB サーバーの接続文字列
const dbURI = "mongodb://0.0.0.0:27017/Blogging";

// MongoDB にローカルで接続する
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

const userSchema = new mongoose.Schema({
    userName : String,
    userEmail : String,
    password : String,
    role : String,
});

const postSchema = new mongoose.Schema({
    title : String,
    content : String,
    date : String,
    author : String,
    image : String,
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const app = express();
app.use(express.json());
app.use(cors());

app.post('/users', async (req, res) => {
    try {
        const userData = req.body
        await User.create(userData)
        res.status(201).json({ message: 'User created successfully',userData});
    } catch (error) {
        // Handle any errors
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const postData = req.body;
        const newPost = new Post(postData);
        await newPost.save();
        res.status(201).json(newPost); // Send the saved post as a JSON response
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving posts" });
    }
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
});