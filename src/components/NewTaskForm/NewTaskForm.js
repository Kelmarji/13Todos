import React, { Component } from "react";
import "./NewTaskForm.css";

export default class NewTaskForm extends Component {
  render() {
    return (
      <header className="header">
        <h1>KelmarProd.</h1>
        <input
          className="new-todo"
          placeholder="Wut need to be done?"
          autoFocus
        ></input>
      </header>
    );
  }
}
