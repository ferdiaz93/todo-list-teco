import './assets/scss/App.scss';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';

function App() {
  const [savedTasks, setSavedTasks] = useState([]);
  
  const saveTask = (task, actions) => {
    savedTasks.push(task);
    setSavedTasks([...savedTasks])
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO-LIST</h1>
      </header>
      <main>
        <Formik
          initialValues={{title:"", description: ""}}
          onSubmit={(values, actions)=> {
            saveTask(values, actions)
          }}
        >
          <Form>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="What do you need to remember?" />

            <label htmlFor="description">Description</label>
            <Field id="description" name="description" placeholder="Enter your description" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
        <section className="tasks-container">
          <ol>
            {savedTasks.map((task, index) => (
              <li className="task-label" key={index}>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}

export default App;
