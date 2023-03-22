export const clearLoginForm = () => {
    document.getElementById('carnet').value = '';
    document.getElementById('password').value = '';
}

export const validFilesLoad = (allowedExtensions, files) => {
    const invalidFiles = [];
    Array.from(files).forEach((file) => {
        if (!allowedExtensions.test(file.name)) {
            invalidFiles.push(file);
        }
    });
    if (invalidFiles.length > 0) {
        return false;
    }
    return true;
}