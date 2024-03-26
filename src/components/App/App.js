/* eslint-disable class-methods-use-this */
import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

const App = () => {
  const [maxId, setMaxId] = useState(17);
  const [todosData, SetTodosData] = useState([]);
  const [filter, setFilter] = useState('All');

  const changeProp = (arr, id, prop) => {
    const itemId = arr.findIndex((item) => item.id === id);
    const oldItem = arr[itemId];
    const newItem = { ...oldItem, [prop]: !oldItem[prop] };
    return [...arr.slice(0, itemId), newItem, ...arr.slice(itemId + 1)];
  };

  const changeName = (arr, id, prop, newText) => {
    const itemId = arr.findIndex((item) => item.id === id);
    const oldItem = arr[itemId];
    const newItem = { ...oldItem, [prop]: newText, completed: false };
    return [...arr.slice(0, itemId), newItem, ...arr.slice(itemId + 1)];
  };

  const deletedItem = (id) => {
    const newList = todosData.filter((item) => item.id !== id);
    SetTodosData(newList);
  };

  const newItem = (item, timer) => {
    const newTodo = {
      label: item,
      id: maxId,
      time: new Date().getTime(),
      edit: false,
      timer,
      timerStatus: true,
    };
    return newTodo;
  };

  const addItem = (item, timerTime) => {
    const id = maxId + 1;
    setMaxId(id);
    const newArr = [...todosData, newItem(item, timerTime)];
    SetTodosData(newArr);
  };

  const onToggleCompleted = (id) => {
    SetTodosData(changeProp(todosData, id, 'completed'));
  };

  const clearCompleted = () => {
    SetTodosData((arr) => arr.filter(({ completed }) => !completed));
  };

  const onToggleEdit = (id) => {
    SetTodosData(changeProp(todosData, id, 'edit'));
  };

  const rename = (id, newName) => {
    const itemId = todosData.findIndex((item) => item.id === id);
    const newTodo = changeName(todosData, id, 'label', newName);
    console.log(newTodo);
    SetTodosData(newTodo);
    SetTodosData(changeProp(newTodo, id, 'edit'));
  };

  const timer = (id, timeStart) => {
    const newItemTime = changeName(todosData, id, 'timer', timeStart);
    SetTodosData(newItemTime);
  };

  return (
    <div className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        startTimer={timer}
        rename={rename}
        onDeleted={deletedItem}
        onToggleCompleted={onToggleCompleted}
        onToggleEdit={onToggleEdit}
        filter={filter}
        todoList={todosData} // тут ошибка
      />
      <Footer filterSts={filter} todoList={todosData} clearCompleted={clearCompleted} filterTodos={setFilter} />
    </div>
  );
};

export default App;
