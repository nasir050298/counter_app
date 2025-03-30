import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="app">
      <div className="counter-container">
        <h1 className="counter-heading">Counter App</h1>
        <div className="counter-value">{count}</div>
        <div className="button-group">
          <button className="button increment" onClick={increment}>
            Increment
          </button>
          <button className="button decrement" onClick={decrement}>
            Decrement
          </button>
          <button className="button reset" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
