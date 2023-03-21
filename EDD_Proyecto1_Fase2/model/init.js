import { Student } from '../controller/classes/student.js'

document.addEventListener("DOMContentLoaded", (e) => {
    // Verificar si el valor de admin ya existe en localStorage
    var admin = localStorage.getItem("admin");

    // Si el valor de admin no existe en localStorage, asignar un valor predeterminado
    if (admin === null) {
        const adminObj = new Student('admin', 'admin');
        const adminJSON = JSON.stringify(adminObj);
        localStorage.setItem("admin", adminJSON);
    }
});