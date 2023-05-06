import { encode } from "../controller/structs/encrypt.js";
import { getAdmin, getHashTable } from "../utils/objects.js";

export const checkLogin = async (id, password) => {
    const adminObj = getAdmin();

    if (adminObj != null && adminObj != undefined) {
        if (adminObj.name === password && adminObj.id === id) {
            return true;
        }
    }

    const encryptedPassword = await encode(password);
    const hashTable = await getHashTable();
    const student = hashTable.findUserByIdAndPass(id, encryptedPassword);
    if (student != null) {
        localStorage.setItem("currentUser", JSON.stringify(student));
        return true;
    }
    return false;
}