var flixversion='1.50';

if(typeof log2== 'undefined'){
    if (location.href.search("flix-qa") != -1 ) {
        window.log2 = function() {
            log2.history = log2.history || [];
            log2.history.push(arguments);
            if (this.console) {
                console.log(Array.prototype.slice.call(arguments));
            }
        };
    }else window.log2 = function() {};
    
    
}
//always alert
if(typeof log3== 'undefined'){
    window.log3 = function() {
        log3.history = log3.history || [];
        log3.history.push(arguments);
        if (this.console) {
            console.log(Array.prototype.slice.call(arguments));
        }
    };
    
}


FlixjQ.fn.video = function () {
       
};

var flixvidcount=0
FlixjQ.fn.video.loadJWvideos = function (vidno) {
       
    //lighbox videos
    var firstli = 0;
    FlixjQ(".flix_jw_videoid, .flix-jwlight").each(function(){

        var obj = FlixjQ(this).data("jw");
        
        var jwtype = "";
        if (FlixjQ(this).attr("data-flixjw") || FlixjQ(this).attr("id") == "fullMultidata" ) 
            var jwtype = FlixjQ(this).attr("data-flixjw");
        var div_name = jwtype + flixvidcount;  

        if(FlixjQ(this).attr('href') && FlixjQ(this).attr('href')!='#')
            FlixjQ(this).attr('href', '#')

        if (typeof obj !== "undefined") {
            
            if(obj.search('jwplatform')!=-1)
                mediaid_now = obj.split("/").pop(-1).split(".")[0].split("-")[0];
            else
                mediaid_now=''
            if (firstli == 0) {
                log2("mediaload lightbox - " + mediaid_now);
                firstli++;
                
                FlixjQ.fn.video.jwlogs(mediaid_now, 'mediaload',0, div_name)
            }


            //lightbox click
            FlixjQ(this).click( function() {
                log2("JW carousel-click");
                lightboxwidth=0;
                if(FlixjQ(this).attr('data-jw-width'))
                    lightboxwidth=FlixjQ(this).attr('data-jw-width')*1;
                
                threesixty=0;
                
                if(FlixjQ(this).hasClass('flix-threesixty')){                        
                    threesixty=1;
                    if(supported360Browsers()==false){
                        loadjw360again=1;
                    }
                }

                var iwidth = FlixjQ("body").width() - 40;
                if (iwidth > 480){ 
                    iwidth = 480;
                    
                    if(lightboxwidth!=0)
                        iwidth = lightboxwidth;
                }

                iwidth = iwidth.toFixed(0);
                
                var iheight = iwidth * .67;
                    iheight = iheight.toFixed(0);
                
                var url = FlixjQ(this).data("jw");
                var this_mediaid='';
                if(url.search('//content.jwplatform.com/videos/')!=-1)
                    this_mediaid = url.replace("//content.jwplatform.com/videos/", "").split(".")[0].split("-")[0];
                var div_name = "flix-jw-inline" + firstli;    
                var threesixty=''
                if(FlixjQ(this).attr("data-jw-threesixty") && FlixjQ(this).attr("data-jw-threesixty")=='true')
                    threesixty=',&quot;threesixty&quot;:true';
                
                var html = '<div style="width: ' + iwidth + 'px; height:auto"><input class="flix-lightjw"  value="{&quot;playlist&quot;:[{&quot;file&quot;:&quot;'+url+'&quot;,&quot;title&quot;:&quot;VIDEO&quot;,&quot;description&quot;:&quot;&quot;,&quot;mediaid&quot;:&quot;'+this_mediaid+'&quot;'+threesixty+'}]}" type="hidden"></div><div id="'+div_name+'"></div>';

                lightBox(html, iwidth, iheight);
                FlixjQ.fn.video.createJWIframe(FlixjQ('#flixinpage-lightbox .flix-lightjw'), 0)
                firstli++;
            });
        }
        
    })
    
    //inline videos    
    FlixjQ(".flix-jw, flix-lightjw").each(function(){        
        if(FlixjQ('.share-bubble').length>0){
            FlixjQ.fn.video.createJWIframe(FlixjQ('.share-bubble .flix-jw'))
            return false; 
        }else{
           FlixjQ.fn.video.createJWIframe(FlixjQ(this)) 
        }

        if(FlixjQ(this).parent().find('iframe').length==0)
            FlixjQ.fn.video.createJWIframe(FlixjQ(this))
    });

    //inline video thumb click
    FlixjQ(".inpage_selector_video, .minisite_selector_video, #flix-surface-page, .ui-tabs-panel").find(".flix-viditem, #flix-viditem").each(function() {
        FlixjQ(this).click(function() {
            //play clicked video
            //jwplayer(div_name2).playlistItem(FlixjQ(this).data("no"));
            var vidno=FlixjQ(this).data("no")
            vidinput=FlixjQ(this).closest(".inpage_selector_video, .minisite_selector_video, #flix-surface-page, .ui-tabs-panel").find(".flix-jw, flix-lightjw")
            //if(FlixjQ(this).closest(".inpage_selector_video, .minisite_selector_video").parent().closest(".inpage_selector_video, .minisite_selector_video").length>0)
            //    vidinput=FlixjQ(this).closest(".inpage_selector_video, .minisite_selector_video").parent().closest(".inpage_selector_video, .minisite_selector_video").find(".flix-jw, flix-lightjw")
            
            if(FlixjQ(this).closest(".inpage_selector_video, .minisite_selector_video, #flix-surface-page, .ui-tabs-panel").find(".flix-jw, flix-lightjw").length==0){
                if(FlixjQ(this).closest(".inpage_selector_video, .minisite_selector_video").parent().find(".flix-jw, flix-lightjw").length>0)
                vidinput=FlixjQ(this).closest(".inpage_selector_video, .minisite_selector_video").parent().find(".flix-jw, flix-lightjw")
            }

            FlixjQ.fn.video.createJWIframe(vidinput, vidno)
           
        });
    });
}

var flixiframecount=0;
FlixjQ.fn.video.createJWIframe = function (thisjw, vidno) {      
    //logs
    setTimeout(function(){
        //hotspot autoplay
        if(FlixjQ('.share-bubble').length>0)
            vidno=0;

        var params='&vidno='+vidno;
        if((typeof FlixjQ.fn.inPage !='undefined' && FlixjQ.fn.inPage.log.length>0) || (typeof FlixjQ.fn.minisite!='undefined' && FlixjQ.fn.minisite.log.length>0) || typeof instance!='undefined' ){
            var params2=''
            if(FlixjQ.fn.logging && FlixjQ.fn.logging.trackingDomain)
                var params2 ='&base='+FlixjQ.fn.logging.trackingDomain
            


            if(typeof FlixjQ.fn.minisite!='undefined'){
                log2('mini params')
                log2(FlixjQ.fn.minisite.data)  

                params += "&p="+ (FlixjQ.fn.minisite.data.product  || getUrlParameter('p') ||'');
                params += "&d="+ (FlixjQ.fn.minisite.data.distributor || getUrlParameter('d') ||'');
                params += "&l="+ (FlixjQ.fn.minisite.data.language || getUrlParameter('l') ||'en');
                params += "&mpn=" + (FlixjQ.fn.minisite.data.mpn || getUrlParameter('mpn') ||'');
                params += "&ean="+ (FlixjQ.fn.minisite.data.ean || getUrlParameter('ean') ||'');
                params +="&sid="+(FlixjQ.fn.minisite.data.sid || FlixjQ.fn.minisite.data.session_id || getUrlParameter('sid') ||'');
                params +=params2
                /* p=1107284
                d=2754
                l=fr
                sid=D2EFDCAC-4263-6C0F-0010-80F6E783C05A
                pr=0
                m=1107284
                pn=/nav/achat/informatique/ordinateur_portable-portable/portable/hp_sp_x360_13-4158nf.html           
                gvid=flix575578abb3b007.01780439
                ut=1496660924549
                ver=2
                ed=xm55ADgD
                br=*/
            }else if(typeof FlixjQ.fn.inPage!='undefined'){
                log2('inpage params')
                
                var mpn=''
                if(FlixjQ.fn.inPage.data.mpn && FlixjQ.fn.inPage.data.mpn)
                    mpn=FlixjQ.fn.inPage.data.mpn
                if(window.flixJsCallbacks.pageCapture && window.flixJsCallbacks.pageCapture.mpn)
                    mpn=window.flixJsCallbacks.pageCapture.mpn
                
                var flixmpn=mpn;
                flixmpn=flixmpn.replace(/&/g, '|and');
                flixmpn=flixmpn.replace(/\/\//g, '|for');
                flixmpn=flixmpn.replace(/\?/g, '|que');
                flixmpn=flixmpn.replace(/\:/g, '|dub');
                flixmpn=flixmpn.replace(/\=/g, '|is');
                flixmpn=flixmpn.replace(/\#/g, '|hash');
                mpn=flixmpn;

                var ean=''
                if(FlixjQ.fn.inPage.data.ean && FlixjQ.fn.inPage.data.ean)
                    ean=FlixjQ.fn.inPage.data.ean
                if(window.flixJsCallbacks.pageCapture && window.flixJsCallbacks.pageCapture.ean)
                    ean=window.flixJsCallbacks.pageCapture.ean
                if(FlixjQ(thisjw).closest('div[id^="flixinpage_"]').length>0 && FlixjQ(thisjw).closest('div[id^="flixinpage_"]').find('span[id^="inpage\-data\-"]').attr('id') && FlixjQ(thisjw).closest('div[id^="flixinpage_"]').find('span[id^="inpage\-data\-"]').attr('id').length>0)
                    params += "&p="+ (  FlixjQ(thisjw).closest('div[id^="flixinpage_"]').find('span[id^="inpage\-data\-"]').attr('id').replace('inpage-data-','') || FlixjQ.fn.inPage.data.product  ||  '');
                else
                    params += "&p="+ ( FlixjQ(thisjw).closest(".main_mot_product_wrapper").attr("alt") || FlixjQ.fn.inPage.data.product  ||  '');
                params += "&d="+ (FlixjQ.fn.inPage.data.distributor || '');
                params += "&l="+ (FlixjQ.fn.inPage.data.language || 'en');
                params += "&sid="+ (FlixjQ.fn.inPage.data.session_id || '');       
                params += "&mpn="+mpn;
                params += "&ean="+ ean;
                params +=params2
                
            }else if(typeof instance!='undefined'){
                log2('instance params')
                var
                pData = {}; df = ['mpn', 'ean', 'sku', 'price', 'brand'];
                skip = ['price', 'brand'];
                for( i=0; i<df.length; i++ ) {
                    if( document.querySelector('script[data-flix-' + df[i] + ']') &&
                        !! document.querySelector('script[data-flix-' + df[i] + ']').getAttribute( 'data-flix-' + df[i] )) {
                        
                        pData[ df[i] ] = document.querySelector('script[data-flix-' + df[i] + ']').getAttribute( 'data-flix-' + df[i] );
                        
                    }
                }

                params += "&p="+ (instance.data.product  || '');
                params +=params2
                params += "&d="+ (instance.data.distributor || '');
                params += "&l="+ (instance.data.language || 'en'); 

                var flixmpn=(pData.mpn || '');
                flixmpn=flixmpn.replace(/&/g, '|and');
                flixmpn=flixmpn.replace(/\/\//g, '|for');
                flixmpn=flixmpn.replace(/\?/g, '|que');
                flixmpn=flixmpn.replace(/\:/g, '|dub');
                flixmpn=flixmpn.replace(/\=/g, '|is');
                flixmpn=flixmpn.replace(/\#/g, '|hash');


                params += "&mpn="+ (flixmpn || '');
                params += "&ean="+ (pData.ean || '');
                params += "&sid="+(instance.data.session_id || '');
                
            }

            if(FlixjQ('.flix-mbl-video').length>0)
                params+='&mot=1'
            log2(params)

        
        }

        var targetdiv=thisjw;
        var targetvalues=thisjw.val();
        targetvalues=targetvalues.replace(/&/g, 'and');
        targetvalues=targetvalues.replace(/=<(?:.|\n)*?>/gm, '');
        targetvalues=targetvalues.replace(/=/gm, '');

        var filecount=(targetvalues.match(/file/g) || []).length;
        if(filecount>1){
            var start_pos = targetvalues.indexOf('[{') + 1;
            var end_pos = targetvalues.indexOf('}]',start_pos);
            var text_to_get = targetvalues.substring(start_pos,end_pos);

            var text_to_get2 = text_to_get.split(',{');


            if(vidno){
                var targetfile='{'+text_to_get2[vidno];
                vidno=0;
            }else
                var targetfile=text_to_get2[0];
            /*var f1=targetvalues.split('[{')
            var f2=f1.split('}]')
            var f2=f1[0].split(',{')*/
            if(targetfile.search('}')==-1)
                targetfile=targetfile+'}'
            var startjson=targetvalues.substring(0,start_pos);
            var endjson=targetvalues.substring(end_pos+1,targetvalues.length);

            var jwjson=startjson+targetfile+endjson;
           
        }else{
            var jwjson=targetvalues
        }

        //remove title and description
        if(jwjson.search('title')!=-1 && jwjson.search('mediaid')!=-1 ){
            var start_pos = jwjson.indexOf('title');
            var end_pos = jwjson.indexOf('mediaid',start_pos);
            var text_to_get = jwjson.substring(start_pos,end_pos);
            jwjson=jwjson.replace(text_to_get, '')
        }

        
        log2(jwjson)
        var fjson=encodeURIComponent(jwjson);

        var flixdomain = location.protocol+"//media.flixcar.com/delivery/static/jwplayer/";

        if(location.href.search('origin.flixcar.com')!=-1 || location.href.search('flix-orig')!=-1) 
            flixdomain = "//origin.flixcar.com/delivery/static/jwplayer/";


        if(location.href.search('dev-delivery.flix360.com')!=-1 || location.href.search('flix-dev')!=-1 || location.href.search('live=0')!=-1) 
            flixdomain = "//dev-delivery.flix360.com/delivery/static/jwplayer/";
        
        if (location.href.search('flix-local') != -1) 
            flixdomain = "//localhost/delivery_flix360/trunk/public/static/jwplayer/";
        
        try{   
            var topurl=top.document.URL
            topurl=topurl.replace(/&/g, '|and');
            topurl=topurl.replace(/\/\//g, '|for');
            topurl=topurl.replace(/\?/g, '|que');
            topurl=topurl.replace(/\:/g, '|dub');
            topurl=topurl.replace(/\=/g, '|is');
            topurl=topurl.replace(/\#/g, '|hash');
            topurl=topurl.replace(/\%/g, '|per');
            params+='&pn='+topurl
        }
        catch( e ){
            params+='&pn=URL not available - Manual '+location.protocol+' links'
        }

        

        var jwurl=flixdomain+'jwiframe.html?fjw='+fjson +params;
        
        
        if(thisjw.parent().find("iframe").length == 0){
            //add video class if it doesnt exist
            var inpage_selector_video=''
            if(!thisjw.parents().hasClass('inpage_selector_video'))
                var inpage_selector_video='inpage_selector_video'
            
            
            var html='<div class="flix-videodiv '+inpage_selector_video+'" style="position:relative; padding-bottom:56.25%; overflow:hidden; text-align:left"><iframe id="flix-iframe'+flixiframecount+'" src="'+jwurl+'" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen style="position:absolute; overflow:hidden; min-width:100%"></iframe></div>'
            thisjw.after(html);
            

            var id='flix-iframe'+flixiframecount
            
            //pause video on tab click
            FlixjQ('.flix-toggle[data-for="flix-mbl-video"]').click(function(){
                FlixjQ.fn.video.sendjwmessage(id, 'pause');
                
            })                

            //try playing video on mobile            
            /*if(vidno && vidno>=0 && FlixjQ.fn.video.detectmob()==true){
                setTimeout(function(){
                    log2('Try playing video')
                    FlixjQ.fn.video.sendjwmessage(id, 'play');
                },2000)
                setTimeout(function(){
                    log2('Try playing video')
                    FlixjQ.fn.video.sendjwmessage(id, 'play');
                },5000)                     
            }*/

            flixiframecount++;

            
        }else{
            thisjw.parent().find("iframe").attr('src', jwurl)
        }

        //stop video on tab click
        FlixjQ("#container .ui-tabs-nav li").click(function() {
            var url=thisjw.parent().find("iframe").attr('src')            
            var start_pos = url.indexOf('vidno=');
            var end_pos = url.indexOf('&p',start_pos);
            var text_to_get = url.substring(start_pos,end_pos);
            
            url=url.replace(text_to_get, 'vidno=undefined')
            
            thisjw.parent().find("iframe").attr('src', url)
        });

    },1000)
}

//send message to jw iframe
FlixjQ.fn.video.sendjwmessage= function(id, message){ 
    var flixdomain = location.protocol+"//media.flixcar.com";
    if(location.href.search('origin.')!=-1 || location.href.search('flix-orig')!=-1) 
        flixdomain = location.protocol+"//origin.flixcar.com";
    if(location.href.search('dev-delivery.flix360.com')!=-1 || location.href.search('flix-dev')!=-1 || location.href.search('live=0')!=-1) 
        flixdomain = location.protocol+"//dev-delivery.flix360.com";                
    if (location.href.search('flix-local') != -1) 
        flixdomain = location.protocol+"//localhost";

    try{
        var iframe = document.getElementById(id).contentWindow;
        iframe.postMessage(message,flixdomain);//send the message and target URI
    }catch(err){}
    //message back from jw iframe
    /*window.addEventListener('message',function(event) {
        //console.log('message received2:  ' + event.data,event);
    },false);*/
}

//if JW videos exist, load JWlibrary
FlixjQ(document).ready(function() {
    setTimeout(function(){
       FlixjQ.fn.video.loadJWvideos(); 
   },100)
        
});

FlixjQ.fn.video.detectmob= function(){ 
    if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ){ 
        return true; } 
    else { return false; 
    } 
}

//get URL parameters
var getUrlParameter=function getUrlParameter(sParam) {
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




/*************************************************
*
* loggin pixel code starts 
*
**************************************************/
FlixjQ.fn.video.jwlogs = function (mediaid_now, type, attr, div_name) {       
    var clicked_product = (FlixjQ("#"+div_name).parents(".main_mot_product_wrapper").attr("alt")  || '')
    
    //page load and start video
    if(type=='mediaload'){    
        FlixjQ.fn.video.loggin('mediaload', mediaid_now,'',clicked_product);        
    }
    
    //video times, 1st sec, 10sec and complete
    if(type=='mediatime'){   
        var this_position=attr;        
        FlixjQ.fn.video.loggin('mediatime', mediaid_now,this_position,clicked_product);        
    }
}

if(!flixJsCallbacks){
    var flixJsCallbacks={
        _loadCallback:null,
        _loadInpageCallback:null,
        _loadMinisiteCallback:null,
        _loadNoshowCallback:null       
    };
    var getFlixCallback=function(){
        return flixJsCallbacks;
    };
    window['flixJsCallbacks']=getFlixCallback();
}

FlixjQ.fn.video.parsePage = function ( d ) {
       
  if( ! d ) return '';
  var 
    qSelectPresent=! ( !! document.all && ! document.querySelector ),
    data={}, df, br, hasOwn={}.hasOwnProperty, get='',
    canonicalCheck, s, found='', h, title='', i, j,

  found=(location.href);
  data.pn=found;

  for(var p in data ) {
    if( hasOwn.call(data, p)) d[p]=data[p];
  }

  for (var key in d) {
    if( hasOwn.call(d, key)) {
      get +="&"+key+ '=' + encodeURIComponent( d[key] );
    }
  }
  return get;
};

//lighbox first video mediaload tracking
FlixjQ.fn.video.loggin = function (mediaload, mediaid_now,clicked_product) {
   
    //page load and start video
    if(mediaload=='mediaload'){
        log2('Lighbox page mediaload')
        if (typeof instance !== "undefined") {
            instance.logVideoLoad(mediaid_now);
        }
        if (FlixjQ.fn.inPage && FlixjQ.fn.inPage.logVideoLoad) {
            if (typeof clicked_product !== "undefined"){
                FlixjQ.fn.inPage.logVideoLoad(mediaid_now,clicked_product);
            }else{
                FlixjQ.fn.inPage.logVideoLoad(mediaid_now,clicked_product);
            }
        }
        if (FlixjQ.fn.minisite) {
            FlixjQ.fn.minisite.logVideoLoad(mediaid_now);
        }
    } 
}