/*
Plugin Name: isitetv_player
Version: 1.0.4
Description: jQuery Plugin for displaying media
Author: Susan Buckle


 * Built on top of the jQuery library
 *   http://jquery.com
 *   jquery-XXXX.js
 *   
 *   
 *   EXAMPLE
 *   
 *   

/*global window, jQuery */
(function(isitetv_jq) {
	
    /**
     * The isitetv_player object.
     *
     * @constructor
     * @class isitetv_player
     * @param options {Object} A set of key/value pairs to set as configuration properties.
     * @cat Plugins/isitetv_player
     * 
     * www.isitetv.com 		new-testing.office.isitetv.com
     * '/isitetv_cms/'		'/isitetv_cms_admin/www/players/html/'
     * 
     * random unique id for the contents div
     * https://github.com/pnegri/uuid-js 
     * 
     */
	var iSitetv_Player = function(element, options) {

		var defaults = {
				
				action:								'',
				
				slave_url:							'',

				div_to_replace_contents:			'',
				tag_to_replace_contents:			'',
				div_to_replace_contents_class:		'',
				
				pass_through_key_value:             '',

				or_sat:                             '',
				or_swa:                             '',
				or_sap:                             '', 
				or_dm:                              '', 
				or_use_overlay:                     '',   
				
				player_height:						0,
				player_width:						0,
				
				encoded_value:						'',
				customer_id:    			        '',
				sku:								'',
				
				set_player_id:						-1,
				
				no_player_display_splash_screen:	'N',
				splash_screen_image:				'',
				splash_screen_text:					''

			};

		//callback functions
		var cb_get_css          = function(json){get_css(json);};
		var cb_get_enviroment   = function(json){get_enviroment(json);};
		//var cb_get_fonts        = function(json){get_fonts(json);};
		var cb_get_javascript   = function(json){get_javascript(json);};
		var cb_get_player       = function(json){get_player(json);};
		var cb_get_template     = function(json){get_template(json);};
		var cb_replace_div      = function(json){replace_div_with_our_div_calback(json);};
		var cb_get_resp_player  = function(json){get_resp_player(json);};

		//var cb_menu_clicked     = function(event){menu_clicked(event);};

		//arrays
    	var browser_array = ['bonecho', 'camino', 'epiphany', 'firebird', 'flock', 'galeon', 'iceape', 'icecat', 'k-meleon', 'minimo', 'multizilla', 'phoenix', 'songbird', 'swiftfox', 'seamonkey', 'shiretoko', 'iceweasel', 'firefox', 'minefield', 'netscape6', 'netscape', 'msie', 'chrome', 'safari', 'opera' ];
    	var os_array = ['windows nt', 'windows', 'linux', 'mac', 'unix'];
    	var webkit_array  = ['arora', 'epiphany', 'gtklauncher', 'konqueror', 'midori', 'omniweb', 'uzbl', 'applewebkit', 'webkit'];
    	var device_browser_array = ['avantgo', 'blazer', 'chrome', 'elaine', 'eudoraweb', 'iemobile',  'minimo', 'mobile safari', 'safari', 'mobileexplorer', 'opera mobi', 'opera mini', 'netfront', 'opwv', 'polaris', 'semc-browser', 'up.browser', 'webpro', 'wms pie', 'xiino'];
    	var device_device_array = ['benq', 'blackberry', 'danger hiptop', 'ddipocket', ' droid', 'ipad', 'ipod', 'iphone', 'kindle', 'lge-cx', 
    	                           'lge-lx', 'lge-mx', 'lge vx', 'lge ', 'lge-', 'lg-android', 'lg;lx', 'nintendo wii', 'nokia', 'palm', 'pdxgw', 
    	                           'playstation', 'sagem', 'samsung', 'sec-sgh', 'sharp', 'sonyericsson', 'sprint', 'zune', 'j-phone', 'n410', 
    	                           'mot 24', 'mot-', 'htc-', 'htc_', 'htc ', 'sec-', 'sie-m', 'sie-s', 'spv ', 'vodaphone', 'smartphone', 'armv', 
    	                           'midp', 'mobilephone', 'gt-i9300'];
    	var device_os_array = ['android', 'epoc', 'linux armv', 'palmos', 'palmsource', 'windows ce', 'windows phone os', 'symbianos', 'symbian os', 'symbian', 'webos', 'mac'];
    	var device_service_array = ['astel',  'docomo',  'novarra-vision', 'portalmmm', 'reqwirelessweb', 'vodafone'];
    	
		//enviroment
		var env_ipad       = 'N';
		var env_iphone     = 'N';

		var using_browser  = '';
		var using_webkit   = '';
		var using_os       = '';
		var device_os      = '';
		var device_browser = '';
		var device_device  = '';
		var device_service = '';
		var device_mobile  = 'N';

		//get the user agent
		var user_agent                = window.navigator.userAgent.toLowerCase();

		var elem                      = isitetv_jq(element);
		var obj_id                    = element.id;
		
		//set the vars
		var options                   = isitetv_jq.extend(defaults, options);
		
		var slave_url                 = '';
		var slave_url_adder           = '/isitetv_cms/';
		
		
		if(options.slave_url != '' && options.slave_url.indexOf('isitetv.com') ){
			
			slave_url = options.slave_url;
			
		}
		
		var slave_number              = 0;
		
		var our_div_holder_id         = 'isitetv_holder_div';
		
		var change_div_to_replace     = '';
		var change_player_template_id = -1;
		var change_template_name      = '';
		var change_main_template      = '';
		
		var use_template              = 'N';
		
		var play_in_demo_mode         = 'N';
		var player_is_restricted      = 'N';

		var asset_list_type_id        = -1;
		var enviroment_id             = -1;
		var enviroment_1              = '';
		var enviroment_2              = '';
		var enviroment_3              = '';
		var enviroment_4              = '';
		var playlist_id               = -1;
		var player_id                 = -1;
		var playlist_tabs_id          = -1;
		var playlist_tabs_contents_id = -1;
		var sku_id                    = -1;
		var start_log_id              = -1;
		var tab_id                    = -1;
		var video_id                  = -1;
		var website_language_id       = -1;
		
		//var bg_image_path             = '';

		var ml_product_name           = '';
		var pl_product_name           = '';
		var ml_company_name           = '';
		var pl_company_name           = '';
		var sku                       = options.sku;
		//var asset_name                = '';
		var asset_type                = '';
		var asset_position1           = -1;
		var asset_position2           = -1;
		var asset_current_position    = -1;
		var media_set_number          = 0;
		var retail_price              = 0;
		var player_template_id        = '';
		var template_name             = '';
		var main_template             = 'Y';

		var isitetv_player_width      = 0;
		var isitetv_player_height     = 0;
		var hole_player_width         = 0;
		var hole_player_height        = 0;
		
		var get_resp_player_parts_ary = new Array();
		
		//limiting the number or writes to the logging server  30/09/2015
		var last_logging_time         = 0;
		var last_logging_per          = 0;		
		var logging_per_blocks        = 10;
		
		var web_page_referer          = (window.location != window.parent.location)
								        ? document.referrer
								        : document.location;
		web_page_referer              = encodeURIComponent(web_page_referer);
		
		var use_outside_logging                            = '';
		//var use_outside_logging_check_log                  = '';
		var use_outside_logging_adobe                      = '';
		var use_outside_logging_javascript_url             = '';
		var use_outside_logging_percent_blocks             = '';
		var use_outside_logging_end_percent                = '';
		var use_outside_logging_player_name                = '';
		var use_outside_logging_prefix_name                = '';
		var use_outside_logging_send_what                  = '';
		var use_outside_logging_send_what_delimiter        = '';
		var use_outside_logging_send_what_cut              = '';
		var use_outside_logging_send_time_viewed           = 'N';
		var use_outside_logging_action_code                = -1;
		var use_outside_logging_report_suite_id            = '';
		var use_outside_logging_adobe_version              = '';
		var use_outside_logging_tracking_server            = '';
		var use_outside_logging_heartbeat_tracking_server  = '';
		var use_outside_logging_publisher                  = '';
		var use_outside_logging_visitor_id                 = '';

		var use_outside_logging_sent_play                  = 'N';
		var use_outside_logging_consolelog                 = 'N';
		
		var use_outside_logging_array                      = new Array();
		
		var use_outside_logging_adobe5_sent_play           = 'N';
		var use_outside_logging_adobe5_sent_pause          = 'N';
		var use_outside_logging_video_player_id            = 'isitetvmovie';
		
		var last_outside_logging_asset_list_type_id        = -1;
		var last_outside_logging_playlist_tabs_contents_id = -1;
		var last_outside_logging_playlist_tabs_id          = -1;
		var last_outside_logging_tab_id                    = -1;
		var last_outside_logging_video_asset_id            = -1;
		var last_outside_logging_asset_id                  = -1;
		var last_outside_logging_action_code               = -1;
		var last_outside_logging_time_reason               = -1;
		var last_outside_logging_per_reason                = -1;
		var last_outside_logging_asset_title               = '';
		var last_outside_logging_run_time                  = -1;
		var last_outside_logging_open_log                  = 'N';
		var last_outside_logging_ini_log                   = 'N';
		var last_outside_logging_doing_ini                 = 'N';

		var logging_id_of_media_div                        = '';
		var logging_function_to_call                       = '';
		var logging_asset_list_type_id                     = -1;
		var logging_playlist_tabs_contents_id              = -1;
		var logging_playlist_tabs_id                       = -1;
		var logging_tab_id                                 = -1;
		var logging_video_asset_id                         = -1;
		var logging_asset_id                               = -1;
		var logging_asset_title                            = '';
		var logging_run_time                               = -1;
		var logging_last_timeplayed                        = -1;
		var logging_last_perplayed                         = -1;
		var logging_been_paused                            = false;
		var logging_view_video_movie                       = null;
		var logging_view_video_movie_ip                    = null;
		var logging_view_video_ini                         = false;
		var logging_view_video_ini_ip                      = false;
		var logging_view_video_ready_initialized           = false;
		var logging_view_video_ready_initialized_ip        = false;
		var logging_view_video_loop_fun_id                 = 0;
		var logging_view_video_loop_fun_id_ip              = 0;
		var logging_view_video_last_per                    = -1;
		var logging_view_video_last_per_ip                 = -1;
		var logging_last_perplayed_sent_to_isitetv         = 'N';
    	
    	this.get_outside_logging_play = function(){
    		
    		return use_outside_logging_adobe5_sent_play;
    		
    	};

    	this.get_outside_logging_pause = function(){
    		
    		return use_outside_logging_adobe5_sent_pause;
    		
    	};

    	this.set_outside_logging_pause = function(){
    		
    		use_outside_logging_adobe5_sent_pause = 'Y';
    		
    	};

    	this.get_outside_logging_stop = function(){
    		
    		return log_action_already_sent_close;
    		
    	};
    	
    	this.log_action_ini = function(t_id_of_media_div,
    								t_function_to_call,
    								t_asset_list_type_id,
    								t_playlist_tabs_contents_id,
    								t_playlist_tabs_id,
    								t_tab_id,
    								t_video_asset_id,
    								t_asset_id,
    								t_asset_title,
    								t_run_time){

    		logging_id_of_media_div           = t_id_of_media_div;
    		logging_function_to_call          = t_function_to_call;
    		logging_asset_list_type_id        = t_asset_list_type_id;
    		logging_playlist_tabs_contents_id = t_playlist_tabs_contents_id;
    		logging_playlist_tabs_id          = t_playlist_tabs_id;
    		logging_tab_id                    = t_tab_id;
    		logging_video_asset_id            = t_video_asset_id;
    		logging_asset_id                  = t_asset_id;
    		logging_asset_title               = t_asset_title;
    		logging_run_time                  = t_run_time;
        	
    	};
    	
    	this.isitetv_view_video_viewed = function(timeplayed,perplayed){
    		
    		//do the logging
    		do_isitetv_view_video_viewed(timeplayed,perplayed);
    		
    	};
    	
    	function do_isitetv_view_video_viewed(timeplayed,perplayed){
    		
    		
    		//if it has been paused
    		if(logging_been_paused){
    			
    			logging_last_timeplayed = timeplayed;
    			logging_last_perplayed  = perplayed;

    		}

    		//if a different time then log
    		if(timeplayed != logging_last_timeplayed || perplayed != logging_last_perplayed){

    			//set the last
    			logging_last_timeplayed = timeplayed;
    			logging_last_perplayed  = perplayed;

        		//log the video action
        		log_the_video_action(logging_asset_list_type_id,
        							logging_playlist_tabs_contents_id,
        							logging_playlist_tabs_id,
        							logging_tab_id,
        							logging_video_asset_id,
        							logging_asset_id,
    								-1,
    								timeplayed,
    								perplayed,
    								logging_asset_title,
    								logging_run_time,
    								'N');
        		
        		//if compleated
        		if (perplayed == 100) {

        			//re set the last
        			logging_last_timeplayed        = -1;
        			logging_last_perplayed         = -1;
        			logging_view_video_last_per    = -1;
        			logging_view_video_last_per_ip = -1;
        			
        			//find the function 
        			var fn = window[logging_function_to_call];

        			//call the function
        			if(typeof fn === 'function') {
        				fn();
        			}
        			
        		}
        		
    		}
    		
    		//reset
    		logging_been_paused = false;
    		
    	};
    	
    	this.videoPlaying = function(){

    		//do the logging
    		do_isitetv_view_video_viewed(logging_last_timeplayed,logging_last_perplayed);
    		
    	};
    	
    	this.videoPaused = function(){
    		
    		//if html5 or mobile device 
    		if(logging_view_video_ini){
    			isitetv_view_video_loop();
    		}
    		
    		if(logging_view_video_ini_ip){
    			isitetv_view_video_loop_ip();
    		}
    		
    		//do the pause event
    		if(typeof adobe_video_do_pause == 'function') {
    			adobe_video_do_pause();
    		}	
    		
    		//set the flag
    		logging_been_paused = true;
    		
    	};
    	
    	this.videoSeeking = function(){

    		if(logging_view_video_ini){

    			var status = parseFloat(logging_view_video_movie.currentTime);
    			var howlng = parseFloat(logging_view_video_movie.duration);
    			var per =  howlng / status;
    			logging_view_video_last_per = 100 / per;

    		}

    		if(logging_view_video_ini_ip){

    			var status = logging_view_video_movie_ip.getStatus();
    			var cur_time = parseFloat(logging_view_video_movie_ip.getTime());
    			var howlng = parseFloat(logging_view_video_movie_ip.getDuration());
    			var per =  howlng / cur_time;
    			logging_view_video_last_per_ip = 100 / per;
      
    		}

    		if(typeof adobe_video_do_seeking == 'function') {
    			adobe_video_do_seeking();
    		}	

    	};
    	
    	this.videoSeeked = function(){

    		if(typeof adobe_video_do_seeked == 'function') {
    			adobe_video_do_seeked();
    		}	

    	};
    	
    	this.videoSeeked = function(){

    		if(typeof adobe_video_do_seeked == 'function') {
    			adobe_video_do_seeked();
    		}	

    	};
    	
    	this.popup_video = function(video_url){
    		
    		//calculate the logging
    		var b = 0;
    		var c = logging_run_time;
    		for(var a=1;a<=10;a++){
    			if(a<10){
    				b = a * 10;
    			}else{
    				b = 100;
    			}
    			do_isitetv_view_video_viewed(((c/100)*b),b);
    		}
    		
    		//display the video
    		window.open(video_url,"_blank","location=yes,height=100%,width=100%,scrollbars=no,status=yes");
    		
    		return false;
    		
    	};
    	
    	this.isitetv_view_video_player_ini = function(video_player_id){
    		
    		//set the flag
    		logging_view_video_ini               = true;
    		logging_view_video_ready_initialized = false;
    		logging_view_video_last_per          = -1;
    		logging_view_video_last_per_ip       = -1;
			logging_last_timeplayed              = -1;
			logging_last_perplayed               = -1;
			last_logging_time                    = 0;
			last_logging_per                     = 0;
    		
    		//get the element
    		logging_view_video_movie = document.getElementById(video_player_id);
    		
    		//start the timer
    		logging_view_video_loop_fun_id = window.setInterval("isitetv_view_video_loop()", 5000);

    		//set the events to do
    		isitetv_jq("#" + video_player_id).on("pause",function(){
    			videoPaused();
    		});
    		isitetv_jq("#" + video_player_id).on("seeked",function(){
    			videoSeeked();
    		});
    		isitetv_jq("#" + video_player_id).on("seeking",function(){
    			videoSeeking();
    		});
    		
    	};
    	
    	this.isitetv_view_video_player_ini_ip = function(video_player_id){

    		//set the flag
    		logging_view_video_ini_ip               = true;
    		logging_view_video_ready_initialized_ip = false;
    		logging_view_video_last_per             = -1;
    		logging_view_video_last_per_ip          = -1;
			logging_last_timeplayed                 = -1;
			logging_last_perplayed                  = -1;
			last_logging_time                       = 0;
			last_logging_per                        = 0;
    		
    		//get the element
    		logging_view_video_movie_ip = new pfQuicktime(video_player_id);
    		
    		//start the timer
    		logging_view_video_loop_fun_id_ip = window.setInterval("isitetv_view_video_loop_ip()", 5000);
    		
    		//set the events to do
    		isitetv_jq("#" + video_player_id).on("pause",function(){
    			videoPaused();
    		});
    		isitetv_jq("#" + video_player_id).on("seeked",function(){
    			videoSeeked();
    		});
    		isitetv_jq("#" + video_player_id).on("seeking",function(){
    			videoSeeking();
    		});
    		
    	};
    	
    	this.isitetv_view_video_loop = function() {
    		
    		var status = parseFloat(logging_view_video_movie.currentTime);
    		var howlng = parseFloat(logging_view_video_movie.duration);
    		
    		var per    =  howlng / status;
    		per        = 100 / per;
    		
    		//if not paused then the video is playing
    		if(!logging_view_video_movie.paused){
	    			
	    		if(isNaN(per) ){
	    			
	    		}else{
	    			
	    			if(parseInt(per) != parseInt(logging_view_video_last_per)){
	    				
	    				//alert(status + ' : ' + Math.floor( per ));
	    				logging_view_video_last_per = per;
	    				do_isitetv_view_video_viewed(status, Math.floor( per ));
	    				
	    			}
	    			
	    			if(per == 100){
	    				clearInterval(logging_view_video_loop_fun_id);
	    			}
	    			
	    		}
	    		
    		}
    	    
    	 };

    	 this.isitetv_view_video_loop_ip = function() {
    		 
    		 var status   = logging_view_video_movie_ip.getStatus();
    		 var cur_time = parseFloat(logging_view_video_movie_ip.getTime());
    		 var howlng   = parseFloat(logging_view_video_movie_ip.getDuration());
     		
    		 var per      = howlng / cur_time;
    		 per          = 100 / per;
    		 
    		 if(isNaN(per)){
    			 
    		 }else{
    			 
    			 if(status == 'ready') {
    				 
    				 if(parseInt(per) != parseInt(logging_view_video_last_per_ip)){
    					 
    					 logging_view_video_last_per_ip = per;
    					 
    					 if(!logging_view_video_ready_initialized_ip) {
    						 
    						 var duration = Math.round( logging_view_video_movie_ip.getDuration() );
    						 logging_view_video_ready_initialized_ip = true;
    						 
    					 }
    					 
    					 do_isitetv_view_video_viewed( Math.floor( logging_view_video_movie_ip.getTime() ), Math.floor( per ) );
    					 
    					 if(per == 100){
    						 clearInterval(logging_view_video_loop_fun_id_ip);
    					 }
    					 
    				 }
    				 
    			 }
    			 
    		 }
    		 
    	};
    	
    	this.log_action = function(t_asset_list_type_id,
    								t_playlist_tabs_contents_id,
    								t_playlist_tabs_id,
    								t_tab_id,
    								t_video_asset_id,
    								t_asset_id,
    								t_action_code,
    								t_reason,
    								t_asset_title,
    								t_run_time){
    		
    		//alert('log action ' + t_action_code + ' ' + t_reason);
    		
    		//add a log action
    		if(play_in_demo_mode != 'Y'){

    			//set the last
    			last_outside_logging_asset_list_type_id        = t_asset_list_type_id;
    			last_outside_logging_playlist_tabs_contents_id = t_playlist_tabs_contents_id;
    			last_outside_logging_playlist_tabs_id          = t_playlist_tabs_id;
    			last_outside_logging_tab_id                    = t_tab_id;
    			last_outside_logging_video_asset_id            = t_video_asset_id;
    			last_outside_logging_asset_id                  = t_asset_id;
    			last_outside_logging_time_reason               = t_time_reason;
    			last_outside_logging_per_reason                = t_per_reason;
    			last_outside_logging_asset_title               = t_asset_title;
    			last_outside_logging_run_time                  = t_run_time;
    			last_outside_logging_action_code               = t_action_code;

    			//log the action
    			log_action(t_asset_list_type_id,
    						t_playlist_tabs_contents_id,
    						t_playlist_tabs_id,
    						t_tab_id,
    						t_video_asset_id,
    						t_asset_id,
    						t_action_code,
    						t_reason,
    						t_reason,
    						t_asset_title,
    						t_run_time,
    						'N');
    			
    		}
    		
    	};

    	this.log_video_action = function(t_asset_list_type_id,
    									t_playlist_tabs_contents_id,
    									t_playlist_tabs_id,
    									t_tab_id,
    									t_video_asset_id,
    									t_asset_id,
    									t_time_reason,
    									t_per_reason,
    									t_asset_title,
    									t_run_time){
    		
    		//alert('log video action ' + t_time_reason + ' ' + t_per_reason);
    		
    		//log the video action
    		log_the_video_action(t_asset_list_type_id,
								t_playlist_tabs_contents_id,
								t_playlist_tabs_id,
								t_tab_id,
								t_video_asset_id,
								t_asset_id,
								-1,
								t_time_reason,
								t_per_reason,
								t_asset_title,
								t_run_time,
								'N');
    		
    	};
    	
    	this.change_div_contents = function(div_2_replace_id,template_name,position1,position2,current_position){

			//ini the last login
			log_actions_outside_logging_reset_last();
			
    		//set the change 
    		change_div_to_replace  = div_2_replace_id;
    		change_template_name   = template_name;
    		asset_position1        = position1;
    		asset_position2        = position2;
    		asset_current_position = current_position;

			//add the player
    		var params = set_params_4_istetv();
    		get_data_from_isitetv('isitetv_get_template.php',params,cb_get_template);
    		
    	};
    	
    	this.log_action_video_start = function(){

			//if to use ourside logging
			if(use_outside_logging == 'Y'){

				if(use_outside_logging_adobe == 'Y'){
					
                    use_outside_logging_adobe_start(last_outside_logging_time_reason, last_outside_logging_per_reason, last_outside_logging_run_time);
                    
				}
				
			}
			
    	};
    	
    	this.log_action_video_play = function(){

			//if to use ourside logging
			if(use_outside_logging == 'Y'){

				if(use_outside_logging_adobe == 'Y'){
					
                    use_outside_logging_adobe_play(last_outside_logging_time_reason,last_outside_logging_per_reason);
                    
				}
				
			}
			
    	};
    	
    	this.log_action_video_pause = function(){

			//if to use ourside logging
			if(use_outside_logging == 'Y'){

				if(use_outside_logging_adobe == 'Y'){
					
                    use_outside_logging_adobe_pause(last_outside_logging_time_reason,last_outside_logging_per_reason);
                    
				}
				
			}
			
    	};
    	
    	this.log_action_video_rewind = function(){

			//if to use ourside logging
			if(use_outside_logging == 'Y'){

				if(use_outside_logging_adobe == 'Y'){
					
                    use_outside_logging_adobe_rewind(last_outside_logging_time_reason,last_outside_logging_per_reason);
                    
				}
				
			}
			
    	};
    	
    	this.log_action_video_stop = function(){

			//if to use ourside logging
			if(use_outside_logging == 'Y'){

				if(use_outside_logging_adobe == 'Y'){
					
                    use_outside_logging_adobe_stop(last_outside_logging_time_reason,last_outside_logging_per_reason);
                    
				}
				
			}
				
    	};
    	
    	this.get_slave_url = function(){
    		
    		return slave_url;
    		
    	};
    	
    	
    	//******************************************************* START *************************************************************/
    	
		//do what the user asks
		display_player();
    	
    	function display_player(){

    		//get the enviroment
    		get_the_enviroment_vars();

    		//check to make sure that we have an id
    		if(obj_id == ''){
    			obj_id = element.id;
    		}

    		//if to override the player
    		if(options.set_player_id > -1){
    			player_id = options.set_player_id;
    		}
    		
    		//if no pass through then get the ones for our url as we may have been called in our own page
    		if(options.pass_through_key_value == ''){
    			
    			var hash;
    			var hashes     = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    			var found_hash = 'N';
			    
    			for(var i = 0; i < hashes.length; i++){
    				
    				if(found_hash == 'N'){

    					hash = hashes[i].split('=');
    					
    					if(hash.length > 1){
	    						
	    					if(hash[0].indexOf('#') > 0 || hash[1].indexOf('#') > 0 ){
	    					
	
	    						if(hash[0].indexOf('#') > 0){
	    							var th = hash[0].split('#');
	    							if(th[0] != ''){
	    								hash[0] = th[0];
	    							}else{
	    								hash[0] = th[1];
	    							}
	    						}
	
	    						if(hash[1].indexOf('#') > 0){
	    							var th = hash[1].split('#');
	    							if(th[0] != ''){
	    								hash[1] = th[0];
	    							}else{
	    								hash[1] = th[1];
	    							}
	    						}
	    						
	    						options.pass_through_key_value = options.pass_through_key_value + hash[0] + ',' + hash[1] + '|';
	    						
	    						found_hash = 'Y';
	    						
	    					}else{
		    						
		    					options.pass_through_key_value = options.pass_through_key_value + hash[0] + ',' + hash[1] + '|';
		    					
	    					}
	    					
    					}
    					
    				}
    				
			    }
			    
    		}

    		//get the override
    		if(options.or_sat == ''){
    			
    			var or_var;
    			var overrides  = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    			var found_or   = 'N';
    		    
    			for(var i = 0; i < overrides.length; i++){
    				
    				if(found_or == 'N'){

    					or_var = overrides[i].split('=');
    					
    					if(or_var.length > 1){
        						
        					if(or_var[0] == 'or_sat' ){
        					
        						options.or_sat = or_var[1];
        						
        						found_or = 'Y';
        						
        					}
        					
    					}
    					
    				}
    				
    		    }
    			
    			if(options.or_sat == ''){
    				options.or_sat = '-1';
    			}
    		    
    		}
    		
    		if(options.or_sap == ''){
    			
    			var or_var;
    			var overrides  = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    			var found_or   = 'N';
    		    
    			for(var i = 0; i < overrides.length; i++){
    				
    				if(found_or == 'N'){

    					or_var = overrides[i].split('=');
    					
    					if(or_var.length > 1){
        						
        					if(or_var[0] == 'or_sap' ){
        					
        						options.or_sap = or_var[1];
        						
        						found_or = 'Y';
        						
        					}
        					
    					}
    					
    				}
    				
    		    }
    			
    			if(options.or_sap == ''){
    				options.or_sap = '1';
    			}
    		    
    		}
    		
    		if(options.or_swa == ''){
    			
    			var or_var;
    			var overrides  = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    			var found_or   = 'N';
    		    
    			for(var i = 0; i < overrides.length; i++){
    				
    				if(found_or == 'N'){

    					or_var = overrides[i].split('=');
    					
    					if(or_var.length > 1){
        						
        					if(or_var[0] == 'or_swa' ){
        					
        						options.or_swa = or_var[1];
        						
        						found_or = 'Y';
        						
        					}
        					
    					}
    					
    				}
    				
    		    }
    			
    			if(options.or_swa == ''){
    				options.or_swa = '';
    			}
    		    
    		}

    		if(options.or_dm == ''){
    			
    			var or_var;
    			var overrides  = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    			var found_or   = 'N';
    		    
    			for(var i = 0; i < overrides.length; i++){
    				
    				if(found_or == 'N'){

    					or_var = overrides[i].split('=');
    					
    					if(or_var.length > 1){
        						
        					if(or_var[0] == 'or_dm' ){
        					
        						options.or_dm = or_var[1];
        						
        						found_or = 'Y';
        						
        					}
        					
    					}
    					
    				}
    				
    		    }
    			
    			if(options.or_dm == ''){
    				options.or_dm = 'N';
    			}
    		    
    		}

    		if(options.or_use_overlay == ''){
    			
    			var or_var;
    			var overrides  = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    			var found_or   = 'N';
    		    
    			for(var i = 0; i < overrides.length; i++){
    				
    				if(found_or == 'N'){

    					or_var = overrides[i].split('=');
    					
    					if(or_var.length > 1){
        						
        					if(or_var[0] == 'or_use_overlay'){
        					
        						options.or_use_overlay = or_var[1];
        						
        						found_or = 'Y';
        						
        					}
        					
    					}
    					
    				}
    				
    		    }
    			
    		}
    		
    		//get the enviroment
    		var params = set_params_4_istetv();
    		//get_data_from_isitetv('isitetv_get_enviroment.php',params,cb_get_enviroment);
    		get_data_from_isitetv('isitetv_get_resplayer.php',params,cb_get_resp_player);
    		
    	}
    	
    	function get_player(jsonarray){

    		//get the player
    		product_name            = jsonarray.product_name;
    		//asset_name              = jsonarray.asset_name;
    		asset_type              = jsonarray.asset_type;
    		asset_position          = jsonarray.asset_position;
    		var number_player_parts = jsonarray.number_player_parts;
    		var html_2_add          = '';
    		var t_slave_number      = jsonarray.slave_number;
    		var t_start_log_id      = jsonarray.start_log_id;
    		change_div_to_replace   = jsonarray.change_div_to_replace;
    		
    		if(change_div_to_replace != ''){
    			t_div_id              = change_div_to_replace;
    		}else{
    			t_div_id              = our_div_holder_id;
    		}
    		
    		if(t_slave_number == slave_number && t_start_log_id == start_log_id){
		    			
	    		//if any html to add
	    		if(number_player_parts > 0){
	    			
	    			//clear the div
	    			isitetv_jq("#" + t_div_id).empty();
	    			
	    			//loop around the html to add to the page
	    			for(var a=1;a<=number_player_parts;a++){
	    				
	    				//add the css file
	    				html_2_add = html_2_add + jsonarray.player_part[a];
	    				
	    			}
	
					//add the html
					isitetv_jq("#" + t_div_id).html(html_2_add);
					
	    		}
	    		
	    		//reset
	    		change_div_to_replace     = '';
	    		change_player_template_id = -1;
	    		change_template_name      = '';
	    		change_main_template      = '';
	    		
	    		/*
	    		//add the onclick
	    		var number_of_onclick = jsonarray.player_menu_onclick.length;
	    		var onclick_type      = 0;
	    		var ptc_id            = 0;
	    		
	    		var params            = '';
	
	    		//if any onclick to add
	    		if(number_of_onclick > 0){
	    			
	    			//loop around to bind the onclick
	    			for(a=0;a<number_of_onclick;a++){
	    				
	    				//get the id of the menu item
	    				onclick_type = jsonarray.player_menu_onclick[a]['tp'];
	    				ptc_id       = jsonarray.player_menu_onclick[a]['ptc_id'];
	    				
	    				params = {ptc_id:ptc_id};
	    				
	    				//bind
	    				bindEvent('#isitetv_' + start_log_id + '_' + slave_number + '_menu_image_' + onclick_type,"click",cb_menu_clicked,params);
	    				
	    			}
	    			
	    		}
	    		*/
	    		
	    		//do the compleated function
	    		options.player_loaded();
	    		
    		}
    		
    	}

    	function get_resp_player(jsonarray){

    		//get the data
    		asset_list_type_id        = jsonarray.asset_list_type_id;
    		asset_position            = jsonarray.asset_position;
    		asset_type                = jsonarray.asset_type;
    		change_div_to_replace     = jsonarray.change_div_to_replace;
    		enviroment_id             = jsonarray.enviroment_id;
    		enviroment_1              = jsonarray.enviroment_1;
    		enviroment_2              = jsonarray.enviroment_2;
    		enviroment_3              = jsonarray.enviroment_3;
    		enviroment_4              = jsonarray.enviroment_4;
    		isitetv_player_height     = jsonarray.player_height;
    		isitetv_player_width      = jsonarray.player_width;
    		ml_product_name           = jsonarray.ml_description;
    		pl_product_name           = jsonarray.pl_description;
    		play_in_demo_mode         = jsonarray.play_in_demo_mode;
    		player_id                 = jsonarray.player_id;
    		player_is_restricted      = jsonarray.player_is_restricted;
    		player_template_id        = jsonarray.player_template_id;
    		playlist_id               = jsonarray.playlist_id;
    		playlist_tabs_contents_id = jsonarray.playlist_tabs_contents_id;
    		playlist_tabs_id          = jsonarray.playlist_tabs_id;
    		product_name              = jsonarray.product_name;
    		retail_price              = jsonarray.retail_price;
    		sku_id                    = jsonarray.sku_id;
    		sku                       = jsonarray.sku;
    		slave_url                 = jsonarray.server_name;
    		slave_add                 = jsonarray.server_address;
    		slave_number              = jsonarray.server_number;
    		start_log_id              = jsonarray.start_log_id;
    		tab_id                    = jsonarray.tab_id;
    		template_name             = jsonarray.template_name;
    		use_template              = jsonarray.use_template;
    		video_id                  = jsonarray.video_id;
    		website_language_id       = jsonarray.website_language_id;

    		var number_css            = jsonarray.number_css;
    		var number_fonts          = jsonarray.number_fonts;
    		var number_javascript     = jsonarray.number_javascript;
    		var number_player_parts   = jsonarray.number_player_parts;

    		if(change_div_to_replace != ''){
    			t_div_id              = change_div_to_replace;
    		}else{
    			t_div_id              = our_div_holder_id;
    		}
    		
    		use_outside_logging                           = jsonarray.use_outside_logging;
    		//use_outside_logging_check_log                 = jsonarray.use_outside_logging_check_log;
    		use_outside_logging_adobe                     = jsonarray.use_outside_logging_adobe;
    		use_outside_logging_javascript_url            = jsonarray.use_outside_logging_javascript_url;
    		use_outside_logging_percent_blocks            = jsonarray.use_outside_logging_percent_blocks;
    		use_outside_logging_end_percent               = jsonarray.use_outside_logging_end_percent;
    		use_outside_logging_player_name               = jsonarray.use_outside_logging_player_name;
    		use_outside_logging_prefix_name               = jsonarray.use_outside_logging_prefix_name;
    		use_outside_logging_send_what                 = jsonarray.use_outside_logging_send_what;
    		use_outside_logging_send_what_delimiter       = jsonarray.use_outside_logging_send_what_delimiter;
    		use_outside_logging_send_what_cut             = jsonarray.use_outside_logging_send_what_cut;
    		use_outside_logging_send_time_viewed          = jsonarray.use_outside_logging_send_time_viewed;
    		use_outside_logging_action_code               = jsonarray.use_outside_logging_action_code;
    		use_outside_logging_report_suite_id           = jsonarray.use_outside_logging_report_suite_id;
			use_outside_logging_adobe_version             = jsonarray.use_outside_logging_adobe_version;
			use_outside_logging_tracking_server           = jsonarray.use_outside_logging_tracking_server;
			use_outside_logging_heartbeat_tracking_server = jsonarray.use_outside_logging_heartbeat_tracking_server;
			use_outside_logging_publisher                 = jsonarray.use_outside_logging_publisher;
			use_outside_logging_visitor_id                = jsonarray.use_outside_logging_visitor_id;
			use_outside_logging_consolelog                = jsonarray.use_outside_logging_consolelog;

    		if(options.or_dm == ''){
    			options.or_dm = play_in_demo_mode;
    		}else{
    			play_in_demo_mode = options.or_dm;
    		}

			//add a div that will contain the outside logging adobe code
			isitetv_jq("body").append('<div id="isitetv_use_outside_logging_adobe_div" style="display:none;" ></div>');
			
    		if (typeof use_outside_logging != 'undefined'){
	    			
    		}else{
    			
    			use_outside_logging = 'N';
    			
    		}
    		
    		use_template = 'Y';
    		
    		//if data
    		if(sku_id > 0 && playlist_id > 0 && video_id > 0 && player_id > 0 && player_is_restricted == 'N'){
	    			
	    		//if not restricted
	    		if(player_is_restricted == 'N'){
		    			
		    		//if got data
		    		if(enviroment_id > -1 && website_language_id > -1 && sku_id > -1 && playlist_id > -1 && video_id > -1){

		        		//if a start log
		        		if(start_log_id > -1 || play_in_demo_mode == 'Y'){
		    	    			
		    				//add the div
		    				replace_div_with_our_div();
		    				
		    				//add the fonts
		    	    		if(number_fonts > 0){
		    	    			
		    	    			//loop around the css to add to the page
		    	    			for(var a=0;a<=number_fonts;a++){
		    	    				
		    	    				//add the css file
		    	    				isitetv_jq("head").append(jsonarray.fonts_path[a]);
		    	    				
		    	    			}
		    	    			
		    	    		}
		    				
		    				//add the css
		    	    		if(number_css > 0){
		    	    			
		    	    			//loop around the css to add to the page
		    	    			for(var a=0;a<=number_css;a++){
		    	    				
		    	    				//add the css file
		    	    				if(jsonarray.css_path[a] != undefined){
		    	    					isitetv_jq("head").append(jsonarray.css_path[a]);
		    	    				}
		    	    				
		    	    			}
		    	    			
		    	    		}
		    	    		
		    	    		//add the javascript
		    	    		if(number_javascript > 0){

		    	    			//set the cashe Release for currys pcworld cache
		    	    			jQuery.ajaxSettings.cache = true;
		    	    			
		    	    			//loop around the css to add to the page
		    	    			for(var a=0;a<=number_javascript;a++){
		    	    				
		    	    				//add the css file
		    	    				if(jsonarray.javascript_path[a] != undefined){
		    	    					//isitetv_jq.getScript(jsonarray.javascript_path[a]);
		    	    					isitetv_jq("body").append(jsonarray.javascript_path[a]);
		    	    				}
		    	    				
		    	    			}
		    	    			
		    	    		}

		    	    		//if to use outside logging
		    	    		if(use_outside_logging == 'Y' && use_outside_logging_javascript_url != ""){
		    	    			isitetv_jq("body").append('<script type="text/javascript" src="' + use_outside_logging_javascript_url + '"></script>');
		    	    		}
		    	    		
		    	    		//if any html to add
		    	    		if(number_player_parts > 0){
		    	    			
		    	    			//ini the values as we can not pass then in a document ready
		    	    			get_resp_player_parts_ary[0] = jsonarray;
		    	    			get_resp_player_parts_ary[1] = number_player_parts;
		    	    			get_resp_player_parts_ary[2] = t_div_id;
		    	    			
		    	    			//delay to allow the javescript fules to load
		    	    			//isitetv_jq(document).ready(function(){
		    	    			//	get_resp_player_parts();
		    	    			//});
		    	    			setTimeout(get_resp_player_parts, 500);
		    	    			
		    	    		}else{
			    	    		
			    	    		//reset
			    	    		change_div_to_replace     = '';
			    	    		change_player_template_id = -1;
			    	    		change_template_name      = '';
			    	    		change_main_template      = '';
	
			    	    		//do the compleated function
			    	    		options.player_loaded();
			    	    		
		    	    		}
		    	    		
		        		}else{
		        			
		        			display_the_splash_screen();
		        			
		        		}
		    	    	
		    		}else{
		    			
		    			//display the splash screen
		    			display_the_splash_screen();
		    			
		    		}
		    		
	    		}else{
	
	    			//display the splash screen
	    			display_the_splash_screen();
	    			
	    		}
	    		
    		}else{

    			//display the splash screen
    			display_the_splash_screen();
    			
    		}
    		
    	}

    	function get_resp_player_parts(){

    		//put the values back
			jsonarray           = get_resp_player_parts_ary[0];
			number_player_parts = get_resp_player_parts_ary[1];
			t_div_id            = get_resp_player_parts_ary[2];
			
    		//ini
    		var html_2_add      = '';

			//clear the div
			isitetv_jq("#" + t_div_id).empty();
			
			//loop around the html to add to the page
			for(var a=1;a<=number_player_parts;a++){
				
				//add the css file
				html_2_add = html_2_add + jsonarray.player_part[a];
				
			}

			//add the html
			isitetv_jq("#" + t_div_id).html(html_2_add);

    		//reset
    		change_div_to_replace     = '';
    		change_player_template_id = -1;
    		change_template_name      = '';
    		change_main_template      = '';

    		//do the compleated function
    		options.player_loaded();
    		
    	}

        function get_enviroment(jsonarray){
        		
    		//get the data
    		enviroment_id             = jsonarray.enviroment_id;
    		enviroment_1              = jsonarray.enviroment_1;
    		enviroment_2              = jsonarray.enviroment_2;
    		enviroment_3              = jsonarray.enviroment_3;
    		enviroment_4              = jsonarray.enviroment_4;
    		slave_url                 = jsonarray.server_name;
    		slave_add                 = jsonarray.server_address;
    		slave_number              = jsonarray.server_number;
    		website_language_id       = jsonarray.website_language_id;
    		sku_id                    = jsonarray.sku_id;
    		playlist_id               = jsonarray.playlist_id;
    		video_id                  = jsonarray.video_id;
    		player_id                 = jsonarray.player_id;
    		use_template              = jsonarray.use_template;
    		isitetv_player_width      = jsonarray.player_width;
    		isitetv_player_height     = jsonarray.player_height;
    		play_in_demo_mode         = jsonarray.play_in_demo_mode;
    		player_is_restricted      = jsonarray.player_is_restricted;
    		asset_list_type_id        = jsonarray.asset_list_type_id;
    		playlist_tabs_contents_id = jsonarray.playlist_tabs_contents_id;
    		playlist_tabs_id          = jsonarray.playlist_tabs_id;
    		tab_id                    = jsonarray.tab_id;
    		//bg_image_path             = jsonarray.bg_image_path;
    		ml_product_name           = jsonarray.ml_description;
    		pl_product_name           = jsonarray.pl_description;
    		sku                       = jsonarray.sku;
    		retail_price              = jsonarray.retail_price;
    		player_template_id        = jsonarray.player_template_id;
    		template_name             = jsonarray.template_name;
    		//var t_error               = jsonarray.error;

    		if(options.or_dm == ''){
    			options.or_dm = play_in_demo_mode;
    		}else{
    			play_in_demo_mode = options.or_dm;
    		}

    		use_outside_logging                           = jsonarray.use_outside_logging;
    		//use_outside_logging_check_log                 = jsonarray.use_outside_logging_check_log;
    		use_outside_logging_adobe                     = jsonarray.use_outside_logging_adobe;
    		use_outside_logging_javascript_url            = jsonarray.use_outside_logging_javascript_url;
    		use_outside_logging_percent_blocks            = jsonarray.use_outside_logging_percent_blocks;
    		use_outside_logging_end_percent               = jsonarray.use_outside_logging_end_percent;
    		use_outside_logging_player_name               = jsonarray.use_outside_logging_player_name;
    		use_outside_logging_prefix_name               = jsonarray.use_outside_logging_prefix_name;
    		use_outside_logging_send_what                 = jsonarray.use_outside_logging_send_what;
    		use_outside_logging_send_what_delimiter       = jsonarray.use_outside_logging_send_what_delimiter;
    		use_outside_logging_send_what_cut             = jsonarray.use_outside_logging_send_what_cut;
    		use_outside_logging_send_time_viewed          = jsonarray.use_outside_logging_send_time_viewed;
    		use_outside_logging_action_code               = jsonarray.use_outside_logging_action_code;
    		use_outside_logging_report_suite_id           = jsonarray.use_outside_logging_report_suite_id;
			use_outside_logging_adobe_version             = jsonarray.use_outside_logging_adobe_version;
			use_outside_logging_tracking_server           = jsonarray.use_outside_logging_tracking_server;
			use_outside_logging_heartbeat_tracking_server = jsonarray.use_outside_logging_heartbeat_tracking_server;
			use_outside_logging_publisher                 = jsonarray.use_outside_logging_publisher;
			use_outside_logging_visitor_id                = jsonarray.use_outside_logging_visitor_id;
			use_outside_logging_consolelog                = jsonarray.use_outside_logging_consolelog;

			//add a div that will contain the outside logging adobe code
			isitetv_jq("body").append('<div id="isitetv_use_outside_logging_adobe_div" style="display:none;" ></div>');
			
    		if (typeof use_outside_logging != 'undefined'){
	    			
    		}else{
    			
    			use_outside_logging = 'N';
    			
    		}
    		
    		use_template = 'Y';
    		
    		//if data
    		if(sku_id > 0 && playlist_id > 0 && video_id > 0 && player_id > 0 && player_is_restricted == 'N'){
	    			
	    		//if not restricted
	    		if(player_is_restricted == 'N'){
		    			
		    		//if got data
		    		if(enviroment_id > -1 && website_language_id > -1 && sku_id > -1 && playlist_id > -1 && video_id > -1){
		    			
		    			//log start
		    			log_start(cb_replace_div);
			    			
		    		}else{
		    			
		    			//display the splash screen
		    			display_the_splash_screen();
		    			
		    		}
		    		
	    		}else{
	
	    			//display the splash screen
	    			display_the_splash_screen();
	    			
	    		}
	    		
    		}else{

    			//display the splash screen
    			display_the_splash_screen();
    			
    		}
    		
    	}

    	function get_css(jsonarray){

    		//get the data
    		var number_css      = jsonarray.number_css;
    		var t_slave_number  = jsonarray.slave_number;
    		var t_start_log_id  = jsonarray.start_log_id;
    		
    		if(t_slave_number == slave_number && t_start_log_id == start_log_id){
	    			
	    		//if any css to add
	    		if(number_css > 0){
	    			
	    			//loop around the css to add to the page
	    			for(var a=0;a<=number_css;a++){
	    				
	    				//add the css file
	    				if(jsonarray.css_path[a] != undefined){
	    					isitetv_jq("head").append(jsonarray.css_path[a]);
	    				}
	    				
	    			}
	    			
	    		}
	
				//add the javascript
	    		var params = set_params_4_istetv();
	    		get_data_from_isitetv('isitetv_get_javascript.php',params,cb_get_javascript);
	    		
    		}
    		
    	}

    	function get_fonts(jsonarray){

    		//get the data
    		var number_fonts    = jsonarray.number_fonts;
    		var t_slave_number  = jsonarray.slave_number;
    		var t_start_log_id  = jsonarray.start_log_id;
    		
    		if(t_slave_number == slave_number && t_start_log_id == start_log_id){
	    			
	    		//if any css to add
	    		if(number_fonts > 0){
	    			
	    			//loop around the css to add to the page
	    			for(var a=0;a<=number_fonts;a++){
	    				
	    				//add the css file
	    				isitetv_jq("head").append(jsonarray.fonts_path[a]);
	    				
	    			}
	    			
	    		}
	
				//add the css
	    		var params = set_params_4_istetv();
	    		get_data_from_isitetv('isitetv_get_css.php',params,cb_get_css);
	    		
    		}
    		
    	}

    	function get_javascript(jsonarray){

    		//get the data
    		var number_javascript = jsonarray.number_javascript;
    		var t_slave_number    = jsonarray.slave_number;
    		var t_start_log_id    = jsonarray.start_log_id;
    		
    		if(t_slave_number == slave_number && t_start_log_id == start_log_id){
		    			
	    		//if any css to add
	    		if(number_javascript > 0){

	    			//set the cache Release for currys pcworld cache
	    			var tmp_state = isitetv_jq.ajaxSettings.cache;
	    			isitetv_jq.ajaxSettings.cache = true;
	    			
	    			//loop around the css to add to the page
	    			for(var a=0;a<=number_javascript;a++){
	    				
	    				//add the css file
	    				if(jsonarray.javascript_path[a] != undefined){
	    					//isitetv_jq.getScript(jsonarray.javascript_path[a]);
	    					isitetv_jq("body").append(jsonarray.javascript_path[a]);
	    				}
	    				
	    			}

	    			//re-set the cache Release for currys pcworld cache
	    			isitetv_jq.ajaxSettings.cache = tmp_state; 
	    			
	    		}
	
				//add the player
	    		var params = set_params_4_istetv();
	    		get_data_from_isitetv('isitetv_get_player.php',params,cb_get_player);
	    		
    		}
    		
    		//if to use outside logging
    		if(use_outside_logging == 'Y' && use_outside_logging_javascript_url != ""){
    			isitetv_jq("body").append('<script type="text/javascript" src="' + use_outside_logging_javascript_url + '"></script>');
    		}
    		
    	}

    	function get_template(jsonarray){
    		
    		//ini
    		last_logging_time         = 0;
    		last_logging_per          = 0;		
    		
    		//send the last log to close the outside logging
    		if(last_outside_logging_open_log == 'Y'){
	    			
	    		log_the_video_action(last_outside_logging_asset_list_type_id,
				    				last_outside_logging_playlist_tabs_contents_id,
				    				last_outside_logging_playlist_tabs_id,
				    				last_outside_logging_tab_id,
				    				last_outside_logging_video_asset_id,
				    				last_outside_logging_asset_id,
				    				last_outside_logging_action_code,
		    						last_outside_logging_time_reason,
		    						last_outside_logging_per_reason,
		    						last_outside_logging_asset_title,
		    						last_outside_logging_run_time,
									'Y');
	    		
    		}


    		//get the data
    		change_player_template_id = jsonarray.player_template_id;
    		change_main_template      = jsonarray.main_template;
    		var t_got_template        = jsonarray.got_template;
    		var t_slave_number        = jsonarray.slave_number;
    		var t_start_log_id        = jsonarray.start_log_id;
    		change_div_to_replace     = jsonarray.change_div_to_replace;
    		asset_position1           = jsonarray.asset_position1;
    		asset_position2           = jsonarray.asset_position2;
    		asset_current_position    = jsonarray.current_position;
    		pass_through_key_value    = jsonarray.pass_through_key_value;
    		
    		if(t_slave_number == slave_number && t_start_log_id == start_log_id && t_got_template == 'Y'){
		    			
				//add the player
	    		var params = set_params_4_istetv();
	    		get_data_from_isitetv('isitetv_get_player.php',params,cb_get_player);
	    		
    		}else{
    			alert('No template');
    		}
    		
    	}
    	
    	function get_data_from_isitetv(fielname,params,cb){

    		if(slave_url == ''){

    			var url_path = slave_url_adder + fielname;
    			
    		}else{

    			var url_path = '//' + slave_url + slave_url_adder + fielname;
    			
    		}
			
			if(params != ''){
				
				url_path = url_path + '?' + params + '&jsoncallback=?';
				
			}else{
				
				url_path = url_path + '?jsoncallback=?';
				
			}
			
			isitetv_jq.ajaxSetup({'cache':true});
			  
			isitetv_jq.ajax({
				type: 'GET',
			    url: url_path,
			    cache: true,
			    contentType: "application/json",
			    dataType: 'jsonp',
		        crossDomain: true,
			    success:cb,
			    error:function(jqXHR,textStatus,errorThrow){
			    	
			    }
			});
				
    	}
    	
    	function replace_div_with_our_div_calback(jsonarray){

    		//get the start log id
    		start_log_id = jsonarray.start_log_id;
    		
    		//if a start log
    		if(start_log_id > -1 || play_in_demo_mode == 'Y'){
	    			
				//add the div
				replace_div_with_our_div();
				
				//add the css
	    		var params = set_params_4_istetv();
	    		//get_data_from_isitetv('isitetv_get_fonts.php',params,cb_get_fonts);
	    		get_data_from_isitetv('isitetv_get_css.php',params,cb_get_css);
	    		
    		}else{
    			
    			display_the_splash_screen();
    			
    		}
	    		
    	}

        function replace_div_with_our_div(){

    		//ini
    		var t_class  = '';
    		var t_object = elem.attr('id');
    		
    		//if to add a class to our div
    		if(options.div_to_replace_contents_class != ''){
    			t_class = ' class="' + options.div_to_replace_contents_class + '" ';
    		}
    		
    		//add the div that will hold the player, this is so we can search through its children if we need to replace/edit any child content
    		if(t_object != ''){
    			
    			//get the div size
    			if(options.player_height > 0 && options.player_width > 0){
        			hole_player_height = options.player_height;
        			hole_player_width  = options.player_width;
    			}else{
    				hole_player_height = parseInt(isitetv_jq('#' + t_object).css('height'));
    				hole_player_width  = parseInt(isitetv_jq('#' + t_object).css('width'));
    			}
    			
    			//replace the div contents
        		//isitetv_jq('#' + t_object).html('<div id="' + our_div_holder_id + '" ' + t_class + ' style="width:' + retval + '%; height:' + retval + '%; " />');
    			isitetv_jq('#' + t_object).html('<div id="' + our_div_holder_id + '" ' + t_class + ' />');
        		
    		}

    	}
    	
    	function replace_div_with_our_div_set_size(){

    		//ini
    		var retval = 0;
    		
			//if our player is bigger than the hole that we are being put into then resize our div
			if(hole_player_height <= isitetv_player_height && hole_player_width <= isitetv_player_width){
				
				//if the width > height
				if(isitetv_player_height - hole_player_height >= isitetv_player_width - hole_player_width){
					
					//calculate the % difference
					retval = (hole_player_height / isitetv_player_height) * 100;
					
				}else{

					//calculate the % difference
					retval = (hole_player_width / isitetv_player_width) * 100;
					
				}
				
			}else if(hole_player_height >= isitetv_player_height && hole_player_width >= isitetv_player_width){
				
				//if the height > width
				if(hole_player_height - isitetv_player_height >= hole_player_width - isitetv_player_width){
					
					//calculate the % difference
					retval = (hole_player_height / isitetv_player_height) * 100;
					
				}else{

					//calculate the % difference
					retval = (hole_player_width / isitetv_player_width) * 100;
					
				}
				
			}else if(hole_player_height <= isitetv_player_height){

				//calculate the % difference
				retval = (hole_player_height / isitetv_player_height) * 100;
				
			}else if(hole_player_width <= isitetv_player_width){

				//calculate the % difference
				retval = (hole_player_width / isitetv_player_width) * 100;
				
			}else if(hole_player_height >= isitetv_player_height){

				//calculate the % difference
				retval = (hole_player_height / isitetv_player_height) * 100;
				
			}else if(hole_player_width >= isitetv_player_width){

				//calculate the % difference
				retval = (hole_player_width / isitetv_player_width) * 100;
				
			}else{
				
				//set to 100%
				retval = 100;
				
			}
			
			return parseInt(retval);

    	}
    	
    	function set_params_4_istetv(){
    		
    		var params = "";

    		params = params + 'enviroment_id=' + enviroment_id;
    		params = params + '&enviroment_1=' + enviroment_1;
    		params = params + '&enviroment_2=' + enviroment_2;
    		params = params + '&enviroment_3=' + enviroment_3;
    		params = params + '&enviroment_4=' + enviroment_4;
    		params = params + '&website_language_id=' + website_language_id;
    		params = params + '&encoded=' + options.encoded_value;
    		params = params + '&customer_id=' + options.customer_id;
    		params = params + '&sku=' + sku;
    		params = params + '&sku_id=' + sku_id;
    		params = params + '&playlist_id=' + playlist_id;
    		params = params + '&video_id=' + video_id;
    		params = params + '&player_id=' + player_id;
    		params = params + '&slave_number=' + slave_number;
    		params = params + '&start_log_id=' + start_log_id;
    		params = params + '&asset_type=' + asset_type;
    		params = params + '&asset_position1=' + asset_position1;
    		params = params + '&asset_position2=' + asset_position2;
    		params = params + '&current_position=' + asset_current_position;
    		params = params + '&media_set_number=' + media_set_number;
    		params = params + '&use_template=' + use_template;
    		params = params + '&player_width=' + isitetv_player_width;
    		params = params + '&player_height=' + isitetv_player_height;
    		params = params + '&ml_product_name=' + ml_product_name;
    		params = params + '&pl_product_name=' + pl_product_name;
    		params = params + '&player_is_restricted=' + player_is_restricted;
    		params = params + '&retail_price=' + retail_price;
    		params = params + '&player_template_id=' + player_template_id;
    		params = params + '&template_name=' + template_name;
    		params = params + '&element_id=' + obj_id;
    		params = params + '&main_template=' + main_template;
    		params = params + '&change_template_name=' + change_template_name;
    		params = params + '&change_player_template_id=' + change_player_template_id;
    		params = params + '&change_main_template=' + change_main_template;
    		params = params + '&change_div_to_replace=' + change_div_to_replace;
    		params = params + '&pass_through_key_value=' + options.pass_through_key_value;
    		params = params + '&or_sat=' + options.or_sat;
    		params = params + '&or_sap=' + options.or_sap;
    		params = params + '&or_swa=' + options.or_swa;
    		params = params + '&or_dm=' + options.or_dm;
    		params = params + '&or_use_overlay=' + options.or_use_overlay;
    		params = params + '&slave_url=' + slave_url;
    		params = params + '&web_page_referer=' + web_page_referer;
    		
    		return params;
    		
    	}
    	
    	function log_start(cb){
    		
			var url_path = '//' + slave_url + slave_url_adder + 'isitetv_get_start_log.php';
			var params   = 'play_in_demo_mode=' + play_in_demo_mode;
			params       = params + '&asset_list_type_id=' + asset_list_type_id;
			params       = params + '&video_id=' + video_id;
			params       = params + '&playlist_tabs_contents_id=' + playlist_tabs_contents_id;
			params       = params + '&playlist_tabs_id=' + playlist_tabs_id;
			params       = params + '&playlist_id=' + playlist_id;
			params       = params + '&sku_id=' + sku_id;
			params       = params + '&player_id=' + player_id;
			params       = params + '&enviroment_id=' + enviroment_id;
			params       = params + '&website_language_id=' + website_language_id;
			params       = params + '&tab_id=' + tab_id;
    		params       = params + '&web_page_referer=' + web_page_referer;
			
			url_path = url_path + '?' + params + '&jsoncallback=?';
			  
			isitetv_jq.ajax({
				type: 'GET',
			    url: url_path,
			    async: false,
			    contentType: "application/json",
			    dataType: 'jsonp',
		        crossDomain: true,
			    success:cb,
			    error:function(jqXHR,textStatus,errorThrow){
			    	
			    }
			});
				
    	}

		var log_action_already_sent_close = 'N';
		
		function log_actions_outside_logging_reset_last(){

			if(use_outside_logging_consolelog == 'Y'){
				console.log('OUTSIDE LOGGING RESET');
			}
			
			//set the flag to ini the outside loggin
			last_outside_logging_ini_log = 'N';
			
			//stop the logging
			if (typeof adobe_kill_logging === "function") { 
				adobe_kill_logging();
			}
			if(log_action_already_sent_close == 'N' && use_outside_logging_sent_play == 'Y'){
				use_outside_logging_adobe_stop(last_outside_logging_run_time,100);
			}

			//set the flag so we dont send the close more than once per logging cycle
			log_action_already_sent_close = 'Y';
			last_outside_logging_open_log = 'N';
			
			//ini
			last_outside_logging_asset_list_type_id        = -1;
			last_outside_logging_playlist_tabs_contents_id = -1;
			last_outside_logging_playlist_tabs_id          = -1;
			last_outside_logging_tab_id                    = -1;
			last_outside_logging_video_asset_id            = -1;
			last_outside_logging_asset_id                  = -1;
			last_outside_logging_time_reason               = -1;
			last_outside_logging_per_reason                = -1;
			last_outside_logging_asset_title               = '';
			last_outside_logging_run_time                  = -1;
			
			use_outside_logging_sent_play                  = 'N';
			
			use_outside_logging_adobe5_sent_play           = 'N';
			use_outside_logging_adobe5_sent_pause          = 'N';

			if (typeof adobe_video_set_playhead === "function"){
				adobe_video_set_playhead(0);
			}
			
		}
		
		function log_the_video_action(t_asset_list_type_id,
									t_playlist_tabs_contents_id,
									t_playlist_tabs_id,
									t_tab_id,
									t_video_asset_id,
									t_asset_id,
		    						t_action_code,
									t_time_reason,
									t_per_reason,
									t_asset_title,
									t_run_time,
									do_close_outside_loging){

			if(use_outside_logging_consolelog == 'Y'){
				console.log('LOG VIDEO ACTION');
			}
			
    		//add a video log action
    		if(play_in_demo_mode != 'Y'){

        		if(t_video_asset_id > 0 && t_asset_id > 0){
	        			
	    			//set the last
	    			last_outside_logging_asset_list_type_id        = t_asset_list_type_id;
	    			last_outside_logging_playlist_tabs_contents_id = t_playlist_tabs_contents_id;
	    			last_outside_logging_playlist_tabs_id          = t_playlist_tabs_id;
	    			last_outside_logging_tab_id                    = t_tab_id;
	    			last_outside_logging_video_asset_id            = t_video_asset_id;
	    			last_outside_logging_asset_id                  = t_asset_id;
	    			last_outside_logging_time_reason               = t_time_reason;
	    			last_outside_logging_per_reason                = t_per_reason;
	    			last_outside_logging_asset_title               = t_asset_title;
	    			last_outside_logging_run_time                  = t_run_time;
	
	    			if(t_action_code > -1){
	
		    			log_action(t_asset_list_type_id,
		    						t_playlist_tabs_contents_id,
		    						t_playlist_tabs_id,
		    						t_tab_id,
		    						t_video_asset_id,
		    						t_asset_id,
		    						t_action_code,
		    						t_time_reason,
		    						t_per_reason,
		    						t_asset_title,
		    						t_run_time,
		    						do_close_outside_loging);
		    			
	    			}else{

	    				last_outside_logging_action_code = 16;
		    			log_action(t_asset_list_type_id,
		    						t_playlist_tabs_contents_id,
		    						t_playlist_tabs_id,
		    						t_tab_id,
		    						t_video_asset_id,
		    						t_asset_id,
		    						last_outside_logging_action_code,
		    						t_time_reason,
		    						t_per_reason,
		    						t_asset_title,
		    						t_run_time,
		    						do_close_outside_loging);
		    			
	    				last_outside_logging_action_code = 23;
		    			log_action(t_asset_list_type_id,
		    						t_playlist_tabs_contents_id,
		    						t_playlist_tabs_id,
		    						t_tab_id,
		    						t_video_asset_id,
		    						t_asset_id,
		    						last_outside_logging_action_code,
		    						t_time_reason,
		    						t_per_reason,
		    						t_asset_title,
		    						t_run_time,
		    						do_close_outside_loging);
	    			
	    			}
	    			
        		}
    			
    		}
    		
		}

		//ini
		var t_use_outside_logging_send_what = '';
		
    	function log_action(t_asset_list_type_id,
    						t_playlist_tabs_contents_id,
    						t_playlist_tabs_id,
    						t_tab_id,
    						t_video_asset_id,
    						t_asset_id,
    						t_action_code,
    						t_time_reason,
    						t_per_reason,
    						t_asset_title,
    						t_run_time,
    						do_close_outside_loging){

    		if(use_outside_logging_consolelog == 'Y'){
    			console.log('LOG ACTION');
    		}
			
    		//ini
			t_use_outside_logging_send_what = '';
			
			//make sure that it is a number
			t_time_reason = parseFloat(t_time_reason);
			t_per_reason  = parseFloat(t_per_reason);
			t_run_time    = parseFloat(t_run_time);
			
			//if over the next step
			//limiting the number or writes to the logging server  30/09/2015
			if(
			(t_action_code != 23 && t_action_code != 16) 
			||(t_action_code == 16 && ((t_per_reason >= (last_logging_per + logging_per_blocks) || t_per_reason <= 10 || t_per_reason >= 90) && (last_logging_per != t_per_reason || t_per_reason == 0))) 
			||(t_action_code == 23 && ((t_time_reason >= (last_logging_time + ((t_run_time / 100) * logging_per_blocks)) || t_time_reason <= 10 || (last_logging_per == t_per_reason && last_logging_time != t_time_reason) || t_time_reason >= ((t_run_time/100) * 90)) && (last_logging_time != t_time_reason || t_time_reason == 0)))
				){
				
				//set the last values
				if(t_action_code == 23){last_logging_time = t_time_reason;}
				if(t_action_code == 16){last_logging_per  = t_per_reason;}
				
				//set the time and persent
				if(t_run_time == 0 || isNaN(t_run_time)){
					t_run_time = 100;
				}
				if(t_action_code == 16 || t_action_code == 23){
						
					if(t_time_reason > t_run_time){
						t_time_reason     = t_run_time;
						last_logging_time = t_time_reason;
					}
					if(t_per_reason > 100){
						t_per_reason      = 100;
						last_logging_per  = t_per_reason;
					}
					
				}
				
	    		if(play_in_demo_mode != 'Y'){

					//reset the flag
					if(t_per_reason < 100){
						logging_last_perplayed_sent_to_isitetv = 'N';
					}
					
	    			//if < 100% and not sent to isitetv
	    			if(logging_last_perplayed_sent_to_isitetv == 'N' || (t_action_code != 23 && t_action_code != 16) ){
	
						var url_path = '//' + slave_url + slave_url_adder + 'isitetv_get_log_action.php';
						var params   = 'play_in_demo_mode=' + play_in_demo_mode;
						params       = params + '&start_log_id=' + start_log_id;
						params       = params + '&asset_list_type_id=' + t_asset_list_type_id;
						params       = params + '&video_id=' + video_id;
						params       = params + '&playlist_tabs_contents_id=' + t_playlist_tabs_contents_id;
						params       = params + '&playlist_tabs_id=' + t_playlist_tabs_id;
						params       = params + '&playlist_id=' + playlist_id;
						params       = params + '&video_id=' + video_id;
						params       = params + '&sku_id=' + sku_id;
						params       = params + '&player_id=' + player_id;
						params       = params + '&enviroment_id=' + enviroment_id;
						params       = params + '&website_language_id=' + website_language_id;
						params       = params + '&tab_id=' + t_tab_id;
						params       = params + '&video_asset_id=' + t_video_asset_id;
						params       = params + '&asset_id=' + t_asset_id;
						params       = params + '&code_id=' + t_action_code;
						if(t_action_code == 16){
							params = params + '&reason=' + t_per_reason;
						}else{
							params = params + '&reason=' + t_time_reason;
						}
						
						url_path = url_path + '?' + params + '&jsoncallback=?';
						  
						isitetv_jq.ajax({
							type: 'GET',
						    url: url_path,
						    async: false,
						    contentType: "application/json",
						    dataType: 'jsonp',
					        crossDomain: true,
						    error:function(jqXHR,textStatus,errorThrow){
								var a = 0;
						    },
							success: function(data){
								var a = 0;
							}
						});
						
	    			}

					//reset the flag
					if(t_action_code == 16 && last_logging_per >= 100){
						logging_last_perplayed_sent_to_isitetv = 'Y';
					}
					
	    			//if to use outside logging
	    			if(use_outside_logging == 'Y'){
	    				
	    				if(use_outside_logging_adobe == 'Y'){
	    					
	    					//alert(last_outside_logging_ini_log + ' :' + last_outside_logging_doing_ini);
	    					
	    					if(last_outside_logging_ini_log == 'N' && last_outside_logging_doing_ini == 'N'){
	    						
	    						use_outside_logging_adobe_init(t_asset_id, t_video_asset_id, t_action_code, t_per_reason, t_time_reason, t_run_time, do_close_outside_loging);
	    						
	    					}
	
	    					if(last_outside_logging_ini_log == 'Y'){
	
	    						use_outside_logging_adobe_log(t_action_code, t_per_reason, t_time_reason, t_run_time, do_close_outside_loging);
	    						
	    					}else{
	    						
	    						var array_pointer = 0;
	    						for(var a = 0; a<use_outside_logging_array.length; a++){
	    								
	    							if(parseInt(use_outside_logging_array[a][0]) > 0){
	    								array_pointer = a;
	    							}
	    							
	    						}
	    						
	    						if(array_pointer == 0){
	    							use_outside_logging_array = new Array();
	    						}
	    						
	    						array_pointer = use_outside_logging_array.length;
	    						if(array_pointer < 0){array_pointer = 0;}
	    						
	    						use_outside_logging_array[array_pointer] = new Array();
	    						use_outside_logging_array[array_pointer][0] = t_action_code;
	    						use_outside_logging_array[array_pointer][1] = t_per_reason;
	    						use_outside_logging_array[array_pointer][2] = t_time_reason;
	    						use_outside_logging_array[array_pointer][3] = t_run_time;
	    						use_outside_logging_array[array_pointer][4] = do_close_outside_loging;
	    						
	    					}
	    						
	    				}
	    				
	    			}
	    			
	    		}
    			
    		}
				
    	}

    	function use_outside_logging_adobe_init(t_asset_id, t_video_asset_id, t_action_code, t_per_reason, t_time_reason, t_run_time, do_close_outside_loging){

			//alert('Adobe init');

    		if(use_outside_logging_consolelog == 'Y'){
    			console.log('ADODE INIT');
    		}
			
    		//set the flag 
    		last_outside_logging_doing_ini = 'Y';
    		
			//create the path to get the data to send
			var url_path = '//' + slave_url + slave_url_adder + 'get_outside_loggin_text.php';
			var params   = 'used_ajax=Y';

			use_outside_logging_video_player_id            = 'isitetvmovie' + (Math.floor(Math.random() * 100000) + 1000 );
			
			//if doing version 5
    		if(use_outside_logging_adobe_version == "5"){
    			params       = params + '&adobe5=Y';
    		}
    		
			params       = params + '&asset_id=' + t_asset_id;
			params       = params + '&asset_type=video';
			params       = params + '&website_language_id=' + website_language_id;
			params       = params + '&media_set_number=' + media_set_number;
			params       = params + '&video_asset_id=' + t_video_asset_id;
			params       = params + '&encoded=' + options.encoded_value;
			params       = params + '&sku=' + options.sku;
			params       = params + '&customer_id=' + options.customer_id;
			params       = params + '&player_id=' + player_id;
			params       = params + '&video_player_id=' + use_outside_logging_video_player_id;
			
			url_path = url_path + '?' + params + '&jsoncallback=?';
			  
			//ajax call and on siccess then do the logging
			isitetv_jq.ajax({
				type: 'GET',
			    url: url_path,
			    async: false,
			    contentType: "application/json",
			    dataType: 'jsonp',
		        crossDomain: true,
			    error:function(jqXHR,textStatus,errorThrow){

					//alert('Adobe init error ' + textStatus);
					
					var a = 0;

		    		//set the flag 
		    		last_outside_logging_doing_ini = 'N';
		    		
			    },
				success: function(data){

					//alert('Adobe init success');

					if(use_outside_logging_consolelog == 'Y'){
						console.log('ADODE INIT SUCCESS');
					}
    				
					var retval = data.logdata;
					
					if(retval.indexOf('ERROR') == -1 ){

						//set the flag to say that we have got the data
						last_outside_logging_ini_log = 'Y';
						
						//if doing version 5
			    		if(use_outside_logging_adobe_version == "5"){
			    			
			    			if (typeof adobe_kill_logging === "function") { 
			    				adobe_kill_logging();
			    			}

			    			//clear the outside logging div
			    			isitetv_jq('#isitetv_use_outside_logging_adobe_div').empty();

			    			//place the code in the outside logging div
			    			isitetv_jq('#isitetv_use_outside_logging_adobe_div').html(retval);

			    		}else{
						
			    			//set what to send
			    			t_use_outside_logging_send_what = retval;

							//format what we are sending to the outside logging
							var trv = use_outside_logging_prefix_name + t_use_outside_logging_send_what;
							trv = trv.replace(/%20/g, ' ');
							trv = trv.replace(/%7C/g, '|');
							
							t_use_outside_logging_send_what = trv;
							
			    		}
			    		
			    		//log
			    		if(t_action_code == 16 || t_action_code == 23){
			    			use_outside_logging_adobe_log(16, t_per_reason, t_time_reason, t_run_time, do_close_outside_loging);
			    			use_outside_logging_adobe_log(23, t_per_reason, t_time_reason, t_run_time, do_close_outside_loging);
			    		}else{
			    			use_outside_logging_adobe_log(t_action_code, t_per_reason, t_time_reason, t_run_time, do_close_outside_loging);
			    		}
			    		
						for(var a = 0; a<use_outside_logging_array.length; a++){
							
							if(parseInt(use_outside_logging_array[a][0]) > 0){
								
					    		if(use_outside_logging_array[a][0] == 16 || use_outside_logging_array[a][0] == 23){
					    			use_outside_logging_adobe_log(16, use_outside_logging_array[a][1], use_outside_logging_array[a][2], use_outside_logging_array[a][3], use_outside_logging_array[a][4]);
					    			use_outside_logging_adobe_log(23, use_outside_logging_array[a][1], use_outside_logging_array[a][2], use_outside_logging_array[a][3], use_outside_logging_array[a][4]);
					    		}else{
					    			use_outside_logging_adobe_log(use_outside_logging_array[a][0], use_outside_logging_array[a][1], use_outside_logging_array[a][2], use_outside_logging_array[a][3], use_outside_logging_array[a][4]);
					    		}
					    		
							}
							
							use_outside_logging_array[a][0] = 0;
							use_outside_logging_array[a][1] = '';
							use_outside_logging_array[a][2] = '';
							use_outside_logging_array[a][3] = '';
							use_outside_logging_array[a][4] = '';
							
						}

						//clear the array
						use_outside_logging_array = new Array();

					}

		    		//set the flag 
		    		last_outside_logging_doing_ini = 'N';
		    		
				}
			});

    	}

    	function use_outside_logging_adobe_log(t_action_code, t_per_reason, t_time_reason, t_run_time, do_close_outside_loging){

			//alert('Adobe log');

    		if(use_outside_logging_consolelog == 'Y'){
    			console.log('ADODE LOG');
    		}
			
			//ini the reason
			var t_reason = t_per_reason;
			
			//if to do %
			if(t_action_code == 16 && use_outside_logging_send_time_viewed == 'N'){
				
				t_reason   = t_per_reason;
				t_run_time = 100;

			}else if(t_action_code == 23 && use_outside_logging_send_time_viewed == 'Y'){

				t_reason = t_time_reason;

			}
			
			if(t_run_time == undefined){
				t_run_time = 100;
			}
			
			//alert(parseInt(t_action_code) + ' : ' + parseInt(use_outside_logging_action_code) + ' : ' + use_outside_logging_report_suite_id);
			//alert(t_per_reason + ' : ' + use_outside_logging_end_percent + ' : ' + do_close_outside_loging);
			
			//do the outside logging
			if(parseInt(t_action_code) == parseInt(use_outside_logging_action_code) && use_outside_logging_report_suite_id != ''){
					
				try{
					
					//if less than a close value then allow to sent the log info
					if(t_per_reason < use_outside_logging_end_percent){
						log_action_already_sent_close = 'N';
					}
					
					//only send if we have not sent the close
					if(log_action_already_sent_close == 'N'){
						
						//set the new time per value
						if(use_outside_logging_adobe_version == "5"){
			    			
			    			if(use_outside_logging_send_time_viewed == 'Y'){
			    				adobe_video_set_playhead(t_time_reason);
							}else{
								adobe_video_set_playhead(t_per_reason);
							}
			    			
						}
			    			
						//if at 0 then open the outside logging
						if((t_per_reason == 0 && do_close_outside_loging == 'N') || last_outside_logging_open_log == 'N'){
							
						    use_outside_logging_adobe_start(t_time_reason, t_per_reason, t_run_time);
						    
							last_outside_logging_open_log = 'Y';
							
						}
						
						//do the outside logging
						if((t_per_reason < use_outside_logging_end_percent && do_close_outside_loging == 'N') || use_outside_logging_sent_play == 'N'){
							
							use_outside_logging_adobe_play(t_time_reason, t_per_reason);
							
						}
						
						//do close
						if(t_per_reason >= use_outside_logging_end_percent && do_close_outside_loging == 'N'){
							
							//set the time
							adobe_video_set_100per(); 
							
							//close the outside logging
						    use_outside_logging_adobe_stop(t_time_reason, t_per_reason)

						}
						
					}
					
				}catch(err){
					//var error_message = err.message;
					//alert(err.message);
				}
				
			}
	
    	}
    	
    	function use_outside_logging_adobe_start(time_reason,per_reason,run_time){

    		if(use_outside_logging_adobe_version == "5"){
    			
    		}else{
			
				s.account = use_outside_logging_report_suite_id;
				s.Media.playerName = use_outside_logging_player_name;
				
				s.Media.open(t_use_outside_logging_send_what,run_time,use_outside_logging_player_name);
				
				s.Media.completeByCloseOffset = true;
			    s.Media.completeCloseOffsetThreshold = (run_time * (100 - use_outside_logging_end_percent) / 100);
			    
    		}
    		
    	}
    	
    	function use_outside_logging_adobe_play(time_reason,per_reason){

    		if(use_outside_logging_adobe_version == "5"){
    			
    			if(use_outside_logging_adobe5_sent_play == 'N' || use_outside_logging_adobe5_sent_pause == 'Y'){

        			//do the function
        			if (typeof isitetv_jq === "function"){
	    	    	
	    				//alert('Adobe Play');
	
	    				if(use_outside_logging_consolelog == 'Y'){
	    					console.log('ADODE PLAY');
	    				}
	    				
		    			//do the play function
		    			adobe_video_do_play();
		    			
		    			//set the var
		    			use_outside_logging_adobe5_sent_play  = 'Y';
		    			use_outside_logging_adobe5_sent_pause = 'N';
		    			
        			}
	    			
				}
    			
    		}else{
			
				//send a log value
				if(use_outside_logging_send_time_viewed == 'Y'){
					s.Media.play(t_use_outside_logging_send_what,time_reason);
				}else{
					s.Media.play(t_use_outside_logging_send_what,per_reason);
				}
				
    		}
    		
    		use_outside_logging_sent_play = 'Y';
			
    	}
    	
    	function use_outside_logging_adobe_pause(time_reason,per_reason){

    		if(use_outside_logging_adobe_version == "5"){

    			//do the function
    			if (typeof adobe_video_do_pause === "function"){
	    	
					//alert('Adobe Pause');
	
	    			if(use_outside_logging_consolelog == 'Y'){
	    				console.log('ADODE PAUSE');
	    			}

	    			//set the var
	    			use_outside_logging_adobe5_sent_pause = 'Y';
	    			
	    			//do the pause function
	    			adobe_video_do_pause();
	
    			}
    			
    		}else{
		
    			use_outside_logging_adobe_stop(time_reason,per_reason);
    			
    		}
    		
    	}
    	
    	function use_outside_logging_adobe_rewind(time_reason,per_reason){

    		if(use_outside_logging_adobe_version == "5"){
    			
    		}else{
		
    			use_outside_logging_adobe_play(time_reason,per_reason);
    			
    		}
    		
    	}
    	
    	function use_outside_logging_adobe_stop(time_reason,per_reason){
    		
    		if(log_action_already_sent_close == 'N'){
	
	    		if(use_outside_logging_adobe_version == "5"){
	
	    			//do the stop function
	    			if (typeof adobe_video_do_stop === "function"){
	
	    				//alert('Adobe Stop');
	    				
	    				if(use_outside_logging_consolelog == 'Y'){
	    					console.log('ADODE STOP');
	    				}
	    				
	    				adobe_video_do_stop();
	    			}
	    			
	    		}else{
				
					//send a log value
					if(use_outside_logging_send_time_viewed == 'Y'){
						if (typeof s.Media.play === "function"){    s.Media.play(t_use_outside_logging_send_what,time_reason);}
						if (typeof s.Media.stop === "function"){    s.Media.stop(t_use_outside_logging_send_what,last_outside_logging_run_time);}
						if (typeof s.Media.close === "function"){   s.Media.close(last_outside_logging_run_time);}
						if (typeof s.Media.complete === "function"){s.Media.complete(t_use_outside_logging_send_what,last_outside_logging_run_time);}
					}else{
						if (typeof s.Media.play === "function"){    s.Media.play(t_use_outside_logging_send_what,per_reason);}
						if (typeof s.Media.stop === "function"){    s.Media.stop(t_use_outside_logging_send_what,last_outside_logging_run_time);}
						if (typeof s.Media.close === "function"){   s.Media.close(last_outside_logging_run_time);}
						if (typeof s.Media.complete === "function"){s.Media.complete(t_use_outside_logging_send_what,last_outside_logging_run_time);}
					}
					
	    		}
	    		
	    		//set the flag
	    		log_action_already_sent_close = 'Y';
	    		
    		}

    		//reset
			use_outside_logging_sent_play                  = 'N';
			
			use_outside_logging_adobe5_sent_play           = 'N';
			use_outside_logging_adobe5_sent_pause          = 'N';

			if (typeof adobe_video_set_playhead === "function"){
				adobe_video_set_playhead(0);
			}
			
    	}
    	
    	function log_outside(t_asset_list_type_id,t_playlist_tabs_contents_id,t_playlist_tabs_id,t_tab_id,t_video_asset_id,t_asset_id,t_action_code,t_reason,t_asset_title,t_use_outside_logging_send_what){

			var url_path = 'http://' + slave_url + slave_url_adder + 'isitetv_get_log_action.php';
			var params   = 'play_in_demo_mode=' + play_in_demo_mode;
			params       = params + '&start_log_id=' + start_log_id;
			params       = params + '&asset_list_type_id=' + t_asset_list_type_id;
			params       = params + '&video_id=' + video_id;
			params       = params + '&playlist_tabs_contents_id=' + t_playlist_tabs_contents_id;
			params       = params + '&playlist_tabs_id=' + t_playlist_tabs_id;
			params       = params + '&playlist_id=' + playlist_id;
			params       = params + '&video_id=' + video_id;
			params       = params + '&sku_id=' + sku_id;
			params       = params + '&player_id=' + player_id;
			params       = params + '&enviroment_id=' + enviroment_id;
			params       = params + '&website_language_id=' + website_language_id;
			params       = params + '&tab_id=' + t_tab_id;
			params       = params + '&video_asset_id=' + t_video_asset_id;
			params       = params + '&asset_id=' + t_asset_id;
			params       = params + '&code_id=' + t_action_code;
			params       = params + '&reason=' + t_reason;
			params       = params + '&do_check_log=Y';
			params       = params + '&tx=' + t_use_outside_logging_send_what;
			
			url_path = url_path + '?' + params + '&jsoncallback=?';
			  
			isitetv_jq.ajax({
				type: 'GET',
			    url: url_path,
			    async: false,
			    contentType: "application/json",
			    dataType: 'jsonp',
		        crossDomain: true,
			    error:function(jqXHR,textStatus,errorThrow){
			    	
			    }
			});
			
    	}
    	
    	function display_the_splash_screen(){

			//display the please wait message
			if(options.no_player_display_splash_screen == 'Y'){

    			//add the div
    			replace_div_with_our_div();
    			
	    		//add the image
    			if(options.splash_screen_image != ''){
    				isitetv_jq('#' + our_div_holder_id).html('<img src="' + options.splash_screen_image + '" />');
    			}else if(options.splash_screen_text != ''){
    	        	isitetv_jq('#' + our_div_holder_id).html(options.splash_screen_text);
    			}
	        		
			}
			
    	}
    	
    	function get_help_spaces(ns){
    		
    		var retval = '';
    		
    		for(var a=0;a<ns;a++){
    			retval = retval + '&nbsp;';
    		}
    		
    		return retval;
    		
    	}
    	
    	function menu_clicked(event){
    		
    		alert('menu clicked ' + event.data.ptc_id);
    		
    	}
   	 
    	function bindEvent(obj,eventName, eventHandler,params) {
    		
    		if(params != ''){
    			isitetv_jq(obj).on(eventName, params, eventHandler);
    		}else{
    			isitetv_jq(obj).on(eventName, eventHandler);
    		}
	   		
	   	} 

    	function get_the_enviroment_vars(){
    		
    		if(user_agent.match(/(ipad)/) && user_agent.match(/applewebkit/)){
    			env_ipad   = 'Y';
    		}if(user_agent.match(/(iphone)/) && user_agent.match(/applewebkit/)){
    			env_iphone = 'Y';
    		}
    		
    		//var rv = '';
    		
    		//loop around to get the device browser
    		for(var a=0;a<device_browser_array.length;a++){
    			
    			if(user_agent.indexOf(device_browser_array[a]) > -1 && device_browser == ''){
    				device_browser = device_browser_array[a];
    				//rv = rv + browser_array[a] + ' - ' + user_agent.indexOf(browser_array[a]) + '  |  ';
        		}
    		}

    		//loop around to get the device device
    		for(a=0;a<device_device_array.length;a++){
    			
    			if(user_agent.indexOf(device_device_array[a]) > -1 && device_device == ''){
    				device_device = device_device_array[a];
    				//rv = rv + browser_array[a] + ' - ' + user_agent.indexOf(browser_array[a]) + '  |  ';
        		}
    		}

    		//loop around to get the device browser
    		for(a=0;a<device_os_array.length;a++){
    			
    			if(user_agent.indexOf(device_os_array[a]) > -1 && device_os == ''){
    				device_os = device_os_array[a];
    				//rv = rv + browser_array[a] + ' - ' + user_agent.indexOf(browser_array[a]) + '  |  ';
        		}
    		}

    		//loop around to get the device browser
    		for(a=0;a<device_service_array.length;a++){
    			
    			if(user_agent.indexOf(device_service_array[a]) > -1 && device_service == ''){
    				device_service = device_service_array[a];
    				//rv = rv + browser_array[a] + ' - ' + user_agent.indexOf(browser_array[a]) + '  |  ';
        		}
    		}
    		
    		//loop around to get the browser
    		for(a=0;a<browser_array.length;a++){
    			
    			if(user_agent.indexOf(browser_array[a]) > -1 && using_browser == ''){
    				using_browser = browser_array[a];
    				//rv = rv + browser_array[a] + ' - ' + user_agent.indexOf(browser_array[a]) + '  |  ';
        		}
    		}
    		
    		//loop around to get the webkit
    		for(a=0;a<webkit_array.length;a++){
    			
    			if(user_agent.indexOf(webkit_array[a]) > -1 && using_webkit == ''){
    				using_webkit = webkit_array[a];
    				//rv = rv + browser_array[a] + ' - ' + user_agent.indexOf(browser_array[a]) + '  |  ';
        		}
    		}
    		
    		//loop around to get the webkit
    		for(a=0;a<os_array.length;a++){
    			
    			if(user_agent.indexOf(os_array[a]) > -1 && using_os == ''){
    				using_os = os_array[a];
    				//rv = rv + browser_array[a] + ' - ' + user_agent.indexOf(browser_array[a]) + '  |  ';
        		}
    		}
    		
    		//check for mobile
    		if(user_agent.indexOf('mobile') > -1){
    			device_mobile = 'Y';
    		}
    		
    		//set the enviroment
    		/*
    		if(device_mobile == 'N' && env_ipad == 'N' && env_iphone == 'N'){
    			//enviroment_id = 1;
    		}else if(device_mobile == 'Y' && env_ipad == 'N' && env_iphone == 'N'){
    			//enviroment_id = 2;
    		}else if(device_mobile == 'Y' && env_ipad == 'N' && env_iphone == 'Y'){
    			//enviroment_id = 2;
    		}else if(device_mobile == 'Y' && env_ipad == 'Y' && env_iphone == 'N'){
    			//enviroment_id = 3;
    		}
    		*/

    		/*
    		isitetv_jq("body").append('<div id="enviroment_vars">');
    		
    		isitetv_jq('#enviroment_vars').html(
    				'browser = ' + using_browser + '<br />' + 
    				'os = ' + using_os + '<br />' + 
    				'webkit = ' + using_webkit + '<br />' + 
    				'device mobile = ' + device_mobile + '<br />' + 
    				'device browser = ' + device_browser + '<br />' + 
    				'device device = ' + device_device + '<br />' + 
    				'device os = ' + device_os + '<br />' + 
    				'device service = ' + device_service + '<br />' + 
    				'ipad = ' + env_ipad + '<br />' + 
    				'iphone = ' + env_iphone + '<br />' + 
    				user_agent + '<br />' + rv
    				);
    		*/
    		
    	}
    	
        return this;
        
	};
	
	isitetv_jq.fn.isitetv_player = function(options) {
		
		return this.each(function(){
			
			var element = isitetv_jq(this);
			
			//return early if this element already has a plugin instance
			if (element.data('isitetv_player')) return;

			//pass options to plugin constructor
			var isitetv_player = new iSitetv_Player(this, options);
				
			//store plugin object in this element's data
			element.data('isitetv_player', isitetv_player);
			
		});
		
	};
	
})(jQuery);
