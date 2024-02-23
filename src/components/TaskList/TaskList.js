import React, { Component } from "react";
import Task from "../Task/Task";

export default class TaskList extends Component {
  render() {
    const { todoList, time, onDeleted } = this.props;

    const elements = todoList.map(({ label, id }) => {
      return (
        <Task
          label={label}
          key={id}
          id={"t" + id}
          time={time}
          onDeleted={() => {
            onDeleted(id);
          }}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
