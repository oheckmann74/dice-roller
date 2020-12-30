import './App.css';
import React, { useState } from 'react';


function DiceSelector() {
  const [dice, setDice] = useState(6);

  const handleChange = ({target}) => {
      setDice(target.dice);
  }

  const rollDice = () => {
      let result = [];
      for (let index = 0; index < dice; index++) {
          result[index] = Math.floor(Math.random()*6)+1
      }
//        result = result.sort()
      alert(result);
  }

  return (
      <div>
          <input type="text" value={dice} className='dice-number' onChange={handleChange} />
          <button onClick={rollDice}>Roll</button>
          <div class="slidecontainer">
            <input type="range" min="1" max="20" value={dice} class="slider" id="myRange" />
          </div>
      </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Dice Roller
      </header>
      <DiceSelector />
      <p> by Oliver </p>
    </div>
  );
}

export default App;
