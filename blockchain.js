const Block = require("./block");

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
        block.mine(this.difficulty);
        console.log(`Mined: ${block.hash} Nonce: ${block.nonce}`)
        this.chain.push(block);
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