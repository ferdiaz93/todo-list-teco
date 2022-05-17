import React from 'react'
import { Formik, Field, Form } from 'formik';

const TaskForm = ({ onSubmitTask }) => {

    const validate = value => {
        let errorMessage;
        if (!value) {
            errorMessage = 'Required field';
        }
        return errorMessage;
    };
    const saveTask = (task, actions) => {
        console.log(task);
        onSubmitTask(task)
    }

    return (
        <Formik
            initialValues={{ title: "", description: "", priority: "low", finished: false }}
            onSubmit={async (values, actions) => saveTask(values, actions)}>
            {({ errors, touched }) => (
                <Form>
                    <div>
                        <label htmlFor="title">Title</label>
                        <Field 
                            validate={validate} 
                            name="title" 
                            placeholder="What do you need to remember?" 
                            className={`form-control ${errors.title && touched.title ? "is-invalid" : ""}`} />
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

                    <button type="submit" className="btn btn-primary">Create</button>
                </Form>
            )}
        </Formik>
    )
}

export default TaskForm;