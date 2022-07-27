import React, { useEffect, useState } from 'react'

import { Player } from './models/Player'
import { Colors } from './models/Colors'
import { Board } from './models/Board'
import { BoardComponent } from './components/board'
import { LostFigures } from './components/lost-figures'
import { Timer } from './components/timer'

import styles from './app.module.css'

function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer] = useState<Player>(new Player(Colors.WHITE))
  const [blackPlayer] = useState<Player>(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  function switchPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer)
  }

  function restart() {
    const newBoard = new Board()
    newBoard.initCell()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  return (
    <div className={styles.app}>
      <Timer restart={restart} currentPlayer={currentPlayer} />
      <BoardComponent
        currentPlayer={currentPlayer}
        board={board}
        setBoard={setBoard}
        switchPlayer={switchPlayer}
      />
      <div className={styles.figures}>
        <LostFigures
          title="Белые фигуры"
          figures={board.lostWhiteFigures}
        />
        <LostFigures
          title="Черные фигуры"
          figures={board.lostBlackFigures}
        />
      </div>
    </div>
  )
}

export default App
