export class Graph {
    constructor() {
        this.nodes = 0;
        this.adjacentMatrix = {};
    }
    addVertex(path, files) {
        if (!this.adjacentMatrix[path]) {
            this.adjacentMatrix[path] = {
                children: [],
                files: files,
            }
            this.nodes++;
        }
    }
    addEdge(path1, path2) {
        this.adjacentMatrix[path1].children.push(path2);
    }

    findVertex(path) {
        return this.adjacentMatrix[path];
    }

    toDot() {
        let dot = "graph G { \n rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato;\n";
        for (const key in this.adjacentMatrix) {
            dot += `"${key}" [label="${key}"];\n`
        }
        for (const key in this.adjacentMatrix) {
            this.adjacentMatrix[key].children.forEach(child => {
                dot += `"${key}" -- "${child}" [len=2.00];\n`
            })
        }
        dot += "}";
        return dot;
    }
}