import React, { Component } from "react";
import "./Footer.css";
import TaskFilter from "../TasksFilter";
import PropTypes from "prop-types";

export default class Footer extends Component {
  static defaultProps = {
    todoList: [],
    clearCompleted: (e) => console.log("ClearCompleted"),
    filterTodos: (e) => console.log("filterFooter"),
  };

  static propTypes = {
    todoList: PropTypes.array,
    clearCompleted: PropTypes.func,
    filterTodos: PropTypes.func,
  };

  render() {
    const { todoList, clearCompleted, filterTodos } = this.props;
    const completedTodo = todoList.filter((item) => item.completed);
    return (
      <footer className="footer">
        <span className="todo-count">
          {todoList.length - completedTodo.length} items left
        </span>
        <TaskFilter filterTodos={filterTodos} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
