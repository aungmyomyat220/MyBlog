const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const {User,Post} = require('./db/mongo')
const port = process.env.port || 8000

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

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

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});