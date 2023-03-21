export const checkLogin = (name, id) => {
    const adminJSON = localStorage.getItem("admin")
    if (adminJSON != null && adminJSON != undefined) {
        const adminObj = JSON.parse(adminJSON);
        if (adminObj.name === name && adminObj.id === id) {
            return true;
        }
    }
    return false;
}