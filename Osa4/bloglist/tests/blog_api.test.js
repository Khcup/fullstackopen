const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app)
const TIMEOUT = 100 * 1000;

let TOKEN = null;

const initial_blogs = [
    {
        title: "test blog 1",
        author: "test author 1",
        url: "test url 1",
        likes: 1,
    },
    {
        title: "test blog 2",
        author: "test author 2",
        url: "test url 2",
        likes: 4,
    },
    {
        title: "test blog 3",
        author: "test author 3",
        url: "test url 3",
        likes: 0,
    },
]

beforeEach(async () => {
    // reset users
    await User.deleteMany({})
    const new_user = await new User({
        username: 'root',
        password_hash: await bcrypt.hash('sudo', 10),
        name: 'sysadmin'
    }).save()

    // login
    const res = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'sudo'
        })

    TOKEN = res.body.token

    // reset blogs
    await Blog.deleteMany({})
    for (const blog of initial_blogs) {
        await new Blog({
            user: new_user._id,
            ...blog,
        }).save()
    }
}, TIMEOUT)


/* TESTS */


test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(3)
}, TIMEOUT)


test('the unique identifier property of the blog posts is named id', async () => {
    const blog = (await api.get('/api/blogs')).body[0]
    expect(blog.id).toBeDefined()
}, TIMEOUT)


test('a valid blog can be added', async () => {
    const new_blog = {
        title: 'new test blog',
        author: 'new test author',
        url: 'new test url',
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(new_blog)
        .expect(201)

    const all_blogs = (await api.get('/api/blogs')).body
    expect(all_blogs).toHaveLength(initial_blogs.length + 1)

    const all_titles = all_blogs.map(blog => blog.title)
    expect(all_titles).toContain('new test blog')
})


test('a blog creation fails if a token is not provided', async () => {
    const new_blog = {
        title: 'new test blog',
        author: 'new test author',
        url: 'new test url',
    }

    await api
        .post('/api/blogs')
        .send(new_blog)
        .expect(401)

    const all_blogs = (await api.get('/api/blogs')).body
    expect(all_blogs).toHaveLength(initial_blogs.length)
})


test('missing likes property defaults to 0', async () => {
    const new_blog = {
        title: 'blog with no likes',
        author: 'some author',
        url: 'some url',
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(new_blog)
        .expect(201)

    const all_blogs = (await api.get('/api/blogs')).body
    const newly_added_blog = all_blogs.find(blog => blog.title == 'blog with no likes')

    expect(newly_added_blog.likes).toBe(0)
})


test('missing title and url properties results in HTTP 400 Error', async () => {
    const new_blog = {
        author: 'author with invalid blog',
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(new_blog)
        .expect(400)
})


test('a blog entry can be deleted', async () => {
    const first_blog = (await api.get('/api/blogs')).body[0]

    await api
        .delete(`/api/blogs/${first_blog.id}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    const all_blogs = (await api.get('/api/blogs')).body
    expect(all_blogs).toHaveLength(initial_blogs.length - 1)

    const all_titles = all_blogs.map(blog => blog.title)
    expect(all_titles).not.toContain(first_blog.title)
})


test('likes of a note can be updated', async () => {
    const first_blog = (await api.get('/api/blogs')).body[0]

    const updated_blog = await api.put(`/api/blogs/${first_blog.id}`).send({ likes: 104 })

    expect(updated_blog.body.likes).toBe(104)
})


/* TESTS */


afterAll(() => {
    mongoose.connection.close()
})