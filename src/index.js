import {update, clockStart} from "./module.js/timer.js";
import {API, getAllUser} from "./module.js/users.js";
import {createUlList, createLiElement, changeCurrentNumbersTODO,liElementsTodo, list} from "./module.js/ulArray.js";
import {tasksArrayJSON, tasksArray, currentTaskNumberJSON, currentTaskNumber} from "./module.js/date.js";
import {liElementsProgress,progressList, createUlProgress, createProgresLiElement, changeCurrentNumbersProgress, createProgressList} from "./module.js/inProgress.js";
import {arrayDone, liElementsDone, doneList, createUlDone, createDoneLiElement, changeCurrentNumbersDone, createDoneList} from "./module.js/doneArray.js";
import {mapElement, addArrayElement} from "./module.js/createArray.js";
import {modaleWindow, container, wrapperModal, textAreaElement, titleElement, userElement, timeElement, confirmBtn, btnCancel, modalWindow} from "./module.js/window.js";

// FUNCTION create NEW LI elements WITH NEW ARRAY DATA
function addNewList(data) {
  list.innerHTML = "";
  const liElements = data.map(element => {
    return createLiElement(element);
  });
  createUlList(liElements);
}
// END FUNCTION


let modaleWarningWindow = document.getElementById("modale2");
let confirmWarningBtn = document.querySelector(".warning_modal_confirm-btn");
let cancelWarningBtn = document.querySelector(".warning_modal_cancel-btn");

const deleteAll = document.querySelector(".btn_all");
const warningWindow = {
  show(cb = () => {}) {
    container.classList.add("container_modal");
    wrapperModal.classList.add("block_wrapper_modal");
    modaleWarningWindow.classList.remove("warning_modal_delete");
    this.confirmHandler = () => {
      cb();
      this.close();
    };
    confirmWarningBtn.addEventListener("click", this.confirmHandler);
  },
  close() {
    confirmWarningBtn.removeEventListener("click", this.confirmHandler);

    container.classList.remove("container_modal");
    wrapperModal.classList.remove("block_wrapper_modal");
    modaleWarningWindow.classList.add("warning_modal_delete");
    let confirmBtn = document.querySelector('.warning_modal_confirm-btn') ;
    confirmBtn.classList.remove('confirm-display-none')
  },
  showAddWarning(cb = () => {}) {
    container.classList.add("container_modal");
    wrapperModal.classList.add("block_wrapper_modal");
    modaleWarningWindow.classList.remove("warning_modal_delete"); 
    let confirmBtn = document.querySelector('.warning_modal_confirm-btn') ;
    console.log(confirmBtn)
     confirmBtn.classList.add('confirm-display-none')


  }
};

// EVENT START
const addBtn = document.querySelector(".btn_add");
addBtn.addEventListener("click", addBtnFuncton);

function addBtnFuncton () {
  if (mapElement().length>=6){
    warningWindow.showAddWarning()
    return
  }else{
  modalWindow.show(({ title, description, user }) => {
    const result = {};
    if (description.length === 0 || title.length === 0 || user.length === 0) {
      alert("tap some note text");
      result.isError = true;
      return result;
    }
    // присваивание массиву id, заголовка, содержимого
    let options = {
      hour: "numeric",
      minute: "numeric"
    };
    addArrayElement(
      tasksArray,
      crypto.randomUUID(),
      title,
      description,
      user,
      new Date().toLocaleString("ru", options),
      "todo"
    );
    localStorage.setItem("notes", JSON.stringify(tasksArray));
    localStorage.setItem("currentTaskNumber", tasksArray.length);
    // добавить новые карты и поместить элементы в массив с индексом элементов
    addNewList(mapElement());
    return result;
  });
  }
}


function backBtnFunction(){
  if (mapElement().length>=6){
    warningWindow.showAddWarning()
    return
  }else{
    const target = event.target;
    const currentId = target.offsetParent.id;
    const indexArray = tasksArray.findIndex(({ id }) => id === currentId);
    tasksArray[indexArray].state = "todo";
    addNewList(mapElement());
    createProgressList();
  }
}


  let cancelBtn = document.querySelector('.warning_modal_cancel-btn');
  cancelBtn.addEventListener('click', () => warningWindow.close());

  window.addEventListener(
    "keydown",
    function(event) {
      if (event.keyCode == 27) {
        warningWindow.close()
      }
    }
    
  );


////удаление всех карт из столбца done

deleteAll.addEventListener("click", () =>
  warningWindow.show(() => {
    const tasksWithoutDoneTask = tasksArray.filter( task => task.state !== 'done')
    localStorage.setItem("notes", JSON.stringify(tasksWithoutDoneTask));
    localStorage.setItem("currentTaskNumber", tasksWithoutDoneTask.length);
    createDoneList();
  })
);



// ==========================

function addClickUl() {
  const target = event.target;
  const currentId = target.offsetParent.id;
  const indexArray = tasksArray.findIndex(({ id }) => id === currentId);
  if (target.className === "btn_delete") {
    tasksArray.splice(indexArray, 1);
    const arrayTodo = tasksArray.filter(elem => {
      return elem.state === "todo";
    });
    addNewList(arrayTodo);
    let p = document.querySelector(".todo");
    p.innerText = arrayTodo.length;
  }
  if (target.className === "btn_edit") {
    modalWindow.show(({ title, description, user, time }) => {
      const result = {};
      if (description.length === 0 || title.length === 0 || user.length === 0) {
        alert("tap some note text");
        result.isError = true;
        return result;
      }
      const task = tasksArray[indexArray];
      task.title = title;
      task.description = description;
      task.user = user;
      task.time = time;
      localStorage.setItem("notes", JSON.stringify(tasksArray));
      localStorage.setItem("currentTaskNumber", tasksArray.length);
      addNewList(mapElement());
      return result;
    }, tasksArray[indexArray]);
    console.log(mapElement());
  }
  if (target.className === "form_btn") {
    tasksArray[indexArray].state = "inprogress";
    /////1ST FILTER BY 'TODO' STATE
    const arrayTodo = tasksArray.filter(elem => {
      return elem.state === "todo";
    });
    createProgressList();
    addNewList(arrayTodo);
    let p = document.querySelector(".todo");
    p.innerText = arrayTodo.length;
  }
  if (target.className === "btn_back") {
    backBtnFunction()
  }
  if (target.className === "complete_btn") {
    tasksArray[indexArray].state = "done";
    const arrayDone = tasksArray.filter(elem => {
      return elem.state === "done";
    });
    console.log(arrayDone)
    createProgressList();
    changeCurrentNumbersDone(arrayDone);
    changeCurrentNumbersTODO(mapElement());
  }
  if (target.className === "btn_delete_done") {
    tasksArray.splice(indexArray, 1);
    const arrayDone = tasksArray.filter(elem => {
      return elem.state === "done";
    });
    addNewList(mapElement());
    let p = document.querySelector(".done");
    p.innerText = arrayDone.length;
  }

// 
  localStorage.setItem("notes", JSON.stringify(tasksArray));
  localStorage.setItem("currentTaskNumber", tasksArray.length);
  createDoneList();
}
list.addEventListener("click", addClickUl);
progressList.addEventListener("click", addClickUl);
doneList.addEventListener('click',addClickUl);



