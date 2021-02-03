const {JsonTokenizer} = require('graceful-json')
const t = new JsonTokenizer()
let data = JSON.stringify({
  test: 123,
  obj: {
    arr: [
      "asd",
      1234,
      {
        "probe": "tester"
      },
      true
    ]
  }
}, null, 2)
console.log(data);
for(let token of t.tokenizeIterator(data)) {
  console.log(`${token.content}(${token.type}: ${token.range.start.row}:${token.range.start.column} - ${token.range.end.row}:${token.range.end.column})`)
}
