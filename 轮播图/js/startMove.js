//缓冲运动的封装
function startMove(dom, attrObj,callback) {
  var iSpeed = null,
    iCur = null;
  clearInterval(dom.timer); //不管有没有到达目标点，都应该先清除定时器，让当前运动先停下来

  dom.timer = setInterval(() => {
    var bStop = true;
    for (var attr in attrObj) {
      if (attr == 'opacity') {
        iCur = parseFloat(getStyle(dom, attr)) * 100;
      } else {
        iCur = parseInt(getStyle(dom, attr));
      }
      iSpeed = (attrObj[attr] - iCur) / 7;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

      if (attr == 'opacity') {
        dom.style.opacity = (iCur + iSpeed) / 100;
      } else {
        dom.style[attr] = iCur + iSpeed + "px";
      }
      if (iCur != attrObj[attr]) {
        bStop = false;
      }
    }
    if (bStop) {
        clearInterval(dom.timer);
        typeof callback == 'function' && callback();
    }
  }, 30);
  //    clearInterval(timer);
}
