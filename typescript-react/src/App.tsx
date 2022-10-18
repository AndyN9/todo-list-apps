import { useState, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

import './App.css'

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createAt: Date;
}

type TasksDispatch = React.Dispatch<React.SetStateAction<Task[]>>;

function TodoList({
  tasks,
  setTasks
}: {
  tasks: Task[];
  setTasks: TasksDispatch;
} ) {

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
  const [tasks, setTasks] = useState<Task[]>(()=> {
    const taskJson = localStorage.getItem('TASKS');
    return taskJson !== null ? JSON.parse(taskJson) : [];
  });

  useEffect(() => {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
  } ,[tasks]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void{
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const input = target?.elements['new-todo-task' as unknown as number] as HTMLInputElement;

    if (input?.value === "" || input?.value == null) {

      return;
    }

    const newTask: Task = {
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
