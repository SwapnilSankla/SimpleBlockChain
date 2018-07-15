import SHA256 from 'crypto-js/sha256'

class Transaction {
    constructor(from, to, amount) {
        this.from = from
        this.to = to
        this.amount = amount
    }
}

class Block {
    constructor(transactions, timestamp, previousBlock = '') {
        this.transactions = transactions
        this.timestamp = timestamp
        this.previousBlock = previousBlock
        this.hash = this.calculateHash()
        this.random = 0
    }

    mineBlock(difficulty) {
        let prefix = Array(difficulty + 1).join("0")
        while (true) {
            let hash = this.calculateHash()
            if (hash.startsWith(prefix)) {
                this.hash = hash
                return
            }
            this.random += 1
        }
    }

    calculateHash() {
        return new SHA256(this.transactions +
            this.previousBlock +
            this.random)
            .toString()
    }
}

class BlockChain {

    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
        this.miningRewardCoins = 100
        this.pendingTransactions = []
    }

    createGenesisBlock() {
        let genesisBlock = new Block([], "Genesis block", Date.now())
        return genesisBlock
    }

    createTransactions(transactions) {
        for(const transaction of transactions) {
            this.pendingTransactions.push(transaction)
        }
    }

    minePendingTransactions(minerAddress) {
        let block = new Block(this.pendingTransactions, Date.now())
        block.previousBlock = this.chain[this.chain.length - 1].hash
        block.mineBlock(this.difficulty)
        this.pendingTransactions = [
            new Transaction(null, minerAddress, this.miningRewardCoins)
        ]
        this.chain.push(block)
    }

    getBalance(miner) {
        let balance = 0

        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (miner === transaction.from) {
                    balance -= transaction.amount
                }
                if (miner === transaction.to) {
                    balance += transaction.amount
                }
            }
        }

        return balance
    }

    isValid() {
        for (var i = 1; i < this.chain.length; i++) {
            if (this.chain[i].hash != this.chain[i].calculateHash()) {
                return false
            }
            if (this.chain[i].previousBlock != this.chain[i - 1].hash) {
                return false
            }
        }
        return true
    }
}

let blockChain = new BlockChain()

let firstSetOfTransactions = [
    new Transaction("swapnil", "supriya", 100),
    new Transaction("supriya", "swapnil", 50)
]
blockChain.createTransactions(firstSetOfTransactions)
blockChain.minePendingTransactions("swapnil")

console.log(blockChain.chain)
console.log("blockChain.isValid: " + blockChain.isValid())
console.log("Balance for Swapnil is : " + blockChain.getBalance("swapnil"))

let secondSetOfTransactions = [
    new Transaction("swapnil", "supriya", 50),
    new Transaction("supriya", "swapnil", 50)
]
blockChain.createTransactions(secondSetOfTransactions)
blockChain.minePendingTransactions("swapnil")

console.log(blockChain.chain)
console.log("blockChain.isValid: " + blockChain.isValid())
console.log("Balance for Swapnil is : " + blockChain.getBalance("swapnil"))

blockChain.minePendingTransactions("swapnil")
console.log(blockChain.chain)
console.log("blockChain.isValid: " + blockChain.isValid())
console.log("Balance for Swapnil is : " + blockChain.getBalance("swapnil"))

