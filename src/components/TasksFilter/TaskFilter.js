import React from 'react';
import './TaskFilter.css';

const TaskFilter = (props) => {
  const { filterTodos, filterStatus } = props;

  return (
    <ul className="filters">
      <li>
        <button className={filterStatus === 'All' ? 'selected' : ''} onClick={() => filterTodos('All')}>
          All
        </button>
      </li>
      <li>
        <button className={filterStatus === 'Active' ? 'selected' : ''} onClick={() => filterTodos('Active')}>
          Active
        </button>
      </li>
      <li>
        <button className={filterStatus === 'Completed' ? 'selected' : ''} onClick={() => filterTodos('Completed')}>
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TaskFilter;
