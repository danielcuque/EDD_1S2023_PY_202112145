import { decode, encode, encryptSha256 } from "./encrypt.js"

export class Block {
    constructor(index, date, emiter, receptor, msg, previousHash, hash) {
        this.data = {
            index,
            date,
            emiter,
            receptor,
            msg,
            previousHash,
            hash
        }
        this.next = null
        this.previous = null
    }

    decryptMsg() {
        return decode(this.data.msg)
    }

    formatDate() {
        let result = ''
        result += this.data.date.getDate() < 10 ? ("0" + this.data.date.getDate() + "-") : (this.data.date.getDate() + "-")
        result += this.data.date.getMonth() < 10 ? ("0" + (this.data.date.getMonth() + 1) + "-") : (this.data.date.getMonth() + "-")
        result += this.data.date.getFullYear() + "::"
        result += this.data.date.getHours() < 10 ? ("0" + this.data.date.getHours() + ":") : (this.data.date.getHours() + ":")
        result += this.data.date.getMinutes() < 10 ? ("0" + this.data.date.getMinutes() + ":") : (this.data.date.getMinutes() + ":")
        result += this.data.date.getSeconds() < 10 ? ("0" + this.data.date.getSeconds()) : (this.data.date.getSeconds())
        return result
    }
}

export class BlockChain {
    constructor() {
        this.start = null
        this.blockCounter = 0
    }

    async insert(date, emiter, receptor, msg) {

        const seed = this.blockCounter + date + emiter + receptor + msg
        const hash = await encryptSha256(seed)
        const encryptedMsg = await encode(msg)

        if (this.start === null) {
            const newBlock = new Block(this.blockCounter, date, emiter, receptor, encryptedMsg, '0000', hash)
            this.start = newBlock
            this.blockCounter++
        } else {

            // Search the last block
            let aux = this.start
            while (aux.next) {
                aux = aux.next
            }

            const newBlock = new Block(this.blockCounter, date, emiter, receptor, encryptedMsg, aux.data.hash, hash)
            newBlock.previous = aux
            aux.next = newBlock
            this.blockCounter++
        }
    }

    insertBlock(block) {
        if (this.start === null) {
            block.data.previousHash = '0000'
            this.start = block
            this.blockCounter++
        } else {

            let aux = this.start
            while (aux.next) {
                aux = aux.next
            }
            block.previous = aux
            block.data.previousHash = aux.data.hash
            aux.next = block
            this.blockCounter++
        }
    }

    async sha256(msg) {
        let result
        const enconder = new TextEncoder();
        const encryptedMsg = enconder.encode(msg)
        await crypto.subtle.digest("SHA-256", encryptedMsg)
            .then(result => {
                const hashArray = Array.from(new Uint8Array(result))
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
                result = hashHex
            })
            .catch(error => console.log(error))
        return result
    }

    toDot() {

        return `
        https://quickchart.io/graphviz?graph=digraph G {
            rankdir=TB;
            node [shape=record];
            ${this.graphvizNodes()}
            ${this.graphvizEdges()}

        }
        `

    }

    graphvizNodes() {

        let result = ''
        let aux = this.start
        while (aux) {
            result += `node${aux.data.index} [label="{ TimeStamp ${aux.formatDate()} \\n Emisor: ${aux.data.emiter} \\n Repector: ${aux.data.receptor} \\n PreviousHash ${aux.data.previousHash} }"];\n`
            aux = aux.next
        }
        return result
    }

    graphvizEdges() {

        let result = ''
        let aux = this.start
        while (aux) {
            if (aux.next) {
                result += `node${aux.data.index}:f0 -> node${aux.next.data.index}:f0;\n`
            }
            aux = aux.next
        }
        return result
    }
}