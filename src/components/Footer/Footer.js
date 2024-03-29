import React from 'react';

import './Footer.css';
import TaskFilter from '../TasksFilter';

const Footer = (props) => {
  const { todoList, clearCompleted, filterTodos, filterSts } = props;
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
};

export default Footer;
