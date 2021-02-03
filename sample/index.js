const {JsonTokenizer} = require('graceful-json')
const json = '{"test": "null", "test": "null", "test": "null", "test": "null"}'
console.log(json)
const t = new JsonTokenizer()
for(let token of t.tokenizeIterator(json)) {
  console.log(`${token.content}(${token.type}: ${token.range.start.row}:${token.range.start.column} - ${token.range.end.row}:${token.range.end.column})`)
}
