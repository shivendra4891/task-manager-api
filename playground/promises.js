require('../src/db/mongoose')
const User = require('../src/models/user')

// 6097ac984cb1f309446c94a7

// User.findByIdAndUpdate('6097ac984cb1f309446c94a7', {Age:90}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({Age:90})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updatedAgeAndCount = async(id, Age)=>{
    const updateAge = await User.findByIdAndUpdate(id, {Age})
    const countUser = await User.countDocuments({Age})
    return countUser

}

updatedAgeAndCount('6097ac984cb1f309446c94a7', 90).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})