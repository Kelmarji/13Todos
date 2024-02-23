import React, { Component } from "react";
import "./Task.css";

export default class Task extends Component {
  state = {
    completed: false,
  };

  completedOnClick = (e) => {
    this.setState((state) => {
      return {
        completed: !state.completed,
      };
    });
    const input = e.target.parentNode.parentNode.querySelector(
      'input[type="checkbox"]'
    );
    const status = input.checked ? false : true;
    input.checked = status;
  };

  deleteOnClick(e) {}

  render() {
    const { label, id, onDeleted } = this.props;
    const { completed } = this.state;
    let status = "";
    if (completed) status += "completed";
    return (
      <li key={"todos" + id} id={id} className={status}>
        <div className="view left-side" onClick={this.completedOnClick}>
          <input className="toggle" type="checkbox"></input>
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
