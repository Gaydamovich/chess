import { Figure, FigureNames } from './Figure'
import { Colors } from '../Colors'
import { Cell } from '../Cell'

import blackLogo from '../../assets/img/black-pawn.png'
import whiteLogo from '../../assets/img/white-pawn.png'

export class Pawn extends Figure {
  isFirstStep: boolean = true

  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.PAWN
  }

  moveFigure(target: Cell) {
    super.moveFigure(target)
    this.isFirstStep = false
  }

  canMove(target: Cell): boolean {
    if (super.canMove(target)) {
      const direction = this.cell?.figure?.color === Colors.BLACK ? 1 : -1
      const firstStepDirection = this.cell?.figure?.color === Colors.BLACK ? 2 : -2

      if (
        ((target.y === this.cell.y + direction)
          || this.isFirstStep
          && (target.y === this.cell.y + firstStepDirection)
          && this.cell.board?.getCell(target.x, this.cell.y + direction).isEmpty())
        && target.x === this.cell.x && this.cell.board?.getCell(target.x, target.y).isEmpty()
      ) return true

      if (
        target.y === this.cell.y + direction
        && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
        && this.cell.isEnemy(target)
      ) return true
    }
    return false
  }
}