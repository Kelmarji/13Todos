import React, { useState } from 'react';
import './Task.css';

let timeToComplet;

const Task = (props) => {
  const {
    label,
    id,
    onDeleted,
    onToggleCompleted,
    completed,
    time,
    edited,
    onToggleEdit,
    rename,
    timerTime,
    startTimer,
    // stopTimer,
  } = props;

  const [timer, setTimer] = useState(Number(timerTime));

  function funcTimer(ids, str, oldtime) {
    if (str === 'play') {
      timeToComplet = setInterval(() => {
        setTimer((timing) => {
          if (timing <= 0) {
            clearInterval(timeToComplet);
            setTimer(0);
          }
          startTimer(ids, timing);
          return timing - 1;
        });
      }, 1000);
    } else {
      clearInterval(timeToComplet);
      setTimer(timer);
      startTimer(ids, oldtime);
    }
  }

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
            <button
              className="icon icon-play"
              onClick={() => {
                funcTimer(id, 'play', timerTime);
              }}
            />
            <button
              className="icon icon-pause"
              id={id}
              onClick={() => {
                funcTimer(id, 'pause', timerTime);
              }}
            />
            <span className="description marginleft" data-size="10px">
              {timer > 0 ? timer : 0}
            </span>
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
};

export default Task;
