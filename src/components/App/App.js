import React, { Component } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

export default class App extends Component {

  maxId = 100
  state = {
    todosData: [
    ],
  };

  deletedItem = (id) => {
    this.setState(({ todosData }) => {
      const newTodoData = todosData.filter((item) => item.id !== id);
      return {
        todosData: newTodoData,
      };
    });
  };

  addItem = (item) => {
    const newItem = {
      label: item, 
      id: this.maxId++
    }
    this.setState(({todosData})=>{
      const newArr = [...todosData,newItem]
      return {
      todosData: newArr
      }
    })
  }

  render() {
    const { todosData } = this.state;
    return (
      <div className="todoapp">
         <NewTaskForm addItem={this.addItem} />
        <TaskList todoList={todosData} onDeleted={this.deletedItem} />
        <Footer todoList={todosData} />
      </div>
    );
  }
}
