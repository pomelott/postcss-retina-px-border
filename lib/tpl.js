const {checkSelector} = require('./util');
const autoprefixer = require('autoprefixer');
const postcssJs = require('postcss-js');
const prefixer = postcssJs.sync([ autoprefixer ]);
module.exports.classItemGenerator = (dpr, px) => {
    return prefixer({
        position: 'relative',
        width: `${dpr * 100}%`,
        height: `${dpr * 100}%`,
        borderWidth: `${px}px`,
        transform: `scale(${1/dpr})`,
        transformOrigin: '0 0'
    })
}
module.exports.styleTplGenerator = ({pxRange, dprRange, selector}) => {
    let tempStyle = {};
    checkSelector(selector);
    pxRange = Number(pxRange);
    dprRange = Number(dprRange);
    for (let i = 0; i < dprRange; i++) {
        let mediaKey = `@media screen and (-webkit-min-device-pixel-ratio: ${i+1})`;
        tempStyle[mediaKey] = {};
        for (let j = 0; j < pxRange; j++) {
            let classKey = selector.replace('%d', j+1);
            tempStyle[mediaKey][classKey] = this.classItemGenerator(i+1, j+1);
        }
    }
    return tempStyle;
}