/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class App extends Component {
  state = {
    maxId: 100,
    todosData: [],
    statusFilter: false,
    filteredTodos: [],
    filter: 'All',
  };

  changeProp = (arr, id, prop) => {
    const itemId = arr.findIndex((item) => item.id === id);
    const oldItem = arr[itemId];
    const newItem = { ...oldItem, [prop]: !oldItem[prop] };
    return [...arr.slice(0, itemId), newItem, ...arr.slice(itemId + 1)];
  };

  changeName = (arr, id, prop, newText) => {
    const itemId = arr.findIndex((item) => item.id === id);
    const oldItem = arr[itemId];
    const newItem = { ...oldItem, [prop]: newText, completed: false };
    return [...arr.slice(0, itemId), newItem, ...arr.slice(itemId + 1)];
  };

  filterTodos = (text) => {
    let newTodosData;
    if (text === 'Completed') {
      newTodosData = this.state.todosData.filter((item) => item.completed);
    } else if (text === 'Active') {
      newTodosData = this.state.todosData.filter((item) => !item.completed);
    } else if (text === 'All') {
      newTodosData = this.state.todosData;
    }

    this.setState({
      filteredTodos: newTodosData,
      statusFilter: text !== 'All',
      filter: text,
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

  newItem(item, timerTime) {
    const newItem = {
      label: item,
      id: this.state.maxId,
      time: new Date().getTime(),
      edit: false,
      timer: timerTime,
    };
    return newItem;
  }

  addItem = (item, timerTime) => {
    this.setState(({ todosData, maxId }) => {
      const maxIdNewNumber = maxId + 1;
      const newArr = [...todosData, this.newItem(item, timerTime)];
      return {
        todosData: newArr,
        filteredTodos: newArr,
        maxId: maxIdNewNumber,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ todosData, filteredTodos }) => {
      return {
        todosData: this.changeProp(todosData, id, 'completed'),
        filterTodos: this.changeProp(filteredTodos, id, 'completed'),
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

  onToggleEdit = (id) => {
    this.setState(({ todosData, filteredTodos }) => {
      return {
        todosData: this.changeProp(todosData, id, 'edit'),
        filterTodos: this.changeProp(filteredTodos, id, 'edit'),
      };
    });
  };

  rename = (id, newText) => {
    const itemId = this.state.todosData.findIndex((item) => item.id === id);
    if (itemId !== -1) {
      this.setState(({ todosData, filteredTodos }) => {
        return {
          todosData: this.changeName(todosData, id, 'label', newText),
          filterTodos: this.changeName(filteredTodos, id, 'label', newText),
        };
      });
      this.setState(({ todosData, filteredTodos }) => {
        return {
          todosData: this.changeProp(todosData, id, 'edit'),
          filteredTodos: this.changeProp(filteredTodos, id, 'edit'),
        };
      });
    }
  };

  startTimer = (id, timeStart) => {
    const itemId = this.state.todosData.findIndex((item) => item.id === id);
    if (itemId !== -1) {
      this.setState(({ todosData, filteredTodos }) => {
        console.log(todosData);
        if (timeStart > 0) {
          return {
            todosData: this.changeName(todosData, id, 'timer', timeStart),
            filterTodos: this.changeName(filteredTodos, id, 'timer', timeStart),
          };
        }
        return {
          todosData: this.changeName(todosData, id, 'timer', 0),
          filterTodos: this.changeName(filteredTodos, id, 'timer', 0),
        };
      });
    }
  };

  stopTimer = (oldTime, id, newTime) => {
    console.log(id, oldTime, newTime);
  };

  render() {
    const { todosData, statusFilter, filteredTodos } = this.state;
    return (
      <div className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          rename={this.rename}
          logId={this.logId}
          onDeleted={this.deletedItem}
          onToggleCompleted={this.onToggleCompleted}
          onToggleEdit={this.onToggleEdit}
          todoList={statusFilter ? filteredTodos : todosData}
        />
        <Footer
          filterSts={this.state.filter}
          todoList={todosData}
          clearCompleted={this.clearCompleted}
          filterTodos={this.filterTodos}
        />
      </div>
    );
  }
}
