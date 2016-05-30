Transactions = new Mongo.Collection('transactions', {connection: null});
new PersistentMinimongo(Transactions);
