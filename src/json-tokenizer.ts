import { DefaultRules, ITokenizerRule } from './rules'
import { Position, Token, TokenRange } from './tokens'

export class JsonTokenizer {
  private column = 1
  private row = 1
  private buffered: string = ''
  public rules: ITokenizerRule[] = DefaultRules

  flush() {
    return this.tokenize('', true)
  }

  public addRule(rule: ITokenizerRule) {
    this.rules.push(rule)
  }

  public* tokenizeIterator(data: string): Generator<Token> {
    let index = 0
    const step = 64

    while (index < data.length) {
      for (let token of this.tokenize(data.substr(index, step))) {
        yield token
      }
      index += step
    }
    for (let token of this.flush()) {
      yield token
    }
  }

  private* tokenize(data: string, disableBuffer: boolean = false): Generator<Token> {
    // in case we buffered data on previous writes
    data = this.buffered + data
    this.buffered = ''
    if (data.length) {
      const maxIndex = this.getFirstIndexWithNoToken(data)
      if (maxIndex === 0) {
        // no match found
        throw new SyntaxError('could not tokenize ' + JSON.stringify(data))
      } else if (maxIndex === data.length && !disableBuffer) {
        // the whole string is matching
        this.buffered = data
      } else {
        const str = data.substring(0, maxIndex)
        const rule = this.getMatchingRule(str)
        if (!rule) {
          throw new Error('wut ?')
        }
        const type = rule.type
        const start = new Position(this.row, this.column)
        if (type === 'vertical-whitespace') {
          this.row++
        }
        this.column += str.length
        if (type === 'vertical-whitespace') {
          this.column = 1
        }
        const end = new Position(this.row, this.column)
        const token = new Token(str, type, new TokenRange(start, end))
        yield token
        let tokens = this.tokenize(data.substring(maxIndex), disableBuffer)
        for (let otherToken of tokens) {
          yield otherToken
        }
      }
    }
  }

  private getFirstIndexWithNoToken(data: string) {
    let min = 0
    let max = data.length
    const tested: any = {}
    const hasNoToken = (i: number) => {
      const buf = data.substring(0, i + 1)
      return this.getMatchingRule(buf) === null
    }
    const test = (i: number) => {
      return tested[i] === undefined ? (tested[i] = hasNoToken(i)) : tested[i]
    }
    let index
    while (max > min + 1) {
      index = min + Math.floor((max - min) / 2)
      if (test(index)) {
        max = index
      } else {
        min = index
      }
    }
    return test(min) ? min : max
  }

  private getMatchingRule(str: string) {
    for (let i = 0; i < this.rules.length; ++i) {
      if (this.rules[i].regex.test(str)) {
        return this.rules[i]
      }
    }
    return null
  }
}
