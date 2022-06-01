let taskInput = document.getElementById('task-input');
let plusBtn = document.getElementById('plus-btn');
let taskList = [];
plusBtn.addEventListener('click', addTask);

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
  for(let i = 0; i< taskList.length; i++){
    if(taskList[i].isComplete == true){
      resultHTML += `
        <div class="task-done">
          <div class="task-done-text">${taskList[i].taskContent}</div>
          <div class="task-done-btn">
            <button class="check-btn" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
            <button class="cancel-btn" onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>`
    } else{
        resultHTML += 
        `<div class="task">
          <div class="task-text">${taskList[i].taskContent}</div>
          <div>
            <button class="check-btn" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button class="cancel-btn" onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
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
      taskList.splice(i,1);
      break;
    }
  }
  console.log(taskList);
  render();
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substring(2,9);
}