import { Figure, FigureNames } from './Figure'
import { Colors} from '../Colors'
import { Cell } from '../Cell'

import blackLogo from '../../assets/img/black-king.png'
import whiteLogo from '../../assets/img/white-king.png'

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.KING
  }

  canMove(target: Cell): boolean {
    if (super.canMove(target)) {
      const isUpDownStep = target.x === this.cell.x && (target.y === this.cell.y - 1 || target.y === this.cell.y + 1)
      const isLeftRightStep = target.y === this.cell.y && (target.x === this.cell.x - 1 || target.x === this.cell.x + 1)
      const isDiagonalStep = (target.y === this.cell.y - 1 || target.y === this.cell.y + 1) && (target.x === this.cell.x - 1 || target.x === this.cell.x + 1)

      return isUpDownStep || isLeftRightStep || isDiagonalStep
    }
    return false
  }
}
