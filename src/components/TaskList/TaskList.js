import React, { Component } from "react";
import Task from "../Task/Task";
import PropTypes from "prop-types";
const { formatDistanceToNow } = require("date-fns");

export default class TaskList extends Component {
  static defaultProps = {
    todoList: [],
    onDeleted: (e) => console.log("Delete"),
    onToggleCompleted: (e) => console.log("complete"),
  };

  static propTypes = {
    todoList: PropTypes.array,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
  };

  render() {
    const { todoList, onDeleted, onToggleCompleted } = this.props;

    const elements = todoList.map(({ label, id, completed, time }) => {
      return (
        <Task
          label={label}
          key={id}
          id={"t" + id}
          time={formatDistanceToNow(time)}
          onDeleted={() => {
            onDeleted(id);
          }}
          onToggleCompleted={() => {
            onToggleCompleted(id);
          }}
          completed={completed}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
