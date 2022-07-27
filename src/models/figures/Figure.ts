import { Colors } from '../Colors'
import { Cell } from '../Cell'

export enum FigureNames {
  FIGURE = 'figure',
  KING = 'king',
  KNIGHT = 'knight',
  PAWN = 'pawn',
  QUEEN = 'queen',
  ROOK = 'rook',
  BISHOP = 'bishop',
}

export class Figure {
  id: number
  color: Colors
  logo: string | null
  cell: Cell
  name: FigureNames

  constructor(color: Colors, cell: Cell) {
    this.id = Math.random()
    this.color = color
    this.cell = cell
    this.cell.figure = this
    this.logo = null
    this.name = FigureNames.FIGURE
  }

  canMove(target: Cell | null): boolean {
    if (target?.figure?.color === this.color) return false
    return target?.figure?.name !== FigureNames.KING
  }

  moveFigure(target: Cell) {
    if (target.figure) {
      this.cell.board?.setLostFigure(target.figure)
    }
  }
}
