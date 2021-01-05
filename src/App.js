import "./App.css";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CasinoIcon from "@material-ui/icons/Casino";
import LooksOneRoundedIcon from "@material-ui/icons/LooksOneRounded";
import LooksTwoRoundedIcon from "@material-ui/icons/LooksTwoRounded";
import Looks3RoundedIcon from "@material-ui/icons/Looks3Rounded";
import Looks4RoundedIcon from "@material-ui/icons/Looks4Rounded";
import Looks5RoundedIcon from "@material-ui/icons/Looks5Rounded";
import Looks6RoundedIcon from "@material-ui/icons/Looks6Rounded";
import ForwardIcon from "@material-ui/icons/Forward";
import { IconButton } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { TimerOutlined } from "@material-ui/icons";

const BUTTONS = [
  <LooksOneRoundedIcon />,
  <LooksTwoRoundedIcon />,
  <Looks3RoundedIcon />,
  <Looks4RoundedIcon />,
  <Looks5RoundedIcon />,
  <Looks6RoundedIcon />,
];

const useStyles = makeStyles({
  root: {
    width: 375,
    margin: 10,
  },
  input: {
    width: 42,
  },
});

function ResultCard(props) {
  const classes = useStyles();
  const result = props.result;
  const num = props.num;
  const cum_results = result.map((count, i) =>
    result.slice(i).reduce((a, b) => a + b)
  );
  return (
    <div {...props}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography>Dice Rolls</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
              <Typography>Success/Failure</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography>#{num}</Typography>
            </Grid>
          </Grid>

          {result.map((count, i) => (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={1}>
                <Typography align="right">
                  {count > 0 ? parseInt(count) + "x" : ""}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                {BUTTONS[i]}
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={3}>
                {BUTTONS[i]}
                {i < 5 ? BUTTONS[5] : ""}
              </Grid>
              <Grid item xs={3}>
                <Typography>
                  {cum_results[i]}s ({cum_results[0] - cum_results[i]}f)
                </Typography>
              </Grid>
              <Grid item xs={1}>
                {cum_results[i] === 0 ? (
                  ""
                ) : (
                  <IconButton
                    color="primary"
                    onClick={() => props.setDice(cum_results[i])}
                  >
                    <ForwardIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function DiceRoller() {
  const classes = useStyles();

  const [dice, setDice] = useState(10);

  const handleSliderChange = (event, newValue) => {
    setDice(newValue);
  };

  const handleInputChange = (event) => {
    setDice(event.target.value === "" ? "" : Number(event.target.value));
  };

  const [result, setResult] = useState([]);
  const [num, setNum] = useState(0);

  const rollDice = () => {
    setResult([]);
    setTimeout(() => {
      let rresult = [0, 0, 0, 0, 0, 0];
      for (let index = 0; index < dice; index++) {
        let roll = Math.floor(Math.random() * 6) + 1;
        rresult[roll - 1]++;
      }
      setResult(rresult);
      setNum(num + 1);
    }, 200);
  };

  const handleBlur = () => {
    if (dice < 1) {
      setDice(1);
    }
  };

  const reset = () => {
    setResult([]);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography id="input-slider" gutterBottom align="left">
            Number of Dice
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={typeof dice === "number" ? dice : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                min={1}
                max={24}
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
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={rollDice}
            startIcon={<CasinoIcon />}
          >
            Roll
          </Button>
          <Button
            onClick={reset}
            disabled={result.length < 1 || result === undefined ? true : false}
          >
            Clear
          </Button>
        </CardActions>
      </Card>

      <Collapse in={result.length > 0}>
        <ResultCard result={result} setDice={setDice} num={num} />
      </Collapse>
    </div>
  );
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
