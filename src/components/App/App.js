import React, { Component } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

export default class App extends Component {
  state = {
    todosData: [
      { label: "do react app", id: 1 },
      { label: "drink coffee", id: 0 },
    ],
  };

  deletedItem = (id) => {
    console.log(id);
    this.setState(({ todosData }) => {
      const newTodoData = todosData.filter((item) => item.id !== id);
      return {
        todosData: newTodoData,
      };
    });
  };

  render() {
    const { todosData } = this.state;
    return (
      <div className="todoapp">
        <NewTaskForm />
        <TaskList todoList={todosData} onDeleted={this.deletedItem} />
        <Footer todoList={todosData} />
      </div>
    );
  }
}
