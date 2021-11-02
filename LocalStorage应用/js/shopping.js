var selectData = {}; //用来存储所有的商品信息以及所有的商品；
function init() {
  selectData = JSON.parse(localStorage.getItem("shoppingCart")) || {};
  createSelectDom();
}
init();
//请求数据
ajax("js/shoppingData.json", function (data) {
  createGoodsDom(data);
});
//创建商品列表
function createGoodsDom(data) {
  var str = "";
  data.forEach((item) => {
    var color = ""; //用来存储每一列tr的所有颜色信息
    item.list.forEach((product) => {
      color +=
        '<span data-id="' + product.id + '">' + product.color + "</span>";
    });
    str +=
      " <tr>" +
      "<td>" +
      '<img src="' +
      item.list[0].img +
      '" />' +
      "</td>" +
      "<td>" +
      "<p>" +
      item.name +
      "</p>" +
      '<div class="color">' +
      color +
      "</div>" +
      "</td>" +
      " <td>" +
      item.list[0].price +
      ".00元</td>" +
      "<td>" +
      "<span>-</span>" +
      "<strong>0</strong>" +
      "<span>+</span>" +
      "</td>" +
      "<td><button>加入购物车</button></td>" +
      "</tr>";
  });
  var tbody = document.querySelector(".product tbody");
  tbody.innerHTML = str;
  addEvent();
}
//添加商品事件
function addEvent() {
  var trs = document.querySelectorAll(".product tr");
  for (let i = 0; i < trs.length; i++) {
    action(trs[i], i);
  }
  function action(tr, n) {
    var tds = tr.children, //当前行里的所有tr
      img = tds[0].children[0], //商品图片
      imgSrc = img.getAttribute("src"), //商品图片地址
      name = tds[1].children[0].innerHTML, //商品名字
      colors = tds[1].children[1].children, //所有颜色的按钮
      price = parseFloat(tds[2].innerHTML), //价格
      spans = tds[3].querySelectorAll("span"),
      strong = tds[3].querySelector("strong"),
      joinBtn = tds[4].children[0],
      selectNum = 0,
      lastprice = 0,
      lastNum = 0;
    //颜色按钮点击功能
    var last = null, //一次选中的按钮
      colorId = "", //选中商品的id
      colorValue = ""; //选中的颜色
    for (let i = 0; i < colors.length; i++) {
      colors[i].index = i;
      colors[i].onclick = function () {
        //last && last.className = "";//&&的运算符要比等号的运算符要高，就会先执行last && last.className，再运算等号，
        last && last != this && (last.className = "");
        //last 如果有值且上一个last不等于这次点击的this就清空，如果不是就不用清空,就是只有当上一个和当前点击的是不同的按钮，才需要清空
        //如果点击的按钮是遇上一个点击的按钮相同(last=this)，className先不清空，交由下面的三目运算符来选择处理
        this.className = this.className ? "" : "active";

        colorValue = this.className ? this.innerHTML : "";
        //判断this.className有没有,有就加innerHTML，没有就是空
        colorId = this.className ? this.dataset.id : "";
        imgSrc = this.className
          ? "images/img_0" + (n + 1) + "-" + (this.index + 1) + ".png"
          : "images/img_0" + (n + 1) + "-1.png";
        img.src = imgSrc;
        last = this;
      };
    }
    //减按扭
    spans[0].onclick = function () {
      selectNum <= 0 ? 0 : selectNum--;
      strong.innerHTML = selectNum;
    };
    spans[1].onclick = function () {
      strong.innerHTML = selectNum++;
      strong.innerHTML = selectNum;
    };
    //加入购物车
    joinBtn.onclick = function () {
      if (!colorValue) {
        alert("请选择颜色");
        return;
      }
      if (!selectNum) {
        alert("请添加购买数量");
        return;
      }
      //给selectData对象赋值
      selectData[colorId] = {
        id: colorId,
        name: name,
        color: colorValue,
        price: price,
        num: selectNum+lastNum,
        img: imgSrc,
        time: new Date().getTime(), //根据这个time来排序，新添加的放在前面
        pricetotal:price*selectNum+lastprice,
      };
      localStorage.setItem("shoppingCart", JSON.stringify(selectData)); //更新localStorage数据
      lastprice = selectData[colorId].pricetotal;
      lastNum = selectData[colorId].num;
      console.log(lastprice);
      console.log(lastNum);
      //加入购物车后让所有已经选择的内容还原
      img.src = "images/img_0" + (n + 1) + "-1.png";
      last.className = "";
      strong.innerHTML = selectNum = 0;

      createSelectDom(); //存储完数据后要渲染购物车的列表
    };
  }
}
//创建购物车商品结构
function createSelectDom(params) {
  var tbody = document.querySelector(".selected tbody");
  var totalPrice = document.querySelector(".selected th strong");
  console.log(totalPrice);
  // var strong = tds[3].querySelector("strong");
  var trs = document.querySelectorAll(".selected tbody tr");
  // console.log(price);
  var str = "";
  var total = 0; //总共多少钱
  var goods = Object.values(selectData); //ES7里面的方法，用来取到对象里的所有value,并把取到的内容放到一个数组里
  goods.sort(function (g1, g2) {
    return g2.time - g1.time;
  }); //按时间的大小来排序，g2.time-g1.time小于零，g2排在前面
  console.log(goods);
  tbody.innerHTML = "";
  for (let i = 0; i < goods.length; i++) {
    str +=
      "<tr>" +
      "<td>" +
      '<img src="' +
      goods[i].img +
      '" />' +
      "</td>" +
      "<td>" +
      "<p>" +
      goods[i].name +
      "</p>" +
      "</td>" +
      "<td>" +
      goods[i].color +
      "</td>" +
      "<td>" +
      goods[i].price * goods[i].num +
      "</td>" +
      "<td>" +
      goods[i].num +
      "</td>" +
      "<td><button data-id=" +
      goods[i].id +
      ">删除</button></td>" +
      "</tr>";
    total += goods[i].price * goods[i].num;
  }
  tbody.innerHTML = str;
  totalPrice.innerHTML = total + ".00元";
  del();
}
//删除商品
function del() {
  var btns = document.querySelectorAll(".selected tbody button");
  var tbody = document.querySelector(".selected tbody");
  for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      delete selectData[this.dataset.id]; //删除名字为this.data-id的值的localstroage值，相当于selectData[1001];
      // btnd的dat - id值等于selectData.id
      localStorage.setItem("shoppingCart", JSON.stringify(selectData)); //更新localStorage数据
      //删除DOM结构
      tbody.removeChild(this.parentNode.parentNode);
      //更新总价格
      var totalPrice = document.querySelector(".selected th strong");
      totalPrice.innerHTML =
        parseFloat(totalPrice.innerHTML) -
        parseFloat(this.parentNode.parentNode.children[3].innerHTML) +
        ".00元";
    };
  }
}
//storage事件
window.addEventListener("storage", function (ev) {
  console.log("这里刷新");
  console.log(ev.key); //修改哪个storage
  console.log(ev.newValue); //修改后的数据
  console.log(ev.oldValue); //修改前的数据
  console.log(ev.storageArea); //修改的storage对象
  console.log(ev.url); //返回操作的页面的url
  init(); //在另一个页面直接初始化事件
});
