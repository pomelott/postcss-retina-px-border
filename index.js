const postcssJs = require('postcss-js');
const postcss = require('postcss');
const lib = require('./lib');
const path = require('path');
const {styleTplGenerator} = lib.tpl;
const {getFileName, initTargetFile} = lib.util;
const defaultConf = {
  baseDir: path.resolve(__dirname, '../../src'),
  filename: 'retina-border.scss',
  pxRange: 2,
  dprRange: 3,
  selector: '.retina-border-%dpx',
  baseSelector: '.retina-border-box'
}
module.exports = postcss.plugin('postcss-retina-px-border', function (opts) {
  opts = Object.assign({}, defaultConf, opts);
  const {baseStyle, pseudoStyle} = styleTplGenerator(opts);
  initTargetFile(opts);
  return async function (root, finalResult) {
      let filename = getFileName(root.source.input.file);
      if (filename === opts.filename) {
        root.append(postcssJs.parse(baseStyle).nodes)
        root.append(postcssJs.parse(pseudoStyle).nodes)
      }
  };
});