import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.length > 0) {
              this.props.addItem(e.target.value);
              e.target.value = '';
            }
          }}
          className="new-todo"
          placeholder="do?"
          autoFocus
        ></input>
      </header>
    );
  }
}
