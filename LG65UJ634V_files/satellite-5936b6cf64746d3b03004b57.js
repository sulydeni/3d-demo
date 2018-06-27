_satellite.pushAsyncScript(function(event, target, $variables){
  var script = document.createElement('script');

script.type = 'application/javascript';
script.src = 'https://track.uniqodo.com/29.js';

document.getElementsByTagName('body')[0].appendChild(script);
});
