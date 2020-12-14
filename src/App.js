import { useState } from 'react';
import './App.css'
import Game from './components/Game/Game';
import Start from './components/Start/Start';

function App() {
	const [isStart, setIsStart] = useState(true)
	const [isEnd, setIsEnd] = useState(false)
	const [isEgypt, setIsEgypt] = useState(true)
	const [mode, setMode] = useState("")
	const [player1Agent, setPlayer1Agent] = useState("human")
	const [player2Agent, setPlayer2Agent] = useState("AStar")

	const submitStart = ({ isEgypt, mode, player1Agent, player2Agent }) => {
		setIsEgypt(isEgypt)
		setMode(mode)
		setPlayer1Agent(player1Agent)
		setPlayer2Agent(player2Agent)
		setIsStart(false)
	}

	console.log({isEgypt, mode, player1Agent, player2Agent})

	let component = <Start submitStart={submitStart} />
	if (!isStart && !isEnd) {
		component = <Game isEgypt={isEgypt} player1Agent={player1Agent} player2Agent={player2Agent} />
	}

  	return (
		<div className="App">
			{component}
		</div>
  	)
}

export default App;
