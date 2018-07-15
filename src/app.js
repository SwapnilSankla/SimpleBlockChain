import { blockChain } from './Blockchain'
import { Transaction } from './Transaction'

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

