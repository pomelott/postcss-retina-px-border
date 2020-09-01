const path = require('path');
const sep = path.sep;
module.exports.getFileName = (filePath) => {
    let reg = new RegExp(`(?:(?:${sep}[^${sep}]*)*${sep})([^${sep}]*)(?:\\.[^${sep}]*)`);
    let target = filePath.match(reg);
    return target[1];
}
module.exports.checkSelector = (selector) => {
    if (typeof selector !== typeof '') {
        throw new Error(`selector param type error, expected string !!!`);
    }
    if (selector[0] !== '.' && selector[0] !== '#') {
        throw new Error(`selector param error, should be start with '.' or '#' !!!`);
    }
    if (selector.indexOf('%d') === -1) {
        throw new Error(`selector param error, can't find '%d' !!!`);
    }
    return true;
}