const {Router} = require('express')
const {Task, Note} = require('../db')
const route = Router()


//Mapping
Task.hasMany(Note);
Note.belongsTo(Task);


//--------------------------------------GET ROUTES-----------------------------------------------------
route.get('/',async (req,res)=>
{
    const todo = await Task.findAll()
    res.send(todo)
})

route.get('/:id',async (req,res)=>
{
    if(isNaN(Number(req.params.id))){
      return res.status(400).send({
        error:"Todo id must be an integer"
     } )        
    
    }
    const todo = await Task.findByPk(req.params.id)
   
    if(!todo){
        return res.status(404).send(
            {
                error:"No todo found with id = "+req.params.id
            })
           
    }
    res.send(todo)   
})


route.get('/:id/notes',async (req,res)=>
{
    if(isNaN(Number(req.params.id))){
      return res.status(400).send({
        error:"Todo id must be an integer"
     } )        
    
    }
    const task = await Task.findByPk(parseInt(req.params.id))
    const taskNotes = await task.getNotes()
    res.send(taskNotes)   
})

//------------------------------------------POST ROUTES ---------------------------------------------------
route.post('/',async (req,res)=>
{
    if (typeof req.body.title !== 'string') {
        return res.status(400).send({ error: 'Task name not provided' })
    }
   
     const newTask = await Task.create(
         {
            title:req.body.title,
            description: req.body.description,
            due: new Date(req.body.due),
            status: req.body.status,
            priority:req.body.priority
         })

    res.redirect('/')
  //  res.status(201).send({success:'New Task added', data:newTask})
})

route.post('/:id/notes',async (req,res)=>
{
    if (typeof req.body.note !== 'string') {
        return res.status(400).send({ error: 'Note name not provided' })
    }
    
    console.log(req.body)
    const data = {'notes':req.body.note};
    Note.create(data).then(async (note)=>{
        const task = await Task.findByPk(parseInt(req.params.id));
        task.addNotes(note);
        return res.status(201).send({success:'New Note added',data:note});
    }).catch((err)=>{
        return res.status(400).send({'error':err});
    });
})

//---------------------------PATCH ROUTE------------------------------------------------------
route.patch('/:id', async (req, res) => {
    if (isNaN(Number(req.params.id))) {
      return res.status(400).send({
        error: 'todo id must be an integer',
      })
    }

    let status = req.body.status
    let date = new Date(req.body.due);
    console.log(req.body);
    Task.update({status:status,due:date,priority:req.body.priority},{
      where:{
        id: parseInt(req.params.id)
      }
    }).then(()=>{
      return res.send({"message":"Updated"})
    }).catch((err)=>{
      return res.send({'error':err});
    })
  })

module.exports=route