

        function getQueryStringValue(queryStringKey) 
        {
          url = window.location.search.substring(1);
          queryStrings = url.split("&");
          for (i = 0; i < queryStrings.length; i++) 
          {
            currentQueryString = queryStrings[i].split("=");
            if (currentQueryString[0] == queryStringKey)
              return currentQueryString[1];
          }
          return "";
        }

        var searchTerm = "";
        
        function getReferrerQueryStringValue(queryStringKey) 
        {
          url = document.referrer;
          queryStrings = url.split("&");
          for (i = 0; i < queryStrings.length; i++) 
          {
            currentQueryString = queryStrings[i].split("=");
            if (currentQueryString[0] == queryStringKey)
              return currentQueryString[1];
          }
          return "";
        }
        if ((searchTerm == undefined) || (searchTerm == ""))
          searchTerm = getReferrerQueryStringValue("q");
        if ((searchTerm == undefined) || (searchTerm == ""))
          searchTerm = getReferrerQueryStringValue("p");
        if ((searchTerm == undefined) || (searchTerm == ""))
          searchTerm = getReferrerQueryStringValue("contextKeywords");
        if ((searchTerm == undefined) || (searchTerm == ""))
          searchTerm = getReferrerQueryStringValue("terms");  //Populate search term
        if ((searchTerm == undefined) || (searchTerm == ""))
          searchTerm = getQueryStringValue("istSearchTerm");

        var clickRef = getQueryStringValue("istClickRef");

        if ((getQueryStringValue("istItemId") != "") || (getQueryStringValue("istDefaultItemId") != "") || (getQueryStringValue("istTextAdId") != "") || (getQueryStringValue("istKeywordId") != ""))
        {
          var redirectUrl = "itemId=" + getQueryStringValue("istItemId") + "&defaultItemId=" + getQueryStringValue("istDefaultItemId") + "&bid=" + getQueryStringValue("istBid") + 
            "&textAdId=" + getQueryStringValue("istTextAdId") + "&keywordId=" + getQueryStringValue("istKeywordId") + 
            "&searchTerm=" + escape(searchTerm) + "&clickRef=" + escape(clickRef) + "&affiliateCompanyId=" + getQueryStringValue("istAffiliateCompanyId") + 
            "&contentTypeId=" + getQueryStringValue("istContentTypeId") + "&placementId=" + getQueryStringValue("istPlacementId") +
            "&referrerUrl=" + escape(document.referrer) + "&hostAddress=" + "213.218.193.46" + "&languages=" + escape(window.navigator.userLanguage) + 
            "&userAgent=" + escape(window.navigator.userAgent);

          var imageSource = '//www.ist-track.com/InternalProcessClick.ashx?uniqueUserId=b914d882-0c08-4f86-b975-362310348a1d&' + redirectUrl;
          if (document.body != undefined)
            {
              var img = document.createElement('img');
              img.src = imageSource;
              img.width = 1;
              img.height = 1;
              document.body.appendChild(img);
            }
        }
      