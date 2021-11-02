//合并filterArrByText 和filterArrBySex

function combineFilterFunc(config) {
  return function (data) {
    var lastArr = data;
    for (var prop in config) {
      lastArr = config[prop](lastArr, Store.getState(prop));
    //   console.log(Store.getState(prop));
    }
    //prop = 'text','sex'
    //config[prop]=filterArrByText
    //config[prop]=filterArrBySex
    return lastArr;
  };
}

var lastFilterFunc = combineFilterFunc({
  text: filterArrByText,
  sex: filterArrBySex,
});