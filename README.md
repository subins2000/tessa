# Tessa

A decentralized torrent search engine.

There are 2 parts :

* IPFS nodes
* Client site (`client` folder)

The client can choose to connect to a node to search/retrieve or add torrents.

## Adding torrents

To add torrents, the user has to login with [Tor.us](https://tor.us), pay a gas price to add torrent. The gas will be used to write the author's public key and corresponding IPFS hash to ensure authenticity.

* Each torrent has an author field which would be the public key obtained from Tor.us
* The torrent info is shared over the network of [IPFS nodes](https://github.com/orbitdb/orbit-db)
* People using the clients can instantly get the newly added torrents