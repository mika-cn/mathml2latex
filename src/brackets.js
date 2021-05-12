
const Brackets = {
  left: ['(', '[', '{', '|', '‖', '⟨', '⌊', '⌈', '⌜'],
  right: [')', ']', '}', '|', '‖', '⟩', '⌋', '⌉', '⌝'],
  isPair: function(l, r){
    const idx = this.left.indexOf(l);
    return r === this.right[idx];
  },
  contains: function(it) {
    return this.isLeft(it) || this.isRight(it);
  },
  isLeft: function(it) {
    return this.left.indexOf(it) > -1
  },
  isRight: function(it) {
    return this.right.indexOf(it) > -1;
  },
  parseLeft: function(it, stretchy = true) {
    if(this.left.indexOf(it) < 0){ return it}
    let r = '';
    switch(it){
      case '(':
      case '[':
      case '|': r = `\\left${it}`;
        break;
      case '‖': r = '\\left\\|';
        break;
      case '{': r = '\\left\\{';
        break;
      case '⟨': r = '\\left\\langle ';
        break;
      case '⌊': r = '\\left\\lfloor ';
        break;
      case '⌈': r = '\\left\\lceil ';
        break;
      case '⌜': r = '\\left\\ulcorner ';
        break;
    }
    return (stretchy ? r : r.replace('\\left', ''));
  },

  parseRight: function(it, stretchy = true) {
    if(this.right.indexOf(it) < 0){ return it}
    let r = '';
    switch(it){
      case ')':
      case ']':
      case '|': r = `\\right${it}`;
        break;
      case '‖': r = '\\right\\|';
        break;
      case '}': r = '\\right\\}';
        break;
      case '⟩': r = ' \\right\\rangle';
        break;
      case '⌋': r = ' \\right\\rfloor';
        break;
      case '⌉': r = ' \\right\\rceil';
        break;
      case '⌝': r = ' \\right\\urcorner';
        break;
    }
    return (stretchy ? r : r.replace('\\right', ''));
  }
}

export default Brackets;
