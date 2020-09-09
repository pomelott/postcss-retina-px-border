const path = require('path');
const fse = require('fs-extra');
const sep = path.sep;
module.exports.getFileName = (filePath) => {
    let reg = new RegExp(`(?:(?:${sep}[^${sep}]*)*${sep})([^${sep}]*\\.[^${sep}]*)`);
    let target = filePath.match(reg);
    return target[1];
}
module.exports.checkSelector = (selector) => {
    if (typeof selector !== typeof '') {
        throw new Error(`selector param type error, expected string !!!`);
    }
    if (selector.indexOf('%d') === -1) {
        throw new Error(`selector param error, can't find '%d' !!!`);
    }
    return true;
}

module.exports.initTargetFile = (opts) => {
    let targetFile;
    if (path.isAbsolute(opts.baseDir)) {
        targetFile = path.join(opts.baseDir, opts.filename);
    } else {
        let baseAbsDir = path.resolve(__dirname, '../../../')
        targetFile = path.join(baseAbsDir, opts.baseDir, opts.filename);
    }
    fse.ensureFileSync(targetFile);
}