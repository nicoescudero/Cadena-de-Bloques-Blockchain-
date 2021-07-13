const BlockChain = require('./blockchain');
const Transactions = require('./transactions');

let silverCoin = new BlockChain();

//add the transactions to the first block
silverCoin.addTransactions(new Transactions('Intel', 'Canonical', 50));
silverCoin.addTransactions(new Transactions('HP', 'Canonical', 10));

console.log('Mining...');
silverCoin.minePendingTransactions('Intel');
console.log(`Balance= ${silverCoin.getBalanceOfAddres('Intel')}`);
console.log(JSON.stringify(silverCoin, null, 4));

console.log('Mining...');
silverCoin.minePendingTransactions('Intel')
console.log(`Balance= ${silverCoin.getBalanceOfAddres('Intel')}`);


console.log(JSON.stringify(silverCoin, null, 4));