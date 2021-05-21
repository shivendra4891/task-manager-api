const mongoose = require('mongoose')
const validator= require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not in acceptable format')
            }
        }
    },
    Age: {
        type: Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age can not be in negative');
            }
        }
    },
    password:{
        type:'String',
        trim:true,
        required:true,
        validate(value){
            if(value.length < 6 || value.toLowerCase() == 'password'){
                throw new Error('Password is not valid')
            }
        }
    },
    tokens:[{
        token:{
            type:'String',
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})
userSchema.virtual('userTasks',{
    ref:'Tasks',
    localField:'_id',
    foreignField:'owner'

})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET_KEY)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Password does not match')
    }

    return user
}

// function to save the hash password when changed
userSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
   
    console.log('just before saving')
    next()

})

// delete the task when user is delete
userSchema.pre('remove', async function (next){
    const user = this
    await Task.deleteMany({owner:user._id})

    next()

})

const User = mongoose.model('User', userSchema)

module.exports = User