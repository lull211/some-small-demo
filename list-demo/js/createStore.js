//分发事件行为：


function createStore(initialState) {
  var state = initialState || {};
  var list =[];
  //如果传了值，就把值赋给state，如果没有传值，就把{}空对象给state;
  return {
    getState: function (type) {
      return state[type]; //返回type对应的值
    },
    dispatch: function (action) {
        state[action.type] = action.value; //事件的类型等于事件的值；
        list.forEach(function (ele) {
            ele();
        });
    }, //对事件地描述,分发事件行为。
    subscribe: function (func) {
      list.push(func);
    },
  };
}

