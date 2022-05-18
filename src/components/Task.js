import React from 'react'

const Task = ({task, onSwitchChange, handleEditButton, onDelete}) => {
    return(
        <div className={`card text-bg-${task.priority} ${task.finished ? "completed" : ""} mb-3`}>
            <div className="card-header d-flex align-items-center justify-content-between">
                <h2>{task.title}</h2>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" checked={task.finished} onChange={(e) => onSwitchChange(e, task)} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{task.finished ? "Completed" : "Incompleted"}</label>
                </div>
                <div className="buttons-container">
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        data-bs-toggle="modal" 
                        data-bs-target="#editModal" 
                        onClick={() => handleEditButton(task)}
                        disabled={task.finished}>
                        Edit
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={() => onDelete(task.id)}>
                        Delete
                    </button>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{task.description}</p>
            </div>
        </div>
    )
}

export default Task