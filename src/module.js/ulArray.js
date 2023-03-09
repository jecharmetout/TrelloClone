import {tasksArrayJSON, tasksArray, currentTaskNumberJSON, currentTaskNumber} from "./date.js";


export const liElementsTodo = tasksArray
  .filter(element => {
    if (element.state === "todo") {
      return element;
    }
  })
  .map(element => {
    return createLiElement(element);
  });

export const list = createUlList(liElementsTodo);
export function createUlList(liElement) {
  const ul = document.querySelector(".todoul");
  ul.append(...liElement);
  let p = document.querySelector(".todo");
  p.innerText = liElement.length;
  return ul;

}
export function createLiElement({ id, title, description, user, time }) {
  const template = document.getElementById("template");
  const content = template.content.cloneNode(true);
  const li = content.querySelector("li");
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

export function changeCurrentNumbersTODO(arr) {
  let p = document.querySelector(".todo");
  p.innerText = arr.length;
}