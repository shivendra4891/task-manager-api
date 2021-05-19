const express = require('express')
const router = new express.Router()
const task = require('../src/models/task') 
const auth = require('../src/middleware/auth')

// create the task
router.post('/task', auth,  async (req, res) => {
    //const mytask = new task(req.body)
    const mytask = new task({
        ...req.body,
        owner:req.user._id
    })
    try {
        const taskSave = await mytask.save()
        res.send(taskSave)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Read API for task-manager API 

router.get('/task', auth, async (req, res) => {
    const match ={}
    const sort ={}
   
    if( req.query.completed){
        match.completed =  req.query.completed ==='true'
    }

    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1] == 'desc'? -1:1

    }

    try {
        //const Task = await task.find({ owner:req.user._id})
        await req.user.populate({
            path:'userTasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.userTasks)
    } catch (error) {
        res.status(500).send(error)
    }

})

// Read the tasks by id

router.get('/task/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
       // const specificTask = await task.findById(_id)
       const specificTask = await task.findOne({_id, owner:req.user._id})
        if (!specificTask) {
            return res.status(404).send()
        }
        res.send(specificTask)
    } catch (error) {
        res.status(500).send(error)
    }
})

// update the tasks

router.patch('/task/:id', auth, async (req, res) => {
    const allowedTask = ['description', 'completed']
    const taskUpdate = Object.keys(req.body)
    const isValidOperation = taskUpdate.every((update) => {
        return allowedTask.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid operation!' })
    }
    try {
       // const updateTask = await task.findById(req.params.id)
        const updateTask = await task.findOne({_id:req.params.id, owner:req.user._id})
        if (!updateTask) {
            return res.status(404).send()
        }
        taskUpdate.forEach((update)=>{
            updateTask[update] = req.body[update]
        })
        await updateTask.save()
       // const updateTask = await task.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
     
        res.send(updateTask)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Delete the task

router.delete('/task/:id', auth, async (req, res) => {
    try {
        const taskDelete = await task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if (!taskDelete) {
            return res.status(404).send()
        }
        res.send(taskDelete)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports= router