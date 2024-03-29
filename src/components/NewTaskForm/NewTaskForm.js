import React from 'react';
import './NewTaskForm.css';

const NewTaskForm = (props) => {
  return (
    <header className="header">
      <h1>Todos</h1>
      <form
        className="new-todo-form"
        onSubmit={(e) => {
          e.preventDefault();
          const [, label, min, sec] = e.target;
          const minutes = min.value * 60000;
          const seconds = sec.value * 1000;
          const timerValue = minutes + seconds;
          props.addItem(label.value, timerValue);
          label.value = '';
          min.value = '';
          sec.value = '';
        }}
      >
        <button
          className="hidden"
          onSubmit={(e) => {
            e.preventDefault();
            if (e.target.value !== undefined && e.target.value.length > 0) {
              props.addItem(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <input minLength={1} required className="new-todo" placeholder="Task" autoFocus />
        <input type="number" className="new-todo-form__timer" placeholder="Min" autoFocus />
        <input type="number" className="new-todo-form__timer" placeholder="Sec" autoFocus />
      </form>
    </header>
  );
};

export default NewTaskForm;
