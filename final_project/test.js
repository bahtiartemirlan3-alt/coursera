const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('./index');
const { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle } = require('./router/general');

async function run() {
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(5000, '127.0.0.1', resolve));
  try {
    assert.equal(Object.keys(await getAllBooks()).length, 10);
    assert.equal((await getBookByISBN(1)).title, 'Things Fall Apart');
    assert.equal(Object.keys(await getBooksByAuthor('Unknown')).length, 4);
    assert.equal((await getBooksByTitle('Pride and Prejudice'))[8].author, 'Jane Austen');
    console.log('PASS: Axios async book lookup tests (4/4)');
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
