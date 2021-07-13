const Block = require("./block");
const Transaction = require('./transactions');
class BlockChain {
    constructor() {
        this.chain = [this.createFirstBlock()];
        this.difficulty = '00';
        this.pendingTransactions = [];
        this.miningReward = 50;
    }

    createFirstBlock(genesis) {
        return new Block(0, 'Block genesis');
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransactions(transaction) {
        this.pendingTransactions.push(transaction);
    }
    minePendingTransactions(addMiner) {
        let block = new Block(this.getLastBlock().index + 1, this.pendingTransactions);
        block.previousHash = this.getLastBlock().hash;
        block.mine(this.difficulty);
        console.log('mined succes!!');
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, addMiner, this.miningReward)
        ]
    }

    getBalanceOfAddres(addres) {
        let balance = 0;
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddres === addres) balance -= transaction.amount;
                if (transaction.toAddres === addres) balance += transaction.amount;
            }
        }
        return balance;
    }

    validation() {
        for (let i = 1; i < this.chain.length; i++) {//starts from 1, because the first block has no preceding hash
            let preBlock = this.chain[i - 1];
            let currentBlock = this.chain[i];
            if (currentBlock.previousHash != preBlock.hash) {//If the link that the current block has matches the previous one
                return false;
            }
            if (currentBlock.hash != currentBlock.generateHash()) {//in case there has been a data change. Hash is modified, therefore it is incorrect
                return false;
            }
        }
        return true;
    }
}

module.exports = BlockChain;