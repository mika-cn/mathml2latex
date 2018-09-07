
const elementTree = require('elementtree');
module.exports = {
  parseMath: function(html) {
    return elementTree.parse(html).getroot();
  },
  getChildren: function(node) {
    return node.getchildren();
  },
  getNodeName: function(node) {
    return node.tag;
  },
  getNodeText: function(node) {
    return node.text;
  },
  getAttr: function(node, attrName, defaultValue) {
    return node.get(attrName, defaultValue);
  }
}
