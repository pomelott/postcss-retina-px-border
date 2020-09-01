const postcssJs = require('postcss-js');
const postcss = require('postcss');
const lib = require('./lib');
const {styleTplGenerator} = lib.tpl;
const {getFileName} = lib.util;
const defaultConf = {
  filename: 'retina-border',
  pxRange: 2,
  dprRange: 3,
  selector: '.retina-border-%dpx'
}
module.exports = postcss.plugin('postcss-retina-px-border', function (opts) {
  opts = Object.assign({}, defaultConf, opts);
  const style = styleTplGenerator(opts);
  return async function (root, finalResult) {
      let filename = getFileName(root.source.input.file);
      if (filename === opts.filename) {
        root.append(postcssJs.parse(style).nodes)
      }
  };
});