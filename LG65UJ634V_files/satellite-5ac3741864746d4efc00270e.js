_satellite.pushAsyncScript(function(event, target, $variables){
  var ma = _satellite.getVar("DD - Product - Merchandise Area") || "",
    id = _satellite.getVar("DD - Product - Product ID") || "",
    name = _satellite.getVar("DD - Product - Product Name") || "";

window.Krux||((Krux=function(){Krux.q.push(arguments);}).q=[]);
Krux('ns:dixons','admEvent', 'LpGC03Yl', {
    merchandise_area:ma, 
    product_id:id,
    product_name:name});
});
