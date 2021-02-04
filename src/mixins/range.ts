import { Position, Range } from '../tokenizer/tokens'
import { Constructor } from './base'
import { JsonDocument } from '../ast'

export const RangeMixin =
  <TBase extends Constructor>(Base: TBase, range: Range) =>
    class Ranged extends Base {
      _range: Range = range
      set range(range: Range) {
        this._range = range || null;
      }

      get range() {
        return this._range;
      }
    }

