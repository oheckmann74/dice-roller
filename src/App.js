import './App.css';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CasinoIcon from '@material-ui/icons/Casino';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
  root: {
    width: 375,
  },
  input: {
    width: 42,
  },
});


function DiceRoller() {
  const classes = useStyles();

  const [dice, setDice] = useState(10);

  const handleSliderChange = (event, newValue) => {
    setDice(newValue);
  };

  const handleInputChange = (event) => {
    setDice(event.target.value === '' ? '' : Number(event.target.value));
  };

  const [result, setResult] = useState([]);

  const rollDice = () => {
    let rresult = [0, 0, 0, 0, 0, 0]
    for (let index = 0; index < dice; index++) {
        let roll = Math.floor(Math.random()*6)+1;
        rresult[roll-1]++;
    }
    setResult(rresult);
  }

  const handleBlur = () => {
    if (dice < 1) {
      setDice(1);
    } 
  };

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
        <Card className={classes.root}>
          <CardContent>
          <Typography id="input-slider" gutterBottom align='left'>
                    Number of Dice
          </Typography>
          <Grid container spacing={2} alignItems="center">
             <Grid item xs>
              <Slider
                value={typeof dice === 'number' ? dice : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                min={1}
                max={30}
              />
            </Grid>
            <Grid item>
              <Input
                className={classes.input}
                value={dice}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 5,
                  min: 1,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Grid>
              
          </Grid>
          </CardContent>
          <CardActions>
              <Button fullWidth variant="contained" color="primary" onClick={rollDice} startIcon={<CasinoIcon />}>Roll</Button>
              <Button onClick={reset} disabled={result.length < 1 || result == undefined ? true:false}>Clear</Button>
          </CardActions>
        </Card>
          
          <div>
            {resultJSX}
          </div>
          
      </div>
  )
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DiceRoller />
       </header>
     </div>
  );
}

export default App;
