const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', { blogs: 0 })
    response.json(blogs.map((blog) => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const { body } = request;
  const { token } = request;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    // Response with status code 400 if title and url do not exist
    if (body.title === undefined || body.url === undefined) {
      response.status(400).end()
    } else {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())
    }
  } catch (exception) {
    next(exception)
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const { token } = request;
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const found = user.blogs.includes(request.params.id)

    if (found) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(403).send({ error: 'Removal forbidden - You can only remove your own blogs' })
    }
  } catch (exception) {
    next(exception)
  }

  /*
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
  */
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { body } = request
    const blog = {
      likes: body.likes,
      title: body.title,
      author: body.author,
      url: body.url,
      id: body.id,
    }
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(blog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter;
