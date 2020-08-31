module.exports = postcss.plugin('postcss-retina-border', function (opts) {
  opts = opts || {};
  // Work with options here
  return function (root, result) {
      // Transform CSS AST here
      root.walkRules(function(rule) {
        // We'll put more code here in a moment…
        console.log(rule)
      });
  };
});