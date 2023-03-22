import { validFilesLoad } from "../utils/forms.js";
import { Student } from "../controller/classes/student.js";
import { TreeAVL } from "../controller/structs/tree-avl.js";

// Path: model/admin-functions.js
const userTable = document.getElementById('adminStudentsBody');

// Buttons for actions
const showStudentsButton = document.getElementById('showStudentsBtn');
const treeStudentsButton = document.getElementById('treeStudentsBtn');
const massiveLoadButton = document.getElementById('massiveLoadBtn');

showStudentsButton.addEventListener('click', () => {

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
const insertStudent = (treeAvl, student) => {
    const newStudent = new Student(student.nombre, student.carnet, student.password, student.carpeta_raiz);
    Object.setPrototypeOf(treeAvl, TreeAVL.prototype);
    treeAvl.insert(newStudent);
    localStorage.setItem("treeAvlContainer", JSON.stringify(treeAvl));
}


const readJsonFile = (file) => {
    const treeAvl = JSON.parse(localStorage.getItem("treeAvlContainer"));
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = () => {
        const json = JSON.parse(reader.result);
        json.alumnos.forEach((student) => {
            insertStudent(treeAvl, student);
        });
    }
}