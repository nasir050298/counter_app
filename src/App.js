import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [minCount, setMinCount] = useState(0);
  const [maxCount, setMaxCount] = useState(100);

  useEffect(() => {
    const savedCount = localStorage.getItem("counter");
    if (savedCount !== null) {
      setCount(Number(savedCount));
    }

    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
    }

    const savedMin = localStorage.getItem("minCount");
    const savedMax = localStorage.getItem("maxCount");
    if (savedMin && savedMax) {
      setMinCount(Number(savedMin));
      setMaxCount(Number(savedMax));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("counter", count);
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    localStorage.setItem("minCount", minCount);
    localStorage.setItem("maxCount", maxCount);
  }, [count, isDarkMode, minCount, maxCount]);

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

  const handleMinChange = (e) => {
    setMinCount(Number(e.target.value));
  };

  const handleMaxChange = (e) => {
    setMaxCount(Number(e.target.value));
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

        <div className="range-settings">
          <label>Min Count:</label>
          <input
            type="number"
            value={minCount}
            onChange={handleMinChange}
            min={0}
          />
          <label>Max Count:</label>
          <input
            type="number"
            value={maxCount}
            onChange={handleMaxChange}
            min={minCount + 1}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
