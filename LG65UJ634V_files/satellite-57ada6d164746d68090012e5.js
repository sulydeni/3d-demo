_satellite.pushBlockingScript(function(event, target, $variables){
  	var wasPrice = _satellite.getVar("Was Price");
  if(wasPrice === "true"){
    mboxDefine("content", "wasPrice", "Was_Price=" + wasPrice);
    mboxUpdate("wasPrice", "Was_Price=" + wasPrice);
  }

});
