import { Position, Range } from '../../tokenizer/tokens'
import { PositionMixin, RangeMixin } from '../../mixins'

export class UnexpectedEndOfInputError extends SyntaxError {
  static at = (row: number, column: number) => PositionMixin(UnexpectedEndOfInputError, new Position(row, column))
  static atPosition = (position: Position) => PositionMixin(UnexpectedEndOfInputError, position)
  static inRange = (start: Position, end: Position | null = null) =>
    RangeMixin(UnexpectedEndOfInputError, new Range(
      start,
      end || start
    ))

  get message() {
    return 'Unexpected end of JSON input'
  }
}
