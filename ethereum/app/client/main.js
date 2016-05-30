import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Session.setDefault("latestBlock", {});
Session.setDefault('account', '0x158663Db1E4cDD3Df1220677371140a0B2068F6D')
Session.setDefault('account2', '0x158663Db1E4cDD3Df1220677371140a0B2068F6D')



Template.lastblock.helpers({
  block: ()=>  JSON.stringify(Session.get('latestBlock'), null, 3),
});



Template.account.helpers({
  account: () => {
      // get all the accounts that are in the transactions (both from and to), filter them out using a set
      let account_nbs = new Set([].concat.apply([], Transactions.find({}).map(({from, to})=>[from, to])));
      return Array.from(account_nbs).map(e=>({accountnb:e}))
  },
  local_accounts: () => {
    let account_nbs = new Set([].concat.apply([], Transactions.find({}).map(({from, to})=>[from, to])));
    // Filter the account number with the one accessible through the local node
    return Array.from(account_nbs)
              .filter(e=>web3.eth.accounts.includes(e))
              .map(e=>({accountnb:e}))
  },
  balance: () => TokenInstance.balances(Session.get('account')).toString(10),
  balance2: () => TokenInstance.balances(Session.get('account2')).toString(10),
  sign: () => TokenInstance.symbol(),
});

Template.account.events({
  "keyup #account": function(event, template){
      console.log(event, template, $('#account').val());
      Session.set('account', $('#account').val());
  },
  "click .accountnb": function(event, template){
    let accountnb = event.target.text;
    console.log(accountnb);
    $('#account').val(accountnb);
    Session.set('account', accountnb);
  },
  "keyup #account2": function(event, template){
      console.log(event, template, $('#account2').val());
      Session.set('account2', $('#account2').val());
  },
  "click .accountnb2": function(event, template){
    let accountnb = event.target.text;
    console.log(accountnb);
    $('#account2').val(accountnb);
    Session.set('account2', accountnb);
  },
  "click #transfer": function(event, template){
    event.preventDefault();
    let tx = TokenInstance.send(Session.get('account2'), Number($('#amount').val()), {from:Session.get('account'), gas:80000})
    console.log('Transfer created', tx, Session.get('account'), Session.get('account2'), Number($('#amount').val()))
  }
});


Template.transactions.helpers({
  transaction: () => Transactions.find({}),
});

Template.transactions.events({
  "click #foo": function(event, template){

  }
});
