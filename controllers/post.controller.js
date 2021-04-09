const Post = require('../models/post');

class PostController {
  async create(req, res) {
    try {
      const { title, content } = req.body;
      const post = new Post({ title, content });
      await post.save();
      return res.json(post);
    } catch(e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const { id } = req.query;
      if (id) {
        const post = await Post.findById(id);
        res.json(post);
      } else {
        const posts = await Post.find();
        res.json(posts);
      }
    } catch(e) {
      next(e);
    }
  }

  async updateById(req, res, next) {
    try {
      const { id } = req.query;
      const { body } = req;
      const post = await Post.findByIdAndUpdate(id, body);
      res.json(post);
    } catch(e) {
      next(e);
    }
  }

  async removeById(req, res, next) {
    try {
      const { id } = req.query;
      const post = await Post.findByIdAndRemove(id);
      res.json(post);
    } catch(e) {
      next(e);
    }
  }
}

module.exports = new PostController();
