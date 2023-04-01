import { validFilesLoad } from "../utils/forms.js";
import { displayUserTable } from "../utils/objects.js";
import { Student } from "../controller/classes/student.js";
import { TreeAVL } from "../controller/structs/tree-avl.js";

// Path: model/admin-functions.js

// Buttons for actions
const selectTraverseTree = document.getElementById('selectTraverseTree');
const treeStudentsButton = document.getElementById('treeStudentsBtn');
const massiveLoadButton = document.getElementById('massiveLoadBtn');

selectTraverseTree.addEventListener('change', (e) => {
    displayUserTable(e.target.value);
});

treeStudentsButton.addEventListener('click', () => {

});

const massiveLoadChooser = document.getElementById('massiveLoadChooser');

massiveLoadButton.addEventListener('click', () => {
    massiveLoadChooser.click();
});

// Massive load
massiveLoadChooser.addEventListener('change', () => {
    const allowedExtensions = /(\.json)$/i;
    const files = massiveLoadChooser.files;
    const isInvalidEntry = validFilesLoad(
        allowedExtensions,
        files
    )
    if (isInvalidEntry) {
        Array.from(files).forEach((file) => {
            readJsonFile(file);
        });
        displayUserTable('inOrder');
    } else {
        alert('Invalid file type');
    }
});


// In this section, we'll be creating the functions that will be user to modify the avl tree

/*
 The json file will look like this:

    interface Root {
    alumnos: Alumno[]
    }

    interface Alumno {
    nombre: string
    carnet: string
    password: string
    carpeta_raiz: string
    }
*/

const insertStudent = (treeAVL, student) => {
    const newStudent = new Student(student.nombre, student.carnet, student.password, student.carpeta_raiz);
    treeAVL.insert(newStudent);
    localStorage.setItem('treeAVLContainer', JSON.stringify(treeAVL));
    displayUserTable('inOrder');
}

const readJsonFile = (file) => {
    const treeAVL = new TreeAVL();
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = () => {
        const json = JSON.parse(reader.result);
        json.alumnos.forEach((student) => {
            insertStudent(treeAVL, student);
        });
    }
    reader.onerror = (error) => {
        console.log(error);
    }
}