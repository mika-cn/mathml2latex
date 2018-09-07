
module.exports = {
  parseMath: function(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.querySelector('math');
  },
  getChildren: function(node) {
    return node.children;
  },
  getNodeName: function(node) {
    return node.tagName.toLowerCase();
  },
  getNodeText: function(node) {
    return node.textContent;
  },
  getAttr: function(node, attrName, defaultValue) {
    const value = node.getAttribute(attrName);
    if ( value === null) {
      return defaultValue;
    } else {
      return value;
    }
  }
}
