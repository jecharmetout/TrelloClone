// Data Block
export let tasksArrayJSON = localStorage.getItem("notes") || "[]";
export let tasksArray = JSON.parse(tasksArrayJSON);
export let getTasks = () => JSON.parse(localStorage.getItem("notes"))|| [];
export let currentTaskNumberJSON = localStorage.getItem("currentTaskNumber") || "";
export let currentTaskNumber = currentTaskNumberJSON;