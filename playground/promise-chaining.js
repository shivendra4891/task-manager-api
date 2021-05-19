require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('60979fc312b3eec0fd592a6f').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteIdAndCount =async (id)=>{
    const deleteTask = await Task.findByIdAndDelete(id)
    const countTask = await Task.countDocuments({completed:false})
    return countTask

}

deleteIdAndCount('6097b02508ecf4c93d811ccc').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})