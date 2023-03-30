export const getTree = () => {
    const tree = localStorage.getItem("treeAvlContainer");
    const treeObj = JSON.parse(tree);
    Object.setPrototypeOf(treeObj, TreeAVL.prototype);
    return treeObj;
}