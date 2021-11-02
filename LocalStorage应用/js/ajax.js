function ajax(url, success) {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHttp");
  } //应对所有的现代浏览器，包括 IE5 和 IE6，检查浏览器是否支持 XMLHttpRequest 对象。如果支持，则创建 XMLHttpRequest 对象。如果不支持，则创建 ActiveXObject 对象
  xhr.open("get", url, false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      //将浏览器返回的JSON对象作为参数data传给回调函数
        success && success(data);
      //相当于if(success)为true(回调函数存在)，就执行回调函数
    }
  };
  xhr.send();
}