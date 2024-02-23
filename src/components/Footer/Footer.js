import React, { Component } from "react";
import "./Footer.css";
import TaskFilter from "../TasksFilter";

export default class Footer extends Component {
  render() {
    const { todoList } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{todoList.length} items left</span>
        <TaskFilter />
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}
