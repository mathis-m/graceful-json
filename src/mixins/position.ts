import { Position } from '../tokenizer/tokens'
import { Constructor } from './base'

export const PositionMixin =
  <TBase extends Constructor>(Base: TBase, position: Position | null = null) => {
    return class Positioned extends Base {
      _position: Position | null = position

      set position(pos: Position | null ) {
        this._position = pos
      }

      get position() : Position | null {
        return this._position
      }
    }
  }
