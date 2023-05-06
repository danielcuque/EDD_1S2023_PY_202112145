class nodoBloque {
    constructor(index, fecha, emisor, receptor, mensaje, previousHash, hash) {
        this.valor = {
            'index': index,
            'timestamp': fecha,
            'transmitter': emisor,
            'receiver': receptor,
            'message': mensaje,
            'previoushash': previousHash,
            'hash': hash
        }
        this.siguiente = null
        this.anterior = null
    }
}

class Bloque {
    constructor() {
        this.inicio = null
        this.bloques_creados = 0
    }

    async insertarBloque(fecha, emisor, receptor, mensaje) {
        if (this.inicio === null) {
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha, emisor, receptor, mensajeEncriptado, '0000', hash)
            this.inicio = nuevoBloque
            this.bloques_creados++
        } else {
            let cadena = this.bloques_creados + fecha + emisor + receptor + mensaje
            let hash = await this.sha256(cadena)
            let mensajeEncriptado = await encriptacion(mensaje)
            let aux = this.inicio
            while (aux.siguiente) {
                aux = aux.siguiente
            }
            const nuevoBloque = new nodoBloque(this.bloques_creados, fecha, emisor, receptor, mensajeEncriptado, aux.valor['hash'], hash)
            nuevoBloque.anterior = aux
            aux.siguiente = nuevoBloque
            this.bloques_creados++
        }
    }

    async sha256(mensaje) {
        let cadenaFinal
        const enconder = new TextEncoder();
        const mensajeCodificado = enconder.encode(mensaje)
        await crypto.subtle.digest("SHA-256", mensajeCodificado)
            .then(result => { // 100 -> 6a 
                const hashArray = Array.from(new Uint8Array(result))
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
                cadenaFinal = hashHex
            })
            .catch(error => console.log(error))
        return cadenaFinal
    }
}

const bloque = new Bloque()
let bloque_actual

function fechaActual() {
    let cadena = ''
    const fechaActual = new Date();
    cadena += fechaActual.getDate() < 10 ? ("0" + fechaActual.getDate() + "-") : (fechaActual.getDate() + "-")
    cadena += fechaActual.getMonth() < 10 ? ("0" + (fechaActual.getMonth() + 1) + "-") : (fechaActual.getMonth() + "-")
    cadena += fechaActual.getFullYear() + "::"
    cadena += fechaActual.getHours() < 10 ? ("0" + fechaActual.getHours() + ":") : (fechaActual.getHours() + ":")
    cadena += fechaActual.getMinutes() < 10 ? ("0" + fechaActual.getMinutes() + ":") : (fechaActual.getMinutes() + ":")
    cadena += fechaActual.getSeconds() < 10 ? ("0" + fechaActual.getSeconds()) : (fechaActual.getSeconds())
    return cadena

}

const btnEnviar = document.getElementById("enviar")
btnEnviar.addEventListener("click", enviarMensaje)

function enviarMensaje() {
    let emisor_mensaje = document.getElementById("emisor").value
    let receptor_mensaje = document.getElementById("receptor").value
    let mensaje_final = document.getElementById("mensaje").value
    bloque.insertarBloque(fechaActual(), emisor_mensaje, receptor_mensaje, mensaje_final)
    console.log("Mensaje Enviado")
}

/** REPORTES */

const btnReporte = document.getElementById("reporte")
btnReporte.addEventListener("click", reporte)

function reporte() {
    bloque_actual = bloque.inicio
    if (bloque_actual != null) {
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

const btnReporte1 = document.getElementById("siguiente-bloque")
btnReporte1.addEventListener("click", reporte_siguente)

function reporte_siguente() {
    if (bloque_actual.siguiente != null) {
        bloque_actual = bloque_actual.siguiente
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

const btnReporte2 = document.getElementById("anterior-bloque")
btnReporte2.addEventListener("click", reporte_anterior)

function reporte_anterior() {
    if (bloque_actual.anterior != null) {
        bloque_actual = bloque_actual.anterior
        let cadena = "Index: " + bloque_actual.valor['index']
        cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
        cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
        cadena += "\nReceptor: " + bloque_actual.valor['receiver']
        cadena += "\nMensaje: " + bloque_actual.valor['message']
        cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
        cadena += "\nHash: " + bloque_actual.valor['hash']
        document.getElementById("reporte-bloques").value = cadena
        mostrar_Mensaje_descriptado()
    }
}

async function mostrar_Mensaje_descriptado() {
    /** if carnet ==  bloque_actual.valor['receiver'] y  bloque_actual.valor['trasmitter'] == emisor
     * mostrar mensaje
     * bloque_actual = abloque_actual.siguiente
     */
    let cadena = await desencriptacion(bloque_actual.valor['message'])
    document.getElementById("reporte-mensajes").value = cadena
}

/**
 * Una funcion que lea todo los bloques y simplemente muestre el mensaje
 * al usuario final
 * bloque_actual.valor['receiver'] == 201700918
 * mensaje de  bloque_actual.valor['trasmitter']
 *  ( mensaje_descriptado(carnet, emisor) )
 * 201700918
 * 
 */

import { aesDecryption, aesEncryption, hashPassword } from "../utils/index.js"

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
        return aesDecryption(this.data.msg)
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
        const hash = await hashPassword(seed)
        const encryptedMsg = await aesEncryption(msg)

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

            // Search the last block
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

    graphviz() {

        return `
        digraph G {
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