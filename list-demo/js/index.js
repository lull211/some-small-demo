var personArr = [
  { name: "王港", src: "./img/3.png", des: "颈椎不好", sex: "m" },
  { name: "刘莹", src: "./img/5.png", des: "我是谁", sex: "f" },
  { name: "王秀莹", src: "./img/4.png", des: "我很好看", sex: "f" },
  { name: "刘金雷", src: "./img/1.png", des: "你没有见过陌生的脸", sex: "m" },
  { name: "刘飞翔", src: "./img/2.png", des: "瓜皮刘", sex: "m" },
];


var oDivFriendList = document.getElementsByClassName("friendList")[0];
var oUl = oDivFriendList.getElementsByTagName("ul")[0];
var oInput = document.getElementsByClassName("search")[0];
var oButtonArr = [].slice.call(document.getElementsByClassName("btn"));
var lastActiveBtn = oButtonArr[oButtonArr.length - 1];
var Store = createStore({
  text: "",
  sex: "a",
}); //里面放对象；
// console.log(oDivFriendList, oUl);
//根据后台的数据渲染页面
oUl.class = 'duyi';
//更新下面列表
function randerPage(data) {
  var htmlStr = "";
  data.forEach(function (ele, index, self) {
    // ele.name = p.name;
    // ele.src = img.src;
    // ele.des = p.des;
    htmlStr +=
      '<li><img src ="' +
      ele.src +
      '"/><p class = "name">' +
      ele.name +
      '</p><p class = "des">' +
      ele.des +
      "</p></li>";
  });
  oUl.innerHTML = htmlStr;
}
//更新列表：
function upDate() {
  randerPage(lastFilterFunc(personArr));
}
upDate();
Store.subscribe(upDate);

//input 输入文本筛选
oInput.oninput = function () {
  Store.dispatch({ type: 'text', value: this.value });
};

//btn遍历
oButtonArr.forEach(function (ele, index, self) {
  ele.onclick = function () {
    changeActive(this);
    //全局执行，虽然传进去的this指向ele，但是函数里面的thiS指向window,
  Store.dispatch({ type: "sex", value: this.getAttribute("sex")});
  };
});

//改变btn的状态
function changeActive(ele) {
  // this.className = 'btn active';
  //这里要写ele;不然this指向window;因为这个函数算是再全局执行
  ele.className = "btn active";
  lastActiveBtn.className = "btn";
  lastActiveBtn = ele;
}

