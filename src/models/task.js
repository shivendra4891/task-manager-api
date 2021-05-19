const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    description:{
        type: String,
        required:true,
        trim:true
        
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

// taskSchema.pre('save', async function(){
//     const task = this
//     if(task.isModified('description')){
//         task.description = ;
//     }
//     next()
// })

const task = mongoose.model('Tasks', taskSchema)

module.exports = task