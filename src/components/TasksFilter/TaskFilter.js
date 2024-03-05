import React, { Component } from 'react';
import './TaskFilter.css';
import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
  static propTypes = {
    filterTodos: PropTypes.func,
  };

  render() {
    const { filterTodos, filterStatus } = this.props;

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
  }
}
