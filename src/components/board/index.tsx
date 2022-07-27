import React, { FC, useEffect, useState } from 'react'

import { CellComponent } from '../cell'
import { Cell } from '../../models/Cell'
import { Board } from '../../models/Board'
import { Player } from '../../models/Player'

import styles from './styles.module.css'

interface IProps {
  board: Board
  setBoard: (board: Board) => void
  currentPlayer: Player | null
  switchPlayer: () => void
}

export const BoardComponent: FC<IProps> = ({ board, setBoard, currentPlayer, switchPlayer }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  const clickToCell = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      setSelectedCell(null)
      switchPlayer()
    }  else if(selectedCell === cell) {
      setSelectedCell(null)
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  }

  const highlightCells = () => {
    board.highlightCells(selectedCell)
    updateBoard()
  }

  const updateBoard = () => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  return (
    <div>
      <h2 className={styles.player_info}>
        Сейчас ходит: <span>{currentPlayer?.color}</span> игрок
      </h2>
      <div className={styles.board}>
        {board.cells.map((row, idx) => {
          return (
            <React.Fragment key={idx}>
              {row.map(cell => (
                <CellComponent
                  isSelected={selectedCell?.x === cell.x && selectedCell?.y === cell.y}
                  click={clickToCell}
                  key={cell.id}
                  cell={cell}
                />
              ))}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
