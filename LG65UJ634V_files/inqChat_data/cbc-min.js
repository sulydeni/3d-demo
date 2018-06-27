window.cobrowse=(function($){var LOG_LEVEL={ERROR:"ERROR",WARN:"WARN",INFO:"INFO"};
var CMD_CURRENT_WINDOW="CW";
var CMD_SUPPRESS="SUPPRESS";
var CMD_HEAD="HEAD";
var CMD_BODYPART="BODYPART";
var CMD_UPDATE="UPD";
var CMD_UPDATEPART="UPDPART";
var CMD_MOUSE_POSITION="MP";
var CMD_WINDOW_UNLOAD="UNLOAD";
var ACTION_CURRENT_WINDOW="currentWindow";
var ACTION_HEAD="head";
var ACTION_RESOURCE="resource";
var ACTION_CHECK_EMBEDDED_RESOURCES="checkEmbeddedResources";
var ACTION_ACTIVE_WINDOW_SET="activeWindowSet";
var ACTION_ACTIVE_WINDOW_UNLOAD="activeWindowUnload";
var CMD_SERVER_ACTIVE_WINDOW_UPDATE="activeWindowUpdate";
var PS_CBC_AUTH="cbcAuth";
var PS_CBC_CHECK="cbcCheck";
var DEFAULT_AUTH_MODE={auth:0};
var isCanvasSupported=!!window.HTMLCanvasElement;
var REPOSITORY_DIRECTORY="cbs/resource";
var cntAlertToAgent=0;
var MAX_ALERT_SENT=2;
var CSS_CLASS_BLOCK_CLICK="tcBlockClick";
var CSS_CLASS_HIGHLIGHT_TEXT="cbHighlightText";
var CSS_CLASS_HIGHLIGHT_INPUTS="cbHilightElement";
var CSS_CLASS_HIGHLIGHT_SELECT="cbHilightSelect";
var highlightInfo={colorMap:{"00ff00":"Lime","00ffff":"Aqua",ff00ff:"Fuchsia",ffbbbb:"Pink",bbffbb:"Reef",bbbbff:"Melrose",bbffff:"Onahau",ffbbff:"Pink Lace",ffffbb:"Shalimar",ffffff:"White"},total:0,id:"highlight_",screenReaderDiv:null,screenReaderId:"injectTargetScreenReader"};
var SUPPORTED_HIGHLIGHT_COLORS=Object.keys(highlightInfo.colorMap);
var activeWindowId=0;
var lastActiveWindowTime=0;
var activeWindow=true;
var authCheckTimer=null;
var TIMERINTERVAL_AUTH_CHECK=5000;
var pageUpdateTimer=null;
var TIMERINTERVAL_PAGE_UPDATE=2500;
var activeWindowSetTimeout=null;
var OUT_OF_QUEUE_ORDER=-1;
var waitingScrollTo=null;
function generateHighlightCssAI(){var result="";
for(var i=0;
i<SUPPORTED_HIGHLIGHT_COLORS.length;
i++){result+=".cbHilightElement"+SUPPORTED_HIGHLIGHT_COLORS[i]+" {width: auto !important; height: auto !important;} ";
result+=".cbHilightElement"+SUPPORTED_HIGHLIGHT_COLORS[i]+" input, .cbHilightElement"+SUPPORTED_HIGHLIGHT_COLORS[i]+" button, .cbHilightElement"+SUPPORTED_HIGHLIGHT_COLORS[i]+" textarea {background-color: #"+SUPPORTED_HIGHLIGHT_COLORS[i]+" !important;}";
result+=".cbHilightSelect"+SUPPORTED_HIGHLIGHT_COLORS[i]+" {background-color: #"+SUPPORTED_HIGHLIGHT_COLORS[i]+" !important; width: auto !important; height: auto !important; }";
result+=".cbHilightSelect"+SUPPORTED_HIGHLIGHT_COLORS[i]+" select {opacity: 0.7; }"
}return result
}var cssHighlightStyleAI=generateHighlightCssAI();
function generateHighlightCssCI(){var result="";
for(var i=0;
i<SUPPORTED_HIGHLIGHT_COLORS.length;
i++){result+=".cbHilightElement"+SUPPORTED_HIGHLIGHT_COLORS[i]+" {width: auto !important; height: auto !important;} ";
result+=".cbHilightElement"+SUPPORTED_HIGHLIGHT_COLORS[i]+" input, .cbHilightElement"+SUPPORTED_HIGHLIGHT_COLORS[i]+" button, .cbHilightElement"+SUPPORTED_HIGHLIGHT_COLORS[i]+" select, .cbHilightElement"+SUPPORTED_HIGHLIGHT_COLORS[i]+" textarea {background-color: #"+SUPPORTED_HIGHLIGHT_COLORS[i]+" !important;}";
result+=".cbHilightSelect"+SUPPORTED_HIGHLIGHT_COLORS[i]+" {width: auto !important; height: auto !important;} ";
result+=".cbHilightSelect"+SUPPORTED_HIGHLIGHT_COLORS[i]+" select {background-color: #"+SUPPORTED_HIGHLIGHT_COLORS[i]+" !important;}"
}return result
}var cssHighlightStyleCI=generateHighlightCssCI();
$.extend({valHooks:{input:{get:function(elem){if(elem.type=="submit"||elem.type=="reset"){var ret=elem.getAttributeNode("value");
return ret?ret.nodeValue:""
}else{return undefined
}}}}});
function isEmbeddedResource(absoluteUrl){return _isSameOrigin(absoluteUrl)&&cobrowse.isEmbeddedResource(absoluteUrl,getPageMarker())
}function generateHashCode(str){if(!str){return 0
}if(Array.prototype.reduce){return str.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);
return a&a
},0)
}var hash=0;
if(str.length===0){return hash
}for(var i=0;
i<str.length;
i++){var character=str.charCodeAt(i);
hash=((hash<<5)-hash)+character;
hash=hash&hash
}return hash
}function isSuppressed(){return Inq.LDM.page?Inq.LDM.page.sup:false
}function getAuthModeFromJson(json,boxID){if(json==null){return DEFAULT_AUTH_MODE
}else{var mode=parseJson(json,DEFAULT_AUTH_MODE);
if(mode==null||!mode.auth){mode=DEFAULT_AUTH_MODE
}if((mode.auth!=0)&&!(mode.auth&cobrowse.ACCEPTED)){if(boxID==PS_CBC_AUTH){notifyAgentUponFailure("Cobrowse enable failed, error code ["+boxID+"]")
}}return mode
}}function removeCobEndButton(){var flashPeer=getFlashPeer();
if(flashPeer!=null){if(cobrowse.isPersistentWindow){try{var cobEndButton=document.getElementById(flashPeer.ciGetCobEndButtonID());
if(cobEndButton!=null){cobEndButton.parentNode.remove()
}}catch(e){logError("Error (removeCobEndButton)",e)
}}}}function supportResponseBodyUtils(){var scriptId="vbScript";
var IEBinaryToArray_ByteStr_Script='Function IEBinaryToArray_ByteStr(Binary)\r\n    IEBinaryToArray_ByteStr = CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n    Dim lastIndex\r\n    lastIndex = LenB(Binary)\r\n    if lastIndex mod 2 Then\r\n        IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n    Else\r\n        IEBinaryToArray_ByteStr_Last = ""\r\n    End If\r\nEnd Function\r\n';
if(!document.getElementById(scriptId)){var vbScript=document.createElement("script");
vbScript.setAttribute("id",scriptId);
vbScript.setAttribute("type","text/vbscript");
vbScript.text=IEBinaryToArray_ByteStr_Script;
document.getElementsByTagName("head")[0].appendChild(vbScript)
}}function getIEByteArray_ByteStr(ieByteArray){var byteMapping={};
for(var i=0;
i<256;
i++){for(var j=0;
j<256;
j++){byteMapping[String.fromCharCode(i+j*256)]=String.fromCharCode(i)+String.fromCharCode(j)
}}var rawBytes=IEBinaryToArray_ByteStr(ieByteArray);
var lastChr=IEBinaryToArray_ByteStr_Last(ieByteArray);
return rawBytes.replace(/[\s\S]/g,function(match){return byteMapping[match]
})+lastChr
}function base64Encode(input){var _keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var output="";
var chr1,chr2,chr3,enc1,enc2,enc3,enc4;
var i=0;
while(i<input.length){chr1=input.charCodeAt(i++)&255;
chr2=input.charCodeAt(i++)&255;
chr3=input.charCodeAt(i++)&255;
enc1=chr1>>2;
enc2=((chr1&3)<<4)|(chr2>>4);
enc3=((chr2&15)<<2)|(chr3>>6);
enc4=chr3&63;
if(isNaN(chr2)){enc3=enc4=64
}else{if(isNaN(chr3)){enc4=64
}}output=output+_keyStr.charAt(enc1)+_keyStr.charAt(enc2)+_keyStr.charAt(enc3)+_keyStr.charAt(enc4)
}return output
}var CSS_REGEXP=/\.css(\?.+)?$/gi;
function isEmbeddedResourceCss(url){return(url.match(CSS_REGEXP))
}function setEmbeddedImageUsingXMLHTTPRequest(url){var xhr=new XMLHttpRequest();
xhr.open("GET",url,false);
xhr.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){try{var data=(cobrowse.isIE)?getIEByteArray_ByteStr(this.responseBody):this.responseText;
var base64Code=base64Encode(data);
putEmbeddedResource(url,base64Code)
}catch(e){logError("Error(setEmbeddedImageUsingXMLHTTPRequest) while calling xhr.onreadystatechange: with"+url,e);
putEmbeddedResource(url,"")
}}else{log("Cannot load image ["+url+"]");
putEmbeddedResource(url,"")
}this.onreadystatechange=null;
xhr=null
}};
xhr.send(null)
}function setEmbeddedImageUsingCanvas(url){var image=new Image();
image.onload=function(){try{var base64Code=getImageBase64DataUsingCanvas(this);
base64Code=base64Code.substring(base64Code.indexOf(",")+1);
putEmbeddedResource(url,base64Code)
}catch(e){logError("Error(setEmbeddedImageUsingCanvas) in image.onload: with"+url,e)("onload in setEmbeddedImageUsingCanvas: "+url);
putEmbeddedResource(url,"")
}};
image.onerror=function(){log("Cannot load image ["+url+"]");
putEmbeddedResource(url,"")
};
image.src=url
}function getImageBase64DataXML(svgNode){var svgXml=(new XMLSerializer()).serializeToString(svgNode);
var image=new Image();
image.src="data:image/svg+xml;base64,"+btoa(svgXml);
return image
}function getImageBase64DataUsingCanvas(image){var canvas=document.createElement("canvas");
canvas.width=image.width;
canvas.height=image.height;
var context=canvas.getContext("2d");
try{context.drawImage(image,0,0)
}catch(e){logWarn("Failed while drawing image using canvas (IE issue).")
}try{var base64Data=canvas.toDataURL()
}catch(e){base64Data="";
logWarn("Failed while drawing image using canvas (security issue).")
}return base64Data
}function getMediaType(styleSheet){try{return styleSheet.media.mediaText
}catch(e){return""
}}function isValidMediaType(styleSheet){var media=getMediaType(styleSheet);
if(!media||media==""||media.indexOf("all")!=-1||media.indexOf("screen")!=-1||media.indexOf("projection")!=-1){return true
}return false
}function setEmbeddedResourceCssContent(url){var parentResourceUrl=url.substring(0,url.lastIndexOf("/")+1);
var styleSheet=findStyleSheetByUrl(url,parentResourceUrl);
if(styleSheet&&isValidMediaType(styleSheet)){var data=fixCssTextInStyleSheet(styleSheet,parentResourceUrl);
var base64Data=base64Encode(data);
putEmbeddedResource(url,base64Data)
}else{logError("Error while filling embedded CSS resource data: "+url)
}function findStyleSheetByUrl(url,parentResourceUrl){for(var i=0;
i<parent.document.styleSheets.length;
i++){var styleSheet=parent.document.styleSheets[i];
var convertedUrl=convertToAbsoluteUrl(styleSheet.href,parentResourceUrl);
if(styleSheet.href&&convertedUrl==url){return styleSheet
}else{var currentCssLocation=convertedUrl.substring(0,convertedUrl.lastIndexOf("/")+1);
var searchResult=findImportedCssByUrl(styleSheet,currentCssLocation,url);
if(searchResult){return searchResult
}}}}function findImportedCssByUrl(styleSheet,parentResourceUrl,url){var rules=styleSheet.cssRules||styleSheet.rules;
if(rules!=null){for(var j=0;
j<styleSheet.cssRules.length;
j++){var rule=styleSheet.cssRules[j];
if(rule.href&&rule.styleSheet){var convertedUrl=convertToAbsoluteUrl(rule.href,parentResourceUrl);
if(convertedUrl==url){return rule.styleSheet
}else{var searchResult=findImportedCssByUrl(rule.styleSheet,convertedUrl,url);
if(searchResult){return searchResult
}}}}}}}function replaceUnsupportedCss(rules){for(var j=0;
j<rules.length;
j++){rules[j]=fixAngularRelatedCSS(rules[j]);
rules[j]=removeUnsupportedUnicode(rules[j])
}return rules;
function removeUnsupportedUnicode(rule){var range=[57344,63743];
for(var i=0;
i<rule.length;
i++){if(range[0]<=rule[i].charCodeAt(0)&&rule[i].charCodeAt(0)<=range[1]){rule=rule.replace(rule[i],"")
}}return rule
}}function sendEmbeddedResourceToCobrowseServer(origUrl,base64Code,hash){var url=getEmbeddedResourceURL(origUrl);
sendToCBS(ACTION_RESOURCE,base64Code,"action="+ACTION_RESOURCE+"&url="+encodeURIComponent(url)+"&originalurl="+encodeURIComponent(origUrl)+"&hash="+encodeURIComponent(hash))
}function getFullEmbeddedResourceURL(url){return Inq.urls.cobrowseURL+"/cobrowse"+getEmbeddedResourceURL(url)
}var URL_REGEXP_DELETE_DOMAIN=/http[s]?:\/\/[\w.:-]+\/(.*)/;
function getEmbeddedResourceURL(url){var path="/"+url.match(URL_REGEXP_DELETE_DOMAIN)[1];
return"/"+REPOSITORY_DIRECTORY+path+((path.indexOf("?")==-1)?"?":"&")+"engagementID="+getChatID()
}var resources={};
var STATE_NEW=0;
var STATE_CHECKED=1;
var STATE_SENT=2;
function addEmbeddedResource(absoluteUrl){if(!resources[absoluteUrl]){resources[absoluteUrl]={state:STATE_NEW,correctedUrl:getEmbeddedResourceURL(absoluteUrl),hash:null,data:null};
setEmbeddedResourceData(absoluteUrl)
}}function putEmbeddedResource(url,data){if(!resources[url]){resources[url]={state:STATE_CHECKED,correctedUrl:getEmbeddedResourceURL(url)};
logInfo("Info(putEmbeddedResource): Add unknown resource ["+url+"].")
}resources[url].data=data;
resources[url].hash=generateHashCode(data)
}function overrideUnsupportedStyles(el){var computedStyle=getComputedStyle(el)||window.parent.getComputedStyle(el);
if(!computedStyle){return""
}var resultStyle="-webkit-box-sizing: "+computedStyle.getPropertyValue("box-sizing")+" !important; -webkit-background-origin: "+computedStyle.getPropertyValue("background-origin")+" !important; -webkit-background-size: "+computedStyle.getPropertyValue("background-size")+" !important; ";
if(el.nodeName.toUpperCase()=="SPAN"&&computedStyle.getPropertyValue("display")=="block"){resultStyle+="display: inline-block !important; "
}if(window.parent.getComputedStyle(el.parentElement).getPropertyValue("display")=="table-cell"&&computedStyle.getPropertyValue("position")=="absolute"){resultStyle+=" top: "+el.offsetTop+"px; ";
resultStyle+=" left: "+el.offsetLeft+"px; "
}if(computedStyle.getPropertyValue("display")=="table"&&computedStyle.getPropertyValue("table-layout")=="fixed"){resultStyle+=" table-layout: auto !important; "
}return resultStyle
}function createExecuteAttrProcessor(inlineAttr){return function(node,tagfilter,attrProcessor){var overrides=tagfilter.attributes?tagfilter.attributes:{};
for(var i=0;
i<node.attributes.length;
i++){var attr=node.attributes[i];
if(attr.specified){var attrName=attr.name.toLowerCase();
if(overrides[attrName]===undefined){attrProcessor(node,attrName,attr.value)
}}}for(var a in overrides){var value=overrides[a](node);
if(value!=null){inlineAttr(a,value)
}}var $this=$(node);
var val=$this.val();
if(val){val=val.toString();
if(val){inlineAttr("value",htmlFilter.content($this,val))
}}if(!node.attributes.getNamedItem("style")){attrProcessor(node,"style",null)
}}
}function createDefaultAttributeProcessor(inlineAttr,attrFilter){return function(obj,name,value){var attrProcessor=attrFilter[name];
if(attrProcessor){attrProcessor(obj,name,value)
}else{if(value!=null){inlineAttr(name,value)
}}}
}$.fn.generateHtml=function(){function drop(){}function empty(){}function bk(str){return function(){return str
}
}function normalizeDimension(value){if(jQuery.isNumeric(value)){return value+"px"
}return value
}var ATTR_FILTERS={onblur:drop,onchange:drop,onclick:drop,ondblclick:drop,onfocus:drop,onkeydown:drop,onkeypress:drop,onkeyup:drop,onload:drop,onmousedown:drop,onmousemove:drop,onmouseout:drop,onmouseover:drop,onmouseup:drop,onreset:drop,onselect:drop,onsubmit:drop,onunload:drop,sizcache:drop,sizset:drop,tealeaf:drop,container:drop,advisorfilter:drop,filter:drop,value:drop,style:function(obj,name,value){try{inlineAttr(name,replaceUrlsByAbsolute(obj.style.cssText.toLowerCase())+overrideUnsupportedStyles(obj))
}catch(e){logError("Error (style processing)",e)
}},src:function(obj,name,value){var url=convertToAbsoluteUrl(value);
if(obj.tagName&&obj.tagName.toLowerCase()=="img"&&value.indexOf("data:image")==-1&&isEmbeddedResource(url)){try{inlineAttr(name,getFullEmbeddedResourceURL(url));
addEmbeddedResource(url,obj)
}catch(e){log("Cannot embed the image "+value);
inlineAttr(name,url)
}}else{if(obj.tagName&&obj.tagName.toLowerCase()=="img"&&(value.indexOf("data:image/svg+xml;")!=-1||value.indexOf(".svg")!=-1)){try{inlineAttr(name,getImageBase64DataUsingCanvas(obj))
}catch(e){logInfo("Cannot convert the image "+value);
inlineAttr(name,url)
}}else{inlineAttr(name,url)
}}},href:function(obj,name,value){inlineAttr("onclick","window.whenClicked(this); return false;");
inlineAttr(name,convertToAbsoluteUrl(value))
},background:function(obj,name,value){inlineAttr(name,convertToAbsoluteUrl(value))
},"data-content":empty,"aria-label":empty};
var defaultAttributeProcessor=createDefaultAttributeProcessor(inlineAttr,ATTR_FILTERS);
var DEFAULT_TAG_FILTER={attrProcessor:defaultAttributeProcessor};
function getComputedStyleValue(node,prop){try{if(parent.window.getComputedStyle){return parent.window.getComputedStyle(node).getPropertyValue(prop)
}}catch(e){logError("Error(getComputedStyleValue): ",e)
}return"auto"
}function getFakeTag(tagName){var obj={processTagBody:drop,attrProcessor:drop};
if(typeof tagName==="string"){obj.tag=tagName.toLowerCase()
}return obj
}function generateStyle(obj,backgroundImage,tag){var styleStr="";
if(tag=="span"||tag=="svg"||tag=="canvas"){styleStr+="display:inline-block;"
}if(backgroundImage){styleStr+="background:url("+backgroundImage+") no-repeat center white;"
}var height=obj.height;
if(!height){height=getComputedStyleValue(obj,"height")
}if(height){styleStr+="height:"+normalizeDimension(height)+";"
}var width=obj.width;
if(!width){width=getComputedStyleValue(obj,"width")
}if(width){styleStr+="width:"+normalizeDimension(width)+";"
}return styleStr
}var EMBED_TAG_FILTER=getFakeTag("embed");
EMBED_TAG_FILTER.attributes={style:function(node){return generateStyle(node,getServerPath()+"flash_logo.png")
}};
var OBJECT_TAG_FILTER=getFakeTag("object");
OBJECT_TAG_FILTER.attributes={style:function(node){return generateStyle(node,getServerPath()+"flash_logo.png")
}};
var HIDDEN_TAG_FILTER=getFakeTag(null);
HIDDEN_TAG_FILTER.attributes={style:function(node){return"visibility: hidden;"+generateStyle(node)
}};
var DISPLAY_NONE_TAG_FILTER=getFakeTag(null);
DISPLAY_NONE_TAG_FILTER.attributes={style:function(node){return"display: none;"+generateStyle(node)
}};
var SVG_TAG_FILTER=getFakeTag("svg");
SVG_TAG_FILTER.attributes={style:function(node){try{var image=getImageBase64DataXML(node);
return generateStyle(image,getImageBase64DataUsingCanvas(image),SVG_TAG_FILTER.tag)
}catch(e){logError("Error(SVG_TAG_FILTER.attributes = { style: function(node) })",e);
return generateStyle(node,null,SVG_TAG_FILTER.tag)
}}};
var CANVAS_TAG_FILTER=getFakeTag("canvas");
CANVAS_TAG_FILTER.attributes={style:function(node){try{var image=node.toDataURL();
return generateStyle(node,image,CANVAS_TAG_FILTER.tag)
}catch(e){logWarn("Failed while drawing image using canvas (security issue).");
return generateStyle(node,"",CANVAS_TAG_FILTER.tag)
}}};
var TAG_FILTERS={div:{filter:function(obj){return(obj.id==DIV_ID_COBROWSE_BANNER||obj.id==DIV_ID_CHAT_SKIN)?false:true
}},area:{allowEmpty:true},base:{allowEmpty:true},basefont:{allowEmpty:true},br:{allowEmpty:true},col:{allowEmpty:true},frame:{allowEmpty:true},hr:{allowEmpty:true},img:{allowEmpty:true,attributes:{style:function(obj){var styleStr="";
["height","width"].forEach(function(attribute){if((!obj.getAttribute(attribute))&&(!obj.style[attribute])&&(obj[attribute])){styleStr+=attribute+":"+obj[attribute]+"px;"
}});
return styleStr+obj.style.cssText
}}},isindex:{allowEmpty:true},link:{allowEmpty:true},meta:{allowEmpty:true},param:{allowEmpty:true},keygen:{allowEmpty:true},menuitem:{allowEmpty:true},source:{allowEmpty:true},track:{allowEmpty:true},wbr:{allowEmpty:true},object:OBJECT_TAG_FILTER,embed:EMBED_TAG_FILTER,svg:SVG_TAG_FILTER,canvas:CANVAS_TAG_FILTER,iframe:{attributes:{src:bk(""),"class":function(obj){return(obj.id=="inqChatStage")?"chatWindow":obj["class"]
},style:function(obj){if(obj.id=="inqChatStage"&&(Inq.CHM.isPersistentChatActive()||isChatMinimized())){return"display: none !important; visibility: hidden;"
}return(obj.style&&obj.style.cssText)?obj.style.cssText:null
}}},form:{attributes:{action:bk("return false;"),onsubmit:bk("return false;"),target:bk("_this")}},input:{allowEmpty:true,attributes:{checked:function(obj){if(obj.checked){inlineAttr("checked","checked")
}},readonly:function(obj){inlineAttr("readonly","readonly")
}}},select:{processTagBody:function(obj){if(obj.options.length>0&&obj.selectedIndex!=-1){var option=obj.options[obj.selectedIndex];
data.push("<option>",htmlFilter.content($(obj),option.text),"</option>")
}}},textarea:{attributes:{readonly:function(obj){inlineAttr("readonly","readonly")
}},processTagBody:function(obj){data.push(htmlFilter.content($(obj),escaleNLinTextarea(obj.value)))
}},style:empty,script:empty,noscript:empty};
var data=[];
function inlineAttr(name,value){data.push(" ",name,'="',replaceSpclCharsToSendToAI(value),'"')
}var executeAttrProcessor=createExecuteAttrProcessor(inlineAttr);
function processor(){if(this.nodeType==1){var tag=this.tagName.toLowerCase();
var tagfilter;
if(htmlFilter.isHiddenNode&&htmlFilter.isHiddenNode($(this))){if(this.style.display=="none"){tagfilter=DISPLAY_NONE_TAG_FILTER
}else{tagfilter=HIDDEN_TAG_FILTER
}tagfilter.tag=tag
}else{tagfilter=TAG_FILTERS[tag];
if(!tagfilter){tagfilter=DEFAULT_TAG_FILTER
}}if(authorized&&(authorized.auth&cobrowse.SHARED_CONTROL)){if(htmlFilter.isBlockClickNode&&htmlFilter.isBlockClickNode($(this))){if(this.className.indexOf(CSS_CLASS_BLOCK_CLICK)==-1){this.className+=" "+CSS_CLASS_BLOCK_CLICK
}}}if(tagfilter!==drop&&(!tagfilter.filter||tagfilter.filter(this))){data.push("<",tagfilter.tag?tagfilter.tag:tag);
if(tagfilter!==empty){executeAttrProcessor(this,tagfilter,tagfilter.attrProcessor?tagfilter.attrProcessor:defaultAttributeProcessor)
}if(tagfilter.allowEmpty){data.push("/>")
}else{data.push(">");
if(tagfilter!==empty){if(tagfilter.processTagBody){tagfilter.processTagBody(this)
}else{$(this.childNodes).generateHtmlInternal(processor)
}}data.push("</",tagfilter.tag?tagfilter.tag:tag,">")
}}}else{if(this.nodeType==3&&htmlFilter.contentNode){data.push(htmlFilter.contentNode(this))
}}}this.generateHtmlInternal(processor);
return data
};
$.fn.generateHtmlInternal=function(processor){this.each(processor)
};
function escaleNLinTextarea(value){return value.split("&nl;").join("&&nnll;;")
}var DATA_PACKAGE_SIZE_LIMIT=32000;
var COOKIE_COBROWSE="cobrowse";
var COOKIE_EXPIRATION=24*60*60;
var DIV_ID_COBROWSE_BANNER="tcCobrowseBannerDiv";
var DIV_ID_TERMS_AND_CONDITIONS="tcCbTermsAndConditions";
var DIV_ID_TERMS_CLOSE="tcCbTermsAndConditionsClose";
var DIV_ID_CHAT_SKIN="tcChat_Skin";
var isAcceptedPage=false;
var lastMouse={X:-1,Y:-1};
var mouse={X:-1,Y:-1};
var modified=false;
var authorized=null;
var bodyLength=-1;
var postQueue=[];
var sequence=1;
var client_csq=0;
var lastBodySentArray=[];
var scrollInfo={width:0,height:0,left:0,top:0,brwsrHeight:0,brwsrWidth:0};
var htmlFilter={};
var cmdRequest;
function getJsonpUrl(){return Inq.urls.cobrowseURL+"/cobrowse/logging/logjavascript"
}function log(text,send2server,level){if(typeof Inq!="undefined"&&Inq.log!=null){Inq.log("CBC: "+text)
}if(send2server===true){sendByJsonP(getJsonpUrl(),text,level||LOG_LEVEL.INFO)
}}function logInfo(message){log(message,true)
}function logWarn(message){log(message,true,LOG_LEVEL.WARN)
}function logError(message,e){var errorDetails="["+getFullBrowserInfo()+"] "+message+", URL: "+top.document.URL;
if(logError.caller!=null){errorDetails+=", at:"+logError.caller.toString().split("{")[0]
}if(e&&e.message){errorDetails+=", "+e.message;
if(e.stack!=null){errorDetails+=",\nStack Trace:"+e.stack
}}log(errorDetails,true,LOG_LEVEL.ERROR);
return function(value){log("   Trace value:["+value+"]")
}
}function sendByJsonP(url,data,level){var jpMsg="cob.client"+(level=="ERROR"?"Error":"Info")+"?cid="+getChatID()+"&wid="+cobrowse.windowId+"&message="+data;
var d=new Date();
var jpData={logger:"Cobrowse",timestamp:d.getTime(),level:level,url:window.location.href,message:jpMsg,layout:"JsonLayout"};
$.ajax({type:"GET",url:url,contentType:"application/json",dataType:"jsonp",data:jpData})
}function notifyAgentUponFailure(message){try{if(cntAlertToAgent<MAX_ALERT_SENT){cntAlertToAgent++;
getFlashPeer().ciSendMessageQuietly(message)
}}catch(e){logError("Error(notifyAgentUponFailure) message="+message,e)
}}function getCheckSum(value){var sum=305419896;
try{for(var i=0;
i<value.length;
i++){sum+=(value.charCodeAt(i)*i)
}}catch(e){return -1
}return sum
}function parseJson(json,defaultValue){try{return Inq.CM.JSON.parse(json)
}catch(e){logError("Error(parseJson) json="+json,e)("json:"+json);
return defaultValue
}}function getFlashMovieObject(movieName){if(window.document[movieName]!=null){return window.document[movieName]
}if(!cobrowse.isIE){if(document.embeds&&document.embeds[movieName]){return document.embeds[movieName]
}else{return document.getElementById(movieName)
}}else{return document.getElementById(movieName)
}}function saveInputs(inputs,valueFunction){var storage=[];
for(var ix=0;
ix<inputs.length;
ix++){var input=inputs[ix];
storage.push({input:input,value:valueFunction(input,ix)})
}return storage
}function initStorage(inputType){inputType.storage=saveInputs(inputType.getElements(),inputType.getValue)
}var existHighlightStyle=false;
function setHighlightStyle(){if(!existHighlightStyle){existHighlightStyle=true;
var highlightStyle=document.createElement("STYLE");
highlightStyle.type="text/css";
if(highlightStyle.styleSheet){highlightStyle.styleSheet.cssText=cssHighlightStyleCI
}else{highlightStyle.innerHTML=cssHighlightStyleCI
}var head=parent.document.getElementsByTagName("HEAD")[0];
head.appendChild(highlightStyle)
}}var banner=function(){var divs=false;
var circularModalWindowSet=false;
function createBannerDiv(){var div=parent.document.createElement("DIV");
div.id=DIV_ID_COBROWSE_BANNER;
div.setAttribute("aria-live","polite");
div.style.display="none";
parent.document.body.appendChild(div);
setStandardAndSuppressedBanner();
return{banner:parent.document.getElementById(DIV_ID_COBROWSE_BANNER),terms:parent.document.getElementById(DIV_ID_TERMS_AND_CONDITIONS),termsClose:parent.document.getElementById(DIV_ID_TERMS_CLOSE)}
}function toggle(div,visible){if(div){var theDisplay=div.style.display;
if(visible===true){if(theDisplay!=="block"){div.style.display="block";
adjustRestoreDivForCob()
}}else{if(theDisplay!=="none"){div.style.display="none";
adjustRestoreDivForCob()
}}}}var proccessedBannerCSS=false;
function setStandardAndSuppressedBanner(){var bannerText=getBannerText();
if(bannerText){var div=setCobrowseBannerText(bannerText);
if(!proccessedBannerCSS){proccessedBannerCSS=true
}}}function getBannerText(){var suppressedBannerText=Inq.FlashPeer.getLocalizedMessage("cobrowseSuppressedBanner",true);
if(isSuppressed()&&suppressedBannerText){return suppressedBannerText
}else{return Inq.FlashPeer.getLocalizedMessage("cobrowseBanner",true)
}}function setCobrowseBannerText(bannerText){var topDoc=parent.document;
var div=topDoc.getElementById(DIV_ID_COBROWSE_BANNER);
if(div&&(bannerText)){div.innerHTML=bannerText;
if(Inq.FlashPeer.getDeviceType()==="Phone"){var divInqC2CMob=topDoc.getElementById("inqC2CMobDiv");
if(divInqC2CMob&&divInqC2CMob.style.opacity!=0){divInqC2CMob.setAttribute("origOpacity",divInqC2CMob.style.opacity);
divInqC2CMob.style.opacity=0
}}}return div
}function extractCssToHead(div){var head=parent.document.getElementsByTagName("HEAD")[0];
if(head&&div){var links=div.getElementsByTagName("LINK");
for(var i=0;
i<links.length;
i++){var link=document.createElement("LINK");
link.type="text/css";
link.rel="stylesheet";
link.href=links[i].href;
head.appendChild(link);
links[i].parentNode.removeChild(links[i])
}var styles=div.getElementsByTagName("STYLE");
for(var i=0;
i<styles.length;
i++){var style=document.createElement("STYLE");
style.type="text/css";
head.appendChild(style);
if(style.styleSheet){style.styleSheet.cssText=styles[i].innerHTML+cssHighlightStyleCI
}else{style.innerHTML=styles[i].innerHTML+cssHighlightStyleCI
}styles[i].parentNode.removeChild(styles[i])
}}}function adjustRestoreDivForCob(){try{if(Inq.FlashPeer.getDeviceType()==="Phone"){var topDoc=parent.document;
var divMinimized=topDoc.getElementById("tcChat_Minimized");
var divRestore=topDoc.getElementById("tcChat_btnRestore");
var divCobDiv=topDoc.getElementById("tcCobrowseBannerDiv");
var divCobInnerDiv=topDoc.getElementById("tcCob");
var divInqC2CMob=topDoc.getElementById("inqC2CMobDiv");
if(divMinimized&&divCobDiv&&divCobInnerDiv){if(divCobDiv.style.display=="none"){if(divMinimized.hasAttribute("origBottomPosition")){divMinimized.style.bottom=divMinimized.getAttribute("origBottomPosition");
divMinimized.removeAttribute("origBottomPosition")
}if(divRestore.hasAttribute("origPosition")){divRestore.style.position=divRestore.getAttribute("origPosition");
divRestore.removeAttribute("origPosition")
}if(divInqC2CMob&&divInqC2CMob.hasAttribute("origOpacity")){divInqC2CMob.style.opacity=divInqC2CMob.getAttribute("origOpacity");
divInqC2CMob.removeAttribute("origOpacity")
}}else{if(divCobDiv.style.display!="none"){if(!divMinimized.hasAttribute("origBottomPosition")){divMinimized.setAttribute("origBottomPosition",divMinimized.style.bottom);
divMinimized.style.bottom=(parseFloat(divMinimized.style.bottom)+parseFloat(divCobInnerDiv.clientHeight))+"px"
}if(!divRestore.hasAttribute("origPosition")){divRestore.setAttribute("origPosition",divRestore.style.position);
divRestore.style.position="absolute"
}if(divInqC2CMob&&divInqC2CMob.style.opacity!=0){divInqC2CMob.setAttribute("origOpacity",divInqC2CMob.style.opacity);
divInqC2CMob.style.opacity=0
}}}}}}catch(e){logError("Error(adjustRestoreDivForCob): ",e)
}}function toggleMenuBoxForCob(visible){try{var innerMenu=window.top.document.getElementById("hamBugMenuBoxId");
var aElm;
if(innerMenu){if(visible===false||innerMenu.style.display=="block"){innerMenu.style.display="none"
}else{innerMenu.style.display="block";
aElm=window.top.document.querySelector("#hamBugMenuBoxId a:first-of-type");
if(aElm){window.setTimeout(function(){aElm.focus()
},5000)
}}}}catch(e){logError("Error(toggleMenuBoxForCob): ",e)
}}function toggleTermsAndConditionDivForCob(visible){try{var tncObj=window.top.document.getElementById("termsAndCondId");
if(tncObj){toggleMenuBoxForCob(false);
if(visible===false||tncObj.style.display=="block"){tncObj.style.display="none"
}else{tncObj.style.display="block";
tncObj.style.width=(window.top.innerWidth)+"px";
tncObj.style.width=(parseFloat((window.top.innerWidth))-2)+"px";
tncObj.style.height=(parseFloat(window.top.innerheight)-parseFloat(window.top.document.getElementById("hamBugMenuBoxId").clientHeight))+"px"
}}}catch(e){logError("Error(toggleTermsAndConditionDivForCob): ",e)
}}return{termsAndConditions:function(visible){if(divs.terms){toggle(divs.terms,visible)
}if(divs.termsClose){toggle(divs.termsClose,visible)
}},hide:function(){toggleMenuBoxForCob(false);
toggle(divs.banner,false);
this.termsAndConditions(false)
},show:function(){if(!divs){divs=createBannerDiv()
}window.setTimeout(function(){toggle(divs.banner,true)
},3000)
},adjustRestoreDivForCobBannerRef:function(){adjustRestoreDivForCob()
},toggleTermsAndConditionDivForCobBannerRef:function(){toggleTermsAndConditionDivForCob()
},toggleMenuBoxForCobBannerRef:function(){toggleMenuBoxForCob()
}}
}();
var inputTypes={input:{getValue:function(input){switch(input.type.toUpperCase()){case"TEXT":return input.value;
case"CHECKBOX":case"RADIO":return""+input.checked;
default:return null
}},getElements:function(){return parent.document.getElementsByTagName("INPUT")
},cmd:"INP",getCmdData:function(ix,value,input){return{IX:ix,VALU:htmlFilter.content($(input),value)}
}},select:{getValue:function(element){return element.options.length>0&&element.selectedIndex!=-1?htmlFilter.content($(element),element.options[element.selectedIndex].text):""
},getElements:function(){return parent.document.getElementsByTagName("SELECT")
},cmd:"SEL",getCmdData:function(ix,value){return{IX:ix,OPTION:value}
}},textArea:{getValue:function(element){return element.value
},getElements:function(){return parent.document.getElementsByTagName("TEXTAREA")
},cmd:"TA",getCmdData:function(ix,value,input){return{IX:ix,TEXT:htmlFilter.content($(input),escaleNLinTextarea(value))}
}},swf:{getValue:function(element){var movie=getFlashMovieObject(element.name);
if(movie==null){movie=element
}try{return movie.TGetProperty("/",4)
}catch(e){logError("Error(inputTypes.swf.getValue)",e)("inputTypes.swf -> movie.TGetProperty")
}return 0
},getElements:function(){var objects=parent.document.getElementsByTagName("OBJECT");
var swfs=[];
for(var i=0;
i<objects.length;
i++){var obj=objects[i];
var codebase=(null==obj.codeBase)?"":obj.codeBase.toLowerCase();
var guid=(null==obj.classid)?"":obj.classid.toLowerCase();
if((codebase.indexOf("http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab")==0)||(guid=="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000")){if(obj.id==""){obj.id="movie_"+(swfs.length)
}if(obj.name==""){obj.name=obj.id
}if(obj.name!=obj.id){obj.id=obj.name
}swfs.push(obj)
}}return swfs
},cmd:"SWF",getCmdData:function(ix,value){return{IX:ix,FRAME:value}
}}};
function forAllInputTypes(fn){for(var p in inputTypes){if(inputTypes.hasOwnProperty(p)){fn(inputTypes[p])
}}}function requestAICommand(){var url=getServerPath()+"cbs/command.js?"+ajaxParams()+"&CSQ="+client_csq+"&lastActiveWindowTime="+lastActiveWindowTime;
var settings={dataType:"script",timeout:60000};
cmdRequest=$.ajax(url,settings).fail(function(){cmdRequest=null
})
}function sendCommandCheckEmbeddedResources(){var data=[];
for(var url in resources){if(resources[url].state==STATE_NEW&&(resources[url].hash!=null)){data.push(url+","+resources[url].correctedUrl+","+resources[url].hash);
resources[url].state=STATE_CHECKED
}}if(data.length>0){sendToCBS(ACTION_CHECK_EMBEDDED_RESOURCES,data.join(";"),"action="+ACTION_CHECK_EMBEDDED_RESOURCES)
}}function sendCommandActiveWindowSet(time){if(isValidChatID()){sendCommandToCBS(ACTION_ACTIVE_WINDOW_SET,"","action="+ACTION_ACTIVE_WINDOW_SET+"&timestamp="+time)
}}var commandIndex=0;
function sendToCBS(command,data,params){if(authorized){sendCommandToCBS(command,data,params)
}}function sendCommandToCBS(command,data,params,postToServerCommand){if(!postToServerCommand){postToServerCommand="COBROWSE"
}var url=getServerPath()+"cbs/cobrowse?SEQ=n&APG="+isAcceptedPage+"&"+ajaxParams()+(params?"&"+params:"");
try{var queueItem={command:command,request:[postToServerCommand,"",Inq.getSiteID(),getInqFrameUrl(),url,data]};
if(queueItem.command===CMD_CURRENT_WINDOW||queueItem.command===CMD_SUPPRESS){postQueue.unshift(queueItem)
}else{postQueue.push(queueItem)
}postQueueItem(false)
}catch(e){log("Error: "+e.message)
}}var waitingAnswer=false;
var lastCommandTime=0;
function postQueueItem(flagStopWaiting){if(flagStopWaiting){waitingAnswer=false
}if(!waitingAnswer&&postQueue.length==0){lastCommandTime=-1
}if(!waitingAnswer&&postQueue.length>0){waitingAnswer=true;
var item=postQueue.shift();
var seq=item.command===ACTION_ACTIVE_WINDOW_UNLOAD||item.command===ACTION_ACTIVE_WINDOW_SET?OUT_OF_QUEUE_ORDER:sequence++;
var boxID=item.command+(commandIndex++);
item.boxID=boxID;
item.request[1]=boxID;
item.request[4]=item.request[4].replace("?SEQ=n&","?SEQ="+seq+"&");
var currentCommand=item.command;
if(currentCommand==CMD_HEAD||currentCommand==CMD_BODYPART){if(lastCommandTime!=-1){item.request[4]+="&deltaTime="+(now()-lastCommandTime)
}if(item.request[4].indexOf("&action=")==-1){item.request[4]+="&action="+currentCommand
}}Inq.FlashPeer.postRequestToIframeProxy(getServerPath(),item.request,item.request[1],getCallbackContext());
lastCommandTime=now()
}}function loadComplete(context){if(context){if(context.eval){eval(context.data)
}}}function ajaxParams(){return"engagementID="+getChatID()+"&WID="+cobrowse.windowId
}function xmlElement(elementName,elementBody){return"<"+elementName+">"+elementBody+"</"+elementName+">"
}function sendCommand(command,data,params){var dataStrings=[];
for(var p in data){if(data.hasOwnProperty(p)){dataStrings.push(xmlElement(p,data[p]))
}}sendToCBS(command,xmlElement(command,dataStrings.join("")),params?params:"")
}function xmlCdata(elementBody){return"<![CDATA["+elementBody+"]]>"
}function getFromDocumentElementOrBody(name){return(parent.document.documentElement!=null&&!!parent.document.documentElement[name])?parent.document.documentElement[name]:parent.document.body[name]
}function addScrollData(data){data.BRWSR_HEIGHT=scrollInfo.brwsrHeight;
data.BRWSR_WIDTH=scrollInfo.brwsrWidth;
data.SCRLL_HEIGHT=scrollInfo.height;
data.SCRLL_WIDTH=scrollInfo.width;
data.SCRLL_LEFT=scrollInfo.left;
data.SCRLL_TOP=scrollInfo.top;
return data
}function addHostedLocation(data){data.LOC=getParentURL();
return data
}function getParentURL(){return parent.location.href
}function getServerPath(){var cobURL=Inq.urls.cobrowseURL;
if(cobURL.indexOf("https")==-1){cobURL=cobURL.replace("http","https")
}return cobURL+"/cobrowse/"
}function getCookiePath(){return Inq.CM.getIFrameBaseURL()
}function onMouseMove(ev){var e=ev?ev:event;
mouse.X=e.pageX!=null?e.pageX:getFromDocumentElementOrBody("scrollLeft")+e.clientX;
mouse.Y=e.pageY!=null?e.pageY:getFromDocumentElementOrBody("scrollTop")+e.clientY;
return true
}function mouseChanged(){if(mouse.X!=lastMouse.X||mouse.Y!=lastMouse.Y){lastMouse.X=mouse.X;
lastMouse.Y=mouse.Y;
return lastMouse
}return false
}function checkForInputChanges(inputType){var storage=inputType.storage;
if(storage){for(var ix=0;
ix<storage.length;
ix++){var item=storage[ix];
var value=inputType.getValue(item.input,ix);
if(item.value!=value){sendCommand(inputType.cmd,inputType.getCmdData(ix,value,item.input));
item.value=value
}}}else{var e=new Error(" storage is undefined (inputType.cmd="+inputType.cmd+")");
logError("Error (checkForInputChanges)",e)
}}function getScrollingPosition(){var position=[0,0];
if(typeof parent.window.pageYOffset!="undefined"){position=[parent.window.pageXOffset,parent.window.pageYOffset]
}else{if(typeof parent.document.documentElement.scrollLeft!="undefined"&&typeof parent.document.documentElement.scrollTop!="undefined"&&(parent.document.documentElement.scrollLeft>0||parent.document.documentElement.scrollTop>0)){position=[parent.document.documentElement.scrollLeft,parent.document.documentElement.scrollTop]
}else{if(typeof parent.document.body.scrollTop!="undefined"){position=[parent.document.body.scrollLeft,parent.document.body.scrollTop]
}}}return position
}function updateScrollChanges(){var changed=false;
var scrollPosition=getScrollingPosition();
var clientHeight=getFromDocumentElementOrBody("clientHeight");
var scrollHeight=getFromDocumentElementOrBody("scrollHeight");
var scrollInfoUpdate={width:top.innerWidth,height:clientHeight,left:scrollPosition[0],top:scrollPosition[1],brwsrHeight:scrollHeight,brwsrWidth:getFromDocumentElementOrBody("scrollWidth")};
if(clientHeight>scrollHeight){scrollInfoUpdate.brwsrHeight=clientHeight;
scrollInfoUpdate.height=top.innerHeight
}if(scrollInfo.height!=scrollInfoUpdate.height||scrollInfo.width!=scrollInfoUpdate.width||scrollInfo.left!=scrollInfoUpdate.left||scrollInfo.top!=scrollInfoUpdate.top||scrollInfo.brwsrHeight!=scrollInfoUpdate.brwsrHeight||scrollInfo.brwsrWidth!=scrollInfoUpdate.brwsrWidth){scrollInfo=scrollInfoUpdate;
changed=true
}return changed
}function windowHasFocus(){return window.parent.document.hasFocus()
}var browserInfo="";
function getFullBrowserInfo(){if(!browserInfo&&typeof Inq!="undefined"&&Inq.getFullBrowserInfo){browserInfo=Inq.getFullBrowserInfo()
}return browserInfo
}function getAgentID(){if(typeof Inq!="undefined"&&(Inq.CHM)){return Inq.CHM.getAgentID()
}else{log("chat manager [Inq.CHM] is not initialized")
}return 0
}function isValidAgentID(){return(getAgentID()!=""&&getAgentID()!=0)
}function getChatID(){if(typeof Inq!="undefined"&&(Inq.CHM)){return Inq.CHM.getChatID()
}else{log("chat manager [Inq.CHM] is not initialized")
}return"0"
}function isValidChatID(){return(getChatID()!="0")
}function whenActiveWindow(){if(isValidChatID()&&authorized){if(cobrowse.isPersistentWindow){return
}if(activeWindow||windowHasFocus()){if(top.document.visibilityState==="visible"){sendCommand(CMD_CURRENT_WINDOW,{},"action="+ACTION_CURRENT_WINDOW+"&timestamp="+lastActiveWindowTime)
}if(isSuppressed()){sendCommand(CMD_SUPPRESS,{MODE:authorized.auth,MESSAGE:Inq.getLocalizedMessage("cobrowseSuppressed")})
}}restartPageUpdateTimer()
}}function getHTML(flagSendCW){try{lastBodySentArray=[];
if(isValidChatID()){if(isSuppressed()){if(authorized){sendCommand(CMD_SUPPRESS,{MODE:authorized.auth,MESSAGE:Inq.getLocalizedMessage("cobrowseSuppressed")});
cobrowseSuppressedPage()
}}else{if(flagSendCW){sendCommand(CMD_CURRENT_WINDOW,{})
}sendHead();
sendBody()
}}return true
}catch(e){logError("Error(getHTML)",e)("getHTML");
cbcFailHandler(Inq.getLocalizedMessage("cobrowseUnexpectedFail"))
}return false
}function getInqFrameUrl(){return getDomain(inqFrame.location)+inqFrame.location.pathname
}function clearPageUpdateTimer(){try{if(pageUpdateTimer!=null){window.clearTimeout(pageUpdateTimer)
}pageUpdateTimer=null
}catch(e){logError("Error(clearPageUpdateTimer)",e)
}}function restartPageUpdateTimer(){clearPageUpdateTimer();
pageUpdateTimer=window.setTimeout(checkForUpdates,TIMERINTERVAL_PAGE_UPDATE)
}function setAuthMode(mode){if(mode.auth){var wasNotAuthorized=!authorized;
var sharedAfterStandardMode=authorized&&authorized.auth==cobrowse.ACCEPTED&&mode.auth==cobrowse.ACCEPTED+cobrowse.SHARED_CONTROL;
authorized=mode;
if(cobrowse.isPersistentWindow){clearPageUpdateTimer()
}else{setHighlightStyle();
if(wasNotAuthorized||sharedAfterStandardMode){getHTML();
if(!sharedAfterStandardMode){try{banner.show()
}catch(e){logError("Error(setAuthMode: banner.show)",e)
}}restartPageUpdateTimer();
var flashPeer=getFlashPeer();
if(flashPeer!=null){if(!(cobrowse.isPersistentWindow&&cobrowse.isIE)){try{flashPeer.ciFocusCobEndBtn()
}catch(errDom){}}}}}}else{authorized=null;
banner.hide();
removeCobEndButton();
clearPageUpdateTimer()
}return authorized
}function getCallbackContext(){var context={};
context.callbackFun=loadComplete;
return context
}function checkAuthorized(){if(isValidChatID()){var data=["CBCHECK",PS_CBC_CHECK,Inq.getSiteID(),getInqFrameUrl(),COOKIE_COBROWSE];
Inq.CM.postRequestToIframe(getCookiePath(),data,PS_CBC_CHECK,getCallbackContext());
sendCommandCheckEmbeddedResources()
}}function getItemById(id){var parts=id.split(":");
if(parts.length==1){return parent.document.getElementById(id)
}else{if(parts[1]=="text"){return textNode(parent.document.getElementById(parts[0]),parseInt(parts[2]))
}else{var el=parent.document.getElementsByTagName(parts[1])[parseInt(parts[2])];
if(parts.length<5){return el
}else{if(parts[3]=="text"){return textNode(el,parseInt(parts[4]))
}else{throw new Error("Element with id=["+id+"] not found")
}}}}}function textNode(el,textIndex){for(var ix=0,n=0;
ix<el.childNodes.length;
ix++){if(el.childNodes[ix].nodeName=="#text"){if(n==textIndex){return el.childNodes[ix]
}else{n++
}}}throw new Error("Number of text nodes in this element less than predetermined index "+textIndex)
}function getDomain(location){return location.protocol+"//"+location.host
}function _isSameOrigin(absoluteUrl){try{return isSameOrigin(absoluteUrl)
}catch(e){logError("Error(_isSameOrigin): ",e);
return true
}}function isSameOrigin(absoluteUrl){if(typeof absoluteUrl!="string"){return false
}return absoluteUrl.indexOf(parent.location.protocol+"//")==0&&absoluteUrl.indexOf("//"+parent.location.host)!=-1
}var URL_REGEXP_IS_ABSOLUTE=new RegExp("^[0-9A-z\\.\\+\\-]*:|^//");
var URL_REGEXP_CHECK_HTTP_PROTOCOL=new RegExp("^https?");
function convertToAbsoluteUrl(resourceUrl,parentResourceUrl){var parentLocation=parent.location;
var parentDomain=getDomain(parentLocation);
var parentPath=parentLocation.pathname;
var absoluteUrl;
if(!parentResourceUrl){parentResourceUrl=parentDomain+parentPath
}else{if(parentResourceUrl[parentResourceUrl.length-1]!="/"&&parentResourceUrl.split("/")<4){parentResourceUrl=parentResourceUrl+"/"
}}if(!resourceUrl||resourceUrl.length==0){absoluteUrl=parentResourceUrl
}else{resourceUrl=resourceUrl.trim();
if(resourceUrl.match(URL_REGEXP_IS_ABSOLUTE)){if(resourceUrl.startsWith("//")){resourceUrl=parentLocation.protocol+resourceUrl
}absoluteUrl=resourceUrl
}else{if(!resourceUrl.startsWith("#")&&!resourceUrl.startsWith("?")&&!resourceUrl.startsWith(";")){parentResourceUrl=parentResourceUrl.slice(0,parentResourceUrl.lastIndexOf("/")+1);
var firstChar=resourceUrl.charAt(0);
if(firstChar=="/"){parentResourceUrl=parentDomain
}else{if(resourceUrl.startsWith("./")){resourceUrl=resourceUrl.slice(2)
}else{if(resourceUrl.startsWith("..")){var charPosAfterDots=resourceUrl.lastIndexOf("..")+2;
if(resourceUrl.charAt(charPosAfterDots)!="/"){resourceUrl=resourceUrl.slice(0,charPosAfterDots)+"/"+resourceUrl.slice(charPosAfterDots)
}while(resourceUrl.startsWith("../")){resourceUrl=resourceUrl.slice(3);
if(parentResourceUrl.split("/").length>4){parentResourceUrl=parentResourceUrl.slice(0,-1);
parentResourceUrl=parentResourceUrl.slice(0,parentResourceUrl.lastIndexOf("/")+1)
}}}}}}absoluteUrl=parentResourceUrl+resourceUrl
}}return absoluteUrl
}var URL_REGEXP_SIMPLE=new RegExp("url","i");
var URL_REGEXP_REPLACE=/(^.*)(url)(\()([^(]*)(\).*)($)/gi;
function replaceUrlsByAbsolute(data,parentResourceUrl){if(data.match(URL_REGEXP_SIMPLE)){var line;
var lines=data.split("\n");
var lix;
for(lix=0;
lix<lines.length;
lix++){line=lines[lix];
while(line.match(URL_REGEXP_REPLACE)){var url=(line).replace(URL_REGEXP_REPLACE,"$4");
if(url.indexOf('"')==0||url.indexOf("'")==0){url=url.substr(1,url.length-2)
}if(url.charAt(url.length-1)=="\r"){url=url.substr(0,url.length-1)
}url=convertToAbsoluteUrl(url,parentResourceUrl);
if(isEmbeddedResource(url)){addEmbeddedResource(url);
url=getFullEmbeddedResourceURL(url)
}line=line.replace(URL_REGEXP_REPLACE,"$1u_r_l$3"+url+"$5$6");
lines[lix]=line
}}data=lines.join("\n").split("u_r_l").join("url")
}return data
}function getDocType(){function constructDocType(name,publicId,systemId){return"<!DOCTYPE "+name+' PUBLIC "'+publicId+'" "'+systemId+'">'
}try{var docType=window.parent.document.body.parentNode.previousSibling;
if(docType){if(String(docType.constructor).indexOf("DocumentType")!=-1){return constructDocType(docType.name.toLowerCase(),docType.publicId,docType.systemId)
}else{if(docType.nodeValue.indexOf("DOCTYPE")==0){return"<!"+docType.nodeValue+">"
}}}return constructDocType("html","-//W3C//DTD XHTML 1.0 Transitional//EN","http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd")
}catch(e){logError("Error(getDocType): ",e)
}return""
}var SPRINT_MENU_HOTFIX=".sprint-header-inner .sprint-header-meta a,.sprint-header-inner .sprint-header-meta nav ul li,.sprint-header-inner .sprint-header-tools div { float: left; }div.content {clear: both }";
function getCss(){var cssLink="";
var cssText="";
for(var i=0;
i<parent.document.styleSheets.length;
i++){try{var styleSheet=parent.document.styleSheets[i];
var cssContent=getFixedCssContent(styleSheet);
cssLink+=cssContent.cssLink;
if(cssContent.cssText&&cssContent.cssText.indexOf("@import")>-1){cssText=cssContent.cssText+cssText
}else{cssText+=cssContent.cssText
}}catch(e){logError("Error(getCss/block error of unaccessible property):",e)
}}cssText="\n<style type='text/css'>\n<!--\n"+cssText+cssHighlightStyleAI+(Inq.getSiteID()==154?SPRINT_MENU_HOTFIX:"")+"\n-->\n</style>\n";
return cssLink+cssText
}function getFixedCssContent(styleSheet){var cssLink="";
var cssText="";
if(isValidMediaType(styleSheet)){if(styleSheet.href){var url=convertToAbsoluteUrl(styleSheet.href);
if(URL_REGEXP_CHECK_HTTP_PROTOCOL.test(url)){if(isEmbeddedResource(url)){addEmbeddedResource(url);
url=getFullEmbeddedResourceURL(url)
}cssLink+="<link type='text/css' rel='stylesheet' href='"+url+"' />\n"
}else{log("StyleSheet has incorrect URL and can't be used, HREF: "+url)
}}else{cssText+=fixCssTextInStyleSheet(styleSheet)
}}return{cssLink:cssLink,cssText:cssText}
}function fixAngularRelatedCSS(str){str=str.replace(new RegExp("\\[ng:cloak\\]","g"),"[ng\\:cloak]");
str=str.replace(new RegExp("ng:form","g"),"ng\\:form");
return str
}function testGetHTML(){var result=false;
try{sendHead(true);
sendBody(true);
result=true
}catch(e){logError("Error while testing getHTML()",e)
}return result
}function sendHead(isTest){try{updateScrollChanges();
var data=addScrollData(addHostedLocation({SITEID:Inq.getSiteID(),URL:xmlCdata(getParentURL()),MODE:getMode(),DT:xmlCdata(getDocType()),DATA:xmlCdata(getCss()),HTML_ATTR:getHTMLNodeAttr()}));
if(!isTest){sendCommand(CMD_HEAD,data,"action="+ACTION_HEAD+"&mode="+authorized.auth)
}}catch(e){logError("Error(sendHead): head sending"+(isTest?" while performance testing":""),e)
}}function getHTMLNodeAttr(){var htmlNode=parent.document.getElementsByTagName("HTML")[0];
var attrString="";
for(var i=0;
i<htmlNode.attributes.length;
i++){var attr=htmlNode.attributes[i];
if(attr.specified){attrString+=attr.name+"='"+replaceSpclCharsToSendToAI(attr.value)+"' "
}}return attrString
}function replaceSpclCharsToSendToAI(str){return(str.replace?str.replace(/"/gi,'\\"').replace(/&/gi,"&amp;").replace(/>/gi,"&gt;"):str)
}function getCssRules(styleSheet){return styleSheet.cssRules
}function getRules(styleSheet){return styleSheet.rules
}function fixCssTextInStyleSheet(styleSheet,parentResourceUrl){var cssContent=[];
var rules=getCssRules(styleSheet)||getRules(styleSheet)||[];
for(var j=0;
j<rules.length;
j++){var cssRuleType=null;
try{cssRuleType=rules[j].type;
if(cssRuleType!=7&&rules[j].cssText){cssContent.push(replaceUrlsByAbsolute(rules[j].cssText,parentResourceUrl))
}}catch(e){logError("Error(fixCssTextInStyleSheet):unexpected behavior for CSSRule type=["+cssRuleType+"], ",e)
}}cssContent=replaceUnsupportedCss(cssContent);
return cssContent.join("\n")+"\n"
}function sendBody(isTest){updateScrollChanges();
var bodyHtmlArray=$(parent.document.body).generateHtml();
sendCommandCheckEmbeddedResources();
var data={};
splitDataPackage(isTest,data,bodyHtmlArray.join(""),CMD_BODYPART);
lastBodySentArray=bodyHtmlArray;
forAllInputTypes(initStorage)
}function splitDataPackage(isTest,data,htmlCode,commandName,isHighlightUpdate){if(isHighlightUpdate&&!htmlCode.length){sendCommand(commandName,{HIGHLIGHT:""})
}else{for(var htmlRest=htmlCode;
htmlRest.length>0;
){data.DATA=xmlCdata(htmlRest.substr(0,DATA_PACKAGE_SIZE_LIMIT));
htmlRest=htmlRest.substr(DATA_PACKAGE_SIZE_LIMIT);
data.MORE=htmlRest.length;
if(data.MORE===0&&isHighlightUpdate){data.HIGHLIGHT=""
}if(!isTest){sendCommand(commandName,data)
}}}}function findDifferenceFromEnd(oldArray,newArray){var ixOld=oldArray.length;
var ixNew=newArray.length;
var commonLength=0;
var commonString;
for(;
ixNew>=0&&ixOld>=0;
ixNew--,ixOld--){if(oldArray[ixOld]!=(commonString=newArray[ixNew])){break
}if(commonString!=null){commonLength+=commonString.length
}}return{ixNew:ixNew,ixOld:ixOld,ln:commonLength}
}function findDifferenceFromStart(oldArray,newArray,limit){var commonLength=0;
var commonString;
var i=0;
for(;
i<limit;
i++){if(oldArray[i]!=(commonString=newArray[i])){break
}if(commonString!=null){commonLength+=commonString.length
}}return{ix:i,ln:commonLength}
}function sendUpdate(isHighlightUpdate){var newBodyArray=$(parent.document.body).generateHtml();
var end=findDifferenceFromEnd(lastBodySentArray,newBodyArray);
var start=findDifferenceFromStart(lastBodySentArray,newBodyArray,end.ixOld<end.ixNew?end.ixOld:end.ixNew);
var update=newBodyArray.slice(start.ix,(end.ixNew+1)).join("");
sendCommandCheckEmbeddedResources();
lastBodySentArray=newBodyArray;
updateScrollChanges();
var data=addScrollData({IB:start.ln,IE:end.ln});
splitDataPackage(false,data,update,CMD_UPDATEPART,isHighlightUpdate)
}var KEY_COBROWSE_EVENT_TYPE_CLIENT_COBROWSE_END="49";
var KEY_COBROWSE_EVENT_TYPE_AGENT_COBROWSE_END="52";
var KEY_COBROWSE_EVENT_TYPE_AGENT_COBROWSE_END_MESSAGE_FROM_CI="521";
var KEY_COBROWSE_EVENT_TYPE_CLIENT_PERFORMANCE_TEST="53";
var KEY_COBROWSE_EVENT_TYPE_CLIENT_COBROWSE_SUPPRESSED="55";
function cobrowseSuppressedPage(){var result=false;
var flashPeer=getFlashPeer();
if(flashPeer!=null){try{result=flashPeer.ciCobrowseSuppressedPage()
}catch(e){logError("Error (cobrowseSuppressedPage)",e)
}}if(!flashPeer||!result){sendCobrowseMessage(KEY_COBROWSE_EVENT_TYPE_CLIENT_COBROWSE_SUPPRESSED,Inq.getLocalizedMessage("cobrowseSuppressed"))
}}function cbcFailHandler(cbcFailMessage){var result=false;
var flashPeer=getFlashPeer();
if(flashPeer!=null){try{result=flashPeer.ciCobrowseFailHandler(cbcFailMessage)
}catch(e){logError("Error (cbcFailHandler)"+cbcFailMessage,e)
}}if(!flashPeer||!result){sendCobrowseMessage(KEY_COBROWSE_EVENT_TYPE_CLIENT_COBROWSE_END,cbcFailMessage)
}}function benchmarkTest(){var benchmarkTestResult=null;
try{benchmarkTestResult=calculateCobrowseBenchmarkTest();
var messageText="Execution time of cobrowse benchmark test is "+benchmarkTestResult+"ms";
try{getFlashPeer().ciSendResultOfBenchmarkTest(messageText)
}catch(err){sendCobrowseMessage(KEY_COBROWSE_EVENT_TYPE_CLIENT_PERFORMANCE_TEST,messageText)
}}catch(e){logError("Error (benchmarkTest: calculateCobrowseBenchmarkTest)",e);
cbcFailHandler(Inq.getLocalizedMessage("cobrowseUnexpectedFail"))
}return benchmarkTestResult
}function isChatMinimized(){try{return getFlashPeer().ciIsMinimized()
}catch(err){return false
}}function getFlashPeer(){try{if(Inq.CHM&&Inq.CHM.persistentWindow&&Inq.CHM.persistentWindow.inqFrame&&Inq.CHM.persistentWindow.inqFrame.Inq&&Inq.CHM.persistentWindow.inqFrame.Inq.FlashPeer){return !Inq.CHM.persistentWindow.closed?Inq.CHM.persistentWindow.inqFrame.Inq.FlashPeer:null
}if(Inq.FlashPeer&&Inq.FlashPeer.ciCheckCobrowseMgrAvalibility()){return Inq.FlashPeer
}}catch(e){}return null
}var ciProxy=function(){return{ciAgentEndsCob:function(){try{getFlashPeer().ciAgentEndsCob()
}catch(e){sendCobrowseMessage(KEY_COBROWSE_EVENT_TYPE_AGENT_COBROWSE_END_MESSAGE_FROM_CI,Inq.getLocalizedMessage("agentEndCobrowseSession"),true)
}},ciSendCobrowseEnded:function(){try{getFlashPeer().ciSendCobrowseEnded()
}catch(e){sendCobrowseMessage(KEY_COBROWSE_EVENT_TYPE_CLIENT_COBROWSE_END,Inq.getLocalizedMessage("customerEndCobrowseSession"),true)
}}}
}();
function sendCobrowseMessage(cobrowseEvent,messageText,resendToClient){try{if(isValidChatID()){if(isValidAgentID()){Inq.ROM.sendCobrowseMessage(getChatID(),getAgentID(),Inq.getCustID(),cobrowseEvent,messageText,resendToClient,Inq.getSiteID())
}else{logError("Error (sendCobrowseMessage): Invalid agent id for chatId = "+getChatID()+", cobrowseEvent = "+cobrowseEvent+", message = "+messageText)
}}}catch(e){logError("Error (sendCobrowseMessage): chatId = "+getChatID()+", cobrowseEvent = "+cobrowseEvent+", message = "+messageText,e)
}}function authorize(auth){var authObj={auth:auth};
var authJson=Inq.CM.JSON.stringify(authObj);
var expiry=(new Date((new Date()).getTime()+COOKIE_EXPIRATION*1000)).toGMTString();
var data=["CBAUTH",PS_CBC_AUTH,Inq.getSiteID(),getInqFrameUrl(),COOKIE_COBROWSE,authJson,"/cobrowse",expiry];
Inq.CM.postRequestToIframe(getCookiePath(),data,PS_CBC_AUTH,getCallbackContext())
}function terminateCobrowse(callback){if(authorized){postQueue=[];
clearPageUpdateTimer();
resources={};
if(!this.isPersistentWindow){banner.hide()
}authorize(cobrowse.NOT_SHARED);
if(callback){callback()
}authorized=null;
lastActiveWindowTime=0
}}function filterPageRules(rules,pageMarker){var maskingRules=[];
var maskingTextRules=[];
var maskingHiddenRules=[];
var maskingBlockClickRules=[];
for(var i=0;
i<rules.size();
i++){var rule=rules[i];
if(isRuleForPage(rule)&&isValidJQSelector(rule.selector)){if(rule.hidden){maskingHiddenRules.push(rule)
}else{if(rule.blockClick){maskingBlockClickRules.push(rule)
}else{maskingRules.push(rule);
if(rule.text){maskingTextRules.push(rule)
}}}}}return{maskingRules:maskingRules,maskingTextRules:maskingTextRules,maskingHiddenRules:maskingHiddenRules,maskingBlockClickRules:maskingBlockClickRules}
}function isRuleForPage(rule){if(!rule.pageMarker&&!rule.urlRegex&&!rule.markerRegex&&!rule.pageId&&!rule.contentGroupId){return true
}var result=false;
var parentURL=getParentURL();
if((rule.pageMarker&&rule.pageMarker==getPageMarker())||(rule.urlRegex&&parentURL.match(rule.urlRegex))||(rule.pageId&&Inq.LDM.pageCheck(rule.pageId))||(rule.markerRegex&&getPageMarker().match(rule.markerRegex))||(rule.contentGroupId&&Inq.LDM.checkCG(rule.contentGroupId))){result=true
}return result
}function isValidJQSelector(selector){if(selector=="*"){return true
}else{try{$("<p>").find(selector);
return true
}catch(e){logError('Invalid selector in BR and it was ignored (filtered), selector: "'+selector+'"',e);
return false
}}}function createContent(pageRules){return function($element,unmaskedValue){var value=unmaskedValue;
if(value.replace){forAllMatchingRules(pageRules,$element,function(rule){value=value.replace(rule.regex,rule.mask)
})
}return value
}
}function createDetect(pageRules){return function($element,unmaskedValue){var matches=[];
if(unmaskedValue.replace){forAllMatchingRules(pageRules,$element,function(rule){var offset=0;
var value=unmaskedValue;
var from;
while((from=value.search(rule.regex))>-1){var match=value.match(rule.regex)[0];
var to=from+match.length;
matches.push({start:from,end:to});
offset+=to;
value=value.substr(to)
}})
}return matches
}
}function createHideNodeFilter(pageRules){return function($element){for(var i=0;
i<pageRules.length;
i++){if($element.is(pageRules[i].selector)){return true
}}return false
}
}function createIsHiddenNode(supportHiddenMask,hideFilter){if(supportHiddenMask){return function(node){return hideFilter(node)
}
}else{return function(node){return false
}
}}function createBlockClickNodeFilter(pageRules){return function($element){for(var i=0;
i<pageRules.length;
i++){if($element.is(pageRules[i].selector)){return true
}}return false
}
}function createIsBlockClickNode(supportBlockClickMask,blockClickFilter){if(supportBlockClickMask){return function(node){return blockClickFilter(node)
}
}else{return function(node){return false
}
}}function createContentNode(supportPrivateMask,contentFilter){if(supportPrivateMask){return function(node){var $parent=$(node.parentNode);
return contentFilter($parent.hasClass(CSS_CLASS_HIGHLIGHT_TEXT)?$(node.parentNode.parentNode):$parent,node.nodeValue)
}
}else{return function(node){return node.nodeValue
}
}}function forAllMatchingRules(rules,$element,fn){for(var i=0;
i<rules.length;
i++){var rule=rules[i];
if($element.is(rule.selector)){fn(rule)
}}}var chatWindowLeft=null;
var chatWindowTop=null;
function detectChatWindowPositionChange(){var chatWindowObj=parent.document.getElementById("inqChatStage");
if(chatWindowObj!=null){if(chatWindowLeft!=null&&chatWindowTop!=null&&(chatWindowLeft!=chatWindowObj.style.left||chatWindowTop!=chatWindowObj.style.top)){modified=true
}chatWindowLeft=chatWindowObj.style.left;
chatWindowTop=chatWindowObj.style.top
}}function checkForUpdates(){try{if(cobrowse.isPersistentWindow){return
}if(authorized&&isValidChatID()){if(!lastBodySentArray.isEmpty()&&!isSuppressed()){forAllInputTypes(checkForInputChanges);
if(updateScrollChanges()){sendCommand(CMD_UPDATE,addScrollData({DATA:"",IB:0,IE:0}))
}if(mouseChanged()){sendCommand(CMD_MOUSE_POSITION,lastMouse)
}}detectChatWindowPositionChange();
if((modified||parent.document.body.innerHTML.length!=bodyLength)&&!isSuppressed()){modified=false;
if(lastBodySentArray.isEmpty()){sendHead();
sendBody()
}else{sendUpdate()
}bodyLength=parent.document.body.innerHTML.length
}if(!cmdRequest){requestAICommand()
}}}catch(e){logError("Error(checkForUpdates)",e)
}restartPageUpdateTimer()
}function fixOffset(areas,offset,fn){for(var i in areas){var area=areas[i];
if(area.start<offset&&offset<area.end){offset=fn(area)
}}return offset
}function fixOffsetUp(areas,offset){var areasSorted=areas.sort(function(a,b){return a.start-b.start
});
return fixOffset(areasSorted,offset,function(mask){return mask.end
})
}function fixOffsetDown(areas,offset){var areasSorted=areas.sort(function(a,b){return b.end-a.end
});
return fixOffset(areasSorted,offset,function(mask){return mask.start
})
}function unwrapTextSafely(node){if(!node.parentNode){return
}if($(node.parentNode).hasClass(CSS_CLASS_HIGHLIGHT_TEXT)){$(node).unwrap()
}concatTextNodes(node)
}function concatTextNodes(node){if(node.nodeName!="#text"){return
}if(node.leftHighlightSeverance){if(node.previousSibling&&node.previousSibling.nodeName=="#text"){node.nodeValue=node.previousSibling.nodeValue+node.nodeValue;
node.parentNode.removeChild(node.previousSibling);
node.leftHighlightSeverance=null
}}if(node.rightHighlightSeverance){if(node.nextSibling&&node.nextSibling.nodeName=="#text"){node.nodeValue=node.nodeValue+node.nextSibling.nodeValue;
node.parentNode.removeChild(node.nextSibling);
node.rightHighlightSeverance=null
}}}function wrapText(clazz,color,text){highlightInfo.total++;
var currentTitle="Highlight "+highlightInfo.total+", "+highlightInfo.colorMap[color.replace("#","")]+". "+text+".";
var id=highlightInfo.id+highlightInfo.total;
highlightInfo.screenReaderDiv.innerHTML=currentTitle;
return"<span id='"+id+"' role ='complementary' title='"+currentTitle+"' class='"+clazz+"' style='display: inline !important; background-color: "+color+"'></span>"
}function wrapInputs(clazz,text){return"<span class='"+clazz+"'>"+text+"</span>"
}function decimalToHex(d,padding){var hex=d.toString(16);
padding=typeof(padding)==="undefined"||padding===null?padding=2:padding;
while(hex.length<padding){hex="0"+hex
}return hex
}function colorToHex(color){if(!color||color.substr(0,1)==="#"){return color
}var digits=/(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(color);
if(digits==null){digits=/(.*?)rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.\d+)\)/.exec(color)
}if(digits==null){return color
}var red=parseInt(digits[2]);
var green=parseInt(digits[3]);
var blue=parseInt(digits[4]);
return"#"+decimalToHex(red,2)+decimalToHex(green,2)+decimalToHex(blue,2)
}function highlightElement(color){try{var wrapSpan;
var parent=this.parentNode;
if(!color||!parent){throw new Error("Invalid parameters: color="+color+", parentNode="+parent)
}if(isNodeHighlighted(this)){if(this.nodeName=="#text"){if(colorToHex(parent.style.backgroundColor)==color.toLowerCase()){return
}if(parent.childNodes.length==1){$(this).unwrap()
}}else{$(this).unwrap()
}}if(this.nodeName=="#text"&&/[^ \t\n\r]/.test(this.textContent)){wrapSpan=wrapText(CSS_CLASS_HIGHLIGHT_TEXT,color,this.nodeValue)
}else{if(this.nodeName=="SELECT"){wrapSpan=wrapInputs(CSS_CLASS_HIGHLIGHT_SELECT+color.replace("#",""),"")
}else{if(this.nodeName=="BUTTON"||this.nodeName=="INPUT"||this.nodeName=="TEXTAREA"){wrapSpan=wrapInputs(CSS_CLASS_HIGHLIGHT_INPUTS+color.replace("#",""),"")
}}}if(wrapSpan){$(this).wrap(wrapSpan)
}}catch(e){logError("Error (highlightElement). ",e)
}}function isNodeHighlighted(node){var parent=node.parentNode;
if(!parent){return false
}if($(parent).hasClass(CSS_CLASS_HIGHLIGHT_TEXT)){return true
}for(var i=0;
i<SUPPORTED_HIGHLIGHT_COLORS.length;
i++){if($(parent).hasClass(CSS_CLASS_HIGHLIGHT_INPUTS+SUPPORTED_HIGHLIGHT_COLORS[i])||$(parent).hasClass(CSS_CLASS_HIGHLIGHT_SELECT+SUPPORTED_HIGHLIGHT_COLORS[i])){return true
}}return false
}function stripEnd(node,offset){try{if(node.nodeValue==null){if(offset==0){return node
}else{return node.childNodes[offset-1]
}}var text=node.nodeValue;
var maskAreas=htmlFilter.detect($(node.parentNode),text);
var end=fixOffsetUp(maskAreas,offset);
if(end<text.length){$(node).after(text.substring(end));
node.nodeValue=text.substring(0,end);
node.nextSibling.leftHighlightSeverance=true;
if(node.rightHighlightSeverance){node.nextSibling.rightHighlightSeverance=true
}else{node.rightHighlightSeverance=true
}}return node
}catch(e){logError("Error(stripEnd)",e)
}}function stripStart(node,offset){try{if(node.nodeValue==null){if(offset==0){return node
}else{return node.childNodes[offset-1]
}}var text=node.nodeValue;
var maskAreas=htmlFilter.detect($(node.parentNode),text);
var start=fixOffsetDown(maskAreas,offset);
if(start>0){$(node).before(text.substring(0,start));
node.nodeValue=text.substring(start);
node.previousSibling.rightHighlightSeverance=true;
if(node.leftHighlightSeverance){node.previousSibling.leftHighlightSeverance=true
}else{node.leftHighlightSeverance=true
}}return node
}catch(e){logError("Error(stripStart)",e)
}}function getHighlightingNodes(e1,e2){var arrayNodes=[];
var current=e1;
while(current!=e2){if(current.nodeName!="#comment"&&current.nodeName!="IFRAME"&&current.nodeName!="STYLE"&&current.nodeName!="SCRIPT"&&current.nodeName!="NOSCRIPT"){if(current.hasChildNodes()&&current.nodeName!="SELECT"&&current.nodeName!="INPUT"&&current.nodeName!="TEXTAREA"&&current.nodeName!="BUTTON"){current=current.firstChild;
continue
}if(current.nodeName=="#text"||$(current).is(":visible")){arrayNodes.push(current)
}}if(current.nextSibling){current=current.nextSibling
}else{var parent=current.parentNode;
while(!parent.nextSibling&&parent!=e2){parent=parent.parentNode
}current=parent==e2?parent:parent.nextSibling
}}arrayNodes.push(current);
return arrayNodes
}function highlightText(elStart,indexStart,elEnd,indexEnd,color){if(!elStart||!elEnd||!color){return
}try{var stripedElEnd=stripEnd(elEnd,indexEnd);
var stripedElStart=stripStart(elStart,indexStart);
if(!stripedElEnd||!stripedElEnd){logError("Error: highlight boundaries are wrong: stripedElEnd="+stripedElEnd+" stripedElStart="+stripedElStart)
}else{var elements=getHighlightingNodes(stripedElStart,stripedElEnd);
$(elements).each(highlightElement,[color])
}}catch(e){logError("Error(highlightText)",e)
}}function getPageMarker(){return Inq.LDM.page?Inq.LDM.page.mID:null
}function uploadResources(urls){for(var j=0;
j<urls.length;
j++){uploadResource(urls[j])
}}function uploadResource(url){var resource=resources[url];
if(resource){if(resource.state==STATE_CHECKED&&typeof resource.data==="string"){resource.state=STATE_SENT;
sendEmbeddedResourceToCobrowseServer(url,resource.data,resource.hash)
}}else{logInfo("Info(uploadResource): Try upload unknown resource ["+url+"], but requested from the server.");
resource={state:STATE_CHECKED,correctedUrl:getEmbeddedResourceURL(url),data:null,hash:null};
resources[url]=resource;
setEmbeddedResourceData(url)
}}function setEmbeddedResourceData(url){try{if(isEmbeddedResourceCss(url)){setEmbeddedResourceCssContent(url)
}else{if(isCanvasSupported){setEmbeddedImageUsingCanvas(url)
}else{setEmbeddedImageUsingXMLHTTPRequest(url)
}}}catch(e){logError("Error(setEmbeddedResourceData) Uploading ["+url+"] failed",e)
}}function executeCommand(command){try{eval("cobrowse.cbCommands."+command)
}catch(e){logError("Error(cobrowse.cbCommands:executeCommand)",e)("executeCommand")
}}function createTag(tag,attributes,content){var tag=document.createElement("div");
for(var attribute in attributes){tag.setAttribute(attribute,attributes[attribute])
}if(content){tag.appendChild(document.createTextNode(content))
}return tag
}function buildFakeDomTree(){var root=createTag("p",{});
for(var i=0;
i<10;
i++){var tag=createTag("div",{id:("div"+i)},"abcdefg");
for(var j=0;
j<10;
j++){root.appendChild(createTag("span",{id:("span"+j)},"bbbbbb"))
}root.appendChild(tag)
}return root
}function now(){return(new Date()).getTime()
}function calculateCobrowseBenchmarkTest(){var startTime=now();
var bodyHtmlArray=$(buildFakeDomTree()).generateHtml();
return now()-startTime
}var eventBindingsToUnbind=[];
function bindEx($element,eventType,handler){if(typeof(eventType)==="string"){eventBindingsToUnbind.push({$element:$element,eventType:eventType,handler:handler});
$.fn.bind.call($element,eventType,handler)
}else{var events=eventType;
for(var event in events){bindEx($element,event,events[event])
}}}function reset(){eventBindingsToUnbind.forEach(function(binding){$.fn.unbind.call(binding.$element,binding.eventType,binding.handler)
})
}function createHighlightScreenReader(){var div=parent.document.createElement("DIV");
div.id=highlightInfo.screenReaderId;
div.style.overflow="hidden";
div.style.height="1px";
div.style.width="1px";
div.style.left="-1000px";
div.style.top="0px";
div.style.position="absolute";
div.setAttribute("role","alert");
div.setAttribute("aria-live","polite");
div.setAttribute("aria-relevant","additions text");
div.setAttribute("aria-atomic","false");
parent.document.body.appendChild(div);
highlightInfo.screenReaderDiv=div
}function commandActiveWindowUpdate(serverData){if(serverData.activeWindowId&&authorized){var ciTime=parseInt(lastActiveWindowTime);
var serverTime=parseInt(serverData.lastActiveWindowTime);
lastActiveWindowTime=serverTime;
activeWindowId=serverData.activeWindowId;
if(serverData.activeWindowId==cobrowse.windowId){activeWindow=true;
if(ciTime<serverTime){whenActiveWindow()
}}else{activeWindow=false
}}}function prepareOnBeforeUnload(){if(isValidChatID()&&!cobrowse.isPersistentWindow){sendCommandToCBS(ACTION_ACTIVE_WINDOW_UNLOAD,xmlElement(CMD_WINDOW_UNLOAD,""),"action="+ACTION_ACTIVE_WINDOW_UNLOAD,"BEACON");
waitingAnswer=false
}}function getMode(){return authorized?authorized.auth:cobrowse.NOT_SHARED
}function startCobrowse(flagStartBenchmarkTest,mode,modeToLog){if(flagStartBenchmarkTest){benchmarkTest()
}try{isAcceptedPage=true;
authorize(mode);
if(cobrowse.isPersistentWindow){logInfo("Cobrowse was accepted with "+modeToLog+" mode from persistent window")
}else{prepareOnBeforeUnload();
activeWindow=true;
if(!cmdRequest){requestAICommand()
}sendCommandActiveWindowSet(Date.now());
logInfo("Cobrowse was accepted with "+modeToLog+" mode")
}}catch(e){logError("Error("+modeToLog+" mode)",e);
cbcFailHandler(Inq.getLocalizedMessage("cobrowseUnexpectedFail"));
throw e
}}return{getCobrowseBannerText:function(){return this.bannerHtml
},isCobrowseEngaged:function(){return !!authorized
},isSharedControl:function(){return authorized&&(authorized.auth&cobrowse.SHARED_CONTROL)
},stop:function(){terminateCobrowse(ciProxy.ciSendCobrowseEnded);
var flashPeer=getFlashPeer();
if(flashPeer!=null){flashPeer.ciSetFocusOnChatInputField()
}},stopQuiet:function(){terminateCobrowse()
},resetCSQ:function(){client_csq=0
},endCobrowse:function(){terminateCobrowse(ciProxy.ciAgentEndsCob)
},reset:reset,termsAndConditions:banner.termsAndConditions,testGetHTML:testGetHTML,accept:function(flagStartBenchmarkTest){startCobrowse(flagStartBenchmarkTest,cobrowse.ACCEPTED,"normal")
},acceptShare:function(flagStartBenchmarkTest){startCobrowse(flagStartBenchmarkTest,cobrowse.ACCEPTED|cobrowse.SHARED_CONTROL,"shared control")
},callBackAuthorized:function(json,boxID){setAuthMode(getAuthModeFromJson(json,boxID))
},callBackProxyError:function(cmd,boxID,errorStr){if(isValidChatID()){logError("Error(callBackProxyError): cmd = "+cmd+", boxID = "+boxID+", errorStr=["+errorStr+"]");
try{postQueueItem(true)
}catch(e){logError("Error(callBackProxyError)",e);
waitingAnswer=false
}}},requestAICommand:function(){if(authorized){requestAICommand()
}else{cmdRequest=null
}},runAgentCommand:function(serverData){var command=serverData.command;
var csq=parseInt(serverData.CSQ);
var changeOrder=serverData.changeOrder;
if(command&&(changeOrder||csq>client_csq)){client_csq=csq;
executeCommand(command)
}},runServerCommand:function(serverData){var command=serverData.command;
if(command&&!cobrowse.isPersistentWindow){switch(command){case CMD_SERVER_ACTIVE_WINDOW_UPDATE:commandActiveWindowUpdate(serverData);
break;
default:executeCommand(command)
}}},ackReceived:function(jsonString){try{postQueueItem(true)
}catch(e){logError("Error(ackReceived)",e)(jsonString);
waitingAnswer=false
}},getHTML:function(flagSendCW){return getHTML(flagSendCW)
},highlightInputField:function(inputId,color){var element=getItemById(inputId);
if(!element){return
}if(element.nodeName=="A"){var lastInnerChild=element.lastChild;
while(lastInnerChild.hasChildNodes()){lastInnerChild=lastInnerChild.lastChild
}var endOffset;
if(lastInnerChild.nodeValue==null){endOffset=0
}else{endOffset=lastInnerChild.length
}highlightText(element,0,lastInnerChild,endOffset,color)
}else{$(element).each(highlightElement,[color])
}modified=true;
sendUpdate(true);
restartPageUpdateTimer()
},unhighlight:function(){try{$("."+CSS_CLASS_HIGHLIGHT_TEXT,window.parent.document).each(function(index){$(this).contents().each(function(){unwrapTextSafely(this)
})
});
for(var i=0;
i<SUPPORTED_HIGHLIGHT_COLORS.length;
i++){$("."+CSS_CLASS_HIGHLIGHT_INPUTS+SUPPORTED_HIGHLIGHT_COLORS[i]+", ."+CSS_CLASS_HIGHLIGHT_SELECT+SUPPORTED_HIGHLIGHT_COLORS[i],window.parent.document).each(function(index){$(this).contents().unwrap()
})
}modified=true;
highlightInfo.total=0;
sendUpdate()
}catch(e){logError("Error(unhighlight)",e)
}restartPageUpdateTimer()
},doElementClick:function(elementId){if(elementId=="removeButtonTrue"){parent.$("#consentModal").find("#removeButtonTrue").click()
}else{if(elementId=="removeButtonFalse"){parent.$("#consentModal").find("#removeButtonFalse").click()
}else{getItemById(elementId).click()
}}},setFocusInputField:function(inputId){parent.window.focus();
$(getItemById(inputId)).select()
},doMinimizeOrRestoreChat:function(){try{var flashPeer=getFlashPeer();
if(flashPeer){if(flashPeer.ciIsMinimized()){flashPeer.ciRestore()
}else{flashPeer.ciMinimize()
}}else{logError("(doMinimizeOrRestoreChat): FlashPeer is not available")
}}catch(e){logError("Error(doMinimizeOrRestoreChat)",e)
}},pushLink:function(url,target){if(target==null||target==""){target="_self"
}window.setTimeout('Inq.FlashPeer.PushToFrameset("'+url+'", "'+target+'");',1000)
},scrollTo:function(x,y){var flashPeer=getFlashPeer();
if(flashPeer){if(flashPeer.isPhone()&&!flashPeer.ciIsMinimized()){waitingScrollTo={x:x,y:y}
}else{window.parent.scrollTo(x,y)
}}else{logError("(scrollTo): FlashPeer is not available")
}},applyScrollTo:function(){if(waitingScrollTo){window.parent.scrollTo(waitingScrollTo.x,waitingScrollTo.y);
waitingScrollTo=null
}},sendEmbeddedResources:uploadResources,highlightText:function(startId,indexStart,endId,indexEnd,color){logInfo("Highlighting parameters: from element = "+startId+", offset = "+indexStart+" to element = "+endId+", offset = "+indexEnd+"; color = "+color);
highlightText(getItemById(startId),indexStart,getItemById(endId),indexEnd,color);
modified=true;
sendUpdate(true);
restartPageUpdateTimer()
},initialize:function(maskingConfig,isEmbeddedResource,isIE,isPersistentWindow){Inq.CBC=this;
this.isIE=isIE;
this.isPersistentWindow=isPersistentWindow;
authCheckTimer=setInterval(checkAuthorized,TIMERINTERVAL_AUTH_CHECK);
if(isPersistentWindow){activeWindow=false;
try{htmlFilter.contentNode=createContentNode(false,function(){});
htmlFilter.isHiddenNode=createIsHiddenNode(false,function(){});
htmlFilter.isBlockClickNode=createIsBlockClickNode(false,function(){})
}catch(e){logError("Error(initialize.htmlFilter.empty)",e)
}return
}prepareOnBeforeUnload();
this.isEmbeddedResource=isEmbeddedResource;
try{if(isIE){supportResponseBodyUtils()
}}catch(e){logError("Error(initialize.supportResponseBodyUtils)",e)
}try{cobrowse.cbCommands={Cobrowse:{getHTML:cobrowse.getHTML,highlightInputField:cobrowse.highlightInputField,unhighlight:cobrowse.unhighlight,doElementClick:cobrowse.doElementClick,setFocusInputField:cobrowse.setFocusInputField,endCobrowse:cobrowse.endCobrowse,pushLink:cobrowse.pushLink,highlightText:cobrowse.highlightText,scrollTo:cobrowse.scrollTo,sendEmbeddedResources:cobrowse.sendEmbeddedResources,doMinimizeOrRestoreChat:cobrowse.doMinimizeOrRestoreChat}}
}catch(e){logError("Error(initialize.cobrowse.cbCommands)",e)
}function whenChange(){modified=true
}function onFocus(event){var focusTime=Date.now();
if(!inqFrame){reset();
return
}if(activeWindowSetTimeout!==null){clearTimeout(activeWindowSetTimeout)
}activeWindowSetTimeout=setTimeout(function(){sendCommandActiveWindowSet(focusTime)
},1000)
}function onVisibilityChange(event){if(top.document.visibilityState==="visible"){onFocus(event)
}}try{bindEx($(window.top.document),"mousemove",onMouseMove);
bindEx($(window.top),"mousemove",onMouseMove);
bindEx($(top.document),"visibilitychange",onVisibilityChange);
bindEx($(window.top),"focus",onFocus);
bindEx($(window),"focus",onFocus);
bindEx($(window.parent.document.body),{DOMSubtreeModified:whenChange,DOMNodeInserted:whenChange,DOMNodeRemoved:whenChange,DOMCharacterDataModified:whenChange,DOMAttrModified:whenChange})
}catch(e){logError("Error(initialize.bindEx)",e)
}try{var rules=filterPageRules(maskingConfig,getPageMarker());
htmlFilter.content=createContent(rules.maskingRules);
htmlFilter.detect=createDetect(rules.maskingRules);
htmlFilter.contentTextFilter=createContent(rules.maskingTextRules);
htmlFilter.contentNode=createContentNode((rules.maskingTextRules.length>0),htmlFilter.contentTextFilter);
htmlFilter.hideNodeFilter=createHideNodeFilter(rules.maskingHiddenRules);
htmlFilter.isHiddenNode=createIsHiddenNode((rules.maskingHiddenRules.length>0),htmlFilter.hideNodeFilter);
htmlFilter.blockClickNodeFilter=createBlockClickNodeFilter(rules.maskingBlockClickRules);
htmlFilter.isBlockClickNode=createIsBlockClickNode((rules.maskingBlockClickRules.length>0),htmlFilter.blockClickNodeFilter)
}catch(e){logError("Error(initialize.htmlFilter)",e)
}try{if(top.document.visibilityState=="visible"){sendCommandActiveWindowSet(Date.now())
}if(isValidChatID()&&Inq.CHM.isChatInProgress()){checkAuthorized()
}else{authorize(cobrowse.NOT_SHARED)
}log("Cobrowse initialization complete")
}catch(e){logError("Error(initialize.authorize)",e);
throw e
}createHighlightScreenReader()
},windowId:Math.round(Math.random()*314156791),SHARED_CONTROL:2,ACCEPTED:1,NOT_SHARED:0,showBanner:banner.show,adjustRestoreDivForCobBanner:banner.adjustRestoreDivForCobBannerRef,toggleMenuBoxForCobBanner:banner.toggleMenuBoxForCobBannerRef,toggleTermsAndConditionDivForCobBanner:banner.toggleTermsAndConditionDivForCobBannerRef,testHooks:{fixOffsetUp:fixOffsetUp,fixOffsetDown:fixOffsetDown,DEFAULT_AUTH_MODE:DEFAULT_AUTH_MODE,getAuthModeFromJson:getAuthModeFromJson,convertToAbsoluteUrl:convertToAbsoluteUrl,createExecuteAttrProcessor:createExecuteAttrProcessor,createDefaultAttributeProcessor:createDefaultAttributeProcessor,createContent:createContent,createDetect:createDetect,getEmbeddedResourceURL:getEmbeddedResourceURL,getDomain:getDomain,isSameOrigin:isSameOrigin,URL_REGEXP_CHECK_HTTP_PROTOCOL:URL_REGEXP_CHECK_HTTP_PROTOCOL}}
})(jQuery);