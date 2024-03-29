import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import Task from '../Task/Task';

const filterTodo = (arr, text) => {
  let todosList = [];
  if (text === 'Completed') {
    todosList = arr.filter((item) => item.completed);
  }
  if (text === 'Active') {
    todosList = arr.filter((item) => !item.completed);
  }
  if (text === 'All') {
    todosList = arr;
  }
  return todosList;
};

const TaskList = (props) => {
  const { todoList, onDeleted, onToggleCompleted, onToggleEdit, rename, startTimer, stopTimer, filter, play, pause } =
    props;

  const elements = filterTodo(todoList, filter).map(({ label, id, completed, time, edit, timer, timerStatus }) => {
    return (
      <Task
        pause={pause}
        play={play}
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
