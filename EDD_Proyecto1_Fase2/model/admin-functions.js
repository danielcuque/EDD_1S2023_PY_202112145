import { validFilesLoad } from "../utils/forms";

// Path: model/admin-functions.js
const userTable = document.getElementById('adminStudentsBody');

// Buttons for actions
const showStudentsButton = document.getElementById('showStudentsButton');
const treeStudentsButton = document.getElementById('showStudentsButton');
const massiveLoad = document.getElementById('showStudentsButton');

showStudentsButton.addEventListener('click', () => {

});

treeStudentsButton.addEventListener('click', () => {



});

const massiveLoadChooser = document.getElementById('massiveLoadChooser');
massiveLoad.addEventListener('click', () => {
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
        console.log('valid');
    }
});
