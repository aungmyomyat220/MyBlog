const mongoose = require("mongoose");

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
    followers : [],
    image : String,
    userBio : {}
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
            cImage : String,
            cContent: String,
            cDate: String
        }
    ]
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = {
    User,Post
}