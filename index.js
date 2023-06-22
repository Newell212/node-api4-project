require('dotenv').config()

const express = require('express');
const cors = require('cors')
const server = express();

const port = process.env.PORT || 9000

server.use(express.json());

server.get('/api/users', (req, res) => {
    res.json([])
})

server.post('/api/register', (req, res) => {

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