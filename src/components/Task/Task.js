import React from 'react';

import CurrentTask from './CurrentTask';
import NewTask from './NewTask';

const Task = ({ currentTask, createTask, endTask }) => {
  return (
    <>
      {currentTask ? <CurrentTask task={currentTask} endTask={endTask} /> : <NewTask createNewTask={createTask} />}
    </>
  );
}

export default Task;
