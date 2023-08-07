import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";
import mongoose from "mongoose";

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to a local mongodb server
await mongoose.connect("mongodb+srv://crunchySumo6960:Test-123@cluster0.vwk3y8s.mongodb.net/blogsDB");
const Schema = mongoose.Schema;

//create a post Schema
const postSchema = new Schema({
  title: String,
  content: String,
});

//create mongoose model within a collection named "Posts"
const PostModel = mongoose.model("Post", postSchema);

const defaultPost = new PostModel({
  title: "Post Title",
  content: homeStartingContent,
});

app.get("/", async (req, res) => {
  //console.log("Finding All Posts");
  const title = "Home";

  const foundPosts = await PostModel.find({});

  //Send the "title", "content", and posts array to the index.ejs partial to render the list of posts
  res.render("index.ejs", { title: title, content: homeStartingContent, posts: foundPosts });
});

app.get("/about", (req, res) => {
  const title = "About";
  res.render("index.ejs", { title: title, content: aboutContent });
});

app.get("/contact", (req, res) => {
  const title = "Contact";
  res.render("index.ejs", { title: title, content: contactContent });
});

app.get("/compose", (req, res) => {
  const title = "Compose";
  res.render("compose.ejs", { title: title });
});

app.post("/compose", async (req, res) => {
  //const post = { title: req.body.blogTitle, text: req.body.blogText };
  const post = new PostModel({
    title: req.body.blogTitle,
    content: req.body.blogText,
  });
  //save post to the post collection on the blogsDB on local MongoDB server
  await post.save();

  res.redirect("/");
});

app.get("/posts/:postID", async (req, res) => {
  const postID = req.params.postID;
  const foundPosts = await PostModel.findById({ _id: postID });

  res.render("post.ejs", { title: foundPosts.title, content: foundPosts.content, posts: foundPosts });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
