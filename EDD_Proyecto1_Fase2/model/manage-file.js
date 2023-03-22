// .txt, .pdf, .jpg, .png, .jpeg

const inputFile = document.getElementById('dropzone-file');
// Check if all files are accepted
inputFile.addEventListener('change', () => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.txt|\.pdf)$/i;
    const files = inputFile.files;
    const invalidFiles = [];
    Array.from(files).forEach((file) => {
        if (!allowedExtensions.test(file.name)) {
            invalidFiles.push(file);
        }
    });
    if (invalidFiles.length > 0) {
        // Se encontraron archivos no permitidos
        console.log('Los siguientes archivos no son válidos: ');
        invalidFiles.forEach(function (file) {
            console.log(file.name);
        });
    } else {
        // Todos los archivos son válidos
        console.log('Todos los archivos son válidos');
    }
})