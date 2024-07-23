import React, { useState } from 'react';

const NewTask = ({ createNewTask }) => {

    const [input, setInput] = useState("");

    return (
        <div>
            <h3>Start a task</h3>
            <input aria-label='New task name' type="text" placeholder="Task name" value={input} onInput={e => setInput(e.target.value)} />
            <button aria-label='Create task' onClick={createNewTask(input)}>Submit</button>
        </div>
    );
}

export default NewTask;