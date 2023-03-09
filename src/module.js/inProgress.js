import {tasksArrayJSON, tasksArray, currentTaskNumberJSON, currentTaskNumber} from "./date.js";
export const liElementsProgress = tasksArray
  .filter(element => {
    if (element.state === "inprogress") {
      return element;
    }
  })
  .map(element => {
    return createProgresLiElement(element);
  });
export const progressList = createUlProgress(liElementsProgress);

// FUNCTION create and fill ProgressList
export function createUlProgress(liElement) {
  const progressUl = document.querySelector(".progressul");
  progressUl.innerHTML = "";
  progressUl.append(...liElement);
  changeCurrentNumbersProgress(liElement);
  return progressUl;
}

// FUNCTION create LI elements for PROGRESS list
export function createProgresLiElement({ id, title, description, user, time }) {
  const template = document.getElementById("template");
  const content = template.content.cloneNode(true);
  const li = content.querySelector("li");
  // create button BACK
  const editBtn = content.querySelector(".btn_edit");
  editBtn.remove();
  const divBtn = content.querySelector(".li_btn");
  const backBtn = document.createElement("button");
  backBtn.classList.add("btn_back");
  backBtn.innerText = "Back";
  divBtn.append(backBtn);
  /////////////end////////////
  // create button COMPLETE
  const deleteBtn = content.querySelector(".btn_delete");
  deleteBtn.remove();
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete_btn");
  completeBtn.innerText = "Complete";
  divBtn.append(completeBtn);
  /////////////end////////////
  //////////delete move button///////
  const moveBtn = content.querySelector(".form_btn");
  moveBtn.remove();
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

export function changeCurrentNumbersProgress(arr) {
  let p = document.querySelector(".progress");
  p.innerText = arr.length;
}

export function createProgressList() {
  const arrayProgress = tasksArray.filter(elem => {
    return elem.state === "inprogress";
  });
  const liElements = arrayProgress.map(element => {
    return createProgresLiElement(element);
  });
  createUlProgress(liElements);
  changeCurrentNumbersProgress(arrayProgress);
}