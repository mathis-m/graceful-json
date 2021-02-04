import { ASTError } from '../errors/ast-error'

export interface ValidateAble {
  validate(): ASTError[]
}
