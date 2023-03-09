import {tasksArrayJSON, tasksArray, getTasks, currentTaskNumberJSON, currentTaskNumber} from "./date.js";
import {modalWindow, removeOnclick} from "./window.js";

export const arrayDone = tasksArray.filter(elem => {
  return elem.state === "done";
});
// End Data Block
export const liElementsDone = tasksArray
  .filter(element => {
    if (element.state === "done") {
      return element;
    }
  })
  .map(element => {
    return createDoneLiElement(element);
  });

export const doneList = createUlDone(liElementsDone);

// FUNCTION create and fill DoneList
export function createUlDone(liElement) {
  const doneUl = document.querySelector(".doneul");
  doneUl.innerHTML = "";
  doneUl.append(...liElement);
  changeCurrentNumbersDone(liElement);
  return doneUl;
}
// END FUNCTION

//FUNCTION LI elements for DONE list
export function createDoneLiElement({ id, title, description, user, time }) {
  const template = document.getElementById("template");
  const content = template.content.cloneNode(true);
  const li = content.querySelector("li");
  // create button BACK
  const editBtn = content.querySelector(".btn_edit");
  editBtn.remove();
  const moveBtn = content.querySelector(".form_btn");
  moveBtn.remove();
  const deleteBtn = content.querySelector(".btn_delete");
  deleteBtn.remove();
  const divBtn = content.querySelector(".li_btn");
  const deleteBtnDone = document.createElement("button");
  deleteBtnDone.classList.add("btn_delete_done");
  deleteBtnDone.innerText = "Delete";
  divBtn.append(deleteBtnDone);



  const titleElement = content.querySelector(".title");
  titleElement.innerText = title;
  const descripton = content.querySelector(".task_li_textarea");
  descripton.innerText = description;
  const userInput = content.querySelector(".task_li_span_user");
  userInput.innerText = user;
  const addTime = content.querySelector(".task_li_span_time");
  addTime.innerText = time;
  li.id = id;
  return li;
}

export function changeCurrentNumbersDone(arr) {
  let p = document.querySelector(".done");
  p.innerText = arr.length;
}

export function createDoneList() {
  const arrayDone = getTasks().filter(elem => {
    return elem.state === "done";
  });
  const liElements = arrayDone.map(element => {
    return createDoneLiElement(element);
  });
  createUlDone(liElements);
  changeCurrentNumbersDone(arrayDone);
}