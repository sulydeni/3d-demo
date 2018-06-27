_satellite.pushBlockingScript(function(event, target, $variables){
  
var exLst = document.location.href;

if (exLst.indexOf("order_guest_confirmation") > -1 || exLst.indexOf("basket-confirmation.html") > -1 || exLst.indexOf("order-payment.html") > -1 || exLst.indexOf("order-delivery.html") > -1 || exLst.indexOf("order-reservation.html") > -1 || exLst.indexOf("order-confirmation.html") > -1){
  console.log("Adobe DTM: Intelligent Reach Entry Tag Excluded");
}else{
  console.log("Adobe DTM: Intelligent Reach Entry Tag Injected");
  document.write('<scr'+'ipt type="text/javascript" src="//www.ist-track.com/ProcessClickJavaScript.ashx?id=BEC25C7E-CBCD-460D-81D5-A25372D2E3D7&useDom=1" ></scr'+'ipt>');
}

});
