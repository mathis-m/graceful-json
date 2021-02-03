import { Transform, TransformCallback } from 'stream'
import { DefaultRules, ITokenizerRule } from './rules'
import { Position, Token, TokenRange } from './tokens'

export class JsonTokenizer extends Transform {
  private column = 1
  private row = 1
  private buffered: string = ''
  public rules: ITokenizerRule[] = DefaultRules

  constructor() {
    super({ objectMode: true })
  }

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    process.nextTick(() => {
      try {
        let index = 0
        const step = 64
        while (index < chunk.length) {
          this.tokenize(chunk.substr(index, step))
          index += step
        }
        callback()
      } catch (e) {
        callback(e)
      }
    })
  }

  flush(callback: TransformCallback) {
    process.nextTick(() => {
      try {
        this.tokenize('', true)
        callback()
      } catch (e) {
        callback(e)
      }
    })
  }

  _flush(callback: TransformCallback) {
    process.nextTick(() => {
      try {
        this.tokenize('', true)
        callback()
      } catch (e) {
        callback(e)
      }
    })
  }

  public onToken(cb: (token: Token) => any) {
    this.on('token', cb)
  }

  public addRule(rule: ITokenizerRule) {
    this.rules.push(rule)
  }

  private tokenize(data: string, nobuffer: boolean = false) {
    const rules = this.rules
    // in case we buffered data on previous writes
    data = this.buffered + data
    this.buffered = ''
    if (!data.length) {
      return
    }
    const maxIndex = this.getFirstIndexWithNoToken(data)
    if (maxIndex === 0) {
      // no match found
      throw new SyntaxError('could not tokenize ' + JSON.stringify(data))
    } else if (maxIndex === data.length && !nobuffer) {
      // the whole string is matching
      this.buffered = data
      return
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
      this.emit('token', token, type)
      this.push(token.toString())
      this.tokenize(data.substring(maxIndex), nobuffer)
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
