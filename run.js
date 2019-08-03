const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
// Note that these options need to be passed to IPFS in
// all examples even if not specified so.
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)

ipfs.on('error', (e) => console.error(e))
ipfs.on('ready', async () => {
  const orbitdb = await OrbitDB.createInstance(ipfs)

  // Create / Open a database
  const db = await orbitdb.docs('torrents')
  await db.load()

  // Listen for updates from peers
  db.events.on('replicated', (address) => {
    console.log(db.iterator({ limit: -1 }).collect())
  })

  const express = require('express')
  const app = express()
  const port = 3000

  app.get('/', function(req, res) {
    res.send('Hello from Tessa !')
  });

  app.get('/add', async function(req, res) {
    const hash = await db.put({
      '_id': 'ss3',
      'm': 'wmd',
      'k': ['movies', 'series']
    });
    res.send(hash);
  });

  app.get('/list', function(req, res) {
    const results = db.get('');
    res.send(results)
  });

  app.get('/search', function(req, res) {
    q_keywords = req.query.q.split(' ');
    const results = db.query(function(item) {
      for (var k in q_keywords) {
        if (item.keywords.indexOf(q_keywords[k]) !== -1) {
          return true;
        }
      }
      return false;
    });
    res.send(results)
  });

  app.listen(port, () => console.log(`Web sever listening on port ${port}!`))
});