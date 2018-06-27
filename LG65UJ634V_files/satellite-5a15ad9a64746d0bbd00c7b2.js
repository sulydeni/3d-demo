_satellite.pushBlockingScript(function(event, target, $variables){
  window.digitalData = window.digitalData || {};
var emid = window.location.href.match(/[?&]emid=([0-9]+)/);
if (emid) {
  window.digitalData.tracking = window.digitalData.tracking || {};
  window.digitalData.tracking.emid = emid[1];
}
});
