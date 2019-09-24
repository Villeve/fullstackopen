const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('Adding new user is blocked when', () => {
  const passwordTest = {
    username: 'Ville',
    name: 'name',
    password: 'pa',
  }
  const usernameLengthTest = {
    username: 'Vi',
    name: 'name',
    password: 'password',
  }
  const uniqueTest = {
    username: 'defaultUser',
    name: 'name',
    password: 'password',
  }

  test('password is under 3 characters', async () => {
    await api
      .post('/api/users')
      .send(passwordTest)
      .expect(400)
  })
  test('username is under 3 characters', async () => {
    await api
      .post('/api/users')
      .send(usernameLengthTest)
      .expect(500)
  })
  test('username is not unique', async () => {
    await api
      .post('/api/users')
      .send(uniqueTest)
      .expect(500)
  })
})
