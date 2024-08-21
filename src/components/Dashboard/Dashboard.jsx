import React from 'react';
import {Todo} from '../Dashboard/Todo/Todo';
import {InProgress} from '../Dashboard/Progress/InProgress';
import {Done} from '../Dashboard/Done/Done';
import './Dashboard.css';


export const Dashboard = () => {
  return (
    <div className='mainDashboardContainer'>
        <Todo />
        <InProgress />
        <Done />

    </div>
  )
}
