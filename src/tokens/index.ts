export const CommaToken = 'comma'
export const EndLabelToken = 'end-label'
export const BeginObjectToken = 'begin-object'
export const EndObjectToken = 'end-object'
export const BeginArrayToken = 'begin-array'
export const EndArrayToken = 'end-array'
export const StringToken = 'string'
export const MaybeStringToken = 'maybe-string'
export const NullToken = 'null'
export const BooleanToken = 'boolean'
export const NumberToken = 'number'
export const MaybeDecimalNumberToken = 'maybe-decimal-number'
export const MaybeNegativeNumberToken = 'maybe-negative-number'
export const MaybeExponentialNumberToken = 'maybe-exponential-number'
export const MaybeExponentialNegativeNumberToken = 'maybe-exponential-number-negative'
export const HorizontalWhitespaceToken = 'horizontal-whitespace'
export const VerticalWhitespaceToken = 'vertical-whitespace'
export const SymbolToken = 'symbol'
export type JsonToken =
  typeof CommaToken
  | typeof EndLabelToken
  | typeof BeginObjectToken
  | typeof EndObjectToken
  | typeof BeginArrayToken
  | typeof EndArrayToken
  | typeof StringToken
  | typeof MaybeStringToken
  | typeof NullToken
  | typeof BooleanToken
  | typeof NumberToken
  | typeof MaybeDecimalNumberToken
  | typeof MaybeNegativeNumberToken
  | typeof MaybeExponentialNumberToken
  | typeof MaybeExponentialNegativeNumberToken
  | typeof VerticalWhitespaceToken
  | typeof HorizontalWhitespaceToken
  | typeof SymbolToken;

export class TokenRange {
  constructor(public start: Position, public end: Position) {
  }
}

export class Position {
  constructor(public row: number, public column: number) {
  }
}

export class Token extends String {
  constructor(public content: string, public type: JsonToken, public range: TokenRange) {
    super();
  }
  toString = () => this.content.toString();
}
