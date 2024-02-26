import React, { Component } from "react";
import "./Footer.css";
import TaskFilter from "../TasksFilter";

export default class Footer extends Component {
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

// сделать два стэйта 1 анфильтеред 2 фильтеред и меня фильтер используя анфильтеред
