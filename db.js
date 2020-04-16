const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/test.db'
})

const Task = db.define('task',{
    id :{
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title:{
        type:Sequelize.STRING(20),
        allowNull : false
    },
    description:{
        type: Sequelize.STRING(100)
    },
    due:
    {
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    status:{
        type:Sequelize.STRING(10),
        defaultValue:'Incomplete'
    },
    priority:{
        type:Sequelize.STRING(10),
        defaultValue:'Medium'
    }
})

const Note = db.define('note',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    notes:{
        type:Sequelize.STRING,
    }

})

module.exports={
    db, Task, Note
}