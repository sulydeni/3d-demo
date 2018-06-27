_satellite.pushAsyncScript(function(event, target, $variables){
  _satellite.getVar("TouchComm - Basket Data");
var int = setInterval(function(){
  if (typeof window.inqCustData !== "undefined" && window.inqCustData.length > 0){
    clearInterval(int)
    
    // check and fix the structure of window.inqCustData
    if (Object.prototype.toString.call(window.inqCustData) !== '[object Array]') {
      window.inqCustData = [ { productsAddedToCart: [] } ];
    } else if (Object.prototype.toString.call(window.inqCustData[0]) !== '[object Object]') {
      window.inqCustData[0] = { productsAddedToCart: [] };
    } else if (Object.prototype.toString.call(window.inqCustData[0].productsAddedToCart) !== '[object Array]') {
      window.inqCustData[0].productsAddedToCart = [];
    }
    
    var incArr = window.inqCustData[0];

    incArr.productManufacturer = _satellite.getVar("TouchComm - Manufacturer");
    incArr.productCategory = _satellite.getVar("TouchComm - Category");
    incArr.productSegment = _satellite.getVar("TouchComm - Segment").trim();

    if (incArr.productsAddedToCart.length > 0){
      var basket = JSON.parse(_satellite.getVar("TouchComm - Basket Data")),
          addedToCart = incArr.productsAddedToCart || [],
          reverseBasket = basket.slice().reverse();

      for (var i = 0; i < addedToCart.length; i++){
        addedToCart[i].productCategory = reverseBasket[i].category
        addedToCart[i].productManufacturer = reverseBasket[i].manufacturer
        addedToCart[i].productSegment = reverseBasket[i].segment
      }
    }
  }
}, 100)

setTimeout(function(){
  clearInterval(int)

  if(typeof inqCustData === "undefined"){
    _satellite.notify("Webchat - The inqCustData varaible wasn't defined after 20 seconds. Populating the object has been aborted", 4)
  }

}, 20000);
});
