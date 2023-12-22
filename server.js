const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// MongoDB
const dbURI = "mongodb://0.0.0.0:27017/Blogging";
mongoose
    .connect(dbURI)
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
    image : String
});

const postSchema = new mongoose.Schema({
    title : String,
    content : String,
    date : String,
    author : String,
    authorId : String,
    authorImage : String,
    image : String,
    like : String,
    comments: [
        {
            cName: String,
            cContent: String,
            cDate: String
        }
    ]
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// Session Middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false,
}));

// Middleware to check authentication
async function authenticate(req, res, next) {
    const { userEmail, password } = req.body;
    try {
        const user = await User.findOne({ userEmail: userEmail, password: password });
        if (user) {
            req.session.user = user;
            next();
        } else {
            res.status(401).send("Authentication Failed");
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

//Check UserExist middleware
async function checkAlreadyRegisteredUser(req,res,next){
    const  { userEmail } = req.body;
    try {
        const alreadyRegisteredUser = await User.findOne({ userEmail: userEmail });
        if(alreadyRegisteredUser){
            res.status(409).send("User Already Registered")
        }else{
            next();
        }
    }catch (e) {
        res.status(500).send("Internal Server Error");
    }
}

app.post('/login', authenticate, (req, res) => {
    const user = req.session.user;
    res.status(200).send({ message: 'Authentication Successful', user })
});

app.post('/users',checkAlreadyRegisteredUser, async (req, res) => {
    try {
        const userData = req.body
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const postData = req.body;
        const newPost = new Post(postData);
        await newPost.save();
        res.status(201).json(newPost);
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

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving posts" });
    }
});

app.patch("/posts/:postId", async (req, res) => {
    const postId = req.params.postId;
    const updatedData = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Error updating post" });
    }
});


app.listen(8000, () => {
    console.log("Server started on port 8000");
});