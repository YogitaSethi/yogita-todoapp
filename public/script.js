let submit = document.getElementById('submit')
let update = document.getElementsByClassName('update')
var modal = document.getElementsByClassName('modal')
var span = document.getElementsByClassName('close')
let dueDate = document.getElementsByClassName("due");
let prio = document.getElementsByClassName("priority");
let status = document.getElementsByClassName("status");
let noName = document.getElementById("table_div")
let noNote = document.getElementsByClassName("note-close");
let table = document.getElementById("table");

//default value of date
var date = document.getElementById('due')
var tomorrowLocal = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0,10);
date.value = tomorrowLocal


var coll = document.getElementsByClassName("collapsible")
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active")
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none"
    } else {
      content.style.display = "block"
    }
  });
}

window.onload= async function getTodos() {
  const resp = await fetch('/todos', { method: 'GET' })
  const todos = await resp.json()
 
 for(let i=0;i<todos.length;i++){
  var tr = document.createElement("tr")
  var id=document.createElement("td") //ID
  var task = document.createElement("td")//TITLE
  var description=document.createElement("td") //DESCRIPTION
  var due = document.createElement("td") //DUEDATE
  var done = document.createElement("td")//STATUS
  var priority = document.createElement("td")//PRIORITY
  var edit = document.createElement("td")
  edit.classList.add('btn');
  
  var text = [document.createTextNode(todos[i].id),
            document.createTextNode(todos[i].title),
            document.createTextNode(todos[i].description),
            document.createTextNode(todos[i].due),
           document.createTextNode(todos[i].status),
           document.createTextNode(todos[i].priority),
           document.createTextNode('Edit'),
          ];

          /// notes"""
  
  noName.innerHTML += "<div class='modal'>"+
     "<div class='modal-content'>"+
          "<span class='close'>&times;</span>"+
          // "<form action='/todos' method=''>"+
             "<input type='date' name='due' class='due'><br>"+
             "<select name='priority' class='priority'>"+
                 "<option value='High'>High</option>"+
                 "<option value='Medium'>Medium</option>"+
                 "<option value='Low'>Low</option>"+
             "</select>"+"<br>"+
            //  "<input type='checkbox' class='status' name='taskComplted'>"+
            "<select class='status'>"+
              "<option value='Incomplete'>Incomplete</option>"+
              "<option value='Complete'>Complete</option>"+
              "</select>"+"<br>"+
            //  "<label for='completed'> completed</label><br>"+
             "<input type='button' value='Update' name='update' onclick='updateData("+(i+1)+")' class='update'>"+
          // "</form>"+
     "</div>"+
"</div>" 

 //APPENDING THE CHILD  --- FILLING DATA        
  id.appendChild(text[0])
  task.appendChild(text[1])
  description.appendChild(text[2])
  due.appendChild(text[3])
  done.appendChild(text[4])
  priority.appendChild(text[5])
  edit.appendChild(text[6])
  edit.id='myEditForm'+i
  edit.type ='button'
  edit.value ='edit'
  edit.setAttribute('onclick','Edit('+i+')')
  span[i].id='span'+i
  span[i].setAttribute('onclick','CloseContent('+i+')')
  modal[i].id = "popup"+i
  status[i].id = "status"+i
  prio[i].id = "priority"+i
  dueDate[i].id = "due"+i

  
//APPENDING THE CHILD  --- ADDING ELEMENTS TO HTML     
  tr.appendChild(id)
  tr.appendChild(task)
  tr.appendChild(description)
  tr.appendChild(due)
  tr.appendChild(done)
  tr.appendChild(priority)
  tr.appendChild(edit)
  tr.setAttribute('onclick','view('+todos[i].id+')')
  // update[i].onclick= updateData(i);
  document.getElementById("table").appendChild(tr)
  } 
 }

function Edit(id)
{
  let x = document.getElementById('popup'+id)
  x.style.display = 'block';
}


async function view(id)
{

  const resp = await fetch("todos/"+id+"/notes")
  const json = await resp.json();
  console.log(json);

  table.innerHTML += "<div id='note-hide"+i+"' class='note-pop'>"+
"<span class=''note-close'>&times;</span>"+
"<div class='inner'>"+
    "<ol class='list'>";
        for (let i = 0 ; i<json.length;i++){
          table.innerHTML += "<li>"+json[i].notes+"</li>";
        }
    table.innerHTML = "</ol>"+
    "<span class='text'>add new note</span><br>"+
    "<input class='note-input' type='text' id='new-note-"+id+"'>"+
"<button class='note-button'>Add</button>"+
"</div>"+
"</div>"

let elem = document.getElementById(`note-hide${id}`);
elem.style.display = "block";
}
function CloseContent(id){
  let x = document.getElementById('popup'+id)
  x.style.display = "none";
}

async function updateData(num){
  let priority = document.getElementById("priority"+num);
  let s = document.getElementById("status"+num)
  let date = document.getElementById("due"+num)
  console.log(date.value);
  const response = await fetch(`/todos/${num}`,{
      method: 'PATCH',
      headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : `due=${date.value}&priority=${priority.value}&status=${s.value}`
  });
  const json = await response.json();
  console.log(json);
  return json;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



