import React from 'react';
import './App.css';
import Header from './Header';
import List from './List';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      name: '',
    }
  }

  render() {

    return (
      <div className="App">
        <Header />
        <List />
      </div>
    );
  }
}

