import { PositionMixin } from '../../mixins/position'
import { Position } from '../../tokenizer/tokens'

export class UnexpectedEndOfInputError extends SyntaxError {
  static at = (row: number, column: number) => PositionMixin(UnexpectedEndOfInputError, new Position(row, column))
  static atPosition = (position: Position) => PositionMixin(UnexpectedEndOfInputError, position)

  get message() {
    return 'Unexpected end of JSON input'
  }
}
