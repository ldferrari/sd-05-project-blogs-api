const { Router } = require('express');
const rescue = require('express-rescue');

const postFactory = require('../service/post/postFactory');
const authToken = require('../middlewares/authToken');

const post = Router();

post.post(
  '/',
  authToken,
  rescue(async (req, res) => {
    const token = req.headers.authorization;
    const { title, content } = req.body;
    const newPost = await postFactory().createPost(title, content, token);

    if (newPost.error) {
      return res.status(newPost.statusCode).json({ message: newPost.message });
    }
    return res.status(201).json(newPost);
  }),
);

post.get(
  '/',
  authToken,
  rescue(async (req, res) => {
    const allPosts = await postFactory().getAllPosts();
    return res.status(200).json(allPosts);
  }),
);

post.get(
  '/:id',
  authToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const getPost = await postFactory().getPostById(id);

    if (getPost.error) {
      return res.status(getPost.statusCode).json({ message: getPost.message });
    }

    return res.status(200).json(getPost);
  }),
);

post.put(
  '/:id',
  authToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const token = req.headers.authorization;
    const updatePost = await postFactory().updatePost(title, content, id, token);

    if (updatePost.error) {
      return res.status(updatePost.statusCode).json({ message: updatePost.message });
    }
    return res.status(200).json(updatePost);
  }),
);

module.exports = post;
