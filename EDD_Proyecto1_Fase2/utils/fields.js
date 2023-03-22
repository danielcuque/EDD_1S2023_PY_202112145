export const createUserTableRow = (id, name) => {
    return `
    <div class="w-full flex flex-row py-6 border border-gray-300">
    <div class="w-full text-center">
        ${id}
    </div>
    <div class="w-full text-center">
    ${name}</div></div>
    `;
}