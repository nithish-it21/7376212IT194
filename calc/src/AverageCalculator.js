import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AverageCalculator.css'; 

const AverageCalculator = () => {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);
  const windowSize = 10;

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const startTime = new Date().getTime();
        const response = await axios.get(`http://20.244.56.144/numbers/${id}`);
        const endTime = new Date().getTime();

        if (endTime - startTime <= 500) {
          const uniqueNumbers = [...new Set([...windowCurrState, ...response.data.numbers])];
          setWindowPrevState(windowCurrState);
          setNumbers(response.data.numbers);

          if (uniqueNumbers.length <= windowSize) {
            setWindowCurrState(uniqueNumbers);
            setAvg(uniqueNumbers.reduce((a, b) => a + b, 0) / uniqueNumbers.length);
          } else {
            const newWindowState = uniqueNumbers.slice(-windowSize);
            setWindowCurrState(newWindowState);
            setAvg(newWindowState.reduce((a, b) => a + b, 0) / windowSize);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const id = prompt('Enter number ID (p for prime, f for Fibonacci, e for even, r for random):');
    fetchData(id);
  }, []);

  return (
    <div>
      <h2>Average Calculator</h2>
      <p>Window Previous State: {windowPrevState.join(', ')}</p>
      <p>Window Current State: {windowCurrState.join(', ')}</p>
      <p>Numbers: {numbers.join(', ')}</p>
      <p>Average: {avg}</p>
    </div>
  );
};

export default AverageCalculator;