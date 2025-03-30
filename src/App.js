import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem("counter");
    if (savedCount !== null) {
      setCount(Number(savedCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("counter", count);
  }, [count]);

  const animatedProps = useSpring({
    number: count,
    from: { number: 0 },
    reset: true,
    config: { tension: 150, friction: 20 },
  });
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
