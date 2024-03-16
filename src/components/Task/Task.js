import React, { Component } from 'react';
import './Task.css';

export default class Task extends Component {
  render() {
    const { label, id, onDeleted, onToggleCompleted, completed, time, edited, onToggleEdit, rename, timerTime } =
      this.props;

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
        <div className="view left-side">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted}></input>
          <label htmlFor="checkbox" key={`todos${id}`}>
            <span className="title" onClick={onToggleCompleted}>
              {label}
            </span>
            <span className="description">
              <button className="icon icon-play" />
              <button className="icon icon-pause" />
              {timerTime}
            </span>
            <span className="description" onClick={onToggleCompleted}>
              created {time}
            </span>
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
