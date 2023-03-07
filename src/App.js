import React from 'react';
import {nanoid} from "nanoid"
import './App.css';
import Box from './box.js'
import Confetti from 'react-confetti'

function App() {
  const [moves, setMoves] = React.useState(0);
  const [dies, setdies] = React.useState(dievalues());
  const [tenzies, setTenzies] = React.useState(false)
    
  React.useEffect(() => {
      var result = true;
      const val = dies[0].value;
      for(var i=0;i<10;i++){
        if(dies[i].isHeld && dies[i].value === val) continue;
        else{
          result = !result;
          break;
        }
      }
      if(result === true){
        setTenzies(true);
      }
    }, [dies])

  function dievalues(){
    var temparr = [];
    for(var i=0;i<10;i++){
      temparr.push({
        value: Math.floor(Math.random() * (5) + 1),
        isHeld: false,
        id: nanoid()
      }
      )
    }
    return temparr;
  }

  function holdDice(id) {
    setdies(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  const boxes = dies.map(num1 => <Box num={num1.value} key={num1.id} isHeld={num1.isHeld} holdDice={() => holdDice(num1.id)}/>)

  function rolldies(){
    if(tenzies) window.location.reload();
    else{
    setdies(oldDice => oldDice.map(die =>{
      return die.isHeld === false ?
      {...die, value: Math.floor(Math.random() * (5) + 1)} :
      die
    }))
    setMoves(prevMoves => prevMoves+1);
    }
  }

  return (
    <div className="App">
      <div className="main">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="boxes">
        {boxes}
        </div>
        <button className="rollbtn" onClick={rolldies}>{tenzies? "New Game" : "Roll"}</button>
        {tenzies && <Confetti height={735}/>}
      </div>
      <h3>Number of rolls taken: {moves}</h3>
      <h2>{tenzies ? "You Won!" : ""}</h2>
    </div>
  );
}

export default App;
