import { JsonTokenizer } from '../tokenizer'
import { UnexpectedEndOfInputError } from './errors'
import { JsonDocument } from './node-types'

export class JsonAST {
  constructor(private graceful = false) {
  }
  private tokenizer = new JsonTokenizer()

  parse(data: string): JsonDocument {
    const firstToken = this.tokenizer.tokenizeIterator(data).next()
    let jsonDocument = new JsonDocument();
    if (!firstToken) {
      if(!this.graceful) {
        throw new (UnexpectedEndOfInputError.at(1, 1))
      }
    }
    return jsonDocument;
  }
}
