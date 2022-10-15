import { useState, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

import './App.css'

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
  const [tasks, setTasks] = useState(()=> {
    const taskJson = localStorage.getItem('TASKS');
    return taskJson !== null ? JSON.parse(taskJson) : [];
  });

  useEffect(() => {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
  } ,[tasks]);

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
