// getComputedStyle是这样子来使用的
// var ODom = document.getElementsByClassName('dom');
// getComputedStyle(oDom,null).left;

function getStyle(dom, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(dom, null)[attr];
  } else {
    return dom.currentStyle[atrr];
  }
}
