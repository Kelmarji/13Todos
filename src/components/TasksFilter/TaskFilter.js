import React, { Component } from "react";
import "./TaskFilter.css";

export default class TaskFilter extends Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button>All</button>
        </li>
        <li>
          <button>Active</button>
        </li>
        <li>
          <button>Completed</button>
        </li>
      </ul>
    );
  }
}
