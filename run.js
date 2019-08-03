const crypto = require('crypto');
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
  const port = 4000

  app.get('/', function(req, res) {
    res.send('Hello from Tessa !')
  });

  app.get('/add', async function(req, res) {
    var magnet = req.query.magnet;
    var keywords = req.query.keywords;

    if (
      (typeof magnet == 'undefined' || typeof keywords == 'undefined') ||
      (magnet == '' || keywords == '')
    ) {
      res.status(400);
      res.send('bad request')
    }

    var magnet_hash = crypto.createHash('sha256').update(magnet).digest('base64');

    const hash = await db.put({
      '_id': magnet_hash,
      'm': 'wmd',
      'k': keywords.split(' ')
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

  app.listen(port, () => console.log(`Web sever listening on port ${port}!`));

  const query = async () => {
    const index = Math.floor(Math.random() * creatures.length)
    const userId = Math.floor(Math.random() * 900 + 100)

    try {
      await db.add({ avatar: creatures[index], userId: userId })
      const latest = db.iterator({ limit: 5 }).collect()
      let output = ``
      output += `[Latest Visitors]\n`
      output += `--------------------\n`
      output += `ID  | Visitor\n`
      output += `--------------------\n`
      output += latest.reverse().map((e) => e.payload.value.userId + ' | ' + e.payload.value.avatar).join('\n') + `\n`
      console.log(output)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }

setInterval(query, 1000)
});