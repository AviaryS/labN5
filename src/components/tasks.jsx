import React, {useState} from 'react';

const Tasks = () => {
    const [tasks, setTasks] = useState([
        { id: 1, name: "task 1"},
        { id: 2, name: "task 2"},
        { id: 3, name: "task 3"}
    ]);

    const [name, setName] = useState("");
    const [editedId, setEditedId] = useState(null);
    const [taskId, setTaskId] = useState(4);

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id != id));
    };

    const addTask = () => {
        setEditedId(null);
        setTasks([
            ...tasks,
            {
                id: taskId,
                name: name,
            },
        ]);
        setTaskId(taskId + 1);
        setName("");
    };

    const editTask = (task) => {
        setEditedId(task.id);
        setName(task.name);
    }

    const handleChange = (value, set, prop) => {
        set(value);
        if (editedId) {
            setTasks(
                tasks.map((prod) =>
                    prod.id === editedId ? { ...prod, [prop]: value } : prod
                )
            );
        }
    };

    const taskCompleted = () => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    }

    return (
        <div className="row">
            <div className="task__form">
                <input
                    placeholder="Add Todo..."
                    type="text"
                    value={name}
                    className="input"
                    onChange={event =>
                        handleChange(event.target.value, setName, "name")
                    }
                />
                <button onClick={addTask} className="button">Добавить</button>
            </div>

            <div>
                {tasks.map((task) => (
                    <div className="tasks">
                        <div className="task">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => taskCompleted(task.id)}
                            />
                            <p>{task.name}</p>
                            <button onClick={() => editTask(task)} className="task__edit">
                                Edit
                            </button>
                            <button onClick={() => removeTask(task.id)} className="task__delete">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tasks;