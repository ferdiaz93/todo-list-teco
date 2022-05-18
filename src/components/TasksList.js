import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik';
import Task from './Task';

const TasksList = ({ savedTasks, onSubmitEdit, onDelete }) => {
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

    const onSwitchChange = (e, task) => {
        console.log(e.target.checked);
        task.finished = e.target.checked;
        onSubmitEdit(task);
    }
    
    const editTask = (values, actions) => {
        values.id = editingTask.id;
        onSubmitEdit(values);
    }
    
    return (
        <section className="tasks-container">
            {savedTasks?.length ?
                <ol>
                    {savedTasks.map((task) => (
                        <li className="task-label" key={task.id}>
                            <Task 
                                task={task} 
                                onSwitchChange={onSwitchChange} 
                                handleEditButton={handleEditButton} 
                                onDelete={onDelete}/>
                        </li>
                    ))}
                </ol>
            : null}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    {editingTask ? 
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editModalLabel">Editar Tarea</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Formik
                                    initialValues={{ 
                                        title: editingTask.title, 
                                        description: editingTask.description, 
                                        priority: editingTask.priority, 
                                        finished: editingTask.finished 
                                    }}
                                    onSubmit={async (values, actions) => editTask(values, actions)}>
                                    {({ errors, touched }) => (
                                        <Form>
                                            <div>
                                                <label htmlFor="title">Title</label>
                                                <Field
                                                    validate={validate}
                                                    name="title"
                                                    placeholder="What do you need to remember?"
                                                    className={`form-control ${errors.title && touched.title ? "is-invalid" : ""}`}/>
                                                {errors.title && touched.title ? <div className="invalid-feedback">{errors.title}</div> : null}
                                            </div>
                                            <div>
                                                <label htmlFor="description">Description</label>
                                                <Field
                                                    validate={validate}
                                                    name="description"
                                                    placeholder="Enter your description"
                                                    as="textarea"
                                                    className={`form-control ${errors.description && touched.description ? "is-invalid" : ""}`} />
                                                {errors.description && touched.description ? <div className="invalid-feedback">{errors.description}</div> : null}
                                            </div>
                                            <div>
                                                <label htmlFor="description">Priority</label>
                                                <Field id="priority" name="priority" as="select" className="form-select">
                                                    <option value="light">Low</option>
                                                    <option value="warning">Medium</option>
                                                    <option value="danger">High</option>
                                                </Field>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancelEdit}>Close</button>
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary" 
                                                    data-bs-dismiss="modal" 
                                                    disabled={errors.description || errors.title}>Save changes</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    : null}
                </div>
            </div>
        </section>
    )
}

export default TasksList;