import { validFilesLoad } from "../utils/forms.js";

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

    } else {
        alert('Invalid file type');
    }
});


// In this section, we'll be creating the functions that will be user to modify the avl tree

const insertStudent = (student) => {

}
