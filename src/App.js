import './assets/scss/App.scss';
import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TasksList from './components/TasksList';

function App() {
  const [savedTasks, setSavedTasks] = useState([]);

  const onSubmitTask = (task) => {
    savedTasks.push(task);
    setSavedTasks([...savedTasks]);
  }

  const onDelete = (taskId) => {
    const updatedTask = savedTasks.filter(task => task.id !== taskId);
    setSavedTasks([...updatedTask]);
  }

  const onSubmitEdit = (editedTask) => {
    const updatedTasks = savedTasks.map(task => {
      if(task.id === editedTask.id) task = editedTask
      return task
    })
    setSavedTasks([...updatedTasks]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO-LIST</h1>
      </header>
      <main>
        <TaskForm onSubmitTask={onSubmitTask}/>
        <TasksList savedTasks={savedTasks} onSubmitEdit={onSubmitEdit} onDelete={onDelete}/>
      </main>
    </div>
  );
}

export default App;
