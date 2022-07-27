import { Figure, FigureNames } from './Figure'
import { Colors } from '../Colors'
import { Cell } from '../Cell'

import blackLogo from '../../assets/img/black-knight.png'
import whiteLogo from '../../assets/img/white-knight.png'

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.KNIGHT
  }

  canMove(target: Cell): boolean {
    if (super.canMove(target)) {
      const absX = Math.abs(target.x - this.cell.x)
      const absY = Math.abs(target.y - this.cell.y)

      return (absX === 1 && absY === 2) || (absX === 2 && absY === 1)
    }
    return false
  }
}
