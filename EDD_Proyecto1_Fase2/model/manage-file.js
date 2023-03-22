// Path: model/manage-file.js
// .txt, .pdf, .jpg, .png, .jpeg

const inputFile = document.getElementById('dropzone-file');
// Check if all files are accepted
inputFile.addEventListener('change', () => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.txt|\.pdf)$/i;
    const files = inputFile.files;
    const isInvalidEntry = validFilesLoad(
        allowedExtensions,
        files
    )
    if (isInvalidEntry) {
        console.log('valid');
    }
    else {
        alert('Invalid file type');
    }
})