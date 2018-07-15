import SHA256 from 'crypto-js/sha256'

class Block {
    constructor(index, data, date, previousBlock = '') {
        this.index = index
        this.data = data
        this.date = date
        this.previousBlock = previousBlock
        this.hash = this.calculateHash()
        this.random = 0
    }

    mineBlock(difficulty) { 
        let prefix = Array(difficulty + 1).join("0")
        while(true) {
            let hash = this.calculateHash() 
            if(hash.startsWith(prefix)) {
                return hash
            }
            this.random += 1
        }
    }

    calculateHash() { 
        return new SHA256(this.index + 
                JSON.stringify(this.data) + 
                this.date + 
                this.previousBlock + 
                this.random)
            .toString()         
    }
}

class BlockChain {
    
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 5
    }

    createGenesisBlock() {
        let genesisBlock = new Block(1, "Genesis block", "13/7/2018")
        return genesisBlock
    }

    addBlock(block) {
        block.previousBlock = this.chain[this.chain.length - 1].hash
        block.hash = block.mineBlock(this.difficulty)
        this.chain[this.chain.length] = block
    }

    isValid() {
        for(var i=1; i< this.chain.length; i++) {
            if (this.chain[i].hash != this.chain[i].calculateHash()) {
                return false
            }
            if (this.chain[i].previousBlock != this.chain[i-1].hash) {
                return false
            }
        }
        return true
    }
}

let blockChain = new BlockChain()
console.log("Adding first block")
blockChain.addBlock(new Block(1, { amount: 10 }, "14/7/2018"))
console.log("Adding second block")
blockChain.addBlock(new Block(2, "some data", "14/7/2018"))
console.log("Adding third block")
blockChain.addBlock(new Block(3, { amount: 20 }, "15/7/2018"))
console.log("Adding fourth block")
blockChain.addBlock(new Block(4, "some more data", "15/7/2018"))

console.log(blockChain)
console.log(blockChain.isValid())
blockChain.chain[2].data = "x"
console.log(blockChain.isValid())
