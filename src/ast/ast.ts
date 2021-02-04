import { JsonTokenizer } from '../tokenizer'
import { UnexpectedEndOfInputError } from './errors'

export class JsonAST {
  private tokenizer = new JsonTokenizer()

  parse(data: string) {
    const firstToken = this.tokenizer.tokenizeIterator(data).next()
    if (!firstToken) {
      throw new (UnexpectedEndOfInputError.at(1, 1))
    }
  }
}
