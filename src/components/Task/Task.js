import React, { Component } from 'react';
import './Task.css';

export default class Task extends Component {
  render() {
    const { label, id, onDeleted, onToggleCompleted, completed, time, edited, onToggleEdit, rename } = this.props;

    return edited ? (
      <li key={`todos${id}`} id={id} className="editing">
        <div className="view" onClick={onToggleCompleted}>
          <input
            type="text"
            className="edit"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                rename(id, e.target.value);
              }
            }}
          ></input>
        </div>
      </li>
    ) : (
      <li key={`todos${id}`} id={id} className={completed ? 'completed' : ''}>
        <div className="view left-side" onClick={onToggleCompleted}>
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={onToggleCompleted}
            onClick={onToggleCompleted}
          ></input>
          <label htmlFor="checkbox" key={`todos${id}`}>
            <span className="description">{label}</span>
            <span className="created">created {time}</span>
          </label>
        </div>
        <div className="right-side">
          <button className="icon icon-edit" onClick={onToggleEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
