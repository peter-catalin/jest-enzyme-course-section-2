import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    counter: 0,
    error: false
  };

  handleIncrementButtonClick = () => {
    this.setState({ counter: this.state.counter + 1, error: false });
  };

  handleResetClick = () => {
    this.setState({ counter: 0, error: false });
  };

  handleDecrementButtonClick = () => {
    if (this.state.counter === 0) {
      this.setState({ error: true });
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
  };

  render() {
    return (
      /*
       The data-test attribute will be used by out test to assert that the component did actually render
       It is a good practice to use data atrributes instead of standard HTML attributes like id or class
       because those attributes might be changed by another person to accomplish some functionality.

       By using a data attribute called data-test we make it quite clear that this attribute should not be modified
       because it is beeing used for testing.
       */
      <div data-test="component-app" className="App">
        <div data-test="counter-display" className="CounterText">
          <h3>{`You've clicked the button ${this.state.counter} times`}</h3>
        </div>

        {this.state.error && (
          <div data-test="error-element" className="ErrorMessage">
            <p> The counter can't go below 0</p>
          </div>
        )}
        <div className="ButtonsContainer">
          <button data-test="increment-button" className="Button" onClick={this.handleIncrementButtonClick}>
            Increment
          </button>

          <button data-test="decrement-button" className="Button" onClick={this.handleDecrementButtonClick}>
            Decrement
          </button>

          <button data-test="reset-button" className="Button" onClick={this.handleResetClick}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;
