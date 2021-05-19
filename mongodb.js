//CURD

const { MongoClient, ObjectID, Db } = require('mongodb')
// const mongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID
// console.log(id.getTimestamp())

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log('Error in connecting database')
    }

    // console.log('Connected successfully')
    const db = client.db(databaseName)

    // CREATE THE DOCUMENTS:

    // db.collection('users').insertOne({
    //     _id:id,
    //     name:'Xavier',
    //     Age: 30
    // }, (error, result)=>{
    //     if (error){
    //         console.log('Unable to insert')
    //     }
    //     console.log(result.insertedCount)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'Pradeep',
    //         Age:35
    //     },{
    //         name: 'KP',
    //         Age:25
    //     }
    // ],(error, result)=>{
    //     if(error){
    //         console.log('Unable to insert the documents')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description:'Create the mongoDB documents',
    //         completed:true
    //     },{
    //         description:'Create the multiple documents for task manager',
    //         completed:false
    //     },{
    //         description:'Validate the value in ROBO T',
    //         completed:false
    //     }        
    // ],(error, result)=>{
    //     if(error){
    //         console.log('unable to insert the docments in the tasks')
    //     }
    //     console.log(result.ops)
    // })

    // READ THE DOCUMENTS:

    // db.collection('users').findOne({ _id:new ObjectID("609651191ecce69d01dec6d0")},(error, data)=>{
    //     if(error){
    //         console.log('User not found')
    //     }
    //     console.log(data)
    // })

    // db.collection('users').find({Age:30}).toArray((error, users)=>{
    //     console.log(users)

    // })

    // db.collection('users').find({Age:30}).count((error, count)=>{
    //     console.log(count)

    // })

    // db.collection('tasks').findOne({_id:new ObjectID("609657aa96aa89a9099b6ac2")},(error, task)=>{
    //     if(error){
    //         console.log('unable to find the record')
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed:false}).toArray((error,completionTask)=>{
    //     if(error){
    //         console.log('Error')
    //     }
    //     console.log(completionTask)
    // })

    // db.collection('tasks').find({completed:false}).count((error, count)=>{
    //     console.log(count)
    // })

    // UPDATE THE DOCUMENTS:

    //    db.collection('users').updateOne({
    //         _id: new ObjectID("609651191ecce69d01dec6d0")
    //     },{
    //         $inc:{
    //             Age:3
    //         }
    //     }).then((result)=>{
    //         console.log(result)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })

   

    // db.collection('users').updateMany({
    //     Age: 30
    // }, {
    //     $inc: {
    //         Age: 15
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // // For task manager:

    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result.matchedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // DELETE THE DOCUMENTS

    db.collection('users').deleteMany({
        Age:45
    }).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=>{
        console.log(error)
    })


    db.collection('tasks').deleteOne({
        description:'Create the mongoDB documents'
    }).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=>{
        console.log(error)
    })
})