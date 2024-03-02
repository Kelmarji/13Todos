import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

const { formatDistanceToNow } = require('date-fns');

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
    const { todoList, onDeleted, onToggleCompleted, onToggleEdit, rename } = this.props;

    const elements = todoList.map(({ label, id, completed, time, edit }) => {
      return (
        <Task
          label={label}
          key={id}
          id={id}
          time={formatDistanceToNow(time)}
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
