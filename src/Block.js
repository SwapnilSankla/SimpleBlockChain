import SHA256 from 'crypto-js/sha256'

export class Block {
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