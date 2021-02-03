const {Readable} = require('stream')
const {promisify} = require('util')
const sleep = promisify(setTimeout)
const {JsonTokenizer} = require('graceful-json')
const json = `{
    "test": 123,
}`
console.log(json)
async function * typeJson () {
    for (const char of json) {
        yield char;
        sleep(500)
    }
}

async function run () {
    const rs = Readable.from(typeJson())
    const t = new JsonTokenizer()
    t.on("token", (token) => {
        console.log(`${token.content}(${token.type}: ${token.range.start.row}:${token.range.start.column} - ${token.range.end.row}:${token.range.end.column})`)
    })
    rs.pipe(t)
}
run()