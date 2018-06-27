var flixversion='1.50';

//get URL parameters
var getUrlParameter=function getUrlParameter(sParam) {
    var sPageURL=decodeURIComponent(unescape(window.location.search.substring(1))),
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

var pnurl=''
    if(getUrlParameter('pn'))
        pnurl=getUrlParameter('pn')
    pnurl=pnurl.replace(/\|and/g, '&');
    pnurl=pnurl.replace(/\|for/g, '//');
    pnurl=pnurl.replace(/\|que/g, '?');
    pnurl=pnurl.replace(/\|dub/g, ':');
    pnurl=pnurl.replace(/\|is/g, '=');
    pnurl=pnurl.replace(/\|hash/g, '#');
    pnurl=pnurl.replace(/\|per/g, '%');

var mpn=''
    if(getUrlParameter('mpn'))
        mpn=getUrlParameter('mpn')
    mpn=mpn.replace(/\|and/g, '&');
    mpn=mpn.replace(/\|for/g, '//');
    mpn=mpn.replace(/\|que/g, '?');
    mpn=mpn.replace(/\|dub/g, ':');
    mpn=mpn.replace(/\|is/g, '=');
    mpn=mpn.replace(/\|hash/g, '#');
    mpn=mpn.replace(/\|per/g, '%');
    
if(typeof log2== 'undefined'){
    if (pnurl.search("flix-qa") != -1 || location.href.search("flix-qa") != -1) {
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


FlixjQ.fn.video = function () {};


var flixvidcount = 0;
var mediaid_now = "";
var lightboxwidth=0;
var threesixty=0;


FlixjQ.fn.video.checkJWVideoType = function () { 


    if(FlixjQ('#flix-jwplayer').width()>0){

        var firstli = 0;
        
        var jwtype = "flix-jw-inline";

        var div_name = jwtype + flixvidcount;            

        var val = getUrlParameter("fjw") ;
        val=decodeURI(val)
        var obj = JSON.parse(val);   
        FlixjQ('#flix-jwplayer').append('<div id="' + div_name + '"></div>');

        if(typeof obj=='object')
            FlixjQ.fn.video.getJWvideos(obj, div_name);  

        FlixjQ('#flix-jwplayer').addClass('flix-jwplayer').addClass('flix-jw'+jwplayer.version.charAt(0)).attr('id', 'flix-jwplayer')
       
        flixvidcount++;
        
        window.addEventListener('message',function(event) {
            log2('postMessage:  ' + div_name +'-'+event.data);
            
            if(event.data=='pause')
                jwplayer(div_name).pause(true);
            if(event.data=='play')
                jwplayer(div_name).play(true);

            jwplayer(div_name).on("complete", function(e) {
                event.source.postMessage('complete',event.origin);
            });

            //event.source.postMessage('holla',event.origin);
        },false);

    }else{
        setTimeout(function(){
            //log2('Video hidden - Reload video')
            FlixjQ.fn.video.checkJWVideoType()
        }, 2000);
    }
}


var playerAllInstance;
var jwver;
var nonjwurl=0;
var loadjwagain=0;
var loadjw360again=0;
var hide360=0
var this_mediaid='';

FlixjQ.fn.video.getJWvideos= function(obj, div_name) {
    jwver=jwplayer.version.charAt(0)
    
    log2(div_name +'- ver -'+jwplayer.version ); 
    log2(obj); 

    //jw5
    var origobj = FlixjQ.extend(true, {}, obj);

    obj.primary = "html5";
    obj.listbar = false; 
    obj.hlshtml = true;
    obj.key = "o2HDI3pESuCp+TkXQUuGTEvDrGaGDR4SDS0BETVKfvdyrCtL";
    obj.preload='metadata'
    if(getUrlParameter("fjw").search('aspectratio')!=-1){
        obj.aspectratio='9:16'
        log2('obj.aspectratio=9:16:')
    }
    if(getUrlParameter('vidno')!='undefined' && getUrlParameter('vidno')==0){
        log2('autoplay video set')
        obj.autostart='true'
    }
    //load 360 plugin
          

    //create different video versions 
    if(loadjwagain==0){

        //fix when there are no [] brackets and playlist is an object only
        if(obj.playlist && !obj.playlist.length){ 
            var arr =[obj.playlist];            
            obj.playlist=arr
        }       

        //check for 360s and remove ones that doesnt play
        for (var i=obj.playlist.length-1; i>=0; i--){
            var value=  obj.playlist[i];  

            if(value.file){
                var video = value.file;
            }else
                var video = value;

            if(value.threesixty && value.threesixty==true){ 
                if(FlixjQ.fn.video.supported360Browsers()==true && video.search('jwplatform')!=-1){     
                    log2('360s included') 
                    threesixty=1;  
                }else{
                    log2('hide 360')
                    //hide 360 video section 
                    hide360=1;

                    //hide video section if there is only one video
                    if(obj.playlist.length==1){
                        FlixjQ("#"+div_name).closest('.inpage_selector_video').hide();
                        FlixjQ('#flix_product_video').hide();
                        FlixjQ(".ui-tabs-nav li a:contains('Videos')").hide();
                    }
                    obj.playlist.splice(i, 1);
                }               
            }

            if(video.search('jwplatform')==-1)
                nonjwurl=1         
        }


        FlixjQ.each(obj.playlist, function(index, value) {

            if(threesixty==1 && index==0){
                if( !value.threesixty  ){ 
                   hide360=1;
                }
            }
            if( value.threesixty && value.threesixty==true ){  
                if(FlixjQ.fn.video.supported360Browsers()==true){  
                    //obj.plugins={'https://ssl.p.jwpcdn.com/player/plugins/vr/vr.js': {}} 
                    FlixjQ(this)[0].stereomode="monoscopic"
                    log2('loadjw360'); 
                   
                }else{
                    return false;                    
                }
            }

            if(FlixjQ.fn.video.supported360Browsers()==true || !value.threesixty){  
                if(value.file){
                    var video = value.file;
                }else
                    var video = value;



            }else{               
                return true
            }
           
            //show 360 fallback videos
            
            

            

            //if hosted by JW
            if(video.search('jwplatform')!=-1){
                
                //var value = video.substring(video.lastIndexOf("/") + 1);
                var value2 = video.substring(video.lastIndexOf(".") + 1);            
                var videom3u8 = video.replace(value2, "m3u8");
                    videom3u8 = videom3u8.replace("/videos/", "/manifests/");
                    videom3u8 = videom3u8.replace(/\-.*\./, '.');
                var videowebm = video.replace(value2, "webm");
                var videoflv = video.replace(value2, "flv");
                
                delete FlixjQ(this)[0].file;
                
                FlixjQ(this)[0].sources = [ {
                    file: videom3u8,
                    type: "hls",
                    "default": true
                }, {
                    file: videowebm,
                    type: "video/webm"
                }, {
                    file: video,
                    type: "video/mp4"
                } ];
                
            }else{                
                if(video.search('.mp4')!=-1)
                    nonjwurl=1
            }
            
            
        });
    }else{
        //load video again with the supplied video format
        log2('loaded jwagain - error');
    }

    //inline video
    if (div_name.search("flix-jw-inline") != -1) {
        
        log2('setup jw');
        
        if(getUrlParameter('vidno')=='undefined' ){
            jwplayer(div_name).setup(obj);
        }else{
            //if(vidno!='0'){
                jwplayer(div_name).setup(obj)
                var vplaying=0
                jwplayer(div_name).on('ready', function(event) {
                    log2('ready to play------------')
                    jwplayer(div_name).playlistItem(getUrlParameter('vidno'));
                    vplaying=1
                }); 

                setTimeout(function(){

                    if(vplaying==0){
                        if(FlixjQ('.share-bubble').length>0){
                            log2('hotspot detected - try to autoplay')
                            jwplayer(div_name).play();
                        }

                        jwplayer(div_name).playlistItem(getUrlParameter('vidno'));
                    }


                }, 4000)
            //}
        }        
    }
    

    //Set 360 QualityLevels
    if(div_name.search('360')!=-1 || threesixty==1){
        if(hide360==0)
            FlixjQ("#"+div_name).parent().addClass("flix-jw360");
        else
            FlixjQ("#"+div_name).parent().removeClass("flix-jw360"); 
               
        jwplayer(div_name).onReady(function(event) {
            jwplayer(div_name).onQualityLevels(function(e) { 
                log2('Set quality')                
                // FlixjQ.each(e.levels, function(index, value) {
                //     log2(value.label)
                //     var quality=value.label.replace('p','')
                // })
                //make 360 play on highest level
                jwplayer(div_name).setCurrentQuality(1);
            });
        }); 
        //add 360 icon
        FlixjQ('.flix-jw360').append('<div class="flix-jwicon360" style="max-width:45px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="1.454 1.227 30.719 30.72"><circle fill="#FFF" cx="16.813" cy="16.586" r="15.36"/><path fill="#999" d="M8.32 19.896l-.953.954-3.821-3.807 3.821-3.808.954.947-2.854 2.86 2.853 2.854m19.84-2.853l-2.854-2.86.947-.947 3.826 3.808-3.826 3.807-.947-.953 2.854-2.855M16.666 28.23l2.854-2.861.954.953-3.809 3.828-3.814-3.828.954-.953 2.861 2.861m0-22.694L13.805 8.39l-.954-.953 3.814-3.828 3.809 3.828-.953.953-2.855-2.854z"/><text transform="translate(10.576 19.088)" fill="#777" font-family="\'Arial-BoldMT\'" font-size="7">360°</text></svg></div>')
        
    }

    

    //start tracking
    
    FlixjQ.fn.video.JWTracking(origobj, div_name,this_mediaid)
    
    //stop video on minisite tab click
    FlixjQ("#container .ui-tabs-nav li").click(function() {
        jwplayer(div_name).stop();
    });

    //IE class name
    if( FlixjQ.fn.video.get_browser().name=='MSIE') {
        log2("flix ie");
        FlixjQ("#"+div_name).parent().addClass("flix-jwie");
        //ie9-10
        if(FlixjQ.fn.video.get_browser().version < 11) {
            log2("flix ie910");
            FlixjQ("#"+div_name).parent().addClass("flix-jwie910");
        }
    }
    
}

FlixjQ.fn.video.JWTracking = function (origobj, div_name, light_mediaid) {
    //if (div_name.search("flix-jw-inline") != -1) {
        //tracking
        
    if(light_mediaid && light_mediaid.length>0){
        log2('track medid')
            this_mediaid=light_mediaid
    }else if(nonjwurl==0){
        log2('track medid 2')
        var this_mediaid = jwplayer(div_name).getPlaylistItem(jwplayer(div_name).getPlaylistIndex()).mediaid;
    }else{
        log2('track nomedid')
        var this_mediaid ='';
    }

    //if (jwver>=7) {
        //jw7 first load tracking
        
        // first initialization of each video
        log2("Mediaload inline-" + this_mediaid);
        if(getUrlParameter('vidno')=='undefined')
            FlixjQ.fn.video.jwlogs(this_mediaid, 'mediaload', 0, div_name);

        if( FlixjQ.fn.video.get_browser().name=='MSIE' && FlixjQ.fn.video.get_browser().version < 11) {
            log2("ie910");
            FlixjQ(".fullJwPlayerWarp").addClass("fie910");
        }
        
        /*jwplayer().on('all', function(error) {
            log3("jw7 ---- ALL ----");
            log3(error);                    
        });*/

        //on error
        jwplayer(div_name).on('error ,setupError', function(error) {
            log3("jw7-ERROR");
            log3(error.message);                    
        });
    
        //360 errors
        if(div_name.search('360')!=-1 || threesixty==1){
            jwplayer(div_name).on('error', function(error) {
                var errorDiv = document.querySelector("#error");
                if (error.message == jwplayer.vr.events.UNSUPPORTED_BROWSER ||
                  error.message == jwplayer.vr.events.INITIALIZATION_ERROR) {
                  errorDiv.classList.add('active');
                  if (error.message == jwplayer.vr.events.UNSUPPORTED_BROWSER) {
                    if (jwplayer.utils.isSafari()) {
                      errorDiv.innerHTML = 'Safari is currently unsupported, please visit this ' +
                        'page using <a href="https://www.google.com/chrome/">Google Chrome</a> ' +
                        'or <a href="https://www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a>.';
                    } else {
                      errorDiv.innerHTML = error.message +
                        ' Please upgrade to a browser with <a href="https://get.webgl.org/">WebGL support</a>.';
                    }
                  } else {
                    errorDiv.innerHTML = error.message;
                  }
                }
                console.error('Error: ' + error.message);
            });
        }

        
    //}
        
    //}

    //video tracking starts ..
    mediaid_now = "", timerSetter = 0;
    
    //if (jwver>=7) {
    log2("tracking jw7");
    //JW7 tracking codes

    //firefox older ver.<45

    jwplayer(div_name).on("buffer", function(e) {
        log2('Buffered - ready')
        if (FlixjQ.fn.video.get_browser().name=="Firefox" && FlixjQ.fn.video.get_browser().version <= 45) {
            log2('Firefox <45 buffer')                
            var myVar = setInterval(function() {
                myTimer();
            }, 1000);
            function myTimer() {                    
                //log2(jwplayer(div_name).getState());
                if (jwplayer(div_name).getState() == "playing") {
                    myStopFunction();
                    log2("firefox <45 playing");
                } else {
                    jwplayer(div_name).play();
                }
            }
            function myStopFunction() {
                clearInterval(myVar);
            }
        }
    });
    
    //play of each video  
    jwplayer(div_name).on("firstFrame", function(e) {
        var div_name2=div_name
        
            if(light_mediaid && light_mediaid.length>0)
                this_mediaid=light_mediaid
            else if(nonjwurl==0)
                var this_mediaid = jwplayer(div_name2).getPlaylistItem(jwplayer(div_name2).getPlaylistIndex()).mediaid;
            else{
                var this_mediaid =''
            }
            mediaid_now = this_mediaid;
            timerSetter = 0;
            log2("firstFrame - " + this_mediaid);

            FlixjQ.fn.video.jwlogs(this_mediaid, 'mediaload', 0, div_name)
        
        if(hide360==1 && jwplayer(div_name2).getPlaylistIndex()==0){
            FlixjQ('#'+div_name).find('video').show();
            FlixjQ('#'+div_name).find('canvas').hide();

            //FlixjQ('#'+div_name).closest('.inpage_selector_video').find('.flix-viditem:eq(1)').trigger('click')
        }
        
    });
    // video finished
    jwplayer(div_name).on("complete", function(e) {
        if(light_mediaid && light_mediaid.length>0)
                this_mediaid=light_mediaid
        else if(nonjwurl==0)
            var this_mediaid = jwplayer(div_name).getPlaylistItem(jwplayer(div_name).getPlaylistIndex()).mediaid;
        else{
            var this_mediaid =''
        }
        var full_position = jwplayer(div_name).getDuration();
        log2("complete - " + this_mediaid);

        FlixjQ.fn.video.jwlogs(this_mediaid, 'mediatime', full_position, div_name)
    });
    // first sec and then every ten seconds 
    jwplayer(div_name).on("time", function(e) {
        if(light_mediaid && light_mediaid.length>0)
                this_mediaid=light_mediaid
        else if(nonjwurl==0)
            var this_mediaid = jwplayer(div_name).getPlaylistItem(jwplayer(div_name).getPlaylistIndex()).mediaid;
        else{
            var this_mediaid =''
        }
        var full_position = jwplayer(div_name).getDuration(), this_position = jwplayer(div_name).getPosition(), period = 1e4, now = new Date();
        if (!timerSetter || now.getTime() - timerSetter > period) {
            log2("time -"+ this_mediaid +' - '+this_position);

            FlixjQ.fn.video.jwlogs(this_mediaid, 'mediatime', this_position, div_name)
            
            timerSetter = now.getTime();
        }

        if(FlixjQ('#'+div_name).length==0 ){  
            log2('remove hotspot video') 
            jwplayer(div_name).stop() 
            jwplayer(div_name).remove() 
        }
 



        if(FlixjQ('#flix-jwplayer').width()==0){
            jwplayer(div_name).pause();
            log2('Pause video');
        }
    });
    //}
}

FlixjQ.fn.video.get_browser = function () {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
   
    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i))) {
        return {
            name: "Apple"            
        };
    }
    if((navigator.userAgent.match(/Android/i))) {
        return {
            name: "Android"            
        };
    }

    if (navigator.userAgent.search('Edge')!=-1) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {
            name: "MSIE",
            version: navigator.userAgent.split('Edge/')[1] || ""
        };
    }
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {
            name: "MSIE",
            version: tem[1] || ""
        };
    }
    if (M[1] === "Chrome") {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return {
                name: "Opera",
                version: tem[1]
            };
        }
    }
    M = M[2] ? [ M[1], M[2] ] : [ navigator.appName, navigator.appVersion, "-?" ];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }


    return {
        name: M[0],
        version: M[1]
    };
}

//show 360 only on supported browsers
FlixjQ.fn.video.supported360Browsers = function () {
    if (pnurl.search("flix-360") != -1 ) {
        return true
    }
    //not supported browsers
    //IE
    
    else if( FlixjQ.fn.video.get_browser().name=='MSIE'  ) {
        if(FlixjQ.fn.video.get_browser().version>14)
            return true
        else
            return false     
        //false hide video  
    }
    //safari
    else if(FlixjQ.fn.video.get_browser().name=='Safari' ) {
        if(FlixjQ.fn.video.get_browser().version>=10)
            return true
        else
            return false     
        //false hide video  
    }
    //Firefox <47 
    else if (FlixjQ.fn.video.get_browser().name=="Firefox" && FlixjQ.fn.video.get_browser().version <= 46) {
        return false     
        //false hide video  
    }
    else if(FlixjQ.fn.video.get_browser().name=='Apple' ) {        
        return false     
        //false hide video  
    }
    /*else if(FlixjQ.fn.video.get_browser().name=='Android' ) {        
        return false     
        //false hide video  
    }*/

    else
        return true
    //true show video
}


//load script
FlixjQ.fn.video.loadfiles = function (e, t) {    
    if (-1 != e.search(".js") && 0 === FlixjQ("script[src='" + e + "']").length) {
        var c = document.createElement("script");
        c.type = "text/javascript", c.src = e, c.onload = t, document.head.appendChild(c);
    }
    if (-1 != e.search(".css") && 0 === FlixjQ("link[href='" + e + "']").length) {
        var n = document.createElement("link");
        n.rel = "stylesheet", n.href = e, n.type = "text/css", n.onload = t, document.head.appendChild(n);
    }
}

FlixjQ.fn.video.loadJW = function () {
    var flixdomain = "//media.flixcar.com/delivery/static/jwplayer/";
    if(pnurl.search('dev-delivery.flix360.com')!=-1 || pnurl.search('flix-dev')!=-1 || pnurl.search('live=0')!=-1) 
        flixdomain = "//dev-delivery.flix360.com/delivery/static/jwplayer/";

    if (pnurl.search('flix-local') != -1 || location.href.search('flix-local') != -1) 
        flixdomain = "//localhost/delivery_flix360/trunk/public/static/jwplayer/";

    FlixjQ.fn.video.loadfiles(flixdomain + "css/jw-default2.css");
    //load latest if no prototype.js
    //if (FlixjQ.fn.video.get_browser().name=='Firefox' && FlixjQ.fn.video.get_browser().version<47 && typeof Prototype  != "undefined" ) {
   
    //if(FlixjQ('.inpage_selector_video').css('display') != 'none'){
    if( typeof jwplayer != "undefined"){
        log2('jwplayer exists - not loading new')
        FlixjQ.fn.video.loadedFlixJW();
    }else {
        log2("Load jw7-"+flixversion);
        FlixjQ.fn.video.loadfiles("//content.jwplatform.com/libraries/RUfolewa.js", FlixjQ.fn.video.loadedFlixJW);
    }
    //}else{
    //    log3('Flix-Video sections hidden, not loading jwplayer');
    //}
    
}

FlixjQ.fn.video.loadedFlixJW = function () {
    setTimeout(function(){
        log2('loadedFlixJW');

        if(FlixjQ.fn.video.supported360Browsers()==false){
            FlixjQ('.flix-threesixty').hide();
            FlixjQ('.threesixtyfallback').show();
            if(FlixjQ('.flix-viditem').length>=1 && FlixjQ('.flix-viditem').length==FlixjQ('.flix-threesixty').length)
               FlixjQ("#"+div_name).closest('.inpage_selector_video').hide();
        } 

        FlixjQ.fn.video.checkJWVideoType();
    }, 500);
}

//if JW videos exist, load JWlibrary
FlixjQ(document).ready(function() {
    
    FlixjQ.fn.video.loadJW();
       
});





















/*************************************************
*
* log pixel code starts 
*
**************************************************/
FlixjQ.fn.video.jwlogs = function (mediaid_now, type, attr, div_name) {
    log2('in jwlogs - '+type )
    var clicked_product = (FlixjQ("#"+div_name).parents(".main_mot_product_wrapper").attr("alt")  || '')
    
    //page load and start video
    if(type=='mediaload'){    
        FlixjQ.fn.video.log('mediaload', mediaid_now,'',clicked_product);        
    }
    
    //video times, 1st sec, 10sec and complete
    if(type=='mediatime'){   
        var this_position=attr;   
        setTimeout(function(){
            FlixjQ.fn.video.log('mediatime', mediaid_now,this_position,clicked_product); 
        },500)     
               
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

FlixjQ.fn.video.parsePage = function (d) {

  if( ! d ) return '';
  var 
    qSelectPresent=! ( !! document.all && ! document.querySelector ),
    data={}, df, br, hasOwn={}.hasOwnProperty, get='',
    canonicalCheck, s, found='', h, title='', i, j,

  found=pnurl;
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



FlixjQ.fn.video.log = function (et, ed,this_position) {
    if(typeof FlixjQ.fn.inPage !='undefined' || typeof FlixjQ.fn.minisite!='undefined' || (getUrlParameter('p') && getUrlParameter('l'))){
        _base='//media.flixcar.com'
        if(getUrlParameter('base') && getUrlParameter('base').length>0)
                _base=getUrlParameter('base')

        if(pnurl.search('minisite/show')!=-1){
            log2('minisite.log')
            var 
            data={
                et: et || '',
                ed: ed || '',
                p: getUrlParameter('p') || '',
                d: getUrlParameter('d') || '',
                l: getUrlParameter('l') || '',
                sid: getUrlParameter('sid') || '',            
                mpn: mpn || '',
                ean: getUrlParameter('ean') || '',
                ver:2,
                vtime: this_position || ''           
            },
            d=new Date (),
            t='', 
            _base=_base+'/minisite/log.gif'
            ;
            
        }else {
            log2('inpage.log')
            var
            data={                
                et: et || '',
                ed: ed || '',
                p: getUrlParameter('p') || '',
                d: getUrlParameter('d') || '',
                l: getUrlParameter('l') || '',
                sid: getUrlParameter('sid') || '',
                br: getUrlParameter('br') || '',
                price: getUrlParameter('pr') || '',        
                currency: getUrlParameter('cur') || '',
                ean: getUrlParameter('ean') || '',
                mpn:  mpn || '',
                vtime: this_position || ''     
            },
            d=new Date (),
            t='',
            _base=_base+'/inpage/log.gif'
            ;
            
        }

        d.setMinutes( d.getTimezoneOffset() );
        
        if( ! window.flixJsCallbacks.gvid ) {
            var ticks=3;
            (function threeTicks() {
              if( window.flixJsCallbacks && typeof window.flixJsCallbacks.gvid=='undefined' && ticks ) {
                setTimeout(function(){ 
                  ticks--;
                  threeTicks();
                },100);
              }
              else {
                (function() {
                  if ( document.getElementById('data-flix-t-script') ) return;
                  window['flixgvid']=function(obj){
                    try{
                        delete window['flixgvid'];
                        window.flixJsCallbacks=window.flixJsCallbacks || {};
                        window.flixJsCallbacks['gvid']=obj['gvid'];

                        data.ut = d.getTime ();
                        data.gvid = (window.flixJsCallbacks && window.flixJsCallbacks.gvid) ? window.flixJsCallbacks.gvid : '';
                        
                        var url = _base+"?m=y";
                        if(getUrlParameter('mot') && getUrlParameter('mot').length>0)
                            url+='&mot=1'
                        url += FlixjQ.fn.video.parsePage( data );

                        if( typeof window.flixJsCallbacks.imgCache === 'undefined' ) { window.flixJsCallbacks.imgCache = {};}
                        var track = 'img_' + (new Date).getTime();
                        window.flixJsCallbacks.imgCache[track] = new Image();
                        window.flixJsCallbacks.imgCache[track].src = url;
                        window.flixJsCallbacks.imgCache[track].event_type = data.event_type;
                      
                     }catch(e){}
                  };

                  var _fscript=document.createElement('script');
                  _fscript.setAttribute("type","text/javascript");
                  _fscript.setAttribute("src", "//t.flix360.com/?f=flixgvid");
                  _fscript.setAttribute("async", "true");
                  _fscript.id="data-flix-t-script";
                  document.getElementsByTagName('head')[0].appendChild(_fscript);
                }());
              }
            }());
        }

        if( window.flixJsCallbacks.gvid){
            data.ut = d.getTime ();
            data.gvid = (window.flixJsCallbacks && window.flixJsCallbacks.gvid) ? window.flixJsCallbacks.gvid : '';
            var url = _base+"?m=y";
            if(getUrlParameter('mot') && getUrlParameter('mot').length>0)
                url+='&mot=1'
            url += FlixjQ.fn.video.parsePage( data );

            if( typeof window.flixJsCallbacks.imgCache === 'undefined' ) { window.flixJsCallbacks.imgCache = {};}
            var track = 'img_' + (new Date).getTime();
            window.flixJsCallbacks.imgCache[track] = new Image();
            window.flixJsCallbacks.imgCache[track].src = url;
            window.flixJsCallbacks.imgCache[track].event_type = data.event_type;

            log2(data)
        }
    }   
}




