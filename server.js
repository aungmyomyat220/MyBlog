const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const sessionConfig = require("./middleware/session");
const validateAPIKey = require("./middleware/validateAPIKey");
const bcrypt = require("bcrypt");
const {User,Post} = require('./db/mongo')
const passwordHash = require('./middleware/passwordHash')
const port = 8000;

const app = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors())
app.use(sessionConfig);
app.use(validateAPIKey);

// Middleware to check authentication
async function authenticate(req, res, next) {
    const { userEmail, password } = req.body;
    try {
        const user = await User.findOne({ userEmail: userEmail});
        if(userEmail === "" || password ===""){
            res.status(400).send("Fill Input Values");
        }
        else if(!user){
            res.status(404).send("User Not Found");
        }
        else if (user) {
            const hashedPassword = user.password
            try{
                const match = await bcrypt.compare(password, hashedPassword);
                if (match){
                    req.session.user = user;
                    req.session.userId = user._id
                    next();
                }else if(!match) {
                    res.status(401).send("Authentication Failed");
                }
            }catch (e) {
                console.log(e)
            }
        }
    } catch (err) {

        res.status(500).send("Internal Server Error");
    }
}

//Check UserExist middleware
async function checkDuplicateUser(req,res,next){
    const  userData = req.body;
    try {
        const userEmail = userData.userEmail
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

async function checkUserExist(req,res,next){
    const  { userEmail } = req.body;
    try {
        const existUser = await User.findOne({ userEmail: userEmail });
        if(existUser){
            req.existUser = existUser;
            next();
        }else{
            res.status(404).json({ error: 'User Not Found' });
        }
    }catch (e) {
        res.status(500).send("Internal Server Error");
    }
}

app.post('/checkuser', checkUserExist ,(req,res) => {
    const existUser = req.existUser
    res.status(200).json({ user: 'found', userId : existUser._id });
})

app.post('/login', authenticate, (req, res) => {
    const user = req.session.user
    console.log(req.session.userId.toString())
    res.cookie('sessionId', req.session.userId.toString());
    res.status(200).send({ message: 'Authentication Successful', user })
});

app.post('/users',checkDuplicateUser, async (req, res) => {
    try {
        const userData = req.body
        const password = userData.password
        userData.password = await passwordHash(password)
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

app.get("/posts/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if (post) {
            res.status(200).json({message : "Post Found",post})
        }
    } catch (error) {
        console.error("Error retrieving post:", error);
        res.status(500).json({ error: "Error retrieving post" });
    }
});

app.get("/modifieduser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Error retrieving user" });
    }
});


app.put("/posts/:postId", async (req, res) => {
    const postId = req.params.postId;
    const updateData = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate({ _id: postId }, updateData, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Error updating post" });
    }
});

app.put("/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;
    if(updateData.password){
        updateData.password = await passwordHash(updateData.password)
    }
    
    try {
        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Error updating user" });
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});