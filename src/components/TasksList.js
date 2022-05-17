import React from 'react'

const TasksList = ({savedTasks}) => {
    const onSwitchChange = (e) =>{
        console.log(e.target.checked);
    }
    return (
        <section className="tasks-container">
            {savedTasks?.length ?
                <ol>
                    {savedTasks.map((task, index) => (
                        <li className="task-label" key={index}>
                            <div className={`card text-bg-${task.priority} mb-3`}>
                                <div className="card-header">
                                    <h2>{task.title}</h2>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" checked={task.finished} onChange={onSwitchChange}/>
                                        <label class="form-check-label" htmlFor="flexSwitchCheckChecked">Terminado</label>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{task.description}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
                : null}
        </section>
    )
}

export default TasksList;