;(function(){
    var 
      _flixLoader = {
        mappingTable:{
          'data-flix-distributor' : {'inpage':'','button':'d','value':null,'hotspot':'d'},
          'data-flix-language' : {'inpage':'','button':'l','value':null,'hotspot':'l'},
          'data-flix-mpn' : {'inpage':'mpn','button':'mpn','value':null,'hotspot':'mpn'},
          'data-flix-ean' : {'inpage':'ean','button':'ean','value':null,'hotspot':'ean'},
          'data-flix-url' : {'inpage':'url','button':'url','value':null, 'hotspot':'url'},
          'data-flix-sku' : {'inpage':null,'button':'sku','value':null, 'hotspot':'sku'},
          'data-flix-button' : {'inpage':null,'button':'dom','value':null, 'hotspot':null},
          'data-flix-inpage' : {'inpage':null,'button':null,'value':null, 'hotspot':null},
          'data-flix-button-image' : {'inpage':null,'button':'img','value':null, 'hotspot':null},
          'data-flix-energylabel' : {'inpage':'energylabel','button':'energylabel','value':null, 'hotspot':null},
          'data-flix-embed' : {'inpage':null,'button':'embed','value':null, 'hotspot':null},
          'data-flix-brand' : {'inpage':'brand','button':'brand','value':null, 'hotspot':'brand'},
          'data-flix-fallback-language' : {'inpage':'fl','button':'fl','value':null, 'hotspot':'fl'},
          'data-flix-price' : {'inpage':null,'button':'p','value':null, 'hotspot':'p'},
          'data-flix-hotspot': {'inpage': null, 'button': null, 'value': null, 'hotspot':'hotspot'},
          'data-flix-mobilesite' : {'inpage':'ms','button':'ms','value':null, 'hotspot':null},
          'data-flix-rec' : {'inpage':null,'button':null,'value':null, 'hotspot':null,'model':{"alternative":"m3","crossell":"m5","upsell":"m6"}}
        },
        instance:null,
    ab: {"d":{"78":"1","96":"1","145":"1","174":"1","179":"1","219":"1","228":"1","241":"1","291":"1","353":"1","370":"1","371":"1","418":"1","467":"1","523":"1","594":"1","859":"1","860":"1","867":"1","920":"1","1328":"1","1544":"1","2300":"1","2754":"1","3922":"1","3924":"1","3926":"1","3976":"1","3986":"1","4132":"1","4150":"1","4824":"1","4870":"1","4874":"1","5047":"1","5375":"1","5422":"1","5434":"1","5758":"1","5807":"1","5950":"1","6050":"1","6148":"1","6563":"1","6579":"1","6583":"1","6714":"1","6825":"1","6913":"1","7228":"1","7434":"1","7435":"1","8847":"1","12039":"1","12199":"1","12313":"1","12496":"1","12664":"1","12884":"1","12909":"1","12959":"1","14001":"1"},"d_hotspot":{"795":"1"},"button":{"mpn":{},"ean":{}},"inpage":{"mpn":{"UX501VW-DS71T":"1","UX303UB-DH74T":"1","RF60309OC":"1","ORB153C":"1","R6192FX":"1","NRKI4181CW":"1","ORK193C-L":"1","RI4181AW":"1","RCI4181AWV":"1","RIU6F091AW":"1","NRCI4181CW":"1","BO635E11W":"1","ORK193C":"1","ORB153BL":"1","W6523SC":"1","RI4091AW":"1","ONRK193C":"1","RKI4181AWV":"1","79G-04589":"1","MQUF2PA\/A":"1","3956842":"1","MQ562PA\/A":"1","MQ3C2LL\/A":"1","NETA-SW01-EC":"1","NET3700730500104":"1","NETA-SC01-EU_WELCOME":"1","RF60309OC-L":"1","AUC5060134334797":"1","FOO5011773058070":"1","GIGADEVOLO76959":"1","DEV9298":"1","DEV9422":"1","DEV9790":"1","DEV9391":"1","DEV9377":"1","DEV9084":"1","4159004":"1","0013C009AA":"1","0013C009":"1","0592C129AA":"1","0592C106AA":"1","0570C005AA":"1","C912937":"1","0515C026AA":"1","1046275":"1","C973659":"1","1160C115AA":"1","1160C031AA":"1","135177095":"1","1790C002AA":"1","1791C016AA":"1","N5R61UA#ABA":"1","X7U39UA#ABA":"1","15-cc067cl":"1","270-a047cb":"1","I3668-3106BLK":"1","15-bs078cl":"1","15-AQ165NR":"1","43Q-00001":"1","799366324201":"1","79G-04751":"1","FJT-00007":"1","SDSDXXG-064G-ANCIN":"1","SDSDXXG-128G-ANCIN":"1","SDSDXXG-032G-ANCIN":"1","SDSDUNC-032G-GN6IN":"1","0G04069":"1","0G04077":"1","0G04081":"1","0G03674":"1","0G02428":"1","SDSDXXG-256G-ANCIN":"1","0G04085":"1","0G03594":"1","0G04860":"1","0G05016":"1","0G03050":"1","0G03906":"1","90140739":"1","0000125420643":"1","WD10EZEX":"1","79G-04286":"1","0885370989076":"1","15-cc057cl":"1","R5-571T":"1","15-bw071nr":"1","15-bs067cl":"1","10-p020nr":"1","15-cb077cl":"1","FJX-00007":"1","FJR-00007":"1","FJZ-00007":"1","FJX-00012":"1","FJR-00012":"1","FJT-00001":"1","FJT-00012":"1","GE83X":"1","WW65K52E69SDLP":"1","SM-R760NDAASER":"1","VCC8874H35\/XEV":"1","UE49MU6202":"1","UE55MU6172UXXH":"1","UE50MU6100UXRU":"1","Z4K13PA":"1","1HP12PA":"1","G5J38A":"1","1DF76PA":"1","Z6Y82PA":"1","Z3M41D":"1","1PL83PA":"1","1PM00PA":"1","2JQ93PA":"1","2SM05PA":"1","2FL32PA":"1","SONYXPERIAL1DSNO":"1","1309-0693":"1","SONYXPERIAXA1ULN":"1","SONYXPERIAXZSSBC":"1","SONYXPERIAXA1PB":"1","SON7311271593041":"1","SONYXPERIAEAR":"1","SON7311271595373":"1","SONYXPERIAXZ1CN":"1","SONYXPERIAXA1DSN":"1","1309-0659":"1","4049D-2AALWE1":"1","C1020786":"1","5026D-2AALWE1":"1","8050D-2GALWEL-1":"1","UE40M5000AUXRU":"1","WW65J42E04WDLP":"1","UE49MU6100UXRU":"1","SMA520FZKDSER":"1","MG23K3513AS":"1","MS23K3513AK":"1","SC18M2150SG":"1","WW80K42E07S":"1","WW65K42E00W":"1","ME83KRS1":"1","WW65K42E00S":"1","SC20M255AWB":"1","RSA1SHVB1BWT":"1","RB37J5240EF\/WT":"1","WF60F1R2E2WDLP":"1","0G05221":"1","0G05368":"1","0G05190":"1","0G05748":"1","0G05363":"1","0G04101":"1","0G04023":"1","0G06071":"1","0G05666":"1","0G06053":"1","0G05753":"1","0G05220":"1","0G06052":"1","0G06072":"1","0G05217":"1","0G05219":"1","0G05674":"1","0G04547":"1","AR5142812S63IHDDC":"1","1174157":"1","ASUG11DFFR028T":"1","i5675-A933BLU-PUS":"1","2HL87AA":"1","MQD02PA\/A":"1","3958065":"1","3956843":"1","MQ572PA\/A":"1","MQUG2PA\/A":"1","3956844":"1","880-027c":"1","2CS53EA":"1","8050D-2EALGBL":"1"},"ean":{"4549292017380":"1","3838942899386":"1","3838942093357":"1","3838942001543":"1","3838942922503":"1","3838942087684":"1","3838942816963":"1","3838942815980":"1","3838942104206":"1","3838942818028":"1","3838942030314":"1","3838942093333":"1","3838942094903":"1","3838942948749":"1","3838942819438":"1","3838942104954":"1","3838942259081":"1","3838942815973":"1","4713883334372":"1","0190198532121":"1","0190198447043":"1","0190198422217":"1","3700730500104":"1","3700730500234":"1","3700730500623":"1","3700730501866":"1","3700730501873":"1","3700730502030":"1","3700730501552":"1","3700730501545":"1","3838942898716":"1","5011773062213":"1","5011773058070":"1","5060134334797":"1","5011773061957":"1","5011773055178":"1","5011773062176":"1","4250059692985":"1","4250059693913":"1","4250059699687":"1","4250059698352":"1","4250059690844":"1","4250059693777":"1","4250059694224":"1","4250059697904":"1","4250059695184":"1","4549292037128":"1","4549292023503":"1","4960999847078":"1","8714574654164":"1","8714574646206":"1","4549292037692":"1","8714574593623":"1","4549292036305":"1","4549292036473":"1","4549292036329":"1","4549292056426":"1","4549292056488":"1","4549292056594":"1","8714574642390":"1","8714574643939":"1","8714574642970":"1","4549292058925":"1","8714574642314":"1","4549292056365":"1","4549292083446":"1","4549292063721":"1","4549292091335":"1","8714574651620":"1","0190780619889":"1","0191628653317":"1","0191200059599":"1","4713883230933":"1","4712900760484":"1","4713883165204":"1","0885370988529":"1","0889842193114":"1","0619659136611":"1","0619659161422":"1","0619659137175":"1","0718037779911":"1","0718037852959":"1","0619659058500":"1","0619659000431":"1","0718037840147":"1","0718037829982":"1","0718037846910":"1","0718037847962":"1","125420643":"1","0885370988321":"1","9337694027893":"1","4712900710724":"1","0191999181761":"1","4712900741926":"1","0889842193251":"1","0889842192971":"1","0889842193398":"1","0889842248678":"1","0889842248890":"1","0889842249118":"1","0889842249224":"1","0889842193206":"1","8806085341364":"1","8806085423084":"1","8806086725804":"1","8806088230375":"1","8806088504926":"1","8806088549385":"1","8806088534725":"1","8806088532448":"1","8806088558011":"1","8806088704579":"1","8806088710631":"1","8806088730592":"1","8806088679785":"1","8806088744438":"1","8806088746883":"1","8806088803920":"1","8806088877679":"1","8806088758725":"1","8806088826707":"1","8806088826721":"1","8801643072155":"1","4713392860423":"1","4713392860454":"1","4713392676741":"1","4713392649318":"1","8710103805274":"1","4713392649301":"1","4713392857843":"1","8710103805113":"1","8710103805137":"1","8710103805120":"1","4713392676765":"1","4713392860416":"1","4713392649288":"1","4713392649332":"1","8806086199186":"1","0190781714774":"1","0190780861547":"1","0190780861790":"1","0190781936787":"1","0190781939481":"1","7311271590040":"1","7311271586616":"1","7311271586593":"1","7311271575504":"1","7311271595298":"1","7311271590026":"1","7311271593041":"1","7311271564225":"1","7311271595373":"1","7311271595380":"1","7311271595243":"1","7311271608714":"1","7311271608462":"1","7311271608585":"1","7311271589952":"1","4894461748856":"1","4894461743028":"1","4894461362649":"1","4894461436180":"1","4894461462400":"1","4894461361697":"1","4894461360324":"1","4894461462523":"1","4894461751337":"1","4894461462554":"1","4894461361710":"1","4894461748849":"1","4894461453897":"1","8806088697048":"1","8806088598819":"1","8801643095413":"1","8806088276380":"1","8801643097530":"1","8806088746739":"1","8801643164560":"1","8801643163631":"1","8806088741246":"1","8806088111186":"1","8806088919430":"1","8806088783437":"1","8806086522588":"1","8806088165066":"1","889842249118":"1","0889842247329":"1","0889842247510":"1","0889842247411":"1","0889842193077":"1","0191376026371":"1","0889842204698":"1","0889842008876":"1","0889842003192":"1","0191999086226":"1","4713883398558":"1","0889842086157":"1","0889842171525":"1","0889842089875":"1","8801643066857":"1","3700546702532":"1","0192158038483":"1","5025155028056":"1","3016661150906":"1","8806084220936":"1","8806085446656":"1","3520410038563":"1","8801643150839":"1","8806088753461":"1","5025155034095":"1","8801643151881":"1","0192158623504":"1","0191628292462":"1","0191628970537":"1","0191628359769":"1","4712900757996":"1","0191927034206":"1","4015625793905":"1","4713883216302":"1","4712900758658":"1","5397184044766":"1","4015625793899":"1","0190198461216":"1","0190198447135":"1","0190198532213":"1","0190198461124":"1","4894461455679":"1","4894461732312":"1","4894461426259":"1","4894461446035":"1","4894461368320":"1"}},"hotspot":{"mpn":{"1960C004AA":"1","1803C001":"1","1160C031":"1","1276C005":"1","0011C012":"1","MPN":"1","9899B007":"1","Canon":"1"},"ean":{"4549292083903":"1","4549292066517":"1","4549292088359":"1","4549292083088":"1","4549292038552":"1","4549292056365":"1","8714574637310":"1","4549292061383":"1","8714574636009":"1","4549292052893":"1","4960999214078":"1","4960999214207":"1","4960999635262":"1","4549292010152":"1","8714574630489":"1","8714574627939":"1","4960999922768":"1","8714574627731":"1","08714574625058":"1","4960999990491":"1","0810351025030":"1","0810351029281":"1","7363456289290":"1","0889899631126":"1","0889296375357":"1","0190780862230":"1","4895185620077":"1","8806088924205":"1","8806088704852":"1","8806088982915":"1","8806088926544":"1","8806088744209":"1","8806088321479":"1","8806088520230":"1","8806088788821":"1","8806088425603":"1"}}},
        isAb:function(type){
          try{
            if (!this.ab.d.hasOwnProperty(this.mappingTable['data-flix-distributor']['value'])) { return false; }
            if (this.ab[type]['mpn'].hasOwnProperty(this.mappingTable['data-flix-mpn']['value'])) { return true; }
            if (this.ab[type]['ean'].hasOwnProperty(this.mappingTable['data-flix-ean']['value'])) { return true; }
          }
          catch(e){
              this.log(e.message);
          }
          return false;
        },
        ismobile: function() {
          var check = false;
          (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
          return check;
        },
        mobileDistributorIds : {"2754":1,"2162":1,"370":1},
        init:function() {
          try {
            var scs = document.getElementsByTagName('script');
            for(var i=0;i<scs.length;i++){
              if (scs[i].src.indexOf('dev-delivery')>0 || scs[i].src.indexOf('flixfacts.com/js/loader')>0 || scs[i].src.indexOf('flixsyndication.net/minisite/ssl/js/loader')>0 || scs[i].src.indexOf('flixsyndication.net/minisite/ssl/logo/code/js/l.js')>0 || scs[i].src.indexOf('flixsyndication.net/js/loader')>0 || scs[i].src.indexOf('logo.flixfacts.co.uk/code/js/l.js')>0 || scs[i].src.indexOf('flixfacts.co.uk/link.php')>0) {
                this.instance=scs[i];
                break;
              }
            }
            this.errLog();
            this.setGvid();
            this.parse();
            this.load('button');
            this.load('inpage');
            this.load('hotspot');
          } 
          catch(e) {
            this.log(e.message);
          }
        },
        setValue:function(name,value){
          if(name == "data-flix-ean" && value != "" && value.length<13) {
            value = Array(13 + 1 - value.length).join('0') + value;
          }
			try{
				if(name == "data-flix-rec" && value != "") {
					var prws = value.split(",");
					var res ={};
					for (var i=0;i<prws.length;i++){
						var itm = prws[i].split(":");
						if(itm.length>1){
							var model_name = this.mappingTable[name].model[itm[0]] || "m3";
							res[model_name]=itm[1]
						}else{
							var model_name = "m3";
							res[model_name]=itm[0]
						}
				   }
				   value = res;
				}
			}catch(e){}
          var fname = (this.mappingTable[name]!=undefined ) ? this.mappingTable[name] : this.mappingTable[this.mapOldParam(name)];
          if (fname!=undefined && value) {
            fname['value']=value;
          }
        },
        mapOldParam:function(name){
          try
          {
            for (var i in this.mappingTable){
              if (this.mappingTable[i]['button']==name) {
                return i;
              }
            }
          }
          catch (e) {
            this.log(e.message);
          }
        },
        validate:function(){
          if(this.mappingTable['data-flix-button']['value'] == null && this.mappingTable['data-flix-inpage']['value']==null){
            this.mappingTable['data-flix-button']['value'] = 'flix-minisite';
          }
          
          if(this.mappingTable['data-flix-distributor']['value'] == null){
            this.log('distributor is not set');
            return false;
          }

          if (this.mappingTable['data-flix-language']['value']==null){
            this.log('language is not set');
            return false;
          }

          if( !! this.ab.d_hotspot[this.mappingTable['data-flix-distributor']['value']] && ! this.mappingTable['data-flix-hotspot']['value']) {
            this.mappingTable['data-flix-hotspot']['value'] = 'flix-hotspot';
          }
          else if( this.ab.d[ this.mappingTable['data-flix-distributor']['value']] && 
          ( this.mappingTable['data-flix-ean']['value'] in this.ab.hotspot.ean || this.mappingTable['data-flix-mpn']['value'] in this.ab.hotspot.mpn )) {
            this.mappingTable['data-flix-hotspot']['value'] = 'flix-hotspot';
          }
          return true;
        },
        _s : function(url,append_dom,options){
            var _fscript = document.createElement('script');
            _fscript.setAttribute("type","text/javascript");
            _fscript.setAttribute("src", url);
            _fscript.async = "true";
            for (var i in options) {i=="id" ? _fscript.id=options[i] : _fscript.setAttribute(i,options[i]);}
            append_dom.appendChild(_fscript);
            return _fscript;
        },
        log: function(msg){
          try{
            console.log(msg);
          }catch(e){}
        },
        load:function(type){
           if( this.ismobile() && ( type == 'button'  || type == 'hotspot' ) ) {
             return false;              
          }         
          if ( ! this.validate() ) return false;
          var elem = this.mappingTable['data-flix-'+type]['value'];
          if (elem==null) return false;
          var dom = document.getElementById(elem);

          if (!dom && type != 'hotspot'){
            try {
              var div = document.createElement('div');
              div.id=elem;
              this.instance.parentNode.appendChild(div);
            } 
            catch(e) {
              this.log(e.message);
              return false;
            }
          }

          try {
            var url = this.getUrl(type);
            var options={};
            var scache = this.isAb(type) ? "&fcache="+Math.random() : "";
            scache+="&ext=.js";
       

            if (!this.isAb(type)) options.crossorigin = "true";
            if (type=='button') {
              this._s(url+scache,document.getElementById(elem),options);
              var styleElement = document.createElement("style");
              var cssCode="#"+elem+" a img {padding-right:3px;}";
              styleElement.type = "text/css";
              if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = cssCode;
              } 
              else {
                styleElement.appendChild(document.createTextNode(cssCode));
              }
              document.getElementsByTagName("head")[0].appendChild(styleElement);
            }
            else if (type == 'inpage'){
                this._s(url+scache,document.getElementById(elem),options);
            } 
            else if (type == 'hotspot'){
                this._s(url+scache,document.getElementsByTagName('head')[0],options);
            }
          }
          catch (e) {
            this.log(e.message);
            return false;
          }
        },
        getUrl:function(btype) {
          var url = '';
          var url_in = '';
          var url_mn = '';
          var url_hs = '';
          for (var i in this.mappingTable)
          {
            if (this.mappingTable[i]['value']==null) continue;
            if (this.mappingTable[i][btype]==null) continue;

            value_m = this.mappingTable[i]['value'];

            value_n = value_m.replace(/'/g, "%27");

            url+="&"+ this.mappingTable[i][btype]+"="+encodeURIComponent(value_n);

            if (i=='data-flix-inpage') continue;
            if (i=='data-flix-price') continue;
            if (i=='data-flix-button-image') continue;
            if (i=='data-flix-button') continue;
            if (i=='data-flix-price') continue;
            if (i=='data-flix-button-image') continue;
            if (i=='data-flix-fallback-language') continue;
            if (i=='data-flix-brand') continue;
            if (i=='data-flix-energylabel') continue;
            if (i=='data-flix-mobilesite') continue;

            url_in+= ((this.mappingTable[i]['inpage']=='') ? '' : this.mappingTable[i]['inpage']+"/" ) + escape(this.mappingTable[i]['value'])+"/";
            url_mn+= ((this.mappingTable[i]['inpage']=='') ? '' : this.mappingTable[i]['inpage']+"/" ) + escape(this.mappingTable[i]['value'])+"/";
            url_hs+= ((this.mappingTable[i]['inpage']=='') ? '' : this.mappingTable[i]['inpage']+"/" ) + escape(this.mappingTable[i]['value'])+"/";

          }

          url+=('https:' == document.location.protocol) ? "&ssl=1":"";

          if (this.mappingTable['data-flix-mpn']['value']==null && this.mappingTable['data-flix-ean']['value']==null) {
            var uc = encodeURIComponent(window.location.pathname); /*get a unique url*/
            this.setValue('data-flix-url', uc.replace(/\W/g,""));
            url_in+=uc.replace(/\W/g,"");
            url_mn+=uc.replace(/\W/g,"");
            url_hs+=uc.replace(/\W/g,"");
          }

          var minisite_url = ('https:' == document.location.protocol) ? 'https://media.flixcar.com/delivery/js/minisite/' : 'http://media.flixcar.com/delivery/js/minisite/';
          var inpage_url = ('https:' == document.location.protocol) ? 'https://media.flixcar.com/delivery/js/inpage/' : 'http://media.flixcar.com/delivery/js/inpage/';
          var hotspot_url = ('https:' == document.location.protocol) ? 'https://media.flixcar.com/delivery/js/hotspot/' : 'http://media.flixcar.com/delivery/js/hotspot/';

          var distributorIds = {"8772":1};
          if ( distributorIds.hasOwnProperty(this.mappingTable['data-flix-distributor']['value'])) {
                minisite_url = ('https:' == document.location.protocol) ? 'https://d20d8a0b518lq3.cloudfront.net/delivery/js/minisite/' : 'http://d20d8a0b518lq3.cloudfront.net/delivery/js/minisite/';
                inpage_url = ('https:' == document.location.protocol) ? 'https://d20d8a0b518lq3.cloudfront.net/delivery/js/inpage/' : 'http://d20d8a0b518lq3.cloudfront.net/delivery/js/inpage/';
                hotspot_url = ('https:' == document.location.protocol) ? 'https://d20d8a0b518lq3.cloudfront.net/delivery/js/hotspot/' : 'http://d20d8a0b518lq3.cloudfront.net/delivery/js/hotspot/';
          }

          if( this.ismobile() /*&& this.mobileDistributorIds.hasOwnProperty(this.mappingTable['data-flix-distributor']['value']) */ ){
              inpage_url = ('https:' == document.location.protocol) ? 'https://media.flixcar.com/delivery/mobile/js/' : 'http://media.flixcar.com/delivery/mobile/js/';
            if( this.isAb("inpage")) {
              inpage_url = "//media.flixcar.com/ab/mobile/js/";
            }
            url=( url.replace("&ms=Yes", "") ) +"&forcedstop=bymobile" ;
          }

          //url = (btype=='button') ? minisite_url + url_mn.substr(0,url_mn.length-1) + '?' + url.substr(1) : inpage_url + url_in.substr(0,url_in.length-1) + "?" + url;

          if (btype == 'button')
              url = minisite_url + url_mn.substr(0, url_mn.length - 1) + '?' + url.substr(1);
          if (btype == 'inpage')
              url = inpage_url + url_in.substr(0, url_in.length - 1) + "?" + url;
          if (btype == 'hotspot')
              url = hotspot_url + url_hs.substr(0, url_hs.length - 1) + "?" + url;


          return url;
        },
        parse:function(){
          var qmark = this.instance.src.indexOf('?');
          if(qmark != -1) {
            var itms = 	this.instance.src.substr(qmark+1).split("&");
            for (var i=0;i<itms.length;i++ ) {
              var kv = itms[i].split("=");
              this.setValue(kv[0],decodeURIComponent(kv[1]));
            }
          }else{
            for (var i in this.mappingTable ) {
              try{
                this.setValue(i,this.instance.getAttribute(i));
              }catch(e){ this.log(e.message);}
            }
          }
        },
        errLog: function(){
          try {
            window.addEventListener('error', function (err) {
              if (!err) return;
              if(err.filename && /flix(facts|car|syndication)\./g.test(err.filename)) {
                var det = err.colno ? 'l:' + err.lineno +', c:'+ err.colno : 'l:' + err.lineno;
                det+=" "+window.location.href;
                var i = new Image;
                i.src="//rt.flix360.com/jserr?f="+encodeURIComponent(err.filename)+"&d="+encodeURIComponent(det)+"&m="+encodeURIComponent(err.message);
              }
            });
          } catch(e){
              this.log(e.message);
          }
        },
        setGvid:function() {
          if ( document.getElementById('data-flix-t-script') ) return;
          window['flixgvid'] = function(obj){
            try{
              delete window['flixgvid'];
              window.flixJsCallbacks['gvid'] = obj['gvid'];
            }catch(e){}
          };
          this._s("//t.flix360.com/?f=flixgvid",document.getElementsByTagName('head')[0],{"id":"data-flix-t-script"});


        }
      };
    var 
      flixJsCallbacks = {
        _loadCallback:null,
        _loadInpageCallback:null,
        _loadMinisiteCallback:null,
        _loadNoshowCallback:null,

        setLoadCallback:function(cFunction,ftype){
          try{
            if (cFunction && typeof(cFunction) === "function" ) {
              switch(ftype) {
                case "inpage": this._loadInpageCallback = cFunction;  break;
                case "minisite" : this._loadMinisiteCallback = cFunction; break;
                case "noshow" : this._loadNoshowCallback = cFunction; break;
                default:	this._loadCallback = cFunction; break;
              }
            }
            else { throw cFunction+" is not a function";}
          }
          catch(e) {
            try {console.log(e);}catch(e1){}
          }
        }
    };
    var getFlixCallback = function(){
      return flixJsCallbacks;
    };
    window['flixJsCallbacks'] = getFlixCallback();
    _flixLoader.init();
})();















































