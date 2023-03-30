export const createUserTableRow = (id, name) => {
    const row = document.createElement('div');
    row.innerHTML = `
        <div class="w-full flex flex-row py-6 border border-gray-300">
            <div class="w-full text-center">${id}</div>
            <div class="w-full text-center">${name}</div>
        </div>
    `;
    return row;
}
