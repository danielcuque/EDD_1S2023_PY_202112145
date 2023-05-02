import { getAdmin, getHashTable, getTree } from "../utils/objects.js";

export const checkLogin = (id, password) => {
    const adminObj = getAdmin();
    // Si es admin, se compara directamente con el objeto admin
    if (adminObj != null && adminObj != undefined) {
        if (adminObj.name === password && adminObj.id === id) {
            return true;
        }
    }

    // Si no es admin, se busca en el árbol AVL de usuarios
    const hashTable = getHashTable();
    const student = hashTable.findUserByIdAndPass(id, password);
    if (student != null) {
        localStorage.setItem("currentUser", JSON.stringify(student));
        return true;
    }
    return false;
}