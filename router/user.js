const express = require('express')
const router = new express.Router()
const User = require('../src/models/user')
const app = express()
const auth = require('../src/middleware/auth')
const multer = require('multer')
const upload = multer({
    
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a jpg, jpeg, png'))
        }
        cb(undefined, true)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

// User login function

router.post('/users/login', async (req, res) => {
    try {
        const userCred = await User.findByCredentials(req.body.email, req.body.password)
        const authToken = await userCred.generateAuthToken()
        res.send({ userCred, authToken })

    } catch (error) {
        res.status(401).send(error.message)
    }
})

// User logout

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()

    }
})

// log out all session 

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }


})
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (error) {
    //     res.status(500).send(error)
    // }


    // User.find({}).then((result)=>{
    //     res.send(result)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
//     // User.findById(_id).then((result)=>{
//     //     if(!result){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(result)
//     // }).catch((e)=>{
//     //     res.status(500).send(e)
//     // })
// })


router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedpdate = ['name', 'Age', 'email', 'password']
    const isValidUpdate = updates.every((update) => {
        return allowedpdate.includes(updates)
    })

    if (isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update' })
    }
    try {
        //req.user = await User.findById(req.user._id)
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()

        // const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // if (!updateUser) {
        //     return res.status(404).send()
        // }
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const deleteUser = await User.findByIdAndDelete(req.user._id)
        // if (!deleteUser) {
        //     return res.status(404).send()
        // }
        console.log(req.user)
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

// upload the profile picture
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
},(error, req, res, next)=>{
    res.status(400).send({error:error.message})
})

// delete the profile picture

router.delete('/users/me/avatar', auth, async (req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next)=>{
    req.status(400).send()
})


// fetch the profile photo 

router.get('/users/:id/avatar', async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-type', 'image/jpg')
        res.send(user.avatar)

    } catch (error) {
        res.status(404).send(error)
        
    }
})
module.exports = router