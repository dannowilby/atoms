import React from 'react';
import useTimeSince from '../../lib/useTimeSince';

const formatTime = (passed_time) => {
    const days = Math.floor(passed_time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((passed_time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((passed_time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((passed_time % (1000 * 60)) / (1000));

    const f = (n) => {
        if(n < 10)
            return `0${n}`
        else
            return n;
    }

    return `${f(days)}:${f(hours)}:${f(minutes)}:${f(seconds)}`;
}

const CurrentTask = ({ task, endTask }) => {

    let elapsed = useTimeSince(Date.parse(task.created_at));

    return (
        <div>
            <h2 aria-label='Current task name'>{task.name}</h2>
            <p>{formatTime(elapsed)}</p>
            <button aria-label='End task' onClick={endTask(task.name)}>Mark as completed</button>
        </div>
    );
};

export default CurrentTask;