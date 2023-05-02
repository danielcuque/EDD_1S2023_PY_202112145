class HashNode {
    constructor(id, name, password) {
        this.id = id
        this.name = name
        this.password = password
    }
}

export class HashTable {
    constructor() {
        this.data = new Array(7)
        this.maxSize = 7
        this.bucketsUsed = 0
    }

    set(id, name, password) {
        let index = this.hashMethod(id)
        const newNode = new HashNode(id, name, password)
        if (index < this.maxSize) {
            try {
                if (this.data[index] == null) {
                    this.data[index] = newNode
                    this.bucketsUsed++
                    this.resize()
                } else {
                    let contador = 1
                    index = this.recalculateNewIndex(id, contador)
                    while (this.data[index] != null) {
                        contador++
                        index = this.recalculateNewIndex(id, contador)
                    }
                    this.data[index] = newNode
                    this.bucketsUsed++
                    this.resize()
                }
            } catch (err) {
                console.log("Hubo un error en insercion")
            }
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
            this.set(student.id, student.name, student.password)
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
                console.log("Hubo un error en busqueda")
            }
        }
    }

    findUserByIdAndPass(id, password) {
        let index = this.hashMethod(id)
        if (index < this.maxSize) {
            try {
                if (this.data[index] == null) {
                    return null
                } else if (this.data[index] != null && this.data[index].id == id && this.data[index].password == password) {
                    return this.data[index]
                } else {
                    let contador = 1
                    index = this.recalculateNewIndex(id, contador)
                    while (this.data[index] != null) {
                        contador++
                        index = this.recalculateNewIndex(id, contador)
                        if (this.data[index].id == id && this.data[index].password == password) {
                            return this.data[index]
                        }
                    }
                }
            } catch (err) {
                console.log("Hubo un error en busqueda")
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