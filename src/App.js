import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const minCount = 0;
  const maxCount = 100;

  useEffect(() => {
    const savedCount = localStorage.getItem("counter");
    if (savedCount !== null) {
      setCount(Number(savedCount));
    }

    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("counter", count);
  }, [count]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);


  const animatedProps = useSpring({
    number: count,
    from: { number: 0 },
    reset: true,
    config: { tension: 150, friction: 20 },
  });
  
  const increment = () => {
    if (count < maxCount) setCount(count + 1);
  };

  const decrement = () => {
    if (count > minCount) setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  const toggleDarkMode = () => {
    setIsDarkMode (!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="counter-container">
        <h1 className="counter-heading">Counter App</h1>
        <animated.div className = "counter-value">
        {animatedProps.number.to((n) => n.toFixed(0))}
        </animated.div>
        <div className="button-group">
          <button 
          className="button increment" 
          onClick={increment}
          aria-label="Increment counter"
          disabled={count >= maxCount}>
            Increment
          </button>
          <button className="button decrement"
          onClick={decrement}
          aria-label="Decrement counter"
          disabled={count <= minCount}>
            Decrement
          </button>
          <button className="button reset" 
          onClick={reset}
          aria-label="Reset counter">
            Reset
          </button>
        </div>
        <button
        className="toggle-dark-mode"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
}

export default App;
