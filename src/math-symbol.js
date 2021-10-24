
// @see https://en.wikibooks.org/wiki/LaTeX/Mathematics#List_of_mathematical_symbols
// @see https://www.andy-roberts.net/res/writing/latex/symbols.pdf   (more completed)
// @see http://www.rpi.edu/dept/arc/training/latex/LaTeX_symbols.pdf (wtf)
// https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols

// accessed directly from keyboard
// + - = ! / ( ) [ ] < > | ' : *

const MathSymbol = {
  parseIdentifier: function(it) {
    if(it.length === 0){ return '' }
    if(it.length === 1){
      const charCode = it.charCodeAt(0);
      let index = this.greekLetter.decimals.indexOf(charCode)
      if ( index > -1) {
        return this.greekLetter.scripts[index] + ' ';
      } else {
        return it;
      }
    } else {
      return this.parseMathFunction(it);
    }
  },

  parseOperator: function(it) {
    if(it.length === 0){ return ''}
    if(it.length === 1){
      const charCode = it.charCodeAt(0);
      const opSymbols = [
        this.bigCommand,
        this.relation,
        this.binaryOperation,
        this.setAndLogic,
        this.delimiter,
        this.other
      ];

      const padSpaceBothSide = [false, true, true, false, false, false]

      for(let i = 0; i < opSymbols.length; i++){
        const opSymbol = opSymbols[i];
        const index = opSymbol.decimals.indexOf(charCode);
        if(index > -1) {
          if(padSpaceBothSide[i]){
            return [' ', opSymbol.scripts[index], ' '].join('');
          }else{
            return opSymbol.scripts[index] + ' ';
          }
        }
      }
      return it;
    } else {
      return this.parseMathFunction(it);
    }
  },

  parseMathFunction: function (it) {
    const marker = T.createMarker();
    const replacements = [];
    this.mathFunction.names.forEach((name, index) => {
      const regExp = new RegExp(name, 'g');
      if(it.match(regExp)){
        replacements.push(this.mathFunction.scripts[index]);
        it = it.replace(regExp, marker.next() + ' ');
      }
    });
    return marker.replaceBack(it, replacements);
  },

  //FIXME COMPLETE ME
  overScript: {
    decimals: [9182],
    templates: [
      "\\overbrace{@v}",
    ]
  },

  //FIXME COMPLETE ME
  underScript: {
    decimals: [9183],
    templates: [
      "\\underbrace{@v}"
    ]
  },

  // sum, integral...
  bigCommand: {
    decimals: [8721, 8719, 8720, 10753, 10754, 10752, 8899, 8898, 10756, 10758, 8897, 8896, 8747, 8750, 8748, 8749, 10764, 8747],
    scripts: [
      "\\sum",
      "\\prod",
      "\\coprod",
      "\\bigoplus",
      "\\bigotimes",
      "\\bigodot",
      "\\bigcup",
      "\\bigcap",
      "\\biguplus",
      "\\bigsqcup",
      "\\bigvee",
      "\\bigwedge",
      "\\int",
      "\\oint",
      "\\iint",
      "\\iiint",
      "\\iiiint",
      "\\idotsint",
    ]
  },

  // mo
  relation: {
    decimals: [60, 62, 61, 8741, 8742, 8804, 8805, 8784, 8781, 8904, 8810, 8811, 8801, 8866, 8867, 8834, 8835, 8776, 8712, 8715, 8838, 8839, 8773, 8995, 8994, 8840, 8841, 8771, 8872, 8713, 8847, 8848, 126, 8764, 8869, 8739, 8849, 8850, 8733, 8826, 8827, 10927, 10928, 8800, 8738, 8737],
    scripts: [
      "<",
      ">",
      "=",
      "\\parallel",
      "\\nparallel",
      "\\leq",
      "\\geq",
      "\\doteq",
      "\\asymp",
      "\\bowtie",
      "\\ll",
      "\\gg",
      "\\equiv",
      "\\vdash",
      "\\dashv",
      "\\subset",
      "\\supset",
      "\\approx",
      "\\in",
      "\\ni",
      "\\subseteq",
      "\\supseteq",
      "\\cong",
      "\\smile",
      "\\frown",
      "\\nsubseteq",
      "\\nsupseteq",
      "\\simeq",
      "\\models",
      "\\notin",
      "\\sqsubset",
      "\\sqsupset",
      "\\sim",
      "\\sim",
      "\\perp",
      "\\mid",
      "\\sqsubseteq",
      "\\sqsupseteq",
      "\\propto",
      "\\prec",
      "\\succ",
      "\\preceq",
      "\\succeq",
      "\\neq",
      "\\sphericalangle",
      "\\measuredangle"
        ]
  },

  // complete
  binaryOperation: {
    decimals: [43, 45, 177, 8745, 8900, 8853, 8723, 8746, 9651, 8854, 215, 8846, 9661, 8855, 247, 8851, 9667, 8856, 8727, 8852, 9657, 8857, 8902, 8744, 9711, 8728, 8224, 8743, 8729, 8726, 8225, 8901, 8768, 10815],
    scripts: [
      "+",
      "-",
      "\\pm",
      "\\cap",
      "\\diamond",
      "\\oplus",
      "\\mp",
      "\\cup",
      "\\bigtriangleup",
      "\\ominus",
      "\\times",
      "\\uplus",
      "\\bigtriangledown",
      "\\otimes",
      "\\div",
      "\\sqcap",
      "\\triangleleft",
      "\\oslash",
      "\\ast",
      "\\sqcup",
      "\\triangleright",
      "\\odot",
      "\\star",
      "\\vee",
      "\\bigcirc",
      "\\circ",
      "\\dagger",
      "\\wedge",
      "\\bullet",
      "\\setminus",
      "\\ddagger",
      "\\cdot",
      "\\wr",
      "\\amalg"
        ]
  },

  setAndLogic: {
    decimals: [8707, 8594, 8594, 8708, 8592, 8592, 8704, 8614, 172, 10233, 8834, 8658, 10233, 8835, 8596, 8712, 10234, 8713, 8660, 8715, 8868, 8743, 8869, 8744, 8709, 8709],
    scripts: [
      "\\exists",
      "\\rightarrow",
      "\\to",
      "\\nexists",
      "\\leftarrow",
      "\\gets",
      "\\forall",
      "\\mapsto",
      "\\neg",
      "\\implies",
      "\\subset",
      "\\Rightarrow",
      "\\implies",
      "\\supset",
      "\\leftrightarrow",
      "\\in",
      "\\iff",
      "\\notin",
      "\\Leftrightarrow",
      "\\ni",
      "\\top",
      "\\land",
      "\\bot",
      "\\lor",
      "\\emptyset",
      "\\varnothing"
        ]
  },

  delimiter: {
    decimals: [124, 8739, 8214, 47, 8726, 123, 125, 10216, 10217, 8593, 8657, 8968, 8969, 8595, 8659, 8970, 8971],
    scripts: [
      "|",
      "\\mid",
      "\\|",
      "/",
      "\\backslash",
      "\\{",
      "\\}",
      "\\langle",
      "\\rangle",
      "\\uparrow",
      "\\Uparrow",
      "\\lceil",
      "\\rceil",
      "\\downarrow",
      "\\Downarrow",
      "\\lfloor",
      "\\rfloor"
    ]
  },

  greekLetter: {
    decimals: [ 913, 945, 925, 957, 914, 946, 926, 958, 915, 947, 927, 959, 916, 948, 928, 960, 982, 917, 1013, 949, 929, 961, 1009, 918, 950, 931, 963, 962, 919, 951, 932, 964, 920, 952, 977, 933, 965, 921, 953, 934, 981, 966, 922, 954, 1008, 935, 967, 923, 955, 936, 968, 924, 956, 937, 969 ],
    scripts: [
      "A"         , "\\alpha"   ,
      "N"         , "\\nu"      ,
      "B"         , "\\beta"    ,
      "\\Xi"      , "\\xi"      ,
      "\\Gamma"   , "\\gamma"   ,
      "O"         , "o"         ,
      "\\Delta"   , "\\delta"   ,
      "\\Pi"      , "\\pi"      , "\\varpi"      ,
      "E"         , "\\epsilon" , "\\varepsilon" ,
      "P"         , "\\rho"     , "\\varrho"     ,
      "Z"         , "\\zeta"    ,
      "\\Sigma"   , "\\sigma"   , "\\varsigma"   ,
      "H"         , "\\eta"     ,
      "T"         , "\\tau"     ,
      "\\Theta"   , "\\theta"   , "\\vartheta"   ,
      "\\Upsilon" , "\\upsilon" ,
      "I"         , "\\iota"    ,
      "\\Phi"     , "\\phi"     , "\\varphi"     ,
      "K"         , "\\kappa"   , "\\varkappa"   ,
      "X"         , "\\chi"     ,
      "\\Lambda"  , "\\lambda"  ,
      "\\Psi"     , "\\psi"     ,
      "M"         , "\\mu"      ,
      "\\Omega"   , "\\omega"
        ]
  },


  other: {
    decimals: [8706, 305, 8476, 8711, 8501, 240, 567, 8465, 9723, 8502, 8463, 8467, 8472, 8734, 8503],
    scripts: [
      "\\partial",
      "\\imath",
      "\\Re",
      "\\nabla",
      "\\aleph",
      "\\eth",
      "\\jmath",
      "\\Im",
      "\\Box",
      "\\beth",
      "\\hbar",
      "\\ell",
      "\\wp",
      "\\infty",
      "\\gimel"
    ]
  },

  // complete
  // Be careful, the order of these name matters (overlap situation).
  mathFunction: {

    names: [
      "arcsin" , "sinh"   , "sin" , "sec" ,
      "arccos" , "cosh"   , "cos" , "csc" ,
      "arctan" , "tanh"   , "tan" ,
      "arccot" , "coth"   , "cot" ,

      "limsup" , "liminf" , "exp" , "ker" ,
      "deg"    , "gcd"    , "lg"  , "ln"  ,
      "Pr"     , "sup"    , "det" , "hom" ,
      "lim"    , "log"    , "arg" , "dim" ,
      "inf"    , "max"    , "min" ,
    ],
    scripts: [
      "\\arcsin" , "\\sinh"   , "\\sin" , "\\sec" ,
      "\\arccos" , "\\cosh"   , "\\cos" , "\\csc" ,
      "\\arctan" , "\\tanh"   , "\\tan" ,
      "\\arccot" , "\\coth"   , "\\cot" ,

      "\\limsup" , "\\liminf" , "\\exp" , "\\ker" ,
      "\\deg"    , "\\gcd"    , "\\lg"  , "\\ln"  ,
      "\\Pr"     , "\\sup"    , "\\det" , "\\hom" ,
      "\\lim"    , "\\log"    , "\\arg" , "\\dim" ,
      "\\inf"    , "\\max"    , "\\min" ,
    ]
  }
};

const T = {}; // Tool
T.createMarker = function() {
  return {
    idx: -1,
    reReplace: /@\[\[(\d+)\]\]/mg,
    next: function() {
      return `@[[${++this.idx}]]`
    },
    replaceBack: function(str, replacements) {
      const This = this;
      return str.replace(this.reReplace, (match, p1) => {
        const index = parseInt(p1);
        return replacements[index];
      });
    }
  }
}


export default MathSymbol;
