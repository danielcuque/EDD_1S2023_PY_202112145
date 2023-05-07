import { getBlockChain } from "../utils/objects.js";

const blockchain = getBlockChain()


const nextButton = document.getElementById("nextBtn");
const prevButton = document.getElementById("previousBtn");


let currentBlock = blockchain.start

const actualBlockTextarea = document.getElementById("currentBlock")
const decryptMessageTextArea = document.getElementById("descryptedMsg")


const displayCurrentBlock = async () => {

    if (!currentBlock) {
        actualBlockTextarea.value = "No hay mensajes"
        return
    }

    actualBlockTextarea.value = `
    Index: ${currentBlock.data.index}
    TimeStamp: ${currentBlock.formatDate()}
    Emisor: ${currentBlock.data.emiter}
    Receptor: ${currentBlock.data.receptor}
    Mensaje: ${currentBlock.data.msg}
    Previous Hash: ${currentBlock.data.previousHash}
    Hash: ${currentBlock.data.hash}
    `


    const decryptedMsg = await currentBlock.decryptMsg()
    decryptMessageTextArea.value = decryptedMsg
}

nextButton.addEventListener("click", () => {
    if (currentBlock.next) {
        currentBlock = currentBlock.next
        displayCurrentBlock()
    }
})

prevButton.addEventListener("click", () => {
    if (currentBlock.previous) {
        currentBlock = currentBlock.previous
        displayCurrentBlock()
    }
})



displayCurrentBlock()
