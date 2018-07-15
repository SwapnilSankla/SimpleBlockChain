import { Block } from './Block'
import { Transaction } from './Transaction'

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

export const blockChain = new BlockChain()
