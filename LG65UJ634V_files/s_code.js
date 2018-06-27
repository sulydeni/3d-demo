/* SiteCatalyst code version: H.27.

Dixonsretail code version: v1.11.2
v1.0  ??? 2012-10-18 T&T Integration, Additional Internal Link Filters
v1.1  ??? 2013-02-11 Added extra search engine, Streamlined internal links, added dixons.co.uk and isitetv.com to internal link filters, RR tracking, Product Finding Methods - search, external, rr and intcmp. Categorised Social, Captured Previous Page in an eVar.
v1.2  ??? 2014-04-02 Added channel stacking (reconfig of CVP plugin with 90 day window instead of 30), new cookie added to set SEO or SEOHP status, amended SEO channel name to SEO or SEOHP depending on landing page, tweaked internalfilters & channeldomain list
v1.3  ??? 2014-04-02 Revised channel manager and stacking logic.
v1.4  RAG 2014-07-21 Removed t.co as a social channel referrer.
                     Suppress 'Internal' channel if within same domain.
v1.5  RAG 2014-08-04 Chat tagging rules			   
v1.6  RAG 2014-08-05 Pull event finding into plugin
v1.7  RAG 2014-09-12 Change chat cookie lifetime from 30 to 7 days
v1.8  AW  2014-09-18 Added prop4 to eVar66
v1.9  RAG 2014-09-23 eVar67 and eVar68 require s.linkTrackVars entries
v1.10 RAG 2014-10-15 - Upgrade to H27 and use VisitorID if available
                     - Use localStorage for marketing channels stack.  Includes flag cookies to maintain the stack.
                     - Landing within secure pages will not affect the stack.  Therefore Service will not usually be stacked.
                     - Added prop12=code version
                     - Change eVar54 from D=c49 to D=s_vi
                     - Removed eVar29, eVar30, eVar34
                     - Change channel names.  Removed "External Content"
                     - Allow NOT and BRA to be stacked on one-another within a visit.  (Formerly SEO and SEOHP)
                     - Add dixons.com to internal filters to prevent exit links being recorded when main product image clicked on
                     - Record referrals from t.co as social on browsers where this is possible.
                     - Prevent re-stacking of channel on refresh and back button.
v1.11 RAG 2014-10-30 - fid should be a cookie not in local storage
                     - Block detemination of channel and stacking of it if refresh or back is pressed

Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/

var s=s_gi(s_account);
if (typeof visitor != "undefined") s.visitor = visitor;
/************************** CONFIG SECTION **************************/
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=false
s.linkInternalFilters="javascript:,pcworld.co.uk,currys.co.uk,localhost,e-merchant.com,amexsafekey.com,authenticationserver.pbs,cardinalcommerce.com,verifiedbyvisa.com,tsys.arcot.com,auth.onlineauthentication.com.au,www.securesuite.co.uk,secure.wp3.rbsworldpay.com,secure5.arcot.com,verifiedbyvisa.barclays.co.uk,www.clicksafe.lloydstsb.com,secure.barclaycard.co.uk,secure6.arcot.com,cap.securecode.com,secure7.arcot.com,secure4.arcot.com,www.mycardsecure.com,secure.worldpay.com,www.verifiedbyvisa-mastercardsecurecode.com,currys.co.uk,e-merchant.com,authenticationserver.pbs,cardinalcommerce.com,amexsafekey.com,richrelevance.com,arcot.com,isitetv.com,e-merchant"
s.linkInternalFilters=s.linkInternalFilters+",dixons.com,richrelevance.com,isitetv.com,ebd.com,3ds,3dsecure,mbnapayerauth,e-merchant,securesuite,barclays.co.uk,arcot.com,lloydstsb.com,barclaycard.co.uk,www.mycardsecure.com,cap.securecode.com,worldpay.com,rbsworldpay.com,verifiedbyvisa,barclays.co.uk,arcot.com,mastercardsecurecode.com"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"
s.cookieDomainPeriods="3"
s.fpCookieDomainPeriods="3"
s._extraSearchEngines="bing.com|q|Microsoft bing>search.bt.com|q|BT Search>search.virginmedia.com|q|Virgin Media Search>search.conduit.com|q|Conduit>search.sky.com|q|Sky Search>search.alot.com|q|Alot Search>search.mywebsearch.com|q|My Web Search";

// Channel Manager Configuration
s._channelDomain="SOC|facebook.com,linkedin.com,twitter.com,plus.google.com,pinterest.com,orkut.com,friendster.com,livejournal.com,blogspot.com,wordpress.com,friendfeed.com,myspace.com,digg.com,reddit.com,stumbleupon.com,twine.com,yelp.com,mixx.com,delicious.com,tumblr.com,disqus.com,intensedebate.com,plurk.com,slideshare.net,backtype.com,netvibes.com,mister-wong.com,diigo.com,flixster.com,youtube.com,vimeo.com,12seconds.tv,identi.ca,zooomr.com,jaiku.com,flickr.com,imeem.com,dailymotion.com,fotolog.com,photobucket.com,smugmug.com,classmates.com,myyearbook.com,mylife.com,tagged.com,stumbleupon.com,ning.com,bebo.com,hi5.com,yuku.com,cafemom.com,xanga.com";
s._channelInternalDomain="currys.co.uk,techtalk.currys.co.uk,pcworld.co.uk,dixons.co.uk,dixonstravel.com,pcworldbusiness.co.uk,knowhow.com,pcworld.ie,currys.ie,partmaster.co.uk,dixonsretail.com"
s._channelParameter="";
s._channelPattern="EML|em,Em>PPC|ppc>AFF|aff,AFF>PCO|comp,Comp>DIS|display,Display,VOD>SER|service>SOC|social";

// Channel Names
s._channelDirectOrSeoHomePage="BRA" // i.e. Brand
s._channelDirectOrSeoNonHomePage="NOT"
s._channelServiceEmail="SER"
s._channelInternal="INT"
s._channelPpc="PPC"
s._channelOtherNaturalReferrers="REF"
s._channelUnknownPaidChannel="UPC"
s._channelSocial="SOC"

// Time Parting Configuration
s._tpDST = {
	2012:'3/25,10/28',
	2013:'3/31,10/27',
	2014:'3/30,10/26',
	2015:'3/29,10/25',
	2016:'3/27,10/30',
	2017:'3/26,10/29',
	2018:'3/25,10/28',
	2019:'3/31,10/27'
}

// Cookie Constants
s._cookieChannelStack = "s_chs"
s._cookieCampaignStack = "s_cas"
s._cookieChannelStackExists = "s_chsx"
s._cookieQueueStackClear="s_qsc"
s._forceCookies = s._cookieQueueStackClear + "," + s._cookieChannelStackExists + ",gpv_p10,gpv_p20,s_ppv,bookmarked,s_tbm0,s_visit,s_pv_cm,s_ev67_prev,s_cpc,s_ppv,s_intcmp,c_m,s_fid"


/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {

	/* s_code version */
	s.prop12 = "MainSCode JavaScript H.27 v1.11.2 30-Oct-2014"

	/*custom page view*/
	s.events=s.apl(s.events,"event11",",",1);
	
	/*dynamically populate referrer and pageName*/
	s.eVar21="D=Referer";
	s.eVar22="D=pageName";
	
	/*site*/	
	s.prop11=window.location.hostname?window.location.hostname:'';
	
	/*get previous value from pageName*/
	s.prop10=s.getPreviousValue(s.pageName,'gpv_p10','');
	/*get previous value from channel*/
	s.prop20=s.eVar44=s.getPreviousValue(s.channel,'gpv_p20','');
	
	// Change below if EU law on DST start/end dates changes
	var tpA = s.getTimeParting('n','+0');
	s.prop5 = tpA[1]; // Set hour of day
	s.prop6 = tpA[2]; // Set day of week
	s.prop7 = tpA[3]; // Set weekday/weekend
	s.eVar5 = "D=c5";
	s.eVar6 = "D=c6";
	s.eVar7 = "D=c7";

	/*props to evars*/
	s.eVar53 = "D=c22";
	s.eVar9 = "D=c18";
	s.eVar54 = "D=s_vi";
	s.eVar66 = "D=c4";


	/*FormAnalysis outcommented*/
	/*s.setupFormAnalysis();*/
	
	
	/* Channel manager and stacking */
	if (!s._cmdone)
	{
		/* Ensure that if the customer refreshes or goes back the channel is not re-stacked*/			
		var navFlagFunction = "var fiveSecs = new Date(); fiveSecs.setTime(fiveSecs.getTime()+5000); s.c_w('s_nav','Y', fiveSecs)"
		if (window.addEventListener)
			window.addEventListener("unload",new Function(navFlagFunction),false)
		else
			window.attachEvent("onunload",new Function(navFlagFunction))
		var navigation = s.c_r("s_nav");
		if (navigation=="Y")
			s._cmdone=true
			
		/* Initialise *************************************************************/
		var expiryEvents="purchase,event13,event48,event61"
		var expiryTime="90"
		var channelStackLength="8"
		var campaignStackLength="8"
		var cookieExpiry=new Date()
		cookieExpiry.setTime(cookieExpiry.getTime() + 63072000000)
		var doStackChannel=true
		
		/* Manage stacks across secure and non-secure connections *********************/
		// This must be done irrespective of whether navigation occurs within the site
		if (document.location.protocol=="http:")
		{
			// Clear stacks if queue up from previous purchase
			var queuedClearance = s.c_r(s._cookieQueueStackClear)
			if (queuedClearance=="Y")
			{
				s.c_w(s._cookieChannelStack,"")
				s.c_w(s._cookieCampaignStack,"")
				s.c_w(s._cookieChannelStackExists,"")
				s.c_w(s._cookieQueueStackClear,"")
			}
		}
		else
		{
			// Secure and non-secure have different localStorage locations, so
			// stacks should not be altered in the secure part of the site.
			doStackChannel=false		
		}
		
		if (!s._cmdone)
		{			
			/* Call Channel Manager****************************************************/
			s.channelManager('cmpid',':','0','','s_bookmarked',0);
			
			/* Correct the channel names **********************************************/
			var originalChannelName=s._channel
			if (s._channel=='Natural Search')
			{
				if (s.pageName=='home') s._channel=s._channelDirectOrSeoHomePage
				else s._channel=s._channelDirectOrSeoNonHomePage;
			}
			else if (s._channel=="Typed/Bookmarked")
			{
				// If the referrer is internal, then CM will mark this as Typed/Bookmarked
				// If in internal referrers list for CM, then change this to 'Internal'
				// Find Referrer
				var dom = s.referrer ? s.referrer : document.referrer;
				if (dom!="")
				{
					dom = unescape(dom.toLowerCase());
					dom = s.split(dom,'/');
					dom = s.split(dom[2],'?');
					dom = dom[0].toLowerCase();
					// Find list of domains that indicate internal referrer
					intchans = s._channelInternalDomain.toLowerCase();
					intchans = s.split(intchans, ',');
					// Loop through domains on the list looking for the current referrer
					for (i = 0; i < intchans.length; i++)
					{
						if (dom.indexOf(intchans[i])!=-1)
						{
							s._channel=s._channelInternal
							break
						}
					}
				}
				if (s._channel=="Typed/Bookmarked")
				{
					if (s.pageName=='home') s._channel=s._channelDirectOrSeoHomePage
					else s._channel=s._channelDirectOrSeoNonHomePage;
				}
			}
			else if (s._channel=="Other Natural Referrers") 
			{
				if (document.referrer.indexOf("/t.co/")>-1)
					s._channel=s._channelSocial
				else
					s._channel=s._channelOtherNaturalReferrers
			}
			else if (s._channel=="Paid Search") s._channel=s._channelPpc
			else if (s._channel=="Unknown Paid Channel") s._channel=s._channelUnknownPaidChannel
			
			/* Additional Logic *******************************************************/
			// isFirstVisit is only used for Internal and Service and is a check of
			// whether there is a stack or not.  The stack is in local storage so whether
			// or not the stack exists is in a cookie.
			var isFirstVisit=s.c_r(s._cookieChannelStackExists)==""
			
			// Proceed on the basis that all channels are recorded and stacked.  
			// The following logic describes the exceptions
			if (s.getVisitStart("s_visit") && s._channel==s._channelInternal)
			{
				if (document.referrer)
				{
					var referringDomain=(document.referrer).split("/")
					referringDomain=referringDomain[2].split("?")[0]
					if (referringDomain==document.location.host)
					{
						// If the referrer is the current domain, do not record anything
						s._channel=""
						doStackChannel=false
					}
				}
			} else
			if (!s.getVisitStart("s_visit") && (s._channel==s._channelInternal || s._channel==s._channelServiceEmail))
			{
				// Do not record 'internal' or 'service' unless first page of visit.  'Direct' Already handled by plugin
				s._channel=""
				doStackChannel=false
			}
			else if (!isFirstVisit && s._channel==s._channelServiceEmail)
			{
				// Do not stack 'Service' but do record in eVar24
				doStackChannel=false
			}
			
			/* Set eVars and Stack ****************************************************/
			// Use updated channel name in s.campaign if applicable.
			if (s._channel!="")
			{
				if (s._campaign==originalChannelName)
					s.campaign=s._channel
				else
					s.campaign=s._campaign;  
					s.eVar24=s._channel
			}
			// Stack campaign and stack seperately
			// NB: Must call crossVisitParticipation every time to ensure that it will be cleared on purchase events and when expired
			s.eVar1 =                s.crossVisitParticipation(s.campaign,                   s._cookieCampaignStack, expiryTime, campaignStackLength, '>');
			s.eVar31= s.summariseCVP(s.crossVisitParticipation(doStackChannel?s._channel:'', s._cookieChannelStack,  expiryTime, channelStackLength,  '>', '', 1));
			
			/* Remove old stack cookies ************************************************/
			s.c_w('s_e1','')
			s.c_w('s_cpm','')
			s.c_w('s_pv_cm','')
			if (doStackChannel)
			{
				s.c_w('s_e31','')
				s.c_w('s_evar31','')
			}
			// Clear / set flag to say channel stack exists (this is a cookie whereas the stack is in local storage
			if (doStackChannel)
			{
				if (s.c_r(s._cookieChannelStack)=="")
					s.c_w(s._cookieChannelStackExists, "N", cookieExpiry)
				else
					s.c_w(s._cookieChannelStackExists, "Y", cookieExpiry)
			}
				
			/* Keywords ****************************************************************/
			if(s.eVar24==s._channelDirectOrSeoHomePage || s.eVar24==s._channelDirectOrSeoNonHomePage)
			{
				s.eVar45=s._keywords;
			}
			
			/* First touch and extra variables*******************************************/
			s.eVar32="D=v24";	//Marketing Channel (first touch)
			s.eVar33="D=v0";	//Tracking Code (first touch)
			
			// Ensure that we only determine the channel once
			s._cmdone=true		
		} 
		
		// Set expiry event for server-side eVars
		// Loop through expiry events checking for each event in the events list
		// If found add event62 to the list, which will expire the eVars on the 
		// server.  NB: serialisation and numeric events syntax is supported, hence
		// ':', ',' and '=' as the suffic on the events in the check.  a, b and c
		// are the values from expiry event list (eel) that are compared to the events
		// from the event list (el) via variables a1, b2 and c2.  eeli and eli are the indexes
		// in their respective arrays and eell and ell are their lengths.
		// Queue up removal of stacks after purchase.  local storage is on insure and expiry
		// events are on secure.
		s.findEvent(expiryEvents, function () {
			s.events+=",event62";
			s.c_w(s._cookieQueueStackClear, "Y", cookieExpiry)
		})
			
	} // end of channel manager and stacking
	
	/* Chat *******************************************************************/
	// Determine if previous chat should expire	
	var _pev67 = s.c_r("s_ev67_prev")
	
	// Determine if a chat event was raised and if so which one
	var _ev67=""
	s.findEvent("event63,event64,event65,event66,event67,event68", function (a1) {
		switch (a1)
		{
			case "event63,": s.eVar67 = "Proactive Chat Exposed";        _ev67="63"; break
			case "event64,": s.eVar67 = "Proactive Chat Engaged";        _ev67="64"; break
			case "event65,": s.eVar67 = "Proactive Chat Sale Qualified"; _ev67="65"; break
			case "event66,": s.eVar67 = "Reactive Chat Exposed";         _ev67="66"; break
			case "event67,": s.eVar67 = "Reactive Chat Engaged";         _ev67="67"; break
			case "event68,": s.eVar67 = "Reactive Chat Sale Qualified";  _ev67="68"; break
		}
	})
	
	if (_ev67!="")
	{
		// Apply attribution model rules. 	i.e. Determine whether eVar67 should be overwritten
		if (_pev67)
		{
			if (_pev67=="64" || _pev67=="67")
			{
				if (_ev67=="63" || _ev67=="66") _ev67=""
			}
			else if (_pev67=="65" || _pev67=="68")
			{
				if (_ev67!="65" && _ev67!="68") _ev67=""
			}
		}
		
		if (_ev67=="")
		{
			// Write old value to cookie
			_ev67 = _pev67
			// Clear Analytics
			s.eVar67=""
		}
		var cookieExpiry=new Date()
		cookieExpiry.setTime(cookieExpiry.getTime() + 604800000)		
		s.c_w("s_ev67_prev", _ev67, cookieExpiry)
		if (s.eVar67!="")
		{
			s.linkTrackVars=s.apl(s.linkTrackVars,"eVar67",",",1)
		}
	}
	if (s.eVar68 && s.eVar68!="")
	{
		s.linkTrackVars=s.apl(s.linkTrackVars,"eVar68",",",1)
	}
	/* End of Chat ************************************************************/
	
	s.clickPast(s.campaign,'event9','event10');
	
	/*internal campaigns*/
	s.eVar2=s.getQueryParam('intcmp');
	
	/*email campaigns*/
	s.eVar47=s.getQueryParam('emid'); 

	/*rich relevance*/
	s.eVar8=s.getQueryParam('intcmpid');
	
	/*percent viewed */
	var ppvArray = s.getPercentPageViewed(s.pageName);
	s.prop18 = ppvArray[0] //contains the previous page name
	s.prop19 = ppvArray[1] //contains the total percent viewed

	//search tracking
	//search results e.g. http://www.currys.co.uk/gbuk/r/red tv/0_0_0/
	if(String(s.c_r('s_intcmp')).length>0){
		s.eVar2=s.c_r('s_intcmp');
		s.c_w('s_intcmp','',0);
	}
	

	/* Site Search */
	if(s.eVar10){
		s.prop21=s.eVar10=s.eVar10.toLowerCase();
	}

	/* Automate Finding Method eVar if not set*/
if(s.campaign&&!s.eVar3)
s.eVar3='external campaign';
if(s.eVar10&&!s.eVar3)
s.eVar3='internal search';
if(s.eVar2&&!s.eVar3)
s.eVar3='internal campaign';
if(s.eVar8&&!s.eVar3)
s.eVar3='rich relevance';
	
	/*visitor ID from cookie*/
	s.prop49="D=s_vi";
	
	/*TnT integration*/
	s.tnt = s.trackTNT();
	
	/*clickmap support*/
//	s.setupDynamicObjectIDs();

	/* track browser width into a prop */
	s.prop22 = document.documentElement.clientWidth;
	
	}
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */
/* DynamicObjectIDs config */
function s_getObjectID(o) {
	/* TODO: Add code to identify whether an objectID should be created,
	 *       parse the URLs and return objectID. If no objectID should
	 *       be created, return ''.
	 */
	var ID=o.href;
	return ID;
}
s.getObjectID=s_getObjectID
s.clickPast=function(scp,ct_ev,cp_ev,cpc)
{
	var s = this,scp,ct_ev,cp_ev,cpc,ev,tct; 
	if (s.p_fo(ct_ev) == 1) {             
    if(!cpc){cpc='s_cpc';}                
  	ev = s.events ? s.events + ',': '';   
  	if (scp) {                            
  	 s.events = ev + ct_ev;               
  	 s.c_w(cpc, 1, 0);                    
  	}else{                                
  	 if (s.c_r(cpc) >= 1) {               
  	   s.events = ev + cp_ev;             
       s.c_w(cpc, 0, 0);                  
  	 }
  	}
	}
}

/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");

/*
 *	Plug-in: crossVisitParticipation v1.7 - stacks values from
 *	specified variable in cookie and returns value
 */
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");
/*
 * Plugin: getValOnce 0.3 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,v=v?v:'',k=s.c_r(c),a=new Date,e=e?e:0;if(v){a.setTime(a"
+".getTime()+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
/*
 * channelManager v2.84 - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","d","e","f","g",""
+"var s=this,h=new Date,i=0,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E"
+",F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T;h.setTime(h.getTime()+1800000);if(e)"
+"{i=1;if(s.c_r(e))i=0;if(!s.c_w(e,1,h))s.c_w(e,1,0);if(!s.c_r(e))i=0"
+";if(f&&s.c_r('s_tbm'+f))i=0;}j=s.referrer?s.referrer:document.refer"
+"rer;j=unescape(j.toLowerCase());if(!j)k=1;else {l=j.indexOf('?')>-1"
+"?j.indexOf('?'):j.length;m=j.substring(0,l);n=s.split(j,'/');n=s.sp"
+"lit(n[2],'?');o=n[0].toLowerCase();p=s.linkInternalFilters.toLowerC"
+"ase();p=s.split(p,',');for(q=0;q<p.length;q++){r=o.indexOf(p[q])==-"
+"1?'':j;if(r)break;}}if(!r&&!k){t=j;u=v=o;w='Other Natural Referrers"
+"';x=s.seList+'>'+s._extraSearchEngines;if(d==1){m=s.repl(m,'oogle',"
+"'%');m=s.repl(m,'ahoo','^');j=s.repl(j,'as_q','*');}y=s.split(x,'>'"
+");for(z=0;z<y.length;z++){A=y[z];A=s.split(A,'|');B=s.split(A[0],',"
+"');for(C=0;C<B.length;C++){D=m.indexOf(B[C]);if(D>-1){if(A[2])E=v=A"
+"[2];else E=o;if(d==1){E=s.repl(E,'#',' - ');j=s.repl(j,'*','as_q');"
+"E=s.repl(E,'^','ahoo');E=s.repl(E,'%','oogle');}F=s.split(A[1],',')"
+";for(G=0;G<F.length;G++){if(j.indexOf(F[G]+'=')>-1||j.indexOf('http"
+"s://www.google.')==0)H=1;I=s.getQueryParam(F[G],'',j).toLowerCase()"
+";if(H||I)break;}}if(H||I)break;}if(H||I)break;}}if(!r||g!='1'){J=s."
+"split(a,',');K=0;while(!T&&K<J.length){T=s.getQueryParam(J[K],b);K+"
+"+;}if(T){v=T;if(E)w='Paid Search';else w='Unknown Paid Channel';}if"
+"(!T&&E&&H){v=E;w='Natural Search';}}if(i&&(k||r)&&!T)t=u=v=w='Typed"
+"/Bookmarked';J=s._channelDomain;if(J&&o&&!r){K=s.split(J,'>');for(L"
+"=0;L<K.length;L++){M=s.split(K[L],'|');N=s.split(M[1],',');O=N.leng"
+"th;for(P=0;P<O;P++){Q=N[P].toLowerCase();R=o.indexOf(Q);if(R>-1){w="
+"M[0];break;}}if(R>-1)break;}}J=s._channelParameter;if(J){K=s.split("
+"J,'>');for(L=0;L<K.length;L++){M=s.split(K[L],'|');N=s.split(M[1],'"
+",');O=N.length;for(P=0;P<O;P++){R=s.getQueryParam(N[P]);if(R){w=M[0"
+"];break;}}if(R)break;}}J=s._channelPattern;if(J){K=s.split(J,'>');f"
+"or(L=0;L<K.length;L++){M=s.split(K[L],'|');N=s.split(M[1],',');O=N."
+"length;for(P=0;P<O;P++){Q=N[P].toLowerCase();R=T.toLowerCase();S=R."
+"indexOf(Q);if(S==0){w=M[0];break;}}if(S==0)break;}}S=w?T+u+w+I:'';c"
+"=c?c:'c_m';if(c!='0')S=s.getValOnce(S,c,0);if(S){s._campaignID=T?T:"
+"'n/a';s._referrer=t?t:'n/a';s._referringDomain=u?u:'n/a';s._campaig"
+"n=v?v:'n/a';s._channel=w?w:'n/a';s._partner=E?E:'n/a';s._keywords=H"
+"?I?I:'Keyword Unavailable':'n/a';if(f&&w!='Typed/Bookmarked'){h.set"
+"Time(h.getTime()+f*86400000);s.c_w('s_tbm'+f,1,h);}}else s._campaig"
+"nID=s._referrer=s._referringDomain=s._campaign=s._channel=s._partne"
+"r=s._keywords='';");
/* Top 130 - Grouped */
s.seList="google.,googlesyndication.com,.googleadservices.com|q,as_q|"
+"Google>yahoo.com,yahoo.co.jp|p,va|Yahoo!>bing.com|q|Bing>altavista."
+"co,altavista.de|q,r|AltaVista>.aol.,suche.aolsvc.de|q,query|AOL>ask"
+".jp,ask.co|q,ask|Ask>www.baidu.com|wd|Baidu>daum.net,search.daum.ne"
+"t|q|Daum>icqit.com|q|icq>myway.com|searchfor|MyWay.com>naver.com,se"
+"arch.naver.com|query|Naver>netscape.com|query,search|Netscape Searc"
+"h>reference.com|q|Reference.com>seznam|w|Seznam.cz>abcsok.no|q|Star"
+"tsiden>tiscali.it,www.tiscali.co.uk|key,query|Tiscali>virgilio.it|q"
+"s|Virgilio>yandex|text|Yandex.ru>search.cnn.com|query|CNN Web Searc"
+"h>search.earthlink.net|q|Earthlink Search>search.comcast.net|q|Comc"
+"ast Search>search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum"
+" Search";
/*
 * s.join: 1.0 - s.join(v,p)*/
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");
/*
 * Plugin clickThruQuality v1.0
 */
s.clickThruQuality =new Function("scp","tcth_ev","cp_ev","cff_ev","cf_th",""
+"var s=this;if(s.p_fo('clickThruQuality')==1){var ev=s.events?s.even"
+"ts+',':'';if(s.getQueryParam&&s.getQueryParam(scp)){s.events=ev+tct"
+"h_ev;if(s.c_r('cf')){var tct=parseInt(s.c_r('cf'))+1;s.c_w('cf',tct"
+",0);if(tct==cf_th&&cff_ev){s.events=s.events+','+cff_ev;}}else {s.c"
+"_w('cf',1,0);}}else {if(s.c_r('cf')>=1){s.c_w('cf',0,0);s.events=ev"
+"+cp_ev;}}}");
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");
/*
* TNT Integration Plugin v1.0
*/
s.trackTNT =new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");
/*
 * Utility: inList v1.0 - find out if a value is in a list
 */ 
s.inList=new Function("v","l","d",""
+"var s=this,ar=Array(),i=0,d=(d)?d:',';if(typeof(l)=='string'){if(s."
+"split)ar=s.split(l,d);else if(l.split)ar=l.split(d);else return-1}e"
+"lse ar=l;while(i<ar.length){if(v==ar[i])return true;i++}return fals"
+"e;"); 
/*
 *	Plug-in: manageQueryParam v1.2 - Manages query string parameters
 *	by either encoding, swapping, or both encoding and swapping a value. 
 */       
s.manageQueryParam=new Function("p","w","e","u",""
+"var s=this,x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.lo"
+"cation);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1"
+"?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf("
+"'?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring"
+"(x+1,y);b=qs.substring(y+1,qs.length);}else{qp=qs.substring(1,qs.le"
+"ngth);b='';}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1"
+",x);b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.su"
+"bstring(0,y);b=b.substring(y,b.length);}else{qp=b;b='';}}}if(e&&qp)"
+"{y=qp.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';var eui=0"
+";while(qv.indexOf('%25')>-1){qv=unescape(qv);eui++;if(eui==10)break"
+";}qv=s.rep(qv,'+',' ');qv=escape(qv);qv=s.rep(qv,'%25','%');qv=s.re"
+"p(qv,'%7C','|');qv=s.rep(qv,'%7c','|');qp=qp.substring(0,y+1)+qv;}i"
+"f(w&&qp){if(f)qs='?'+qp+'&'+f+b;else if(b)qs='?'+qp+'&'+b;else qs='"
+"?'+qp}else if(f)qs='?'+f+'&'+qp+b;else if(b)qs='?'+qp+'&'+b;else if"
+"(qp)qs='?'+qp;return u+qs;");	
/*
 * Plugin: getTimeParting 3.2 
 */
s.getTimeParting=new Function("h","z",""
+"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+"h()!=0){return'Data Not Available';}else{var H,M,D,W,U,ds,de,tm,tt,"
+"da=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Sa"
+"turday'],d=new Date(),a=[];z=z?z:0;z=parseFloat(z);if(s._tpDST){var"
+" dso=s._tpDST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d."
+"getFullYear());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d"
+">ds&&d<de){z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime"
+"()+(d.getTimezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getH"
+"ours();M=d.getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();D=da[D];U='AM"
+"';W='Weekday';if(H>=12){U='PM';H=H-12;}if(H==0){H=12;}if(D==6||D==0"
+"){W='weekend';}tm=H+':'+M+U;tt=H+':'+((M>30)?'30':'00')+U;a=[tm,tt,"
+"D,W];return a;}");
/*
 * DynamicObjectIDs v1.3: Setup Dynamic Object IDs based on URL
 */
s.setupDynamicObjectIDs=new Function(""
+"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+"re=1}");
s.setOIDs=new Function("e",""
+"var s=s_c_il["+s._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','').substr"
+"ing(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';if(c.indexOf('.t(')>="
+"0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0)x='var x=\".tl(\";';"
+"x+='s_objectID=\"'+u+'_'+a[u]+'\";return this.s_oc?this.s_oc(e):tru"
+"e';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o]=new Function('e',x)"
+"}}}s.wd.s_semaphore=0;return true");
/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/*
 * Plugin: getPercentPageViewed v1.5
 */
s.handlePPVevents=new Function("",""
+"var s=s_c_il["+s._in+"];if(!s.getPPVid)return;var dh=Math.max(Math."
+"max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.ma"
+"x(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max("
+"s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.i"
+"nnerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeigh"
+"t),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s"
+".wd.document.body.scrollTop),vh=st+vph,pv=Math.min(Math.round(vh/dh"
+"*100),100),c=s.c_r('s_ppv'),a=(c.indexOf(',')>-1)?c.split(',',4):[]"
+",id=(a.length>0)?(a[0]):escape(s.getPPVid),cv=(a.length>1)?parseInt"
+"(a[1]):(0),p0=(a.length>2)?parseInt(a[2]):(pv),cy=(a.length>3)?pars"
+"eInt(a[3]):(0),cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy"
+")?vh:cy)):'';s.c_w('s_ppv',cn);");
s.getPercentPageViewed=new Function("pid",""
+"pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.l"
+"inkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'"
+"),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i="
+"3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape("
+"a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid"
+"=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('"
+"s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventL"
+"istener('load',s.handlePPVevents,false);s.wd.addEventListener('scro"
+"ll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handl"
+"ePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onlo"
+"ad',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevent"
+"s);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-'"
+")?(a):(a[1]);");
/*
 * Plugin findEvent v0.1 - Search events list for one of a number of events.
                           Call callback if found. Bespoke to DSGi
 */
s.findEvent = function (x, y, z)
{
	if (typeof x != "string" || typeof y != "function") return false
	z = z || true
	var a,b,c,a1,b1,c1
	var eel=s.split(x,",")
	var el=s.split(s.events,',')
	for (var eeli=0,eell=eel.length;eeli<eell;eeli++)
	{
		a=eel[eeli]+',';b=eel[eeli]+':';c=eel[eeli]+'=';
		for (var eli=0,ell=el.length;eli<ell;eli++)
		{
			a1=el[eli]+',';b1=el[eli]+':';c1=el[eli]+'=';
			if (a1.indexOf(a)>-1||b1.indexOf(b)>-1||c1.indexOf(c)>-1)
			{
				y(a1)
				if (z) eeli=1000;
				break
			}
		}
	}
}
/*twitterSocialPlugins v1.0*/
s.twitterSocialPlugins=new Function("a","b","c","d","e","f",""
+"var s=this;s.twICount++;if(s.twICount>=5){clearInterval(twttrInterv"
+"al);}if(typeof(twttr)!='undefined'){clearInterval(twttrInterval);fu"
+"nction re(a,b){a=s.split(a,'>'),twttr.events.bind(b,function(){trac"
+"k(a[0],a[1]);});}if(b){re(b,'click');}if(c){re(c,'tweet');}if(d){re"
+"(d,'retweet');}if(e){re(e,'favorite');}if(f){re(f,'follow');}}funct"
+"ion track(m,n){s.ltVT=s.linkTrackVars;s.ltET=s.linkTrackEvents;s.et"
+"E=s.events;s.linkTrackVars=a?(a+',events'):'events';s.linkTrackEven"
+"ts=n;s.events=n;if(a){s[a]=m;}s.tl(this,'o',m);s.linkTrackVars=s.lt"
+"VT;s.linkTrackEvents=s.ltET;s.events=s.etE;}");
s.twICount = 0; 
var twttrInterval = setInterval( function() { s.twitterSocialPlugins('eVar43','','twitter:tweet>event36','','',''); }, 1000);
/*facebookSocialPlugins v1.1*/
s.facebookSocialPlugins=new Function("a","b","c","d","e","f","g","h",""
+"var s=this;s.fbICount++;if(s.fbICount>=5){clearInterval(socialInter"
+"val);}if(typeof(FB)!='undefined'){clearInterval(socialInterval);fun"
+"ction re(a,b){a=s.split(a,'>'),FB.Event.subscribe(b,function(){trac"
+"k(a[0],a[1]);});}if(b){re(b,'edge.create');}if(c){re(c,'edge.remove"
+"');}if(d){re(d,'comment.create');}if(e){re(e,'comment.remove');}if("
+"f){re(f,'auth.login');}if(g){re(g,'auth.logout');}if(h){re(h,'messa"
+"ge.send');}}function track(m,n){s.ltVT=s.linkTrackVars;s.ltET=s.lin"
+"kTrackEvents;s.etE=s.events;s.linkTrackVars=a?(a+',events'):'events"
+"';s.linkTrackEvents=n;s.events=n;if(a){s[a]=m;}s.tl(this,'o',m);con"
+"sole.log(m);s.linkTrackVars=s.ltVT;s.linkTrackEvents=s.ltET;s.event"
+"s=s.etE;}");
s.fbICount = 0; 
var socialInterval = setInterval( function() { s.facebookSocialPlugins('eVar43','fb:like>event38','','','','','',''); }, 1000);
/*
 *  Plug-in: HTML5Storage v0.13 - store data in session/localStorage
 *           instead of cookies; fall back to cookies if browser
 *           does not support it
 */
if(typeof(Storage)!=="undefined"){var storageOk = false;try{var TEST_VALUE = "TEST";
  var	v = { 'expiry': (new Date()).getTime() + 10000000, 'value': TEST_VALUE };v = JSON.stringify(v);
  localStorage.setItem(TEST_VALUE,v);localStorage.getItem(TEST_VALUE);v = JSON.parse(v);
  storageOk = v.value==TEST_VALUE;localStorage.removeItem(TEST_VALUE);}catch (exc) {}	if (storageOk)
{s.c_rr=s.c_r;s.c_ww=s.c_w;if(s._forceCookies)
{if(s.inList("s_cc",s._forceCookies)){s.apl(s._forceCookies,"s_cc");}
  if(s.inList("s_sq",s._forceCookies)){s.apl(s._forceCookies,"s_sq");}}
else{s._forceCookies="s_cc,s_sq";}
  function c_r(k){var s=this,d=new Date(),v;if(s.cookieLifetime=="NONE"){return "";}
    v=s.c_rr(k);if(v){return v;}k=s.ape(k);v=sessionStorage.getItem(k);if(v){return v;}
    v=localStorage.getItem(k);if(v){v=JSON.parse(v);if(v.expiry<d.getTime())
    {localStorage.removeItem(k);return "";}return v.value;}return "";}
  function c_w(k,v,e){var s=this,d=new Date();if(s.inList(k,s._forceCookies)){s.c_ww(k,v,e);return;}
    d.setTime(d.getTime()-60000);if(s.c_rr(k)){s.c_ww(k,'',d);}
    localStorage.removeItem(k);sessionStorage.removeItem(k);if(s.cookieLifetime!="NONE"&&v)
    {k=s.ape(k);d=new Date();if(e&&s.cookieLifetime!="SESSION"){var ex=new Date(e.getTime());
      if(!isNaN(s.cookieLifetime)&&(ex.getTime()>d.getTime()+s.cookieLifetime*1000))
      {ex.setTime(d.getTime()+s.cookieLifetime*1000);}
      if(ex>d){v={'expiry':ex.getTime(),'value':v};v=JSON.stringify(v);localStorage.setItem(k,v);}}
    else{sessionStorage.setItem(k,v);}}}
  s.c_r=c_r;s.c_w=c_w;}}

/*
 * Plugin summariseCVP v0.0.1 - Summarise repeated channels in CVP stack
 */
 /*
    a = Stack string taken from output of crossVisitPartication plugin.
	b = [optional] Delimeter.  Default value >
*/
/*********************************************************************/
s.summariseCVP = function (a, b)
{
	var output = ""
	if (typeof a==="string" && a!="")
	{
		var delimeter = b || ">"
		var stack = a.split(delimeter)
		var count = -1
		var prevVal = ""
		var curVal = ""
		for (var i=0,j=stack.length;i<j;i++)
		{
			count++
			currVal = stack[i]
			if (currVal!=prevVal && prevVal!="")
			{
				output += prevVal
				if (count>1)
				{
					output += " x " + count
				}
				output += delimeter
				count = 0
				prevVal=""
			}
			prevVal=currVal
		}
		output += prevVal
		if (count>0)
			output += " x " + (count+1)
	}
	return output
}
/*
 * Plugin: linkHandler 0.8 - identify and report custom links
 */
s.linkHandler=new Function("p","t","e",""
+"var s=this,o=s.p_gh(),h=o.href,i,l;t=t?t:'o';if(!h||(s.linkType&&(h"
+"||s.linkName)))return'';i=h.indexOf('?');h=s.linkLeaveQueryString||"
+"i<0?h:h.substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s"
+".linkName=l=='[['?'':l;s.linkType=t;return e?o:h;}return'';");
s.p_gh=new Function("",""
+"var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o"
+"),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o"
+"=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot"
+"(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");
s.p_gn=new Function("t","h",""
+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+"return 0;");

/*TestandTargetintegration*/
if(typeof(mboxLoadSCPlugin) == "function")
    mboxLoadSCPlugin(s);


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="dixonsretail"
s.trackingServer="dixonsretail.d3.sc.omtrdc.net"

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\"
+"\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return "
+"y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;retur"
+"n 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent(x)"
+";for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.subs"
+"tring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+',"
+"'%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+"
+"x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescap"
+"e(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z"
+"+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,"
+"2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f"
+");return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibi"
+"litychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while("
+"s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s"
+".sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.link"
+"Type=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,"
+"n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.'"
+",'c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?"
+"c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60)"
+";if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');"
+"return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l"
+"[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf="
+"new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.w"
+"d,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;r"
+"eturn true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s."
+"tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for("
+"n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingS"
+"erverBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLower"
+"Case();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.versio"
+"n+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!"
+"s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r"
+";return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[im"
+"n];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s."
+"nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s"
+"_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.g"
+"etTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v"
+"]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l="
+"0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='http"
+"s://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',"
+"p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c"
+";else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData"
+"\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nf"
+"n=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk"
+"=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLig"
+"htData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp"
+"=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return q"
+"s};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe="
+"s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if("
+"fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||"
+"fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';el"
+"se if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='pageURL')"
+"{q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigration"
+"Key')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}e"
+"lse if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='coo"
+"kieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='r"
+"esolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='bro"
+"wserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';"
+"else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q="
+"'mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k]"
+",fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'"
+"?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0"
+",qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h"
+"){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h"
+"))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';"
+"return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.di"
+"spatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s."
+"_in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForc"
+"edLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target"
+";while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0"
+";t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}c"
+"atch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,"
+"e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePr"
+"opagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||("
+"j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!"
+"='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():"
+"'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;i"
+"f(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",'')"
+",\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o."
+"s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>"
+"=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);"
+"return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){va"
+"r s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if("
+"x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+="
+"(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s"
+".d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s."
+"apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n"
+".userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s"
+".wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n)"
+"{if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&"
+"&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i"
+";s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un"
+".substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,"
+"a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._i"
+"l;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}e"
+"lse if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g"
+"=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'"
+"+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=f"
+"unction(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m["
+"t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s"
+".m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h"
+"?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){i"
+"f(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\""
+"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c',"
+"'i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChi"
+"ld(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.l"
+"ength&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k"
+"==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+"
+"k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}el"
+"se f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime"
+"();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketing"
+"CloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackC"
+"heck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsV"
+"isitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._aud"
+"ienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s."
+"_callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.a"
+"udienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.vis"
+"itor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s.marketingCloudVisitorID = visit"
+"or.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (!s.marketingCloudVisitorID) {s._waitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.an"
+"alyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (!s.analyticsVisitorID) {s._waitingForAnalyticsVisi"
+"torID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s.audienceManagerLocationHint = visitor.getAudienceM"
+"anagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (!s.audienceManagerLocationHint) {s._waitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s."
+"audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (!s.audienceManagerBlob) {s._waitingForAudie"
+"nceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)     "
+"     && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceM"
+"anagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._"
+"callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo."
+"callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWh"
+"enReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReady"
+"ToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._"
+"callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();cal"
+"lbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = "
+"null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}se"
+"tVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this"
+",d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math."
+"random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTr"
+"ack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+"
+"'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if ((!s.supplement"
+"alDataID) && (s.visitor) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}if(s.m"
+"pc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,"
+"o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.isma"
+"c&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j"
+"='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.ja"
+"vaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>="
+"5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\""
+"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)"
+"while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s."
+"browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if("
+"s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');"
+"if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot"
+"(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);"
+"i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');"
+"s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttrib"
+"ute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.index"
+"Of('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'"
+"||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc"
+"){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')"
+"+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?q"
+"s:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.pageURLRest=s."
+"lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){"
+"var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s."
+"setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t."
+"lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!="
+"'function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f"
+"].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElements"
+"ByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.in"
+"dexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.ap"
+"v=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);"
+"s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='suppleme"
+"ntalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServer"
+"Secure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,"
+"deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,"
+"lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,linkName,linkType';var n;for(n=1;n"
+"<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resol"
+"ution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackin"
+"gServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMa"
+"tch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTra"
+"ckVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function("
+"un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
