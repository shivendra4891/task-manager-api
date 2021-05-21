const express = require('express')
require('./db/mongoose')
const bcryptjs = require('bcryptjs')

const userRouter = require('../router/user')
const taskRouter = require('../router/task')

const app = express()
const port = process.env.PORT
// Middleware function before calling the router

// app.use((req, res, next)=>{
//     if(req.method === 'GET'){
//         res.send('GET request are disabled')
//     } else {
//         next()
//     }
// })

// Code for displaying the site in maintaince mode

// app.use((req, res, next)=>{
//     res.status(503).send('Site is in maintaince for next few days')

// })

// to parse the incoming request in json format to object
app.use(express.json())

//link the routes
app.use(userRouter)
app.use(taskRouter)

const multer = require('multer')
const upload = multer({
    dest:'images'
})

app.post('/uploads',upload.single('upload'), (req, res)=>{
    res.send()
})

app.listen(3000, (port) => {
    console.log('Server has started.........')
})
