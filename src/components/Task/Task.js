import React, { Component } from "react";
import "./Task.css";

export default class Task extends Component {
  render() {
    const { label, id, onDeleted, onToggleCompleted, completed } = this.props;
    let status = "";
    if (completed) status += "completed";
    let check = false;
    if (completed) check = true;
    return (
      <li key={"todos" + id} id={id} className={status}>
        <div className="view left-side" onClick={onToggleCompleted}>
          <input
            className="toggle"
            type="checkbox"
            checked={check}
            onChange={onToggleCompleted}
          ></input>
          <label htmlFor="checkbox" key={"todos" + id}>
            <span className="description">{label}</span>
            <span className="created">created {new Date().getMinutes()}</span>
          </label>
        </div>
        <div className="right-side">
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
