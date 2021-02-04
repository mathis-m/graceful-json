import { VisitorMixin } from '../../mixins/visitor'
import { PositionMixin } from '../../mixins/position'

export class NodeBase {
  static nodeType = "invalid"
  constructor(private _type: string) {
  }

  get type() { return this._type; }

  static toObject(jsonNode: NodeBase) { return JSON.parse(JSON.stringify(jsonNode)); }
  static toString(jsonNode: NodeBase) { return JSON.stringify(jsonNode); }
}
export const JsonNode = VisitorMixin(PositionMixin(NodeBase))
export type IJsonNode = typeof JsonNode
