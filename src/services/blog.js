const BlogDAOFactory = require("../persistence/blogDAOFactory.js");

class BlogServices {
  constructor() {
    this.services = BlogDAOFactory.get("blog");
  }

  getPosts = async () => {
    try {
      const posts = await this.services.getItems();
      return posts;
    } catch (err) {
      console.log(err);
    }
  };

  getPostById = async (_id) => {
    try {
      const post = await this.services.getItemById(_id);
      return post;
    } catch (err) {
      console.log(err);
    }
  };

  savePost = async (post) => {
    try {
      const savedPost = await this.services.saveItem(post);
      return savedPost;
    } catch (err) {
      console.log(err);
    }
  };

  updatePost = async (_id, post) => {
    try {
      const updatedPost = await this.services.updateItem(_id, post);
      return updatedPost;
    } catch (err) {
      console.log(err);
    }
  };

  deletePost = async (_id) => {
    try {
      const post = await this.services.deleteItem(_id);
      return post;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = BlogServices;
