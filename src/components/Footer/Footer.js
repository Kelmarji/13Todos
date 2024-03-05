import React, { Component } from 'react';
import './Footer.css';
import PropTypes from 'prop-types';

import TaskFilter from '../TasksFilter';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
    };
  }

  static propTypes = {
    todoList: PropTypes.array,
    clearCompleted: PropTypes.func,
    filterTodos: PropTypes.func,
  };

  render() {
    const { todoList, clearCompleted, filterTodos, filterSts } = this.props;
    const completedTodo = todoList.filter((item) => item.completed);
    return (
      <footer className="footer">
        <span className="todo-count">{todoList.length - completedTodo.length} items left</span>
        <TaskFilter filterStatus={filterSts} filterTodos={filterTodos} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
