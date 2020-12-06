import React,{useEffect} from 'react';
import './App.css';

import {useDispatch, useSelector } from 'react-redux';
import {
  addOrders,
  checkUserStatus
} from './features/data/dataSlice';

import Dashboard from "./components/Dashboard"
import Login from "./components/Login"

function App() {
  const userStatus = useSelector(checkUserStatus)
  const dispatch = useDispatch();
  useEffect(() => {
        fetch('https://utilize-server.herokuapp.com/get_data')
      .then(response => response.json())
      .then(data =>{
        dispatch(addOrders(data))
      })
  }, [])
  return (
    <div className="App">
      {
        userStatus?(
          <Dashboard/>
        ):(
          <Login/>
        )
      }
    </div>
  );
}

export default App;
