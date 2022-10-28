import { useState, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

import './App.css'

export const LOCAL_STORAGE_KEY = 'TASKS';

export const useLocalStorage = (key) => {
  const [value, setValue] = useState(()=> {
    const json = localStorage.getItem(key);
    return json === null || typeof json === 'undefined' ? [] : JSON.parse(json);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  } ,[value]);

  return {
    value,
    setValue,
  }
}

function TodoList({ tasks, setTasks }) {

  return (
    <ul id="todo-list">
      {tasks.length > 0 && tasks.map((task) => {

        return (
          <li key={task.id} >
            <label htmlFor="">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(event) => {
                  task.completed = event.target.checked;
                  setTasks([...tasks]);
                }}
              />
              {task.title}
            </label>
            <a onClick={() => {
              setTasks(tasks.filter((item) => {

                return item.id !== task.id;
              }));
            }}>Remove</a>
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  const {value: tasks, setValue: setTasks} = useLocalStorage(LOCAL_STORAGE_KEY);

  function handleSubmit(event){
    event.preventDefault();
    const input = event.target?.elements['new-todo-task'];

    if (input?.value === "" || input?.value == null) {

      return;
    }

    const newTask = {
      id: uuidV4(),
      title: input.value,
      completed: false,
      createAt: new Date(),
    }

    setTasks([...tasks, newTask]);

    input.value = "";
  }

  return (
    <>
      <h1>React Todo List</h1>
      <TodoList tasks={tasks} setTasks={setTasks}/>
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <input type="text" id="new-todo-task" aria-label="Enter in new todo task"/>
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default App
