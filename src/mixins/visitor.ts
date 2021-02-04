import { Position, Range } from '../tokenizer/tokens'
import { Constructor } from './base'
import { JsonDocument } from '../ast'

export const VisitorMixin =
  <TBase extends Constructor>(Base: TBase) =>
    class Visitable extends Base {
      accept(visitor: Visitor) { visitor.visit(this); }
    }

export class Visitor {
  private _stop = false;
  set stop(stop: boolean) { this._stop = stop; }
  get stop() { return this._stop; }

  document(docNode: JsonDocument){
    console.log(docNode);
  };

  object(objectNode: any){
    console.log(objectNode);
  };

  property(propertyNode: any){
    console.log(propertyNode);
  };

  key(keyNode: any){
    console.log(keyNode);
  };

  array(arrayNode: any){
    console.log(arrayNode);
  };

  value(valueNode: any){
    console.log(valueNode);
  };
  comment(commentNode: any){
    console.log(commentNode);
  };
  string(stringNode: any){
    console.log(stringNode);
  };

  number(numberNode: any){
  console.log(numberNode);
};

  boolean(booleanNode: any){
    console.log(booleanNode);
  };

  nil(nullNode: any){
    console.log(nullNode);
  };

  visit(node: any) {
    if (this.stop) {
      return;
    }
    // traverseAST(this, node);
  }
}
