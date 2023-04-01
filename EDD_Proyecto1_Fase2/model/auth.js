import { getAdmin, getTree } from "../utils/objects.js";

export const checkLogin = (id, password) => {
    const adminObj = getAdmin();
    // Si es admin, se compara directamente con el objeto admin
    if (adminObj != null && adminObj != undefined) {
        if (adminObj.name === password && adminObj.id === id) {
            return true;
        }
    }

    // Si no es admin, se busca en el árbol AVL de usuarios
    const tree = getTree();
    const student = tree.searchStudent(id, password);
    if (student != null) return true;
    return false;
}