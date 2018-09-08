
const elementTree = require('elementtree');
module.exports = {
  parseMath: function(html) {
    const math = elementTree.parse(html).getroot();
    this.setParent(math);
    return math;
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
  },
  getPrevNode: function(node) {
    return this.getNearNode(node, -1);
  },
  getNextNode: function(node) {
    return this.getNearNode(node, 1);
  },
  // private
  getNearNode: function(node, offsetIndex) {
    const nodes = node.parent.getchildren();
    const index = Array.prototype.indexOf.call(nodes, node);
    if(index > 0 && index < nodes.length - 1){
      return nodes[index + offsetIndex]
    } else {
      return null;
    }
  },
  setParent: function(node) {
    const children = node.getchildren();
    if(children && children.length > 0){
      Array.prototype.forEach.call(children, (child) => {
        child.parent = node;
        this.setParent(child);
      });
    }
  }
}
