import { validFilesLoad } from "../utils/forms.js";
import { displayUserTable, getTree } from "../utils/objects.js";
import { Student } from "../controller/classes/student.js";
import { TreeAVL } from "../controller/structs/tree-avl.js";
import { showSnackbar } from "../utils/fields.js";

// Path: model/admin-functions.js

// Buttons for actions
const selectTraverseTree = document.getElementById('selectTraverseTree');
const treeStudentsButton = document.getElementById('treeStudentsBtn');
const massiveLoadButton = document.getElementById('massiveLoadBtn');
const closeModalButton = document.getElementById('closeModalBtn');
const modal = document.getElementById('treeModalPreview');
const modalImg = document.getElementById('treeImagePreview');
const logoutButton = document.getElementById('logoutBtn');

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
        readJsonFile(files[0]);
        document.getElementById('treeStudentsBtn').disabled = false;
        showSnackbar('Carga masiva exitosa', 'success');
    } else {
        showSnackbar('Archivo no permitido', 'error');
    }
    massiveLoadChooser.value = '';
});

const insertStudent = (treeAVL, student) => {
    const newStudent = new Student(student.nombre, student.carnet, student.password);
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

logoutButton.addEventListener('click', () => {
    window.location.href = 'index.html';
})