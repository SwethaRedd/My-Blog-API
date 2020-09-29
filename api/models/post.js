const fs = require("fs");
const PATH = "./data.json";

// read json files with in node js
// const fs = require('fs');
// let rawdata = fs.readFileSync('student.json');
// let student = JSON.parse(rawdata);
// console.log(student);

class Post {
  add(newPost) {
    /* Add new Blog Post */
    const currentPosts = this.readData();
    currentPosts.unshift(newPost);
    this.storeData(currentPosts);
  }

  // Read Data
  // readData() {
  //   let rawData = fs.readFileSync(PATH);
  //   let posts = JSON.parse(rawData);
  //   return posts;
  // }

  readData() {
    try {
      return JSON.parse(fs.readFileSync(PATH, "utf8"));
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  
  get() {
    /* Get Posts */
    return this.readData();
  }

  getIndividualBlog(postId) {
    /* Get One Blog Post */
    const posts = this.readData(); // read data
    const foundPost = posts.find((post) => post.id == postId);
    return foundPost;
  }

  // write the data to the json file- nodejs
  // storeData(rawData) {
  //   let data = JSON.stringify(rawData);
  //   fs.writeFileSync("data.json", data);
  // }

  storeData(data) {
    try {
      fs.writeFileSync(PATH, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

}

module.exports = Post;
