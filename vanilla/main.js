import { v4 as uuidV4 } from 'uuid';

import './style.css'

const list = document.querySelector('#todo-list');
const form = document.querySelector('#new-todo-form');
const input = document.querySelector('#new-todo-task');
export const LOCAL_STORAGE_KEY = 'TASKS';

let tasks = loadTasks();
renderList();

form?.addEventListener('submit', event => {
  event.preventDefault();

  if (input?.value === "" || input?.value == null) {

    return;
  }

  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
  }

  tasks.push(newTask);
  addListItem(newTask);
  input.value = "";
  saveTasks(tasks);
});

function renderList() {
  if (list === null) {

    return;
  }

  list.innerHTML = "";
  tasks.forEach(addListItem);
}

function addListItem(task) {
  const listItem = document.createElement('li');
  const anchor = document.createElement('a');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');

  anchor.innerText = 'Remove';
  anchor.addEventListener('click', () => {
    tasks = tasks.filter((item) => {

      return item.id !== task.id;
    });
    saveTasks(tasks);
    renderList();
  });

  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks(tasks);
  });

  label.append(checkbox, task.title);
  listItem.append(label, anchor);
  list?.append(listItem);
}

export function loadTasks() {
  const taskJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (taskJson === null || typeof taskJson === 'undefined') {

    return [];
  }

  return JSON.parse(taskJson);
}

export function saveTasks(tasks) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}
