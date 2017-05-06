import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles';

class App extends Component {
  render() {
    return (
        <div>
            <h1 className={styles.header}>Hello</h1>
        </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('.app')
);