_satellite.pushAsyncScript(function(event, target, $variables){
  /* initiate timer */
var timer = setInterval(function(){
  if(typeof window.s_i_0_dixonsretail !== "undefined" && window.s_i_0_dixonsretail){
    clearInterval(timer);

    var uv = window.universal_variable || {},
        pdt = uv.product || {},
        promise = pdt.pricePromise || {},
        priceTableData = promise.priceTableData || "",
        messageType = promise.priceMessageType || "",
        isCheapest = promise.isCurryesCheapest ? "true" : "false",
        returnedCompetitors = priceTableData.split("|") || [],
        primaryCompetitorStatus = "exclusive",
        competitorPriceStatus = "exclusive",
        competitorTableWithoutCurrys = [],
        competitorTableJSON = [],
        competitorPrices = [],
        competitorPricesWithCurrys = [],
        competitorIds = [],
        competitorIdsWithCurrys = [],
        primaryCompetitorData = [
          '', '', '', '', ''
        ],
        primaryCompetitorPrices = [],
        primaryCompetitorIds = [
          '', '', '', '', ''
        ],
        newData = [''],
        cheapestIsPrimary = false,
        possibleCompetitors = [{"id":20,"name":"currys.co.uk"},{"id":30,"name":"pcworld.co.uk"},{"id":40,"name":"amazon.co.uk"},{"id":50,"name":"appliancedeals.co.uk"},{"id":60,"name":"ao.com"},{"id":80,"name":"asda.com"},{"id":130,"name":"coopelectricalshop.co.uk"},{"id":140,"name":"dabs.com"},{"id":170,"name":"ebuyer.com"},{"id":180,"name":"game.co.uk"},{"id":200,"name":"jessops.com"},{"id":210,"name":"johnlewis.com"},{"id":290,"name":"richersounds.com"},{"id":300,"name":"sainsburys.co.uk"},{"id":310,"name":"staples.co.uk"},{"id":320,"name":"tesco.com"},{"id":330,"name":"argos.co.uk"},{"id":390,"name":"appliance-world.co.uk"},{"id":430,"name":"halfords.com"},{"id":440,"name":"very.co.uk"},{"id":460,"name":"empiredirectappliances.co.uk"},{"id":480,"name":"electricshop.com"},{"id":500,"name":"argos.ie"},{"id":510,"name":"did.ie"},{"id":520,"name":"powercity.ie"},{"id":540,"name":"harveynorman.ie"},{"id":560,"name":"expert.ie"},{"id":580,"name":"carphonewarehouse.com"},{"id":600,"name":"currys.ie"},{"id":610,"name":"wexphotographic.com"},{"id":630,"name":"debenhams.ie"},{"id":640,"name":"littlewoodsireland.ie"},{"id":690,"name":"appliancesdirect.co.uk"},{"id":700,"name":"365electrical.com"},{"id":720,"name":"hughesdirect.co.uk"},{"id":730,"name":"prcdirect.co.uk"},{"id":740,"name":"rangecookers.co.uk"},{"id":750,"name":"rgbdirect.co.uk"},{"id":760,"name":"parkcameras.com"}],
        concatPrimary = [];

    // calculate difference in price
    function calculateDiff(ourPrice, competitorPrice) {
      if (messageType == "matched") {
        var diff = ourPrice / competitorPrice,
            roundedValue = diff.toFixed(2);

        return roundedValue;
      }
      // if price not matched return undefined
      return undefined
    }

    // calculate difference bucket
    function calculateBucket(diff) {
      var parseDiff = parseFloat(diff),
          calcDiff = 1 - parseDiff,
          fixedDiff = parseFloat(calcDiff).toFixed(2) * 100;
      if (typeof fixedDiff !== "undefined") {
        if (fixedDiff > 0.01 && fixedDiff <= 2.5) {
          return "0 to -2.5";
        } else if (fixedDiff >= 2.51 && fixedDiff <= 5) {
          return "-2.5 to -5";
        } else if (fixedDiff >= 5.01 && fixedDiff <= 10) {
          return "-5 to -10";
        } else if (fixedDiff >= 10.01 && fixedDiff <= 20) {
          return "-10 to -20";
        } else if (fixedDiff > 20) {
          return "< -20";
        } else if (fixedDiff == 0) {
          return "0";
        }
      }
    }

    // map data into json for logic and iterations
    returnedCompetitors.map(function(competitor) {
      var competitorData = competitor.split(":");

      // if not currys generate array
      if (competitorData[0] != 20) {
        competitorTableWithoutCurrys.push({
          id: competitorData[0],
          price: competitorData[1]
        });
        competitorIds.push(competitorData[0]);
        competitorPrices.push(parseFloat(competitorData[1]));
      }

      // generate array with currys
      competitorTableJSON.push({
        id: competitorData[0],
        price: competitorData[1]
      });
      competitorIdsWithCurrys.push(competitorData[0]);
      competitorPricesWithCurrys.push(competitorData[1]);

    });

    // get index of currys and of cheapest price
    var indexOfCheapest = 0,
        indexOfCurrys = 0,
        value = competitorPrices[0],
        multipleCheapest = false,
        cheapestIndexArray = [];

    for (var i in competitorIdsWithCurrys) {
      if (competitorIdsWithCurrys[i] == 20) {
        indexOfCurrys = i;
      }
    }

    for (var i in competitorPrices) {
      if (competitorPrices[i] < value) {
        indexOfCheapest = i;
      }
    }

    var cheapestCompetitor = {};
    if (competitorTableWithoutCurrys[indexOfCheapest] > competitorTableWithoutCurrys[cheapestIndexArray[0]]) {
      cheapestCompetitor = competitorTableWithoutCurrys[cheapestIndexArray[0]];
    } else {
      cheapestCompetitor = competitorTableWithoutCurrys[indexOfCheapest];
    }

    // concatonate cheapest competitor data
    var currys = competitorTableJSON[indexOfCurrys],
        cheapestCompetitorDiff = calculateDiff(currys.price, cheapestCompetitor.price),
        calculatedBucket = calculateBucket(cheapestCompetitorDiff),
        cheapestCompetitorData = [cheapestCompetitor.id, cheapestCompetitor.price, cheapestCompetitorDiff, calculatedBucket];

    if (cheapestCompetitorData[0] == 40 || cheapestCompetitorData[0] == 330 || cheapestCompetitorData[0] == 500 || cheapestCompetitorData[0] == 320 || cheapestCompetitorData[0] == 210 || cheapestCompetitorData[0] == 60) {
      cheapestIsPrimary = true;
    }

    /*
  cheapest;cheapest;cheapest;cheapest;
  cheapestPrimary;cheapestPrimary;cheapestPrimary;cheapestPrimary;
  amazon;amazon;amazon;
  argos;argos;argos;
  tesco;tesco;tesco;
  johnlewis;johnlewis;johnlewis;
  ao;ao;ao
*/

    competitorTableWithoutCurrys.map(function(competitorData) {
      var competitorID = competitorData.id || "",
          competitorPrice = competitorData.price || "",
          competitorDifference = calculateDiff(currys.price, competitorPrice),
          priceBucket = calculateBucket(competitorDifference),
          competitorBucket = -1;

      if (competitorID == 40) {
        competitorBucket = 0;
      } else if (competitorID == 330) {
        competitorBucket = 1;
      } else if (competitorID == 500) {
        competitorBucket = 1;
      } else if (competitorID == 320) {
        competitorBucket = 2;
      } else if (competitorID == 210) {
        competitorBucket = 3;
      } else if (competitorID == 60) {
        competitorBucket = 4;
      }

      primaryCompetitorData[competitorBucket] = {
        id: competitorID,
        price: competitorPrice,
        diff: competitorDifference,
        bucket: priceBucket
      };
      primaryCompetitorPrices[competitorBucket] = parseInt(competitorPrice);
    });

    if (!cheapestIsPrimary) {
      var indexOfCheapestPrimary = 0,
          primaryValue = primaryCompetitorPrices[0];
      for (var i = 0; i < primaryCompetitorPrices.length; i++) {
        var incInt = i + 1;
        if (typeof primaryValue == "undefined") {
          primaryValue = primaryCompetitorPrices[i]
        }
        if (primaryCompetitorPrices[i] < primaryValue && primaryCompetitorPrices[i] != primaryValue) {
          indexOfCheapestPrimary = i;
        }
      }
      var cheapestPrimaryCompetitor = primaryCompetitorData[indexOfCheapestPrimary],
          cheapestPrimaryPrice = cheapestPrimaryCompetitor.price || "",
          cheapestPrimaryId = cheapestPrimaryCompetitor.id || "",
          cheapestPrimaryDiff = calculateDiff(currys.price, cheapestPrimaryPrice),
          diffBucket = calculateBucket(cheapestPrimaryDiff),
          cheapestPrimaryCompetitorData = [cheapestPrimaryId, cheapestPrimaryPrice, cheapestPrimaryDiff, diffBucket];
    } else {
      cheapestPrimaryCompetitorData = cheapestCompetitorData;
    }

    // replace cheapest competitor ID with name
    possibleCompetitors.map(function(possible) {
      if (cheapestCompetitorData[0] == possible.id) {
        cheapestCompetitorData[0] = possible.name.split(".")[0];
      }
      if (cheapestPrimaryCompetitorData[0] == possible.id) {
        cheapestPrimaryCompetitorData[0] = possible.name.split(".")[0];
      }
    });

    for (var i = 0; i < primaryCompetitorData.length; i++) {
      concatPrimary.push(primaryCompetitorData[i].price, primaryCompetitorData[i].diff, primaryCompetitorData[i].bucket);
    }

    if (typeof promise.priceTableData !== "undefined") {
      var priceData = promise.priceTableData || "",
          priceDataSplit = priceData.split("|"),
          usp = pdt.unit_sale_price || null,
          prices = [],
          primaryCompetitorPrices = [];

      // Generate prices array from string in UV
      for (var i = 0; i < priceDataSplit.length; i++) {
        var thisPrice = priceDataSplit[i].split(":")[1],
            competitorId = priceDataSplit[i].split(":")[0],
            float = parseFloat(thisPrice);

        prices.push({
          price: float,
          id: parseInt(competitorId)
        });
      }

      // Generate prices array containing only primary competitor prices
      for (var i = 0; i < prices.length; i++) {
        var id = prices[i].id;
        if (id === 40 || id === 330 || id === 500 || id === 320 || id === 210 || id === 60) {
          primaryCompetitorPrices.push(prices[i]);
        }
      }

      // set price status depending on cheapest competitor
      if (prices[0].price === usp) {
        competitorPriceStatus = "same";
      } else if (prices[0].price < usp) {
        competitorPriceStatus = "more expensive";
      } else if (prices[0].price > usp) {
        competitorPriceStatus = "cheaper";
      } else {
        competitorPriceStatus = "JS calculation issue";
      }

      // set price status depending on cheapest PRIMARY competitor
      var cheapestPrimary = primaryCompetitorPrices[0] || {},
          cheapestPrimaryPrice = cheapestPrimary.price || null;

      if (cheapestPrimaryPrice === usp) {
        primaryCompetitorStatus = "same";
      } else if (cheapestPrimaryPrice < usp) {
        primaryCompetitorStatus = "more expensive";
      } else if (cheapestPrimaryPrice > usp) {
        primaryCompetitorStatus = "cheaper";
      } else {
        primaryCompetitorStatus = "no primary competitors";
      }
    }

    var competitorData = [competitorPriceStatus, primaryCompetitorStatus].join(":"),
        tableData = [currys.price, cheapestCompetitorData.join(";"), cheapestPrimaryCompetitorData.join(";")].join(";"),
        data = [isCheapest, competitorData].join(":");

    s.contextData['eVar91'] = [isCheapest, tableData, messageType, data].join(";");
    s.contextData['eVar95'] = concatPrimary.join(";");
    s.events = "event144";

    s.linkTrackVars = "contextData.eVar91,contextData.eVar95";
    s.linkTrackEvents = "event144";

    s.tl(this, "o", "Price Promise");
    //_satellite.track("pricepromiceonloaddelay");
  }
}, 100);

/* stop the timer after 5 seconds */
var timout = setTimeout(function(){
  clearInterval(timer);
}, 5000);
});
