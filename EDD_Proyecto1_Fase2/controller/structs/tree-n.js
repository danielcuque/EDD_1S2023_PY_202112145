import { encodeBase64, generateUniqueName } from "../../utils/objects.js";
import { Matrix } from "./dispers-matrix.js";

// Los nodos único que tienen son los directorios

class Node {
    constructor(name) {
        this.name = name                // Nombre del directorio
        this.children = []              // Arreglo de nodos hijos que serán subdirectorios
        this.files = new Matrix()       // Matriz dispersa de archivos
    }
}

export class NaryTree {
    constructor() {
        this.root = new Node("/");
    }

    searchPath(path) {
        let current = this.root;
        if (path === '/') return current;
        const pathArray = path.split('/');
        for (let i = 1; i < pathArray.length; i++) {
            const child = current.children.find(child => child.name === pathArray[i]);
            if (child) {
                current = child;
            } else {
                return null;
            }
        }
        return current;
    }

    // Este método va a recibir currentPath y el nombre del nuevo directorio
    // El nombre del nuevo directorio se va a agregar al final del currentPath
    // Se va a buscar el nodo que corresponde al currentPath
    // Se va a crear un nuevo nodo con el nombre del nuevo directorio
    createPath(path) {
        const pathArray = path.split('/');
        const parentPath = pathArray.slice(0, pathArray.length - 1).join('/');
        const parent = this.searchPath(parentPath);
        if (parent) {
            const fileNames = parent.children.map(child => child.name);
            const fileName = generateUniqueName(pathArray[pathArray.length - 1], fileNames);
            const newNode = new Node(fileName);
            parent.children.push(newNode);
            return true;
        }
        return false;
    }
    createFiles(path, files) {
        const current = this.searchPath(path);
        if (current) {
            Array.from(files).forEach(file => {
                this.createFile(current, file);
            });
        }
    }

    createFile(path, file) {
        console.log(file);
        console.log(path);
    }



    getFiles(path) {
        const current = this.searchPath(path);
        if (current) {
            return current.files;
        }
        return null;
    }

    getFolders(path) {
        const current = this.searchPath(path);
        if (current) {
            return current.children
        }
        return [];
    }

    deleteFile(path, name) {
        const current = this.searchPath(path);
        if (current) {
            const index = current.children.findIndex(child => child.name === name);
            if (index !== -1) {
                current.children.splice(index, 1);
                return true;
            }
        }
        return false;
    }

    deletePath(path) {
        const pathArray = path.split('/');
        const parentPath = pathArray.slice(0, pathArray.length - 1).join('/');
        const parent = this.searchPath(parentPath);
        if (parent) {
            const index = parent.children.findIndex(child => child.name === pathArray[pathArray.length - 1]);
            if (index !== -1) {
                parent.children.splice(index, 1);
                return true;
            }
        }
        return false;
    }

    // Regresamos un string con el reporte de los archivos en graphviz
    // Recorremos desde el root hasta el final de cada rama
    getFolderReport() {
        let report = "https://quickchart.io/graphviz?graph=digraph G {\n";
        report += "node [shape=box];\n";
        if (this.root.children.length > 0) report += this.getFolderReportRecursive(this.root);
        else report += `"${this.root.name}"`;
        report += "}";
        return report;
    }

    getFolderReportRecursive(node) {
        let report = "";
        if (node.children.length > 0) {
            node.children.forEach(child => {
                report += `"${node.name}" -> "${child.name}";\n`;
                report += this.getFolderReportRecursive(child);
            });
        }
        return report;
    }


    // Este método sirve para convertir el árbol del local storage y recuperar todos sus nodos
    deserializeTree() {
        Object.setPrototypeOf(this.root, Node.prototype);
        Object.setPrototypeOf(this.root.files, Matrix.prototype);
        if (this.root.children)
            this.root.children.forEach(child => {
                this.deserializeNode(child);
            });
    }

    deserializeNode(node) {
        Object.setPrototypeOf(node, Node.prototype);
        Object.setPrototypeOf(node.files, Matrix.prototype);
        if (node.children && node.children.length > 0)
            node.children.forEach(child => {
                this.deserializeNode(child);
            });
    }
}
