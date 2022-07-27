import React, { FC, useEffect, useRef, useState } from 'react'

import { Player } from '../../models/Player'
import { Colors } from '../../models/Colors'

import styles from './styles.module.css'

const INITIAL_TIME = 300

interface IProps {
  currentPlayer: Player | null
  restart: () => void
}

export const Timer: FC<IProps> = ({ currentPlayer, restart }) => {
  const [whiteTimer, setWhiteTimer] = useState(INITIAL_TIME)
  const [blackTimer, setBlackTimer] = useState(INITIAL_TIME)
  const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = () => {
    if (timerIdRef.current) clearInterval(timerIdRef.current)

    const cb = currentPlayer?.color === Colors.BLACK ? decrementBlackTimer : decrementWhiteTimer

    timerIdRef.current = setInterval(cb, 1000)
  }

  const decrementWhiteTimer = () => setWhiteTimer(prev => prev - 1)

  const decrementBlackTimer = () => setBlackTimer(prev => prev - 1)

  useEffect(() => {
    start()
  }, [currentPlayer])

  useEffect(() => {
    if (whiteTimer === 0 || blackTimer === 0) {
      alert('все хватит')
      restartGame()
    }
  }, [whiteTimer, blackTimer])

  const restartGame = () => {
    setWhiteTimer(INITIAL_TIME)
    setBlackTimer(INITIAL_TIME)
    restart()
  }

  return (
    <div className={styles.timer}>
      <div>White: <span>{whiteTimer}</span></div>
      <div>Black: <span>{blackTimer}</span></div>
      <div className={styles.drop} onClick={restartGame}>restart</div>
    </div>
  )
}
