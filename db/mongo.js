const mongoose = require("mongoose");
const dbURI = process.env.NEXT_PUBLIC_MONGOBD_URL;
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
    userBio : {
        companyName : String,
        mainLanguage : String,
        experience : String
    }
});

const postSchema = new mongoose.Schema({
    title : String,
    content : String,
    date : String,
    author : String,
    authorId : String,
    authorImage : String,
    image : String,
    like : [],
    delFlag : Boolean,
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