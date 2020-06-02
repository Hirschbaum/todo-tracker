import React from 'react';
import './App.css';
import List from './List';
import Footer from './Footer';

export default class App extends React.Component {

  render() {

    return (
      <div className="App">
        <List />
        <Footer />
      </div>
    );
  }
}

