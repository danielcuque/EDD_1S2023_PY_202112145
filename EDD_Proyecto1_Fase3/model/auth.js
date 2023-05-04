import { getAdmin, getHashTable } from "../utils/objects.js";

export const checkLogin = async (id, password) => {
    const adminObj = getAdmin();

    if (adminObj != null && adminObj != undefined) {
        if (adminObj.name === password && adminObj.id === id) {
            return true;
        }
    }

    // Si no es admin, se busca en el árbol AVL de usuarios
    const hashTable = await getHashTable();
    const student = hashTable.findUserByIdAndPass(id, password);
    if (student != null) {
        localStorage.setItem("currentUser", JSON.stringify(student));
        return true;
    }
    return false;
}