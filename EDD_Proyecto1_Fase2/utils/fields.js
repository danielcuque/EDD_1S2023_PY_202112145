export const showSnackbar = (message, type) => {
    const snackbar = document.createElement("div");
    snackbar.classList.add(
        "text-white",
        'px-4',
        'py-2',
        "rounded",
        "fixed",
        "top-1",
        "right-1",
        "transform",
        "-translate-y-full",
        "transition-transform",
        "duration-300"
    );

    switch (type) {
        case 'error':
            snackbar.classList.add('bg-red-500');
            break;
        case 'success':
            snackbar.classList.add('bg-green-500');
            break;
        case 'warning':
            snackbar.classList.add('bg-yellow-500');
            break;
        default:
            snackbar.classList.add('bg-gray-500');
            break;
    }


    snackbar.textContent = message;
    document.body.appendChild(snackbar);

    setTimeout(() => {
        snackbar.classList.remove("-translate-y-full");
        snackbar.classList.add("translate-y-0");
    }, 100);

    setTimeout(() => {
        snackbar.classList.remove("translate-y-0");
        snackbar.classList.add("-translate-y-full");
        setTimeout(() => {
            snackbar.remove();
        }, 300);
    }, 3000);

}