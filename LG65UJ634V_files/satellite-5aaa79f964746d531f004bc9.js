_satellite.pushAsyncScript(function(event, target, $variables){
  var dd = window.digitalData || {},
    pdts = dd.product || [],
    pdt = pdts[0] || {},
    credits = pdt.credit || [],
    credit = credits[0] || {},
    APR = credit.APR === null ? null : (credit.APR || 0),
    type = credit.creditType || null,
    min = credit.minTerm || null,
    max = credit.maxTerm || null,
    deferral = credit.deferralPeriod || null,
    promoCreditAvailable = type !== null ? "true" : "false",
    creditAvailable = pdt.financingAvailable ? "true" : "false",
    offerData = [APR, type, min, max, deferral].join(":"),
    data = [creditAvailable, promoCreditAvailable, offerData];

s.linkTrackVars = "contextData.eVar109";
s.contextData["eVar109"] = data.join("|");
s.tl(this, "o", "Credit Collection");
_satellite.notify(data.join("|"));

});
