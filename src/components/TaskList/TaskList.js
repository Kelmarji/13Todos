import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import Task from '../Task/Task';

const TaskList = (props) => {
  const { todoList, onDeleted, onToggleCompleted, onToggleEdit, rename, startTimer, stopTimer, timeChanger } = props;
  const elements = todoList.map(({ label, id, completed, time, edit, timer, timerStatus }) => {
    return (
      <Task
        timeChanger={timeChanger}
        timerStatus={timerStatus}
        startTimer={startTimer}
        stopTimer={stopTimer}
        label={label}
        key={id}
        id={id}
        timerTime={timer}
        time={formatDistanceToNow(time, { includeSeconds: true, addSuffix: true })}
        onDeleted={() => {
          onDeleted(id);
        }}
        onToggleCompleted={() => {
          onToggleCompleted(id);
        }}
        onToggleEdit={() => {
          onToggleEdit(id);
        }}
        rename={rename}
        edited={edit}
        completed={completed}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
