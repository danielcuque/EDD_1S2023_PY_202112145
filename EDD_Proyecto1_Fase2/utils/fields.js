export const showSnackbar = (message, type) => {
    const snackbar = document.createElement("div");
    snackbar.classList.add(
        "flex",
        "items-center",
        "w-full",
        "max-w-xs",
        "p-4",
        "mb-4",
        "text-gray-500",
        "bg-white", "rounded-lg",
        "shadow",
        "fixed", "top-2",
        "right-2",
        "transform", "-translate-y-full",
        "transition-transform",
        "duration-300"
    );


    switch (type) {
        case 'error':
            snackbar.innerHTML = `
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Error icon</span>
                </div>
        <div class="ml-3 text-sm font-normal">${message}</div>`

            break;
        case 'success':

            break;
        case 'warning':

            break;
        default:

            break;
    }

    document.body.appendChild(snackbar);

    setTimeout(() => {
        snackbar.classList.remove("opacity-0");
        snackbar.classList.add("translate-y-0");
    }, 100);

    setTimeout(() => {
        snackbar.classList.remove("translate-y-0");
        snackbar.classList.add("opacity-0");
        setTimeout(() => {
            snackbar.remove();
        }, 300);
    }, 3000);

}