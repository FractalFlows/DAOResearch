contract('Emergence', function(accounts) {
  it("should be able to get and set", (done) => {
    var em = Emergence.deployed();

    var val = 100;
    em.set(val, {from:accounts[0]})
      .then(() => em.get.call({from:accounts[0]}))
      .then((value) => assert.equal(value.toNumber(), val,
          "wrong value in storedData"))
      .then(done).catch(done);
  });

  it("should be able to set a URL and get it when enough is paid", (done) => {
    var em = Emergence.deployed();

    var val = "http://solidity.readthedocs.io/en/latest/types.html#arrays";
    em.setURL(val, {from:accounts[0]})
      .then(() => em.getURL.call({from:accounts[0], value:20}))
      .then((v) => assert.equal(v, val, "wrong url returned"))
      .then(done).catch(done);
  });

  it("shouldn't be able to get a URL if not enough is paid", (done) => {
    var em = Emergence.deployed();

    var val = "http://solidity.readthedocs.io/en/latest/types.html#arrays";
    var val2 = "http://google.com"
    em.setURL(val, {from:accounts[0]})
      .then(() => em.getURL.call({from:accounts[0], value:1}))
      .then((v) => assert.equal(v, val2, "wrong value in url"))
      .then(done).catch(done);
  });

  it("should be able to mint", (done) => {
    var em = Emergence.deployed();
    var amount = 100;

    em.mint(accounts[1], amount, {from:accounts[0]})
      .then(() => em.balances(accounts[1]))
      .then(e => assert.equal(e.toNumber(), amount, "wrong balance of accounts[1]"))
      .then(done).catch(done)
  });

  it("should have 10000 in the first account", (done) => {
    var em = Emergence.deployed();
    var amount = 10000;

    em.balances(accounts[0])
      .then((e) => assert(e.toNumber(), amount, "Balance of account[0] isn't 10000"))
      .then(done).catch(done)
  });

  it("should be possible to send coins from account 1 to account 3",(done) => {
    var em = Emergence.deployed();
    var amount = 1001;

    em.send(accounts[3], amount, {from:accounts[0]})
      .then(() => em.balances(accounts[3]))
      .then((v) => assert(v.toNumber(), amount, "Balance of account[3] is wrong"))
      .then(done).catch(done)
  })

  // it("should call a function that depends on a linked library  ", function(done){
  //   var meta = MetaCoin.deployed();
  //   var metaCoinBalance;
  //   var metaCoinEthBalance;
  //
  //   meta.getBalance.call(accounts[0]).then(function(outCoinBalance){
  //     metaCoinBalance = outCoinBalance.toNumber();
  //     return meta.getBalanceInEth.call(accounts[0]);
  //   }).then(function(outCoinBalanceEth){
  //     metaCoinEthBalance = outCoinBalanceEth.toNumber();
  //
  //   }).then(function(){
  //     assert.equal(metaCoinEthBalance,2*metaCoinBalance,"Library function returned unexpeced function, linkage may be broken");
  //
  //   }).then(done).catch(done);
  // });

  // it("should send coin correctly", function(done) {
  //   var meta = MetaCoin.deployed();
  //
  //   // Get initial balances of first and second account.
  //   var account_one = accounts[0];
  //   var account_two = accounts[1];
  //
  //   var account_one_starting_balance;
  //   var account_two_starting_balance;
  //   var account_one_ending_balance;
  //   var account_two_ending_balance;
  //
  //   var amount = 10;
  //
  //   meta.getBalance.call(account_one)
  //   .then(function(balance) {
  //     account_one_starting_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   })
  //   .then(function(balance) {
  //     account_two_starting_balance = balance.toNumber();
  //     return meta.sendCoin(account_two, amount, {from: account_one});
  //   })
  //   .then(function() {
  //     return meta.getBalance.call(account_one);
  //   })
  //   .then(function(balance) {
  //     account_one_ending_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   })
  //   .then(function(balance) {
  //     account_two_ending_balance = balance.toNumber();
  //
  //     assert.equal(account_one_ending_balance, account_one_starting_balance - amount,
  //       "Amount wasn't correctly taken from the sender");
  //     assert.equal(account_two_ending_balance, account_two_starting_balance + amount,
  //       "Amount wasn't correctly sent to the receiver");
  //   })
  //   .then(done).catch(done);
  // });
});
