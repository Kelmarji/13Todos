import React, { Component } from "react";
import "./TaskFilter.css";

export default class TaskFilter extends Component {
  render() {
    const { filterTodos } = this.props;
    return (
      <ul className="filters">
        <li>
          <button onClick={() => filterTodos("All")}>All</button>
        </li>
        <li>
          <button onClick={() => filterTodos("Active")}>Active</button>
        </li>
        <li>
          <button onClick={() => filterTodos("Completed")}>Completed</button>
        </li>
      </ul>
    );
  }
}
