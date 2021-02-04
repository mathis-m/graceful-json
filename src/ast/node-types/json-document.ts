import { IJsonNode, JsonNode } from './json-node'
import { ASTError } from '../errors/ast-error'
import { UnexpectedEndOfInputError } from '../errors'
import { Position } from '../../tokenizer/tokens'
import { ValidateAble } from './validate-able'


export class JsonDocument extends JsonNode implements ValidateAble {
  public root: IJsonNode | null = null;
  constructor() {
    super('document')
  }
  validate(): ASTError[] {
    if(this.root) {
      return [];
    }
    const pos = new Position(1, 1)
    return [new (UnexpectedEndOfInputError.inRange(pos))]
  }
}
