import { v4 as uuidV4 } from 'uuid';

import './style.css'

const list = document.querySelector<HTMLUListElement>('#todo-list');
const form = document.querySelector<HTMLFormElement>('#new-todo-form');
const input = document.querySelector<HTMLInputElement>('#new-todo-task');

type Task = {
  id: string;
  title: string;
  completed: boolean;
}

let tasks: Task[] = loadTasks();
renderList();

form?.addEventListener('submit', event => {
  event.preventDefault();

  if (input?.value === "" || input?.value == null) {

    return;
  }

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
  }

  tasks.push(newTask);
  addListItem(newTask);
  input.value = "";
  saveTasks();
});

function renderList(): void {
  if (list === null) {

    return;
  }

  list.innerHTML = "";
  tasks.forEach(addListItem);
}

function addListItem(task: Task): void {
  const listItem = document.createElement('li');
  const anchor = document.createElement('a');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');

  anchor.innerText = 'Remove';
  anchor.addEventListener('click', () => {
    tasks = tasks.filter((item) => {

      return item.id !== task.id;
    });
    saveTasks();
    renderList();
  });

  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });

  label.append(checkbox, task.title);
  listItem.append(label, anchor);
  list?.append(listItem);
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem('TASKS');
  if (taskJson === null) {

    return [];
  }

  return JSON.parse(taskJson);
}

function saveTasks(): void {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}
