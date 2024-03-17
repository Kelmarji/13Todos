import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Task from '../Task/Task';

export default class TaskList extends Component {
  static defaultProps = {
    todoList: [],
  };

  static propTypes = {
    todoList: PropTypes.array,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
  };

  render() {
    const { todoList, onDeleted, onToggleCompleted, onToggleEdit, rename, startTimer, stopTimer, timeChanger } =
      this.props;
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
  }
}
