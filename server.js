const express = require('express')
const todoRoute = require('./routes/todos')
const {db} = require('./db')

const app= express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use('/', express.static(__dirname+'/public'))
app.use('/todos',todoRoute)

db.sync()
    .then(()=>{
        app.listen(6543,()=>{
             console.log("Server has started")
            })
    })
    .catch((err)=>{
        console.error(err)
    })
