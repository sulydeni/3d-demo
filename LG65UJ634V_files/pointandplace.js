if(location.href.search('flix-qa')!=-1)
    window.log2=function(){log2.history=log2.history||[];log2.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments));}};
else
    window.log2=function(){};
if(location.href.search('flix-3qa')!=-1){
    window.log3=function(){log3.history=log3.history||[];log3.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments));}};

}else{
    window.log3=function(){};
}

var flixdomain='';
    //flixdomain = "//media.flixcar.com/delivery/static/pap/";
    flixdomain = "//d2m3ikv8mpgiy8.cloudfront.net/";
if( location.href.search('live=0')!=-1 ) 
    flixdomain = "//dev-delivery.flix360.com/delivery/static/pap/";

if (location.href.search('flix-local') != -1 ) 
    flixdomain = "//localhost/delivery_flix360/trunk/public/static/pap/";

//default js
var arurl = '';
var initPAP= function () {

    if(document.querySelector('script[data-eky-distributor]')){ 

        var loaderscript=document.querySelector('script[data-eky-distributor]')   
        var data_distributor=loaderscript.getAttribute('data-eky-distributor');
        var distid=loaderscript.getAttribute('data-eky-distributor');
        var data_language=loaderscript.getAttribute('data-eky-language')
        var data_mpn=loaderscript.getAttribute('data-eky-mpn')
        var data_ean=loaderscript.getAttribute('data-eky-ean')
        var data_sku=loaderscript.getAttribute('data-eky-sku')
        var data_brand=loaderscript.getAttribute('data-eky-brand')
        var data_pap=loaderscript.getAttribute('data-eky-pap')
        if(localStorage.kxdixons_kuid)
        var uuid=(localStorage.kxdixons_kuid) ? localStorage.kxdixons_kuid : "";
        
    }else if(document.querySelector('script[data-flix-inpage]')){
        var loaderscript=document.querySelector('script[data-flix-inpage]') 
        var data_distributor='retailers'//loaderscript.getAttribute('data-flix-distributor');
        var distid=loaderscript.getAttribute('data-flix-distributor');
        var data_language=loaderscript.getAttribute('data-flix-language')
        var data_pap=window.data_pap;
        var papstyle=window.papstyle;
        var prepend=window.prepend;
        if(FlixjQ('[id^=inpage-data]').length)
            var productid=FlixjQ('[id^=inpage-data]').attr('id').replace('inpage-data-','');
        if(FlixjQ('.main_mot_product_wrapper').length)
            var productid=FlixjQ('.main_mot_product_wrapper').attr('alt');
    
        if(typeof papbanner!='undefined'){
            log2('create banner');
        }
    }

    //mot
       
    //load script
    loadflixfiles = function (e, t) {    
        if (-1 != e.search(".js") && 0 === FlixjQ("script[src='" + e + "']").length) {
            var c = document.createElement("script");
            c.type = "text/javascript", c.src = e, c.onload = t, document.head.appendChild(c);
        }
        if (-1 != e.search(".css") && 0 === FlixjQ("link[href='" + e + "']").length) {
            var n = document.createElement("link");
            n.rel = "stylesheet", n.href = e, n.type = "text/css", n.onload = t, document.head.appendChild(n);
        }
    }
    if (location.href.search('flix-local') != -1 ){  
        loadflixfiles(flixdomain + "css/main-ek.css");        
    }else{        
        loadflixfiles(flixdomain + "css/main-ek.min.css");        
    }
    log2('initPAP')
    log2(flixdomain)
    log2('distributor'+data_distributor)
    var url;   
    if(document.querySelector('script[data-eky-distributor]')){ 
        url=flixdomain+'json/'+data_distributor+'.json';
    }else{
        url=flixdomain+'json/eyekandy.json';
    }
    
    FlixjQ.ajax({
        type: 'GET',
        url: url,
        async: true,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType:'jsonp',
        error:function (){
        },
        success: function(data) {
            log2('init PnP-data')
        var pnplogo='';
        var headertext='';
        var maintext='';        
        var papposition='';
        
        var barcode='';

        pnplogo=data.defaults[0].pnplogo;
        pnplogohover=data.defaults[0].pnplogohover;
        maintext=data.defaults[0].maintext;
        headertext=data.defaults[0].headertext;
        
        
        if(data[data_distributor][0].pnplogo && data[data_distributor][0].pnplogo.length)
            pnplogo=data[data_distributor][0].pnplogo;
        if(data[data_distributor][0].pnplogo && data[data_distributor][0].pnplogo.length)
            pnplogohover=data[data_distributor][0].pnplogohover;
        if(data[data_distributor][0].maintext && data[data_distributor][0].maintext.length)
            maintext=data[data_distributor][0].maintext;
        if(data[data_distributor][0].headertext && data[data_distributor][0].headertext.length)
            headertext=data[data_distributor][0].headertext;
        

        if(location.href.search('data_mpn')!=-1)
            data_mpn=flixGetUrlParameter('data_mpn')        
        
        if(data[data_distributor][0].papposition)
            papposition=data[data_distributor][0].papposition;
        if(data[data_distributor][0].papstyle)
            papstyle=data[data_distributor][0].papstyle; 
        if(data[data_distributor][0].prepend)
            prepend=data[data_distributor][0].prepend; 
        
        FlixjQ.each(data[data_distributor], function(index, element) {
            log2('PAP retailers-'+ data_mpn+'-'+element.mpn+'-'+ data_ean+'-'+element.ean+'-'+ data_sku+'-'+element.sku+'-'+ productid+'-'+element.productid)
            if((data_mpn && data_mpn==element.mpn) || (data_ean && data_ean==element.ean) || (data_sku && data_sku==element.sku)|| (productid && productid==element.productid)){
                
                if (location.href.search('flix-papposition') != -1){
                    papposition=getUrlParameter('flix-papposition')
                } 
                
                if(data_pap.length)
                    papposition=data_pap; 

                if(data_pap.length && data_pap=='eky-pap')
                    papposition='#'+data_pap;                    
                
                if(element.barcodeurl)
                    barcode =flixdomain+'images/barcodes/'+element.barcodeurl;
                
                var proto=encodeURIComponent(window.location.protocol+'//')
                var host= encodeURIComponent(window.location.hostname)
                var path=encodeURIComponent(window.location.pathname.substr(1))

                var para=encodeURIComponent(window.location.href.split('?')[1])

                var referrer=proto+host+'/'+path+'%3F'//+para;
                var retailerid='%26retailer='+distid

                arurl =element.arurl; 
                //NOTE: dont change the & encoding below
                arurl=arurl+ '&product_page='+referrer+retailerid

                log2('arurl='+arurl); 

                var pplogo='<div id="flix_pnpcontainer" class="'+data_distributor+'" style="'+papstyle+'"><div class="flix-pap ">';
                    if(data_distributor=='a8934900-3812-11e8-b467-0ed5f89f718b'){
                        pplogo+='<a href="'+arurl+'"><button class="pap-button" >    <span class="dc-button-icon">        <span class="pap-button-icon pap-logosvg">            <svg version="1.1" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"     x="0px" y="0px" viewBox="0 0 55.4 23.7" xml:space="preserve"><g>    <path fill="none" d="M50.3,4.2c0.4-0.3,0.7-0.6,0.9-0.8c0.3-0.3,0.4-0.7,0.4-1c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.5-0.3-0.8-0.3        c-0.5,0-0.9,0.2-1.1,0.5c-0.1,0.2-0.2,0.4-0.2,0.6c0,0.3,0.1,0.5,0.2,0.8C49.6,3.5,49.9,3.8,50.3,4.2z"/>     <path fill="none" d="M16.6,8.2c0.5-0.9,0.8-1.9,0.8-3c0-1.2-0.3-2.2-0.9-2.9S15,1.2,13.9,1.2c-1.1,0-1.9,0.4-2.6,1.1s-1,1.8-1,3.2        c0,1.1,0.3,2.1,0.9,2.8c0.6,0.8,1.5,1.2,2.8,1.2C15.2,9.5,16.1,9.1,16.6,8.2z"/>    <path fill="none" d="M48.5,6.6c-0.3,0.3-0.5,0.8-0.5,1.3c0,0.5,0.2,1,0.6,1.2c0.4,0.3,0.8,0.4,1.3,0.4c0.5,0,1-0.1,1.3-0.4        c0.4-0.2,0.7-0.5,0.9-0.8l-2.3-2.8C49.2,6.1,48.7,6.4,48.5,6.6z"/>    <polygon class="hoverwhite" fill="#5c1d58" points="38.8,10.4 38.8,1.5 42.3,1.5 42.3,0.3 34,0.3 34,1.5 37.4,1.5 37.4,10.4  "/>    <polygon class="hoverwhite" fill="#5c1d58" points="31.1,10.4 32.6,10.4 32.6,0.3 31.3,0.3 31.3,8.5 26.1,0.3 24.5,0.3 24.5,10.4 25.8,10.4 25.8,2.2          "/>    <path class="hoverwhite" fill="#5c1d58" d="M53.9,7.5c0.2-0.6,0.4-1.2,0.5-1.9h-1.2c-0.1,0.3-0.1,0.6-0.2,0.8s-0.1,0.5-0.3,0.8L50.9,5        c0.6-0.4,1-0.7,1.2-1c0.4-0.5,0.6-1.1,0.6-1.7c0-0.6-0.2-1-0.6-1.4s-1-0.6-1.7-0.6c-0.7,0-1.3,0.2-1.8,0.6S48,1.9,48,2.6        c0,0.3,0.1,0.6,0.2,1c0.1,0.3,0.4,0.8,0.9,1.2c-0.8,0.5-1.3,0.9-1.6,1.2c-0.5,0.5-0.7,1.2-0.7,1.9c0,0.7,0.2,1.4,0.7,1.9        c0.5,0.6,1.3,0.9,2.3,0.9c0.7,0,1.4-0.2,1.9-0.5c0.3-0.2,0.7-0.5,1-0.9l1,1.2h1.6l-1.8-2.2C53.6,8.2,53.7,8,53.9,7.5z M49.4,1.8        c0.2-0.3,0.6-0.5,1.1-0.5c0.3,0,0.6,0.1,0.8,0.3c0.2,0.2,0.3,0.5,0.3,0.8c0,0.4-0.1,0.7-0.4,1c-0.2,0.2-0.5,0.4-0.9,0.8        c-0.4-0.4-0.6-0.7-0.8-1c-0.2-0.3-0.2-0.5-0.2-0.8C49.2,2.2,49.3,2,49.4,1.8z M51.3,9.2c-0.4,0.2-0.8,0.4-1.3,0.4        c-0.5,0-0.9-0.1-1.3-0.4c-0.4-0.3-0.6-0.7-0.6-1.2c0-0.5,0.2-0.9,0.5-1.3c0.2-0.2,0.6-0.6,1.3-1l2.3,2.8C51.9,8.7,51.6,9,51.3,9.2z        "/>    <rect x="20.8" y="0.3" class="hoverwhite" fill="#5c1d58" width="1.4" height="10.1"/>    <path class="hoverwhite" fill="#5c1d58" d="M17.7,8.9c0.8-1,1.2-2.3,1.2-3.8c0-1.4-0.3-2.5-1-3.4C17,0.6,15.6,0,13.8,0c-1.7,0-3,0.6-3.9,1.9        c-0.7,1-1,2.1-1,3.5c0,1.5,0.4,2.8,1.2,3.8c0.9,1,2.1,1.5,3.7,1.5C15.5,10.7,16.8,10.1,17.7,8.9z M11.2,8.3        c-0.6-0.8-0.9-1.7-0.9-2.8c0-1.4,0.3-2.5,1-3.2s1.5-1.1,2.6-1.1c1.1,0,2,0.4,2.6,1.1s0.9,1.7,0.9,2.9c0,1.1-0.3,2.1-0.8,3        c-0.5,0.9-1.4,1.3-2.7,1.3C12.7,9.5,11.7,9.1,11.2,8.3z"/>    <path class="hoverwhite" fill="#5c1d58" d="M4.6,6.1c1,0,1.8-0.3,2.3-0.9C7.4,4.7,7.7,4,7.7,3.2c0-0.9-0.3-1.6-0.8-2.1C6.3,0.5,5.5,0.3,4.6,0.3H0v10.1        h1.4V6.1H4.6z M1.4,1.5h2.8c0.5,0,1,0.1,1.3,0.2C6,1.9,6.3,2.4,6.3,3.2c0,0.7-0.2,1.1-0.6,1.4S4.8,5,4.2,5H1.4V1.5z"/></g><g>    <polygon class="hoverwhite" fill="#5c1d58" points="51.5,15.3 51.5,13 52.3,13 52.3,12.7 50.2,12.7 50.2,13 51.1,13 51.1,15.3    "/>    <path class="hoverwhite" fill="#5c1d58" d="M53.9,14.9l-0.7-2.2h-0.5v2.6H53v-1.5c0-0.1,0-0.2,0-0.3c0-0.1,0-0.2,0-0.3v-0.1l0.7,2.2h0.3l0.7-2.2        c0,0.1,0,0.3,0,0.4c0,0.1,0,0.2,0,0.3v1.5h0.3v-2.6h-0.5L53.9,14.9z"/></g><g>    <path fill="none" d="M5.5,17.4C5.8,17.2,6,16.8,6,16.2S5.8,15.3,5.5,15s-0.7-0.4-1.2-0.4H2.2v3.1h2.1C4.8,17.8,5.2,17.7,5.5,17.4z"        />        <path class="hoverwhite" fill="#5c1d58" d="M4.5,19.6c1.2,0,2.1-0.3,2.7-0.8c0.6-0.5,1-1.4,1-2.7c0-1.1-0.3-2-1-2.5c-0.6-0.5-1.5-0.8-2.6-0.8H0v10.6        h2.2v-3.8H4.5z M2.2,14.7h2.1c0.5,0,0.9,0.1,1.2,0.4S6,15.7,6,16.2s-0.1,1-0.4,1.2c-0.3,0.3-0.7,0.4-1.2,0.4H2.2V14.7z"/>    <polygon class="hoverwhite" fill="#5c1d58" points="9.9,12.8 9.9,23.4 17.4,23.4 17.4,21.5 12.1,21.5 12.1,12.8  "/>    <path class="hoverwhite" fill="#5c1d58" d="M34.1,14.5c0.8,0,1.4,0.2,1.8,0.7c0.2,0.3,0.4,0.6,0.6,1.1h2.2c0-0.7-0.3-1.3-0.7-2c-0.8-1.2-2.1-1.8-4-1.8        c-1.3,0-2.5,0.4-3.3,1.3c-1,1-1.5,2.4-1.5,4.3c0,1.7,0.4,3.1,1.3,4c0.9,1,2.1,1.5,3.6,1.5c1.2,0,2.3-0.4,3.1-1.1        c0.8-0.7,1.3-1.7,1.5-2.8h-2.2c-0.2,0.5-0.3,1-0.6,1.2c-0.4,0.5-1,0.8-1.8,0.8c-0.8,0-1.4-0.3-1.9-0.9c-0.5-0.6-0.7-1.5-0.7-2.7        s0.2-2.1,0.7-2.8C32.7,14.9,33.3,14.5,34.1,14.5z"/>    <polygon class="hoverwhite" fill="#5c1d58" points="42.7,18.8 47.9,18.8 47.9,17 42.7,17 42.7,14.7 48.4,14.7 48.4,12.8 40.5,12.8 40.5,23.4         48.6,23.4 48.6,21.5 42.7,21.5   "/>    <path class="hoverwhite" fill="#5c1d58" d="M25.2,21.3l0.7,2.2h2.4l-3.8-10.6H22l-3.8,10.6h2.3l0.7-2.2H25.2z M23.3,15.3l1.3,4.2h-2.7L23.3,15.3z"/></g></svg>        </span><span class="pap-button-icon pap-button-camera" >                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"                     viewBox="0 0 27.8 21.5" style="enable-background:new 0 0 27.8 21.5;" xml:space="preserve">                <g>                    <defs>                        <path id="SVGID_1_" d="M22.5,4.9L22.5,4.9l-3.6-4.7h-8.7L7,4.9H4.7V3.7H2.3v1.2h-2.4v16.3h28V4.9H22.5z M11.4,2.5h6.3l1.9,2.4H9.8                            L11.4,2.5z M2.2,19V7.2h6.8C7.2,8.6,6,10.7,6,13.2c0,2.3,1.1,4.4,2.8,5.8H2.2z M13.8,18.5c-3,0-5.5-2.4-5.5-5.3                            c0-2.9,2.5-5.3,5.5-5.3c3,0,5.5,2.4,5.5,5.3C19.3,16.1,16.9,18.5,13.8,18.5z M25.6,19h-6.7c1.7-1.4,2.8-3.5,2.8-5.8                            c0-2.4-1.2-4.6-3.1-6h6.9V19z"/>                    </defs>                    <use class="pap-use" xlink:href="#SVGID_1_"  style="overflow:visible;fill-rule:evenodd;clip-rule:evenodd;"/>                    <clipPath id="SVGID_2_">                        <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>                    </clipPath>                </g>                <g>                    <defs>                        <path id="SVGID_3_" d="M13.9,9.1c-2.3,0-4.2,1.8-4.2,4c0,2.2,1.9,4,4.2,4c2.3,0,4.2-1.8,4.2-4C18.1,10.9,16.2,9.1,13.9,9.1                             M13.9,16.1c-1.6,0-3-1.3-3-2.9c0-1.6,1.3-2.9,3-2.9c1.6,0,3,1.3,3,2.9C16.9,14.8,15.5,16.1,13.9,16.1"/>                    </defs>                    <use xlink:href="#SVGID_3_"  style="overflow:visible;fill-rule:evenodd;clip-rule:evenodd;"/>                    <clipPath id="SVGID_4_">                        <use xlink:href="#SVGID_3_"  style="overflow:visible;"/>                    </clipPath>                </g>                </svg>        </span>    </span>    <span class="pap-button-text">See it in your space </span></button>';
                    }else
                        pplogo+='<a href="'+arurl+'"><img class="flix-pap-img" src="'+pnplogo+'" data-logo="'+pnplogo+'" data-hover="'+pnplogohover+'">'
                    pplogo+='<div class="flix-pap-info" data-flix-pap="flix-pap-content" ></div></a>'                            
                    pplogo+='</div>'
                
                var ppcontent=''
                    ppcontent+='<div class="flix-pap-content '+data_distributor+'" style="display:none;">';
                    ppcontent+='<div class="flix-pap-header">'+headertext+'</div>'
                    ppcontent+='<div class="flix-pap-text">';
                    ppcontent+='<div class="flix-pap-p">';
                    ppcontent+=maintext;
                    ppcontent+='</div>';
                    
                    if(barcode.length)
                        ppcontent+='<div id="ppbar"><div id="ppbarcode"><img src="'+barcode+'" /></div></div>';
                    ppcontent+='<div class="flix-papdownloaddiv">';
                    ppcontent+='<div class="flix-pap-ios 222"><a href="'+arurl+'"><img src="'+flixdomain+'images/ios.png"/></a><span>Compatible on iPhone 6s and up, iPad 5th Gen and up; running iOS11.0+</span></div>';
                    ppcontent+='<div class="flix-pap-android"><a href="'+arurl+'"><img src="'+flixdomain+'images/android.png"/></a><span>Android 7 and up</span></div>';
                    ppcontent+='</div>';
                    ppcontent+='</div></div>';

                log2('insert PAP into: '+ papposition + ' -prepend: '+prepend)
                
                if(typeof papbanner!='undefined'){
                    loadFlixBanner(papposition, papstyle);

                }else{
                    if(prepend=='true' && FlixjQ(papposition).find('#flix_pnpcontainer').length==0){   
                        FlixjQ(papposition).prepend(pplogo);
                    }
                    else{
                        if(FlixjQ(papposition).find('#flix_pnpcontainer').length==0)FlixjQ(papposition).append(pplogo);
                    }
                }

                FlixjQ('body').append(ppcontent);

                if(FlixjQ(papposition).length>0 || typeof papbanner!='undefined')
                    loadPAPaction();

                //FlixjQ('.flix-pap-logo a').attr('href', arurl)
                
                return false;

            }
        });
        }//end success
    });

    


    
}



var loadPAPaction= function () {
    log2('loadPAPaction')
    var hoverTimeout;
    
    if(typeof FlixjQ.fn.on=='undefined')
        FlixjQ.fn.on=FlixjQ.fn.live

    FlixjQ('.pap-button, .flix-pap').on("mouseover touchstart", function(e) {
        clearTimeout(hoverTimeout);
        log2('flix-pap-info hover');
        
        if(FlixjQ('.pap-button')&& FlixjQ('.pap-button').length){

        }else
            FlixjQ('.flix-pap ').css('opacity', '0.5');
        
        //if(flixIOS()==true){
        if(flixGetOS()=='iOS' || flixGetOS()=='Android'){
            flixCheckApp();
        }else{
            
            var pnppos=FlixjQ(this).closest('#flix_pnpcontainer').offset();
            var pnpposleft=pnppos.left+FlixjQ(this).closest('#flix_pnpcontainer').width()+10;
            var pnppostop=pnppos.top-20;
            var winwidth=window.innerWidth;
            
            FlixjQ('.flix-pap-content ').removeClass('flix-poptop').removeClass('flix-popright').removeClass('flix-popleft')
            if(winwidth<(pnpposleft+200)){
                pnpposleft=pnppos.left-FlixjQ('.flix-pap-content ').width()-10;
                
                //move popup below
                if(pnppos.left<200){
                    pnpposleft=pnppos.left;
                    pnppostop=100;
                    FlixjQ('.flix-pap-content ').addClass('flix-poptop')
                }else{
                    FlixjQ('.flix-pap-content ').addClass('flix-popright')
                }
            }else{
                FlixjQ('.flix-pap-content ').addClass('flix-popleft')
                
            }

            FlixjQ(".flix-pap-content").css('left', pnpposleft).css('top', pnppostop)
            FlixjQ(".flix-pap-content").show();
        }
              
           
        e.stopPropagation();                 
    })
    
    //keep popup open
    FlixjQ('.flix-pap-content').on("mouseover", function(e) {
        clearTimeout(hoverTimeout);
    });
    FlixjQ(".flix-pap-content").on("click touchstart", function(e){
        e.stopPropagation();
    });

    //close popup on outside click
    FlixjQ(document).on("click touchstart", function(e){         
        log2('click body')       
        if(FlixjQ(e.target).closest('.flix-pap-content').length==0){
            FlixjQ(".flix-pap-content").hide();
            FlixjQ('.flix-pap').css('opacity', '1');
        }
    });

    //close popup after 2 sec
    FlixjQ('.flix-pap-info, .flix-pap-content, .pap-button, .flix-pap').on("mouseout touchend", function(e) {
        log2('mouseout')
        hoverTimeout = setTimeout(function() {
            FlixjQ(".flix-pap-content").hide(); 
        }, 2000);  
        if(FlixjQ('.pap-button') && FlixjQ('.pap-button').length){
                
        }else
            FlixjQ('.flix-pap ').css('opacity', '1');
              
    });

    //ios click bug fix
    if(flixIOS()==true){
        log2('iOS')
        FlixjQ('body').css('cursor', 'pointer')
    } 

    //download button click
    //FlixjQ('.flix-papdownloaddiv').attr('href',appstore);
        
}


function loadFlixBanner(papposition, papstyle){

    if(typeof FlixjQ.fn.on=='undefined')
        FlixjQ.fn.on=FlixjQ.fn.live


    var html='<div id="flix-ekbanner" style="'+papstyle+'"><img src="//d2m3ikv8mpgiy8.cloudfront.net/images/banner/Walmart_AR_Banner_visual-p2-1.jpg"><a id="flix-ekiphone" href="http://appstore.com/eyekandyltd/pointandplace" target="_blank" title="Point &amp; Place for iPhone"></a><a id="flix-ekandroid" href="https://play.google.com/store/apps/details?id=com.eyekandy.ekar" target="_blank" title="Point &amp; Place for Android"></a><div id="flix_pnpcontainer" ><a href="'+arurl+'"><div class="flix-pap"></div></a></div><div id="flix-ekvideo" title="Watch video "  data-jw-width="476" data-jw="//content.jwplatform.com/videos/zbG383cF.mp4"></div></div>'
    FlixjQ(papposition).before(html);
 
    FlixjQ('#flix-ekvideo').on('click', function(){
        loadbannerpopup()
    })
    
    if(typeof FlixjQ.fn.video=='undefined'){
            if (location.href.search('flix-local') != -1)
                loadJWScript("http://localhost/delivery_flix360/trunk/public/static/jwplayer/js/video.js");
            else if (location.href.search('flix-dev') != -1 || location.href.search('dev-delivery.flix360.com') != -1)
                loadJWScript("//dev-delivery.flix360.com/static/jwplayer/js/video.js");
            else
                loadJWScript("//media.flixcar.com/delivery/static/jwplayer/js/video.js");
            //loadJWScript("//dev-delivery.flix360.com/static/jwplayer/js/video.js");
    }
}

function loadbannerpopup(){
    var video ='<div id="flixinpage-lightbox" style="position:fixed;top:50%;left:50%;width: 500px; height:auto; -webkit-transform: translateXtranslate(-50%, -50%);-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);"><input class="flix-lightjw"  value="{&quot;playlist&quot;:[{&quot;file&quot;:&quot;//content.jwplatform.com/videos/q8CyK5Fm.mp4&quot;,&quot;title&quot;:&quot;VIDEO&quot;,&quot;description&quot;:&quot;&quot;,&quot;mediaid&quot;:&quot;q8CyK5Fm&quot;}]}" type="hidden"><a id="btn_close" style="cursor:pointer;" title="Close"><img src="http://media.flixcar.com/delivery/static/images/close.png" alt="Close" border="0" style="cursor:pointer;position:absolute;right:-40px;"></a></div>';

    var popup='<div id="flixinpage-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000; opacity:0.3; color: #fff;text-align:center;"></div>';
    FlixjQ(top.document).find('body').append(popup+video)
    setTimeout(function(){
        
        log2(FlixjQ(top.document).find('#flixinpage-lightbox .flix-lightjw').length)
        FlixjQ.fn.video.createJWIframe(FlixjQ(top.document).find('#flixinpage-lightbox .flix-lightjw'), 0)
    }, 3000);
}

//EKY iOS code
var appurl = arurl ;
var appstore = 'http://appstore.com/eyekandyltd/pointandplace';

/*var timeout;
var flixPreventPopup= function () {
    clearTimeout(timeout);
    timeout = null;
    window.removeEventListener('pagehide', flixPreventPopup);
}*/
var flixCheckApp= function () {

    //window.location = arurl;
    /*timeout = setTimeout(function(){
        //FlixjQ('.flix-pap-content').fadeToggle();
        FlixjQ('.flix-pap ').css('opacity', '1')
        //if(confirm('You do not seem to have the App installed, do you want to go download it now?')){
            document.location = appstore;
        //}
    }, 1000);
    window.addEventListener('pagehide', flixPreventPopup);*/
}
//EKY iOS code ends


//detect IOS
var flixIOS= function () {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ];
    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()){ 
                log2('Apple detected')
                return true; 
            }
        }
    }
    return false;
}   

var flixGetOS= function () {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

//get URL parameters
var flixGetUrlParameter= function (sParam) {
    var url=window.location.search.substring(1).replace(/\%/g, '|per');
    var sPageURL=decodeURIComponent(url),
        sURLVariables=sPageURL.split('&'),
        sParameterName,
        i;

    for (i=0; i < sURLVariables.length; i++) {
        sParameterName=sURLVariables[i].split('=');

        if (sParameterName[0]===sParam) {
            return sParameterName[1]===undefined ? true : sParameterName[1];
        }
    }
};

//init pap
if(window.FlixjQ){  
    if(location.href.search('flix-pap')!=-1 && typeof window.loadedstaging=='undefined'){
        log2('load staging js')
        var flixdomain='';
            flixdomain = "//d2m3ikv8mpgiy8.cloudfront.net/";
        if( top.location.href.search('live=0')!=-1 ) 
            flixdomain = "//dev-delivery.flix360.com/delivery/static/pap/";
        if (top.location.href.search('flix-local') != -1 ) 
            flixdomain = "//localhost/delivery_flix360/trunk/public/static/pap/";

        var script = document.createElement('script'); 
        document.head.appendChild(script);  
        script.type = 'text/javascript';
        script.src = flixdomain + "js/pointandplace-staging.js";
        window.loadedstaging=1
    } else{
        initPAP();
    }
}else{
    //load jquery is FlixjQ does not exist
    var script = document.createElement('script'); 
    document.head.appendChild(script);  
    script.type = 'text/javascript';
    script.src = flixdomain+"js/jquery.min.js";
    script.onload = initPAP;
}