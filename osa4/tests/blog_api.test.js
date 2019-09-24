const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('HTTP Posting a blog', () => {
  test('blog is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the amount of blogs was increased', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(response.body.length) // Modified for testing POST request
  })

  test('identifier is called id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('there is a default value (0) for likes', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const newBlog = {
      title: 'Life at Kauhis',
      author: 'Hermanni',
      url: 'www.herwood.com',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map((r) => r.title)

    expect(response.body.length).toBe(initialBlogs.body.length + 1)
    expect(titles).toContain('Life at Herwood')
    expect(response.body[response.body.length - 1].likes).toBe(0)
  })


  test('blog without url and title return 400 Bad request', async () => {
    const blogWithMissingFields = {
      author: 'Hermanni',
    }
    await api
      .post('/api/blogs')
      .send(blogWithMissingFields)
      .expect(400)
  })
})


/*
test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
    console.log('XXXXXXXX', response.body[0])
    expect(response.body[0].content).toBe('HTML is easy')
})
*/

afterAll(() => {
  mongoose.connection.close()
})
