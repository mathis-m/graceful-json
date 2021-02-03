import {
  BeginArrayRule,
  BeginObjectRule,
  BooleanRule,
  CommaRule,
  EndArrayRule,
  EndLabelRule,
  EndObjectRule,
  HorizontalWhitespaceRule,
  ITokenizerRule,
  MaybeDecimalNumberRule,
  MaybeExponentialNegativeNumberRule,
  MaybeExponentialNumberRule,
  MaybeNegativeNumberRule,
  MaybeStringRule,
  NullRule,
  NumberRule,
  StringRule,
  SymbolRule,
  VerticalWhitespaceRule
} from './ITokenizerRule'

export * from './ITokenizerRule'
export const DefaultRules: ITokenizerRule[] = [
  new CommaRule(),
  new EndLabelRule(),
  new BeginObjectRule(),
  new EndObjectRule(),
  new BeginArrayRule(),
  new EndArrayRule(),
  new StringRule(),
  new MaybeStringRule(),
  new NullRule(),
  new BooleanRule(),
  new NumberRule(),
  new MaybeDecimalNumberRule(),
  new MaybeNegativeNumberRule(),
  new MaybeExponentialNumberRule(),
  new MaybeExponentialNegativeNumberRule(),
  new HorizontalWhitespaceRule(),
  new VerticalWhitespaceRule(),
  new SymbolRule()
]
