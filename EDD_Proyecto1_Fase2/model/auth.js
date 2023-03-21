export const checkLogin = (user, password) => {
    if (user === 'admin' && password === 'admin') {
        return true;
    }
}