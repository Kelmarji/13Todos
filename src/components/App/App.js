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
    const itemId = todosData.findIndex((item) => item.id === id);
    if (itemId === -1) return;
    const task = todosData[itemId];

    // Очистка интервала таймера
    if (task.timerId) {
      clearInterval(task.timerId);
    }

    const newList = todosData.filter((item) => item.id !== id);
    SetTodosData(newList);
  };

  const newItem = (label, timer) => {
    const newTodo = {
      label,
      id: maxId,
      time: new Date().getTime(),
      edit: false,
      timer,
      timerStatus: false,
    };
    return newTodo;
  };

  const addItem = (item, timerTime) => {
    setMaxId((id) => id + 1);
    const newTodo = newItem(item, timerTime);
    SetTodosData((prevState) => [...prevState, newTodo]);
  };

  const onToggleCompleted = (id) => {
    SetTodosData((arr) => changeProp(arr, id, 'completed'));
  };

  const clearCompleted = () => {
    SetTodosData((arr) => arr.filter(({ completed }) => !completed));
  };

  const onToggleEdit = (id) => {
    SetTodosData((arr) => changeProp(arr, id, 'edit'));
  };

  const rename = (id, newName) => {
    SetTodosData((arr) => changeName(arr, id, 'label', newName));
    SetTodosData((arr) => changeProp(arr, id, 'edit'));
  };

  const playTimer = (id, action) => {
    const itemId = todosData.findIndex((item) => item.id === id);
    if (itemId === -1) return;
    let task = { ...todosData[itemId] };
    const { timer, timerStatus } = task;

    if (action === 'pause') {
      if (task.timer <= 0 || !timerStatus) return;
      clearInterval(task.timerId);

      SetTodosData((arr) => {
        task.timerStatus = false;
        task.timerId = null;
        return arr.with(itemId, task);
      });
      return;
    }

    if (timerStatus || timer === 0) return;

    const timerId = setInterval(() => {
      SetTodosData((arr) => {
        task = arr[itemId];
        if (!task) {
          clearInterval(timerId);
          return arr;
        }
        task.timer -= 1000;
        if (task.timer === 0) clearInterval(timerId);
        return task.timer === 0
          ? arr.with(itemId, { ...task, timerStatus: false, timerId: null, completed: true })
          : arr.with(itemId, { ...task, timerStatus: true });
      });
    }, 1000);

    SetTodosData((arr) => {
      task.timerStatus = true;
      task.timerId = timerId;
      return arr.with(itemId, task);
    });
  };

  return (
    <div className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        play={playTimer}
        rename={rename}
        onDeleted={deletedItem}
        onToggleCompleted={onToggleCompleted}
        onToggleEdit={onToggleEdit}
        filter={filter}
        todoList={todosData}
      />
      <Footer filterSts={filter} todoList={todosData} clearCompleted={clearCompleted} filterTodos={setFilter} />
    </div>
  );
};

export default App;
