const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
      .find({}).populate('blogs', { likes: 0, user: 0 })
    logger.info(users)
    response.json(users.map((u) => u.toJSON()))
  } catch (exception) {
    logger.error(exception)
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request
    if (body.password === undefined) {
      return response.status(400).json({ error: 'password missing' })
    }
    if (body.password.length < 3) {
      return response.status(400).json({ error: 'password length must be atleast 3 characters' })
    }
    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
