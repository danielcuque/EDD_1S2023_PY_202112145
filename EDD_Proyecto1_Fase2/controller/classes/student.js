import { CircularLinkedList } from "../structs/circular-linked-list.js";
import { NaryTree } from "../structs/tree-n.js";

export class Student {
    constructor(name, id, password) {
        this.name = name;
        this.id = id;
        this.password = password;
        this.rootFolder = '/';
        this.logList = new CircularLinkedList();
        this.storage = new NaryTree();
    }

    createRow() {
        const row = document.createElement('div');
        row.innerHTML = `
        <div class="w-full flex flex-row py-6 border border-gray-300">
            <div class="w-full text-center">${this.id}</div>
            <div class="w-full text-center">${this.name}</div>
        </div>
    `;
        return row;
    }

    // Este método sirve para recuperar el árbol n-ario del estudiante, reconstruyendo todos sus nodos después de serializarlo
    deserealizeStudent() {
        const tree = Object.setPrototypeOf(this.storage, NaryTree.prototype);
        tree.deserializeTree();
        const logList = this.deserializeCircularList(this.logList);
        this.logList = logList;
    }

    deserializeCircularList(serialized) {
        const circularList = new CircularLinkedList();
        serialized.forEach(node => {
            circularList.addWithDate(node.description, node.date, node.hour);
        }
        );
        return circularList;
    }
}