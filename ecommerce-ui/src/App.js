import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import React, { useState } from 'react';

class App extends React.Component {
  state = {
    bootcamp: 'Rookies'
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Home bootcamp = { this.state.bootcamp }/>
      </div>
    );
  }
}

export default App;
