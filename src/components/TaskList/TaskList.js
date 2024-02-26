import React, { Component } from "react";
import Task from "../Task/Task";

export default class TaskList extends Component {
  render() {
    const { todoList, time, onDeleted, onToggleCompleted } = this.props;

    const elements = todoList.map(({ label, id, completed }) => {
      return (
        <Task
          label={label}
          key={id}
          id={"t" + id}
          time={time}
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
