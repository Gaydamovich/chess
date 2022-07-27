import React, { FC } from 'react'
import cn from 'classnames'

import { Cell } from '../../models/Cell'
import { Colors } from '../../models/Colors'

import styles from './styles.module.css'

interface IProps {
  cell: Cell
  isSelected: boolean
  click: (cell: Cell) => void
}

export const CellComponent: FC<IProps> = ({ cell, click, isSelected }) => {
  return (
    <span
      className={cn(styles.cell, {
        [styles.white]: cell.color === Colors.WHITE,
        [styles.black]: cell.color === Colors.BLACK,
        [styles.selected]: isSelected,
        [styles.available_figure]: cell.available && cell.figure,
      })}
      onClick={() => click(cell)}
    >
      {cell.available && !cell.figure && <div className={styles.available}/>}
      {cell.figure?.logo && <img className={styles.logo} src={cell.figure.logo} />}
    </span>
  )
}
