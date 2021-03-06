const SHA256 = require('crypto-js/sha256');//encryption key

class Block {
    constructor(index, transactions, previousHash = '') {
        this.index = index;
        this.date = new Date();
        this.transactions = transactions;
        this.hash = this.generateHash();
        this.previousHash = previousHash;
        this.nonce = 0; //number to generate a hash with a condition
    }

    generateHash() {
        return SHA256(this.index + this.date + this.transactions + this.previousHash + this.nonce).toString();
    }

    mine(difficulty) {
        while (!this.hash.startsWith(difficulty)) {
            this.nonce++;
            this.hash = this.generateHash();
        }
    }
}
module.exports = Block;