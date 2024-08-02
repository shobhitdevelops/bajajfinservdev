import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState([]);

  const filterOptions = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highestAlphabet', label: 'Highest Alphabet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const result = await axios.post('https://bajajfinservdev.vercel.app/', parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const filterResponse = () => {
    if (!response) return null;

    let filteredResponse = {};

    filters.forEach(filter => {
      switch (filter.value) {
        case 'numbers':
          filteredResponse.Numbers = response.numbers.join(',');
          break;
        case 'alphabets':
          filteredResponse.Alphabets = response.alphabets.join(',');
          break;
        case 'highestAlphabet':
          filteredResponse['Highest Alphabet'] = response.highestAlphabet;
          break;
        default:
          break;
      }
    });

    return filteredResponse;
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <>
          <Select
            isMulti
            name="filters"
            options={filterOptions}
            className="multi-select"
            classNamePrefix="select"
            onChange={setFilters}
          />
          <div className="response">
            <h2>Filtered Response</h2>
            {Object.entries(filterResponse() || {}).map(([key, value]) => (
              <p key={key}>{key}: {value}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

//initial code