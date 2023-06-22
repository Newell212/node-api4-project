require('dotenv').config()

const express = require('express');
const cors = require('cors')
const User = require('./users/users');
const server = express();

const port = process.env.PORT || 9000

server.use(express.json());

server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
        if(!users) {
            res.status(500).json({
                message: "Unable to find users"
            })
        } else {
            res.json(users)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting users',
            err: err.message,
            stack: err.stack 
        })
    })
})

server.post('/api/register', (req, res) => {
    const user = req.body;
    if(!user.username || !user.password) {
        res.status(400).json({
            message: "Name and password are required"
        })
    } else {
        User.insert(user)
        .then(createdUser => {
            res.status(201).json(createdUser)
        })
        .catch(err => {
            res.status(400).json({
                message: 'error creating user',
                err: err.message,
                stack: err.stack
            })
        })
    }
})

server.post('/api/login', (req, res) => {
    const user = req.body;
    if(!user.username || !user.password) {
        res.status(400).json({
            message: "Unable to login"
        })
    } else {
        res.status(200).json({
            message: `Welcome back ${user.username}`
        })
    }
})

server.use('*', (req, res, next) => {
    res.send('<h1>Hello, there</h1>')
})

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})


server.listen(port, () => {
    console.log(`listening on ${port}`)
})

module.exports = server;