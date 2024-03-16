import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form
          className="new-todo-form"
          onSubmit={(e) => {
            e.preventDefault();
            const [, label, min, sec] = e.target;
            console.log(label.value, min.value, sec.value);
            this.props.addItem(label.value, min.value * 60 + sec.value);
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
                console.log(e);
                this.props.addItem(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <input minLength={1} required className="new-todo" placeholder="Task" autoFocus />
          <input type="number" min={0} className="new-todo-form__timer" placeholder="Min" autoFocus />
          <input type="number" min={1} max={60} required className="new-todo-form__timer" placeholder="Sec" autoFocus />
        </form>
      </header>
    );
  }
}
