# Emergence DAO smart contract

This will be the testbed for the upcoming Emergence DAO smart contract

## Install

The smart contract is beeing developed using the [Truffle framework](https://github.com/ConsenSys/truffle). To install Truffle, simply do

    $ npm install -g truffle

### Install to run locally

To run tests locally we use [EthereumJS-testrpc](https://github.com/ethereumjs/testrpc), which is an in-memory Ethereum blockchain emulator. To install run

    $ npm install -g ethereumjs-testrpc

To run the blockchain emulator client in its own terminal window

    $ testrpc

This will generate some accounts with associated private keys

## Run

### Compile
To compile the smart contract, use the following command

    $ truffle compile

This will create new files in `environments/development`

### Deploy on the blockchain
In order to deploy the compiled smart contracts on the blockchain, you firt have to make sure that you already have a local blockchain client running before listening to the same port as defined in `truffle.js` (e.g. testrpc or geth on port 8545).
Then run the following command

    $ truffle deploy

### Use with meteor app
Make sure you have the meteor-build-client installed

    $ npm install -g meteor-build-client
