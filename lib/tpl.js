const {checkSelector} = require('./util');
const autoprefixer = require('autoprefixer');
const postcssJs = require('postcss-js');
const prefixer = postcssJs.sync([ autoprefixer ]);
const baseClass = {
    position: 'relative',
    zIndex: 1
}
module.exports.classItemGenerator = (dpr, px) => {
    return prefixer({
        content: `''`,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: `${dpr * 100}%`,
        height: `${dpr * 100}%`,
        borderWidth: `${px}px`,
        transform: `scale(${1/dpr})`,
        transformOrigin: '0 0'
    })
}
module.exports.styleTplGenerator = ({pxRange, dprRange, selector, baseSelector}) => {
    let tempStyle = {
        baseStyle: {},
        pseudoStyle: {}
    };
    checkSelector(selector);
    pxRange = Number(pxRange);
    dprRange = Number(dprRange);
    tempStyle.baseStyle[baseSelector] = baseClass;
    for (let i = 0; i < dprRange; i++) {
        let mediaKey = `@media screen and (-webkit-min-device-pixel-ratio: ${i+1})`;
        tempStyle.pseudoStyle[mediaKey] = {};
        for (let j = 0; j < pxRange; j++) {
            let classKey = selector.replace('%d', j+1) + ':after';
            tempStyle.pseudoStyle[mediaKey][classKey] = this.classItemGenerator(i+1, j+1);
        }
    }
    return tempStyle;
}