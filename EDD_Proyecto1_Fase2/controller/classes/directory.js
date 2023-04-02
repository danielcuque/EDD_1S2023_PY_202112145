export class Directory {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.children = [];
    }
}