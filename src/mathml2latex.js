
"use strict";
// latex resource
// https://en.wikibooks.org/wiki/LaTeX/Mathematics
// https://en.wikibooks.org/wiki/LaTeX/Advanced_Mathematics
// https://www.andy-roberts.net/writing/latex/mathematics_1
// https://www.andy-roberts.net/writing/latex/mathematics_2

import Brackets from './brackets.js';
import MathSymbol from './math-symbol.js';
import NodeTool from './node-tool.js';


function convert(mathmlHtml){
  const math = NodeTool.parseMath(mathmlHtml);
  return toLatex(parse(math));
}

function toLatex(result) {
  // binomial coefficients
  result = result.replace(/\\left\(\\DELETE_BRACKET_L/g, '');
  result = result.replace(/\\DELETE_BRACKET_R\\right\)/g, '');
  result = result.replace(/\\DELETE_BRACKET_L/g, '');
  result = result.replace(/\\DELETE_BRACKET_R/g, '');
  return result;
}

function parse(node) {
  const children = NodeTool.getChildren(node);
  if (!children || children.length === 0) {
    return parseLeaf(node);
  } else {
    return parseContainer(node, children);
  }
}

// @see https://www.w3.org/TR/MathML3/chapter7.html
function parseLeaf(node) {
  let r = '';
  const nodeName = NodeTool.getNodeName(node);
  switch(nodeName){
    case 'mi': r = parseElementMi(node);
      break;
    case 'mn': r = parseElementMn(node);
      break;
    case 'mo': r = parseOperator(node);
      break;
    case 'ms': r = parseElementMs(node);
      break;
    case 'mtext': r = parseElementMtext(node);
      break;
    case 'mglyph': r = parseElementMglyph(node);
      break;
    case 'mprescripts': r = '';
      break;
    case 'mspace': r = parseElementMspace(node);
    case 'none': r = '\\:';
    //TODO other usecase of 'none' ?
      break;
    default: r = escapeSpecialChars(NodeTool.getNodeText(node).trim());
      break;
  }
  return r;
}

// operator token, mathematical operators
function parseOperator(node) {
  let it = NodeTool.getNodeText(node).trim();
  it = MathSymbol.parseOperator(it);
  return escapeSpecialChars(it);
}

// Math identifier
function parseElementMi(node){
  let it = NodeTool.getNodeText(node).trim();
  it = MathSymbol.parseIdentifier(it);
  return escapeSpecialChars(it);
}

// Math Number
function parseElementMn(node){
  let it = NodeTool.getNodeText(node).trim();
  return escapeSpecialChars(it);
}

// Math String
function parseElementMs(node){
  const content = NodeTool.getNodeText(node).trimRight();
  const it = escapeSpecialChars(content);
  return ['"', it, '"'].join('');
}

// Math Text
function parseElementMtext(node){
  const content = NodeTool.getNodeText(node)
  const it = escapeSpecialChars(content);
  return `\\text{${it}}`;
}

// Math glyph (image)
function parseElementMglyph(node){
  const it = ['"', NodeTool.getAttr(node, 'alt', ''), '"'].join('');
  return escapeSpecialChars(it);
}

// TODO need or not
function parseElementMspace(node){
  return '';
}

function escapeSpecialChars(text) {
  const specialChars = /\$|%|_|&|#|\{|\}/g;
  text = text.replace(specialChars, char => `\\${ char }`);
  return text;
}


function parseContainer(node, children) {
  const render = getRender(node);
  if(render){
    return render(node, children);
  } else {
    throw new Error(`Couldn't get render function for container node: ${NodeTool.getNodeName(node)}`);
  }
}

function renderChildren(children) {
  const parts = [];
  let lefts = [];
  Array.prototype.forEach.call(children, (node) => {
    if(NodeTool.getNodeName(node) === 'mo'){
      const op = NodeTool.getNodeText(node).trim();
      if(Brackets.contains(op)){
        let stretchy = NodeTool.getAttr(node, 'stretchy', 'true');
        stretchy = ['', 'true'].indexOf(stretchy) > -1;
        // 操作符是括號
        if(Brackets.isRight(op)){
          const nearLeft = lefts[lefts.length - 1];
          if(nearLeft){
            if(Brackets.isPair(nearLeft, op)){
              parts.push(Brackets.parseRight(op, stretchy));
              lefts.pop();
            } else {
              // some brackets left side is same as right side.
              if(Brackets.isLeft(op)) {
                parts.push(Brackets.parseLeft(op, stretchy));
                lefts.push(op);
              } else {
                console.error("bracket not match");
              }
            }
          }else{
            // some brackets left side is same as right side.
            if(Brackets.isLeft(op)) {
              parts.push(Brackets.parseLeft(op, stretchy));
              lefts.push(op);
            }else{
              console.error("bracket not match")
            }
          }
        } else {
          parts.push(Brackets.parseLeft(op, stretchy));
          lefts.push(op)
        }
      } else {
        parts.push(parseOperator(node));
      }
    } else {
      parts.push(parse(node));
    }
  });
  // 這裏非常不嚴謹
  if(lefts.length > 0){
    for(let i=0; i < lefts.length; i++){
      parts.push("\\right.");
    }
  }
  lefts = undefined;
  return parts;
}


function getRender(node) {
  let render = undefined;
  const nodeName = NodeTool.getNodeName(node);
  switch(nodeName){
    case 'msub':
      render = getRender_default("@1_{@2}");
      break;
    case 'msup':
      render = getRender_default("@1^{@2}");
      break;
    case 'msubsup':
      render = getRender_default("@1_{@2}^{@3}");
      break;
    case 'mover':
      render = renderMover;
      break;
    case 'munder':
      render = renderMunder;
      break;
    case 'munderover':
      render = getRender_default("@1\\limits_{@2}^{@3}");
      break;
    case 'mmultiscripts':
      render = renderMmultiscripts;
      break;
    case 'mroot':
      render = getRender_default("\\sqrt[@2]{@1}");
      break;
    case 'msqrt':
      render = getRender_joinSeparator("\\sqrt{@content}");
      break;
    case 'mtable':
      render = renderTable;
      break;
    case 'mtr':
      render = getRender_joinSeparator("@content \\\\ ", ' & ');
      break;
    case 'mtd':
      render = getRender_joinSeparator("@content");
      break;
    case 'mfrac':
      render = renderMfrac;
      break;
    case 'mfenced':
      render = renderMfenced;
      break;
    case 'mi':
    case 'mn':
    case 'mo':
    case 'ms':
    case 'mtext':
      // they may contains <mglyph>
      render = getRender_joinSeparator("@content");
      break;
    case 'mphantom':
      render = renderMphantom;
      break;
    default:
      // math, mstyle, mrow
      render = getRender_joinSeparator("@content");
      break;
  }
  return render;
}

function renderTable(node, children) {
  const template = "\\begin{matrix} @content \\end{matrix}";
  const render = getRender_joinSeparator(template);
  return render(node, children);
}

function renderMfrac(node, children){
  const [linethickness, bevelled] = [
    NodeTool.getAttr(node, 'linethickness', 'medium'),
    NodeTool.getAttr(node, 'bevelled', 'false')
  ]

  let render = null;
  if(bevelled === 'true') {
    render = getRender_default("{}^{@1}/_{@2}");
  } else if(['0', '0px'].indexOf(linethickness) > -1) {
    const [prevNode, nextNode] = [
      NodeTool.getPrevNode(node),
      NodeTool.getNextNode(node)
    ];
    if((prevNode && NodeTool.getNodeText(prevNode).trim() === '(') &&
       (nextNode && NodeTool.getNodeText(nextNode).trim() === ')')
    ) {
      render = getRender_default("\\DELETE_BRACKET_L\\binom{@1}{@2}\\DELETE_BRACKET_R");
    } else {
      render = getRender_default("{}_{@2}^{@1}");
    }
  } else {
    render = getRender_default("\\frac{@1}{@2}");
  }
  return render(node, children);
}

function renderMfenced(node, children){
  const [open, close, separatorsStr] = [
    NodeTool.getAttr(node, 'open', '('),
    NodeTool.getAttr(node, 'close', ')'),
    NodeTool.getAttr(node, 'separators', ',')
  ];
  const [left, right] = [
    Brackets.parseLeft(open),
    Brackets.parseRight(close)
  ];

  const separators = separatorsStr.split('').filter((c) => c.trim().length === 1);
  const template = `${left}@content${right}`;
  const render = getRender_joinSeparators(template, separators);
  return render(node, children);
}

function renderMmultiscripts(node, children) {
  if(children.length === 0) { return '' }
  let sepIndex = -1;
  let mprescriptsNode = null;
  Array.prototype.forEach.call(children, (node) => {
    if(NodeTool.getNodeName(node) === 'mprescripts'){
      mprescriptsNode = node;
    }
  });
  if(mprescriptsNode) {
    sepIndex = Array.prototype.indexOf.call(children, mprescriptsNode);
  }
  const parts = renderChildren(children);

  const splitArray = (arr, index) => {
    return [arr.slice(0, index), arr.slice(index + 1, arr.length)]
  }
  const renderScripts = (items) => {
    if(items.length > 0) {
      const subs = [];
      const sups = [];
      items.forEach((item, index) => {
        // one render as sub script, one as super script
        if((index + 1) % 2 === 0){
          sups.push(item);
        } else {
          subs.push(item);
        }
      });
      return [
        (subs.length > 0 ? `_{${subs.join(' ')}}` : ''),
        (sups.length > 0 ? `^{${sups.join(' ')}}` : '')
      ].join('');
    } else {
      return '';
    }
  }
  const base = parts.shift();
  let prevScripts = [];
  let backScripts = [];
  if(sepIndex === -1){
    backScripts = parts;
  } else {
    [backScripts, prevScripts] = splitArray(parts, sepIndex - 1)
  }
  return [renderScripts(prevScripts), base, renderScripts(backScripts)].join('');
}

function renderMover(node, children){
  const nodes = flattenNodeTreeByNodeName(node, 'mover');
  let result = undefined;
  for(let i = 0; i < nodes.length - 1; i++) {
    if(!result){ result = parse(nodes[i]) }
    const over = parse(nodes[i + 1]);
    const template = getMatchValueByChar({
      decimals: MathSymbol.overScript.decimals,
      values: MathSymbol.overScript.templates,
      judgeChar: over,
      defaultValue: "@1\\limits^{@2}"
    })
    result = renderTemplate(template.replace("@v", "@1"), [result, over]);
  }
  return result;
}

function renderMunder(node, children){
  const nodes = flattenNodeTreeByNodeName(node, 'munder');
  let result = undefined;
  for(let i = 0; i < nodes.length - 1; i++) {
    if(!result){ result = parse(nodes[i]) }
    const under = parse(nodes[i + 1]);
    const template = getMatchValueByChar({
      decimals: MathSymbol.underScript.decimals,
      values: MathSymbol.underScript.templates,
      judgeChar: under,
      defaultValue: "@1\\limits_{@2}"
    })
    result =  renderTemplate(template.replace("@v", "@1"), [result, under]);
  }
  return result;
}

function flattenNodeTreeByNodeName(root, nodeName) {
  let result = [];
  const children = NodeTool.getChildren(root);
  Array.prototype.forEach.call(children, (node) => {
    if (NodeTool.getNodeName(node) === nodeName) {
      result = result.concat(flattenNodeTreeByNodeName(node, nodeName, result));
    } else {
      result.push(node);
    }
  });
  return result;
}


function getMatchValueByChar(params) {
  const {decimals, values, judgeChar, defaultValue=null} = params;
  if (judgeChar && judgeChar.length === 1) {
    const index = decimals.indexOf(judgeChar.charCodeAt(0));
    if (index > -1) {
      return values[index];
    }
  }
  return defaultValue;
}

// https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mphantom
// FIXME :)
function renderMphantom(node, children) {
    return '';
}



function getRender_default(template) {
  return function(node, children) {
    const parts = renderChildren(children);
    return renderTemplate(template, parts)
  }
}

function renderTemplate(template, values) {
  return template.replace(/\@\d+/g, (m) => {
    const idx = parseInt(m.substring(1, m.length)) - 1;
    return values[idx];
  });
}

function getRender_joinSeparator(template, separator = '') {
  return function(node, children) {
    const parts = renderChildren(children);
    return template.replace("@content", parts.join(separator));
  }
}

function getRender_joinSeparators(template, separators) {
  return function(node, children) {
    const parts = renderChildren(children);
    let content = '';
    if(separators.length === 0){
      content = parts.join('');
    } else {
      content =  parts.reduce((accumulator, part, index) => {
        accumulator += part;
        if(index < parts.length - 1){
          accumulator += (separators[index] || separators[separators.length - 1]);
        }
        return accumulator;
      }, '');
    }
    return template.replace("@content", content);
  }
}

export default {convert: convert};
