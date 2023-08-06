const hash = require('crypto-js/sha256');

class Block {
    constructor(prevHash, data) {
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = new Date();

        this.hash = this.calculateHash();
        this.mineVar = 0;
    }

    calculateHash() {
        return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar).toString();
    }

    mineBlock(difficulty) {
        while (!this.hash.startsWith("0".repeat(difficulty))) {
            this.mineVar++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor(difficulty) {
        const genesisBlock = new Block("0000", { isGenesis: true });
        this.difficulty = difficulty;
        this.chain = [genesisBlock];
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const lastBlock = this.getLastBlock();
        const newBlock = new Block(lastBlock.hash, data);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.prevHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

const myChain = new Blockchain(4);
myChain.addBlock({
    from: "Thoai",
    to: "Tho",
    money: 300000
});
myChain.addBlock({
    from: "Thoai",
    to: "Dung",
    money: 400000
});
myChain.addBlock({
    from: "Thoai",
    to: "Phuc",
    money: 400000
});

console.log(myChain.chain);