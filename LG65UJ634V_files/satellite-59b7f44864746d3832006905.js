_satellite.pushAsyncScript(function(event, target, $variables){
  if(typeof window.performance.timing !== "undefined"){
  document.addEventListener("DOMContentLoaded", function(){
    var performance = window.performance || {},
        dd = window.digitalData || {},
        timing = performance.timing || {},
        page = dd.page || {},
        timeToLoad = timing.domContentLoadedEventStart - timing.navigationStart;

    s.linkTrackVars = "contextData.eVar98,events,list3";
    s.contextData['eVar98'] = timeToLoad + "";
    s.list3 = _satellite.getVar("Local Storage - DMP Segments");
    s.events += ",event237=" + timeToLoad;


    var interval = setInterval(function(){
      if(typeof window.s_i_0_dixonsretail !== "undefined"){
        s.contextData['eVar98'] = "";
        s.list3 = "";
        clearInterval(interval);
      }
    }, 100);

    setTimeout(function(){
      s.contextData['eVar98'] = "";
      s.list3 = "";
      clearInterval(interval);
    }, 5000);
  });
}
});
