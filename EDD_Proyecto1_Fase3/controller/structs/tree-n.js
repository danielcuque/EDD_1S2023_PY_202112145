import { encodeBase64, generateUniqueName } from "../../utils/objects.js";
import { Matrix } from "./dispers-matrix.js";

// Los nodos único que tienen son los directorios

class Node {
    constructor(name, path) {
        this.path = path                // Ruta del directorio
        this.name = name                // Nombre del directorio
        this.children = []              // Arreglo de nodos hijos que serán subdirectorios
        this.files = new Matrix()       // Matriz dispersa de archivos
        this.files.path = path          // Ruta del directorio
        console.log(this.files.path)
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
            const newNode = new Node(fileName, path);
            parent.children.push(newNode);
            return true;
        }
        return false;
    }

    async createFiles(path, files) {
        const current = this.searchPath(path);
        if (current) {
            for (const file of files) {
                const isCreated = await this.createFile(current, file);
                if (!isCreated) {
                    return false;
                }
            }
        }
        return true;
    }

    getFilesReport(path) {
        const current = this.searchPath(path);
        if (current) {
            return current.files.toDot();
        }
        return '';
    }


    async createFile(nodeToInsert, file) {
        const encodedFile = await encodeBase64(file);
        nodeToInsert.files.insertNewFile(file.name, 1, file.name, encodedFile);
        return true;
    }

    setPermissions(path, carnet, fileName, permissions) {
        const current = this.searchPath(path);
        if (current) {
            current.files.setCredentials(fileName, carnet, permissions);
            return true;
        }
        return false;
    }

    getAllFiles() {
        // Recorremos todo el arbol
        let arrayToSave = [];
        this.getAllFilesRecursive(this.root, arrayToSave);
        return arrayToSave;
    }

    getAllFilesRecursive(node, arrayToSave) {
        if (node.files) {
            arrayToSave.push(node.files.toJSON());
        }
        for (const child of node.children) {
            this.getAllFilesRecursive(child, arrayToSave);
        }
    }

    getFiles(path) {
        const current = this.searchPath(path);
        if (current) {
            return current.files.getFiles();
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
        const restoredMatrix = this.deserializeMatrix(this.root.files);
        this.root.files = restoredMatrix;
        if (this.root.children)
            this.root.children.forEach(child => {
                this.deserializeNode(child);
            });
    }

    deserializeNode(node) {
        Object.setPrototypeOf(node, Node.prototype);
        const restoredMatrix = this.deserializeMatrix(node.files, node.path);
        node.files = restoredMatrix;
        if (node.children && node.children.length > 0)
            node.children.forEach(child => {
                this.deserializeNode(child);
            });
    }

    deserializeMatrix(serialized, path) {
        const matrix = new Matrix();
        matrix.path = path ? path : '/';
        const files = serialized.convertedFiles;
        const credentials = serialized.credentials;
        files.forEach(file => {
            matrix.insertNewFile(file.text, file.index, file.filename, file.content);
        }
        );
        credentials.forEach(permiso => {
            matrix.setCredentials(permiso.filename, permiso.id, permiso.credential);
        });
        return matrix;
    }
}
