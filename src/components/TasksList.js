import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik';

const TasksList = ({ savedTasks }) => {
    const [ editingTask, setEditingTask ] = useState(null);

    const validate = value => {
        let errorMessage;
        if (!value) {
            errorMessage = 'Required field';
        }
        return errorMessage;
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    }

    const handleEditButton = (task) => {
        setEditingTask(task);
    }

    const onSwitchChange = (e) => {
        console.log(e.target.checked);
    }
    
    const editTask = (values, actions) => {
        console.log(values);
    }

    return (
        <section className="tasks-container">
            {savedTasks?.length ?
                <ol>
                    {savedTasks.map((task, index) => (
                        <li className="task-label" key={index}>
                            <div className={`card text-bg-${task.priority} mb-3`}>
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <h2>{task.title}</h2>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" checked={task.finished} onChange={onSwitchChange} />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{task.finished ? "Completed" : "Incompleted"}</label>
                                    </div>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEditButton(task)}>
                                        Edit task
                                    </button>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{task.description}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
                : null}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editar Tarea</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {editingTask ? 
                                <Formik
                                    initialValues={{ title: "", description: "", priority: "low", finished: false }}
                                    onSubmit={async (values, actions) => editTask(values, actions)}>
                                    {({ errors, touched }) => (
                                        <Form>
                                            <div>
                                                <label htmlFor="title">Title</label>
                                                <Field
                                                    validate={validate}
                                                    name="title"
                                                    placeholder="What do you need to remember?"
                                                    className={`form-control ${errors.title && touched.title ? "is-invalid" : ""}`}
                                                    value={editingTask.title}/>
                                                {errors.title && touched.title ? <div className="invalid-feedback">{errors.title}</div> : null}
                                            </div>
                                            <div>
                                                <label htmlFor="description">Description</label>
                                                <Field
                                                    validate={validate}
                                                    name="description"
                                                    placeholder="Enter your description"
                                                    as="textarea"
                                                    className={`form-control ${errors.description && touched.description ? "is-invalid" : ""}`} 
                                                    value={editingTask.description} />
                                                {errors.description && touched.description ? <div className="invalid-feedback">{errors.description}</div> : null}
                                            </div>
                                            <div>
                                                <label htmlFor="description">Priority</label>
                                                <Field id="priority" name="priority" as="select" className="form-select" value={editingTask.priority}>
                                                    <option value="light">Low</option>
                                                    <option value="warning">Medium</option>
                                                    <option value="danger">High</option>
                                                </Field>
                                            </div>

                                            <button type="submit" className="btn btn-primary">Create</button>
                                        </Form>
                                    )}
                                </Formik>
                            : null}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancelEdit}>Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TasksList;