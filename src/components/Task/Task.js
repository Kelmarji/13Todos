import React from 'react';
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
    timerStatus,
    play,
  } = props;

  const millisecondsToMMSS = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return edited ? (
    <li key={`todos${id}`} id={id} className="editing">
      <div className="view" onClick={onToggleCompleted}>
        <input
          placeholder={label}
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
              {timerStatus ? (
                <button className="icon icon-pause" id={id} onClick={() => play(id, 'pause')} />
              ) : (
                <button className="icon icon-play" onClick={() => play(id, 'play')} />
              )}
              <span className="description marginleft" data-size="10px">
                {timerTime > 0 ? millisecondsToMMSS(timerTime) : 0}
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
            onDeleted();
          }}
        />
      </div>
    </li>
  );
};

export default Task;
