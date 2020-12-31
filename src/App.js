import './App.css';
import React, { useState } from 'react';


function DiceRoller() {
  const [dice, setDice] = useState(6);

  const handleChange = ({target}) => {
      setDice(target.value);
  }

  const [result, setResult] = useState([]);

  const rollDice = () => {
    let rresult = [0, 0, 0, 0, 0, 0]
    for (let index = 0; index < dice; index++) {
        let roll = Math.floor(Math.random()*6)+1;
        rresult[roll-1]++;
    }
    setResult(rresult);
  }



  const reset = () => {
    setResult([]);
  }

  let resultJSX;
  if (result.length > 0) {
    resultJSX = result.map((count, i) => <p>{i+1}: {count}x     {i+1}+: {result.slice(i).reduce((a, b) => a + b, 0)}x</p>)
  } else {
    resultJSX = "";
  }



  return (
      <div>
          <input type="text" value={dice} className='dice-number' onChange={handleChange} />
          <button onClick={rollDice}>Roll</button>
          <div class="slidecontainer">
            <input type="range" min="1" max="20" value={dice} className="slider" onChange={handleChange} />
          </div>
          <div>
            {resultJSX}
          </div>
          <button onClick={reset}>Reset</button>
      </div>
  )
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Dice Roller App
        <DiceRoller />
       </header>
     </div>
  );
}

export default App;
