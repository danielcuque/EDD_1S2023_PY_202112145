import { CircularLinkedList } from "../structs/circular-linked-list.js";
import { NaryTree } from "../structs/tree-n.js";

export class Student {
    constructor(name, id, password, rootFolder) {
        this.name = name;
        this.id = id;
        this.password = password;
        this.rootFolder = rootFolder;
        this.logList = new CircularLinkedList();
        this.files = new NaryTree();
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
}