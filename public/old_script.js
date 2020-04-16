let submit = document.getElementById('submit')
let update = document.getElementById('update')
var modal = document.getElementById('myModal')
var span = document.getElementsByClassName('close')

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
var i=0
 
 for(i=0;i<todos.length;i++){
  var tr = document.createElement("tr")
  var id=document.createElement("td") //ID
  var task = document.createElement("td")//TITLE
  var description=document.createElement("td") //DESCRIPTION
  var due = document.createElement("td") //DUEDATE
  var done = document.createElement("td")//STATUS
  var priority = document.createElement("td")//PRIORITY
  var edit = document.createElement('input')
  
  var text = [document.createTextNode(todos[i].id),
            document.createTextNode(todos[i].title),
            document.createTextNode(todos[i].description),
            document.createTextNode(todos[i].due),
           document.createTextNode(todos[i].status),
           document.createTextNode(todos[i].priority),
           document.createTextNode('Edit'),
          ];

          /// notes"""
          
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
  edit.setAttribute('onclick','Edit('+todos[i].id+')')
  // span.id='span'+i
  // span.onclick=CloseContent(i)

  
//APPENDING THE CHILD  --- ADDING ELEMENTS TO HTML     
  tr.appendChild(id)
  tr.appendChild(task)
  tr.appendChild(description)
  tr.appendChild(due)
  tr.appendChild(done)
  tr.appendChild(priority)
  tr.appendChild(edit)
 
 
  document.getElementById("table").appendChild(tr)
  } 
 }
 
 update.onclick= async function getData(num){
  const response = await fetch(`/todos/${num}`,{
      method: 'PATCH',
      headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : `due=${due.value}&priority=${priority.value}&status=${status.value}`
  });
  const json = await response.json();
  console.log(json);
  return json;
}


async function Edit(id){
  var date = document.getElementById('due')
  var tomorrowLocal = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0,10);
  date.value = tomorrowLocal
    document.getElementById('myModal').style.display='block'
    id = Number(id)
    const update = document.getElementById("update")
    update.setAttribute('action',`/todos/${id}/`)
  }

// function Edit(id)
// {
//   let x = document.getElementById('myModal'+id)
//   x.style.display = 'block';
// }
// function CloseContent(id){
//   let y = document.getElementById('myModal'+id)
//   y.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function sortTable(n) { 
  var table; 
  table = document.getElementById("table"); 
  var rows, i, x, y, count = 0; 
  var switching = true; 
  direction="ascending"
  while (switching) { 
      switching = false; 
      var rows = table.rows; 

      for (i = 1; i < (rows.length - 1); i++) { 
          var Switch = false; 

          x = rows[i].getElementsByTagName("TD")[n]; 
          y = rows[i + 1].getElementsByTagName("TD")[n]; 

          var a = x.innerHTML.toLowerCase()
          var b = y.innerHTML.toLowerCase()
      
      if(n===5) {
          
          if(a==='high'){a=3}
         
          if(b==='high'){b=3}
          
          if(a==='medium'){a=2}
          
          if(b==='medium'){b=2}
          
          if(a==='low'){a=1}
          
          if(b==='low'){b=1}
      }
      
      if (direction == "ascending") { 
              if (a > b) 
              {   Switch = true; 
                  break; }
          } else if (direction == "descending") { 

              if (a < b) 
              {  Switch = true; 
                  break; } 
          } 
      } 
      if (Switch) { 
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
          switching = true; 
          count++; 

      } else { 
          if (count == 0 && direction == "ascending") { 
              direction = "descending"; 
              switching = true; 
          }  
      } 
  } 
} 



