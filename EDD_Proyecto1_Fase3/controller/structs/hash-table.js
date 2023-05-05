import { showSnackbar } from "../../utils/fields.js"
import { Graph } from "./directed-graph.js"

class HashNode {
    constructor(id, name, password) {
        this.id = id
        this.name = name
        this.password = password
        this.graph = new Graph()
    }
}

export class HashTable {
    constructor() {
        this.data = new Array(7)
        this.maxSize = 7
        this.bucketsUsed = 0
    }

    set(id, name, password, naryTree, graph) {
        let address = this.hashMethod(id)
        const newNode = new HashNode(id, name, password);

        if (naryTree) {
            this.fillGraph(newNode, naryTree)
        }

        if (graph) {
            newNode.graph = graph
        }

        if (address < this.maxSize) {
            try {
                if (this.data[address] == null) {
                    this.data[address] = newNode

                    this.bucketsUsed++;
                    this.resize();
                } else {
                    let counter = 1;
                    address = this.recalculateNewIndex(id, counter)
                    while (this.data[address] != null) {
                        counter++;
                        address = this.recalculateNewIndex(id, counter)
                    }
                    this.data[address] = newNode

                    this.bucketsUsed++;
                    this.resize()
                }
            } catch (err) {
                console.log("Hubo un error en insercion")
            }
        }
    }

    fillGraph(node, naryTree) {
        if (naryTree) {
            if (naryTree.root.children.length > 0) {
                const newGraph = new Graph()
                this.fillGraphAux(naryTree.root, newGraph)
                node.graph = newGraph

            }
        }
    }

    fillGraphAux(nodeTree, graph) {
        if (nodeTree.children.length > 0) {
            graph.addVertex(nodeTree.name, nodeTree.files)
            nodeTree.children.forEach(child => {
                graph.addVertex(child.name, child.files)
                graph.addEdge(nodeTree.name, child.name)
                this.fillGraphAux(child, graph);
            })
        }
    }

    hashMethod(id) {
        let idStr = id.toString()
        let divisor = 0
        for (let i = 0; i < idStr.length; i++) {
            divisor = divisor + idStr.charCodeAt(i)
        }
        return divisor % this.maxSize
    }

    resize() {
        let aux_utilizacion = this.maxSize * 0.75
        if (this.bucketsUsed > aux_utilizacion) {
            this.maxSize = this.nextPrime()
            this.bucketsUsed = 0
            this.reset()
        }
    }

    nextPrime() {
        let number = this.maxSize + 1;
        while (!this.isPrime(number)) {
            number++;
        }
        return number;
    }

    reset() {
        const auxTable = this.data
        this.data = new Array(this.maxSize)
        auxTable.forEach((student) => {
            this.set(student.id, student.name, student.password, undefined, student.graph)
        })
    }

    recalculateNewIndex(id, iteration) {
        let index = this.hashMethod(id) + iteration * iteration
        return this.calculateNewIndex(index)
    }

    calculateNewIndex(index) {
        let newIndex = 0
        if (index < this.maxSize) {
            newIndex = index
        } else {
            newIndex = index - this.maxSize
            newIndex = this.calculateNewIndex(newIndex)
        }
        return newIndex
    }

    findUserById(id) {
        let index = this.hashMethod(id)
        if (index < this.maxSize) {
            try {
                if (this.data[index] == null) {
                } else if (this.data[index] != null && this.data[index].id == id) {
                } else {
                    let contador = 1
                    index = this.recalculateNewIndex(id, contador)
                    while (this.data[index] != null) {
                        contador++
                        index = this.recalculateNewIndex(id, contador)
                        if (this.data[index].id == id) {
                            return
                        }
                    }
                }
            } catch (err) {
                showSnackbar("Hubo un error en busqueda", 'error')
            }
        }
    }

    findUserByIdAndPass(id, password) {
        let address = this.hashMethod(id);
        if (address < this.maxSize) {
            try {
                let data = this.data[address];
                if (data == null) {
                    return null;
                } else if (data.id == id && data.password == password) {
                    return data;
                } else {
                    let counter = 1;
                    address = this.recalculateNewIndex(id, counter);
                    while (this.data[address] != null) {
                        if (this.data[address].id == id && this.data[address].password == password) {
                            return this.data[address];
                        }
                        counter++;
                        address = this.recalculateNewIndex(id, counter);
                    }
                }
            } catch (err) {
                showSnackbar("Hubo un error en busqueda", 'error')
            }
        }
    }

    isPrime(index) {
        if (index <= 1) { return false }
        if (index === 2) { return true }
        if (index % 2 === 0) { return false }
        for (let i = 3; i <= Math.sqrt(index); i += 2) {
            if (index % i === 0) { return false };
        }
        return true;
    }
}