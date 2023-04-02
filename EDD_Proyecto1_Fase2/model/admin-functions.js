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

selectTraverseTree.addEventListener('change', (e) => {
    displayUserTable(e.target.value);
});

treeStudentsButton.addEventListener('click', () => {
    // Actualizar la URL de la imagen
    const imgSrc = getTree().convertToGraphivz();
    modalImg.src = imgSrc;

    // Mostrar el modal
    modal.classList.remove('hidden');
});

closeModalButton.addEventListener('click', () => {

    // Ocultar el modal
    modal.classList.add('hidden');

    // Limpiar la URL de la imagen y del enlace de descarga
    modalImg.src = '';

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
        readJsonFile(files[0]);
        document.getElementById('treeStudentsBtn').disabled = false;
        showSnackbar('Carga masiva exitosa', 'success');
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

logoutButton.addEventListener('click', () => {
    window.location.href = 'index.html';
})