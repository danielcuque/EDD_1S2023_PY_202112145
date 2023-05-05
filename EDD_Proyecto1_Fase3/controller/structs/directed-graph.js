import { Matrix } from "./dispers-matrix.js";

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

    getAllFiles() {
        let arrayToSave = [];
        for (const key in this.adjacentMatrix) {
            const node = this.adjacentMatrix[key];
            if (node.files) {
                arrayToSave.push(node.files.toJSON());
            }
        }
        return arrayToSave;
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

    deserializeGraph() {
        // Covertimos nuevamente la matriz dispersa a su estado original
        for (const node in this.adjacentMatrix) {
            const node_ = this.adjacentMatrix[node];
            const nodeFiles = node_.files;
            const restoredMatrix = this.deserializeMatrix(nodeFiles.convertedFiles, nodeFiles.credentials, nodeFiles.path);
            node_.files = restoredMatrix;
        }
    }

    deserializeMatrix(files, credentials, path) {
        const matrix = new Matrix();
        matrix.path = path ? path : '/';

        files.forEach(file => {
            matrix.insertNewFile(file.text, file.index, file.filename, file.content);
        });

        credentials.forEach(credential => {
            matrix.setCredentials(credential.filename, credential.id, credential.credential);
        });
        return matrix;
    }
}