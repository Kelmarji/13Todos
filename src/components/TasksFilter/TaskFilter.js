import React, { Component } from "react";
import "./TaskFilter.css";
import PropTypes from "prop-types";

export default class TaskFilter extends Component {
  static defaultProps = {
    filterTodos: (e) => console.log("FilterFooter"),
  };

  static propTypes = {
    filterTodos: PropTypes.func,
  };

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
