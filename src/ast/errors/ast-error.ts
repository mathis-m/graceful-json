import { Range } from '../../tokenizer/tokens'

export interface ASTError {
  message: string;
  range: Range;
}
