module.exports = {
  build: {
    "main.html": "client/main.html",
    "main.js": [
      "client/main.js"
    ],
    "main.css": [
      "client/main.css"
    ],
    // "images/": "images/"
  },
  deploy: [
    "MetaCoin",
    "ConvertLib",
    "Emergence"
  ],
  rpc: {
    host: "localhost",
    port: 8545
  },
  build: './truffle-meteor-build'
};
