const BlockChain = require('./blockchain');


let silverCoin = new BlockChain('This is a sample message', '00');
silverCoin.addBlock('10 SilverCoin');
silverCoin.addBlock('30 SilverCoin');
console.log(JSON.stringify(silverCoin.chain, null, 2));
console.log(silverCoin.validation());

//change the value of bitCoin.chain[1] and execute the method "validation".

silverCoin.chain[1].data = '6 BTC';
console.log(silverCoin.validation());


