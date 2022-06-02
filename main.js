let taskInput = document.getElementById('task-input');
let plusBtn = document.getElementById('plus-btn');
let underLine = document.getElementById('under-line');
let tabs = document.querySelectorAll(".task-tabs div");
let menuId = 'all';
let taskList = [];
let filterList = [];
let doneList = [];
plusBtn.addEventListener('mousedown', addTask);
taskInput.addEventListener("keyup" ,function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});
console.log(tabs);

for(let i = 1; i<tabs.length; i++){
  tabs[i].addEventListener('click', function(event){
    filter(event)})
}

function filter(event){
  filterList = [];
  doneList = [];
  menuId = event.target.id;
  document.getElementById("under-line").style.width = event.target.offsetWidth + "px";
  document.getElementById("under-line").style.top = event.target.offsetTop + event.target.offsetHeight + "px";
  document.getElementById("under-line").style.left = event.target.offsetLeft + "px";
  if(menuId == 'all'){
    render();
  } else if (menuId == 'ongoing'){
      for(let i = 0; i<taskList.length; i++){
        if(taskList[i].isComplete == false){
          filterList.push(taskList[i]);
        }
      }
      render();
  } else if(menuId == 'done'){
    for(let i =0; i< taskList.length; i++){
      if(taskList[i].isComplete == true){
        doneList.push(taskList[i])
      }
    }
    render();
  }
}; 

function addTask(){
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  }
  taskList.push(task);
  console.log(taskList);
  render();
}

function render(){
  let resultHTML = "";
  let list = [];
  if(menuId == 'all'){
    list = taskList;
  } else if(menuId == 'ongoing'){
    list = filterList;
  } else if(menuId == 'done'){
    list = doneList;
  }

  for(let i = 0; i< list.length; i++){
    if(list[i].isComplete){
      resultHTML += `
        <div class="task-done">
          <div class="task-done-text">${list[i].taskContent}</div>
          <div class="task-done-btn">
            <button class="check-btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
            <button class="cancel-btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>`
    } else{
        resultHTML += 
        `<div class="task">
          <div class="task-text">${list[i].taskContent}</div>
          <div>
            <button class="check-btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button class="cancel-btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>`;
    }

    taskInput.value = "";
  }
  document.getElementById('task-board').innerHTML = resultHTML;
};

function toggleComplete(id){
  console.log("id:",id);
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      if(menuId == 'all'){
        taskList.splice(i,1);
        break;
      } else if(menuId == 'ongoing'){
        console.log(filterList.indexOf(taskList[i]));
        filterList.splice(filterList.indexOf(taskList[i]),1);
        taskList.splice(i,1);
      } else if(menuId == 'done'){
        doneList.splice(doneList.indexOf(taskList[i]),1);
        taskList.splice(i,1);
      }
    }
  }
  console.log(taskList);
  render();
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substring(2,9);
}