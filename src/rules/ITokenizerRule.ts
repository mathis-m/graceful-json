import {
  BeginArrayToken,
  BeginObjectToken,
  BooleanToken,
  CommaToken,
  EndArrayToken,
  EndLabelToken,
  EndObjectToken,
  JsonToken,
  MaybeDecimalNumberToken, MaybeExponentialNegativeNumberToken, MaybeExponentialNumberToken,
  MaybeNegativeNumberToken,
  MaybeStringToken,
  NullToken,
  NumberToken,
  StringToken, HorizontalWhitespaceToken, VerticalWhitespaceToken
} from '../tokens'

export interface ITokenizerRule {
  regex: RegExp,
  type: JsonToken
}

export class CommaRule implements ITokenizerRule {
  readonly regex: RegExp = /^,$/
  readonly type: JsonToken = CommaToken
}

export class EndLabelRule implements ITokenizerRule {
  readonly regex: RegExp = /^:$/
  readonly type: JsonToken = EndLabelToken
}

export class BeginObjectRule implements ITokenizerRule {
  readonly regex: RegExp = /^{$/
  readonly type: JsonToken = BeginObjectToken
}

export class EndObjectRule implements ITokenizerRule {
  readonly regex: RegExp = /^}$/
  readonly type: JsonToken = EndObjectToken
}

export class BeginArrayRule implements ITokenizerRule {
  readonly regex: RegExp = /^\[$/
  readonly type: JsonToken = BeginArrayToken
}

export class EndArrayRule implements ITokenizerRule {
  readonly regex: RegExp = /^\[$/
  readonly type: JsonToken = EndArrayToken
}

export class StringRule implements ITokenizerRule {
  readonly regex: RegExp = /^"(\\["\\/bfnrtu]|[^"\\])*"$/
  readonly type: JsonToken = StringToken
}

export class MaybeStringRule implements ITokenizerRule {
  readonly regex: RegExp = /^"([^"]|\\")*$/
  readonly type: JsonToken = MaybeStringToken
}

export class NullRule implements ITokenizerRule {
  readonly regex: RegExp = /^null$/
  readonly type: JsonToken = NullToken
}

export class BooleanRule implements ITokenizerRule {
  readonly regex: RegExp = /^(true|false)$/
  readonly type: JsonToken = BooleanToken
}

export class NumberRule implements ITokenizerRule {
  readonly regex: RegExp = /^-?\d+(\.\d+)?([eE]-?\d+)?$/
  readonly type: JsonToken = NumberToken
}

export class MaybeDecimalNumberRule implements ITokenizerRule {
  readonly regex: RegExp = /^-?\d+\.$/
  readonly type: JsonToken = MaybeDecimalNumberToken
}

export class MaybeNegativeNumberRule implements ITokenizerRule {
  readonly regex: RegExp = /^-$/
  readonly type: JsonToken = MaybeNegativeNumberToken
}

export class MaybeExponentialNumberRule implements ITokenizerRule {
  readonly regex: RegExp = /^-?\d+(\.\d+)?([eE])?$/
  readonly type: JsonToken = MaybeExponentialNumberToken
}

export class MaybeExponentialNegativeNumberRule implements ITokenizerRule {
  readonly regex: RegExp = /^-?\d+(\.\d+)?([eE]-)?$/
  readonly type: JsonToken = MaybeExponentialNegativeNumberToken
}

export class VerticalWhitespaceRule implements ITokenizerRule {
  readonly regex: RegExp = /^[\r\n]$/
  readonly type: JsonToken = VerticalWhitespaceToken
}

export class HorizontalWhitespaceRule implements ITokenizerRule {
  readonly regex: RegExp = /^[^\S\r\n]+$/
  readonly type: JsonToken = HorizontalWhitespaceToken
}
