import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import ejs from "ejs";
import _ from "lodash";
import { title } from "process";

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const port = 3000;
const posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const title = "Home";
  res.render("index.ejs", { title: title, content: homeStartingContent, posts: posts });
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

app.post("/compose", (req, res) => {
  const post = { title: req.body.blogTitle, text: req.body.blogText };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postID", (req, res) => {
  const postID = req.params.postID;
  posts.forEach(function (post) {
    if (_.lowerCase(post.title) === _.lowerCase(postID)) {
      res.render("post.ejs", { title: post.title, content: post.text });
    }
  });
});

// function searchPosts(postID) {
//   posts.forEach(function (post) {
//     if (_.lowerCase(post.title) === _.lowerCase(postID)) {
//       res.render("post.ejs", { title: post.title, content: post.text });
//     }
//   });
// }

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
