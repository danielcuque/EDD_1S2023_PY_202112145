class Node {
    constructor(value, x, y) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.left = null;
        this.right = null;
        this.next = null;
        this.prev = null;
        this.above = null;
        this.below = null;
    }
}

class List {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    sort(node) {
        let aux = this.head;
        while (aux !== null) {
            if (node.value < aux.value) {
                aux = aux.next;
            } else {
                if (aux == this.head) {
                    node.next = aux.prev;
                    aux.prev.next = node;
                    node.next = aux;
                    aux.prev = node;
                    return;
                }
            }
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    insert(node) {
        let node = new Node(value, null, null);
        if (this.head == null) {
            this.head = this.tail = node;
            return
        }
        this.sort(node);
    }

    search(value) {
        let temp = this.head;
        while (temp !== null) {
            if (temp.value == value) {
                return temp;
            }
            temp = temp.next;
        }
        return null;
    }
}

class Matrix {
    constructor() {
        this.horizontal = new List();
        this.vertical = new List();
    }

    insert(value, x, y) {
        let node_x = this.horizontal.search(x);
        let node_y = this.vertical.search(y);

        if (node_x == null && node_y == null) {
            this.case1(value, x, y);
        } else if (node_x == null && node_y != null) {
            this.case2(value, x, y);
        } else if (node_x != null && node_y == null) {
            this.case3(value, x, y);
        } else {
            this.case4(value, x, y);
        }
    }
}