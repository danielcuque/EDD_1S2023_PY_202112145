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

    findPath(path) {
        if (path === '/') return this.adjacentMatrix['/'];
        const pathArray = path.split('/');
        const lastElement = pathArray[pathArray.length - 1];
        if (this.adjacentMatrix[lastElement]) {
            return this.adjacentMatrix[lastElement];
        }
        return null;
    }

    getFiles(path) {
        const current = this.findPath(path);
        if (current) {
            return current.files.getFiles();
        }
        return null;
    }

    getFolders(path) {
        const current = this.findPath(path);
        if (current) {
            return current.children
        }
        return [];
    }


    toDot() {
        let dot = "https://quickchart.io/graphviz?graph=graph G { \n rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato;\n";
        for (const key in this.adjacentMatrix) {
            dot += `"${key}" [label="${key}"];\n`
        }
        let weight = 1;
        for (const key in this.adjacentMatrix) {
            this.adjacentMatrix[key].children.forEach(child => {
                dot += `"${key}" -- "${child}" [len=2.00, label=\"${weight}\"];\n`
            })
            if (this.adjacentMatrix[key].children.length > 0) {
                weight++;
            }
        }
        dot += "}";
        return dot;
    }

    deserializeGraph() {
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