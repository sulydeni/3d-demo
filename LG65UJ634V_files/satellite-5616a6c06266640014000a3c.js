_satellite.pushBlockingScript(function(event, target, $variables){
  var exLst = document.location.href;

if (exLst.indexOf("order_guest_confirmation") > -1 || exLst.indexOf("order-reservation.html") > -1 || exLst.indexOf("order-confirmation.html") > -1){
  console.log("Adobe DTM: AWIN Master Tag Excluded");
}else{
  console.log("Adobe DTM: AWIN Master Tag Injected");
  document.write('<scr'+'ipt type="text/javascript" src="//www.dwin1.com/1599.js" ></scr'+'ipt>');
}
});
