const express = require("express");
const app = express();
/*Multer is a middleware, which is primarily used to upload files */
var multer = require('multer');
const Post = require("./api/models/post");
const postData = new Post();

/* The disk storage engine gives you full control on storing files to disk. */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
  }
});

const getExt = (mimetype) => {
  switch(mimetype){
      case "image/png":
          return '.png';
      case "image/jpeg":
          return '.jpg';
  }
}

var upload = multer({ storage: storage});



// const posts = [
//   {
//     id: "1581461442206",
//     title: "This is a New Blog Post",
//     content: "This is the content! ",
//     post_image: "uploads/post-image-1581461442199.jpg",
//     added_date: "1581461442206",
//   },
// ];

/* It will  convert JSON to a JS object, which we can use it later in any form we like*/
app.use(express.json());


/* to make the CORS issue fixed - middleware to allow origin */
app.use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5501"); // share to specific url
  res.setHeader("Access-Control-Allow-Origin", "*"); // share to all
  next();
});

// Middleware to access images
app.use('/uploads', express.static('uploads'));


app.get("/api/posts", (req, res) => {
  // const test = {
  //     testing : "testing"
  // }
  // postData.add(test)
  res.status(200).send(postData.get());
});


app.get("/api/posts/:post_id", (req, res) => {
  const postId = req.params.post_id;
  // console.log(postId)
  const foundPost = postData.getIndividualBlog(postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  }
  res.status(404).send("Not Found");
});


app.post("/api/posts", upload.single('post-image') ,(req, res) => {
  console.log(req.body);
  console.log('file name',req.file);

  const newPost = {
    "id": `${Date.now()}`,
    "title": req.body.title,
    "content": req.body.content,
    "post_image": req.file.path,
    "added_date": `${Date.now()}`
  }
  postData.add(newPost);
  res.status(201).send("OK")

})

// app.post("/api/posts", upload.single("post-image") ,(req, res)=>{
    
//   const newPost = {
//       "id": `${Date.now()}`,
//       "title": req.body.title,
//       "content": req.body.content,
//       "post_image": req.file.path,
//       // "post_image": req.body["post-image"],
//       "added_date": `${Date.now()}`
//   }
//   postsData.add(newPost);
//   res.status(201).send(newPost);
// })


app.listen(3000, () => console.log("Listening on 3000"));
