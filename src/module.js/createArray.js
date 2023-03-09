import {tasksArrayJSON, tasksArray, currentTaskNumberJSON, currentTaskNumber} from "./date.js";
export function mapElement() {
  const tasksArrayTodo = tasksArray.filter(element => {
    if (element.state === "todo") {
      return element;
    }
  });
  return tasksArrayTodo;
}
export function addArrayElement(arr, id, title, description, user, time, state) {
  arr.push({
    id,
    title,
    description,
    user,
    time,
    state
  });
}