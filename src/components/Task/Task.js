import React, { useState } from 'react';
import './Task.css';

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
  } = props;

  const [timer, setTimer] = useState(Number(timerTime));
  const [timerSts, setTimerSts] = useState(false);
  const [intervals, setIntervals] = useState({});
  function millisecondsToMMSS(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function funcTimer(ids, str) {
    if (str === 'play') {
      setTimerSts(true);
      const newInterval = setInterval(() => {
        setTimer((timing) => {
          if (timing <= 0) {
            clearInterval(newInterval);
            setTimer(0);
          }
          startTimer(ids, timing);
          return timing - 1000;
        });
      }, 1000);

      setIntervals((prevIntervals) => ({
        ...prevIntervals,
        [ids]: newInterval,
      }));
    } else {
      setTimerSts(false);
      clearInterval(intervals[ids]);
      setTimer(timer);
      startTimer(ids, timer);

      setIntervals((prevIntervals) => ({
        ...prevIntervals,
        [ids]: null,
      }));
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
          {timerTime ? (
            <span className="description">
              {timerSts ? (
                <button
                  className="icon icon-pause"
                  id={id}
                  onClick={() => {
                    funcTimer(id, 'pause', timerTime);
                  }}
                />
              ) : (
                <button
                  className="icon icon-play"
                  onClick={() => {
                    funcTimer(id, 'play', timerTime);
                  }}
                />
              )}
              <span className="description marginleft" data-size="10px">
                {timer > 0 ? millisecondsToMMSS(timer) : 0}
              </span>
            </span>
          ) : null}
          <span className="description" onClick={onToggleCompleted}>
            created {time}
          </span>
        </label>
      </div>
      <div className="right-side">
        <button className="icon icon-edit" onClick={onToggleEdit}></button>
        <button
          className="icon icon-destroy"
          onClick={() => {
            if (intervals[id]) {
              clearInterval(intervals[id]);
            }
            onDeleted();
          }}
        />
      </div>
    </li>
  );
};

export default Task;
