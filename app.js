const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(index, data, previousHash = '') {
        this.index = index;
        this.date = new Date();
        this.data = data;
        this.hash = this.generateHash();
        this.previousHash = previousHash;
        this.nonce = 0; //number to generate a hash with a condition
    }

    generateHash() {
        return SHA256(this.index + this.date + this.data + this.previousHash).toString();
    }

    mine(difficulty) {
        while (!this.hash.startsWith(difficulty)) {
            this.nonce++;
            this.hash = this.generateHash();
            console.log(this.nonce + '  ' + this.hash);
        }
    }
}

class BlockChain {
    constructor(genesis, difficulty) {
        this.chain = [this.createFirstBlock(genesis)];
        this.difficulty = difficulty;
    }

    createFirstBlock(genesis) {
        return new Block(0, genesis);
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        let prevBlock = this.getLastBlock();
        let block = new Block(prevBlock.index + 1, data, prevBlock.hash);
        //block.mine(this.difficulty);
        console.log(`Minado: ${block.hash} Nonce: ${block.nonce}`)
        this.chain.push(block);
    }
    validation() {
        for (let i = 1; i < this.chain.length; i++) {
            let prevBlock = this.chain[i - 1];
            let currentBlock = this.chain[i];
            if (currentBlock.prevBlock != prevBlock.hash) return false;
            if (currentBlock.generateHash() != currentBlock.hash); false
        }
        return true;
    }
}

let bitCoin = new BlockChain('Hola Mundo');
bitCoin.addBlock('1 BitCoin');
//bitCoin.addBlock('Bittcoin');
console.log(JSON.stringify(bitCoin.chain, null, 2));


