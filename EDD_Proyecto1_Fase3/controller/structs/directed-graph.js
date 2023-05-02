class AdjacentNode {
    constructor(valor) {
        this.next = null
        this.below = null
        this.value = valor
    }
}

export class AdjacentMatrix {
    constructor() {
        this.root = null
    }

    newRow(text) {
        const newNode = new AdjacentNode(text)
        if (this.root === null) {
            this.root = newNode
        } else {
            let aux = this.root
            while (aux.below) {
                if (aux.value === newNode.value) {
                    return
                }
                aux = aux.below
            }
            aux.below = newNode
        }
    }

    newColumn(parent, children) {
        const newNode = new AdjacentNode(children)
        if (this.root !== null && this.root.value === parent) {
            let aux = this.root
            while (aux.next) {
                aux = aux.next
            }
            aux.next = newNode
        } else {
            this.newRow(parent)
            let aux = this.root
            while (aux) {
                if (aux.value === parent) {
                    break;
                }
                aux = aux.below
            }
            if (aux !== null) {
                while (aux.next) {
                    aux = aux.next
                }
                aux.next = newNode
            }
        }
    }

    insertValues(parent, children) {
        let str = children.split(',')
        for (let i = 0; i < str.length; i++) {
            this.newColumn(parent, str[i])
        }
    }

    toDot() {
        let cadena = "graph grafoDirigido{ rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato; "
        let auxPadre = this.root
        let auxHijo = this.root
        let peso = 0
        while (auxPadre) {
            auxHijo = auxPadre.next
            let profundidad = auxPadre.value.split('/')
            let padre = ""
            if (profundidad.length == 2 && profundidad[1] == "") { peso = 1 }
            else if (profundidad.length == 2 && profundidad[1] != "") { peso = 2 }
            else { peso = profundidad.length }
            if (auxPadre.value != "/") { padre = profundidad[profundidad.length - 1] }
            else { padre = "/" }
            while (auxHijo) {
                cadena += "\"" + padre + "\"" + " -- " + "\"" + auxHijo.value + "\"" + " [label=\"" + peso + "\"] "
                auxHijo = auxHijo.next
            }
            auxPadre = auxPadre.below
        }
        cadena += "}"
        return cadena
    }
}