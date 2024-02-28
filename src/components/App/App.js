import React, { Component } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

export default class App extends Component {
  maxId = 100;
  state = {
    todosData: [
      this.newItem("propsType"),
      this.newItem("errors"),
      this.newItem("defaultProps"),
    ],
    statusFilter: false,
    filteredTodos: [],
  };

  changeProp = (arr, id, prop) => {
    const itemId = arr.findIndex((item) => item.id === id);
    const oldItem = arr[itemId];
    const newItem = { ...oldItem, [prop]: !oldItem[prop] };
    return [...arr.slice(0, itemId), newItem, ...arr.slice(itemId + 1)];
  };

  filterTodos = (text) => {
    let newTodosData;
    if (text === "Completed") {
      newTodosData = this.state.todosData.filter((item) => item.completed);
    } else if (text === "Active") {
      newTodosData = this.state.todosData.filter((item) => !item.completed);
    } else if (text === "All") {
      newTodosData = this.state.todosData;
    }

    this.setState({
      filteredTodos: newTodosData,
      statusFilter: text !== "All",
    });
  };

  deletedItem = (id) => {
    this.setState(({ todosData }) => {
      const newTodoData = todosData.filter((item) => item.id !== id);
      return {
        todosData: newTodoData,
      };
    });
  };

  newItem(item) {
    const newItem = {
      label: item,
      id: this.maxId++,
      time: new Date().getTime(),
    };
    return newItem;
  }

  addItem = (item) => {
    this.setState(({ todosData, filteredTodos }) => {
      const newArr = [...todosData, this.newItem(item)];
      return {
        todosData: newArr,
        filteredTodos: newArr,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ todosData, filteredTodos }) => {
      return {
        todosData: this.changeProp(todosData, id, "completed"),
        filterTodos: this.changeProp(filteredTodos, id, "completed"),
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todosData }) => {
      const newTodoData = todosData.filter((item) => !item.completed);
      return {
        todosData: newTodoData,
      };
    });
  };

  render() {
    const { todosData, statusFilter, filteredTodos } = this.state;
    return (
      <div className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          onDeleted={this.deletedItem}
          onToggleCompleted={this.onToggleCompleted}
          todoList={statusFilter ? filteredTodos : todosData}
        />
        <Footer
          todoList={todosData}
          clearCompleted={this.clearCompleted}
          filterTodos={this.filterTodos}
        />
      </div>
    );
  }
}
