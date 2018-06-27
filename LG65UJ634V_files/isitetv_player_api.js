/**
 *
 *
 * All of the function to access / control the player.
 *
 * @author Susan Buckle
 * @copyright Copyright (c) 2015, iSiteTV
 * @version 1.0.0
 * @name isitetv_player.api.js
 *      
 * Example One
 * 		<div style="position:absolute; top:24px; left:24px; height:600px; width:730px; " >
 * 			<iframe id="isitetv_player_1" src="http://isitetv.com/isitetv_cms/player.php?encoded=en0000000000000000000000" style="height:600px; width:730px;" >
 * 			</iframe>
 * 		</div>
 * 
 * 		<!-- iSiteTV Player API -->
 * 			<script type="text/javascript" src="http://isitetv.com/isitetv_cms/scripts/isitetv_player_api.js"></script>
 * 
 * 			<script type="text/javascript">
 * 				$('#isitetv_player_1').isitetv_player_api();
 * 			</script>
 * 		<!-- iSiteTV Player API -->
 * 
 * 		<input type="button" value="Play" onclick="$('#isitetv_player_1').isitetv_player_play();" />
 * 		&nbsp;&nbsp;
 * 		<input type="button" value="Pause" onclick="$('#isitetv_player_1').isitetv_player_pause();" />
 * 
 * 		<!-- iSiteTV Player API -->
 * 			<script type="text/javascript">
 * 
 * 				var player_size = "$('#isitetv_player_1').isitetv_player_get_size(};
 * 
 * 				if (player_size !== null) {
 * 
 * 					var w = player_size.width;
 * 					var h = player_size.height;
 * 
 * 				}
 * 
 * 			</script>
 * 
 * 		<!-- iSiteTV Player API -->
 * 
 * Example Two
 * 		<div style="position:absolute; top:24px; left:24px; height:600px; width:730px; " >
 * 			<iframe id="isitetv_player_1" src="http://isitetv.com/isitetv_cms/player.php?encoded=en0000000000000000000000" style="height:600px; width:730px;" >
 * 			</iframe>
 * 		</div>
 * 
 * 		<!-- iSiteTV Player API -->
 * 
 * 			<script type="text/javascript" src="http://isitetv.com/isitetv_cms/scripts/isitetv_player_api.js" ></script>
 * 
 * 			<script type="text/javascript">
 * 
 * 				var old_isitetv_player_1 = $('#isitetv_player_1').height();
 * 
 * 				$('<frame_id>').isitetv_player_api(
 * 					{
 * 						onSize: function(size){
 * 
 * 							var temp_hetight = size.height;
 * 							var temp_width   = size.width;
 * 
 * 						},
 * 						onAssetCount: function(count){
 * 
 * 							if(count == 0){
 * 
 * 								$('#isitetv_player_1').height(370);
 * 
 * 							}else{
 * 			
 * 								$('#isitetv_player_1').height(old_isitetv_player_1);
 * 
 * 							}
 * 
 * 					}
 * 
 * 				});
 * 				
 * 			</script>
 * 
 * 		<!-- iSiteTV Player API -->
 * 
 *      
 */

/*global window, jQuery */
(function($) {
	
	//if currys or pc world
	if(document.domain.toLowerCase().indexOf("currys") > 0){
		$ = DCG.$;
	}else if(document.domain.toLowerCase().indexOf("pcworld") > 0){
		$ = DCG.$;
	}
	
	var defaults = {
			parent_dom_id: 'p_id',
			onSize: function(size){

				var size = {
						width: last_player_width,
						height: last_player_height
				};

				return size;
				
			},
			onAssetCount: function(count){

				return last_number_assets;
				
			}
	};

	//vars
	var number_slaves               = 6;
	var src                         = 'isitetv.com';
	var parent_domain               = '';
	var child_domain                = '';
	var this_id                     = '';
	
	var options                     = defaults;

	var last_player_width           = 0;
	var last_player_height          = 0;
	var new_player_width            = 0;
	var new_player_height           = 0;
	
	var last_number_assets          = -1;
	

	var check_current_number_assets = 'Y';
	var check_player_size           = 'Y';
	

	$.fn.isitetv_player_api = function(options) {
	
		//options
		options = $.extend(defaults, options);
	
		//function	
	
		//get the parent domain
		parent_domain = document.URL;
		parent_domain = parent_domain.replace('http://','').replace('https://','').split(/[/?#]/)[0];	
		
		//get this id
		this_id = this.selector.replace(/#/g, '');	
		
		//add where we are comming from
		var this_src = document.getElementById(this_id).src;
		$("#" + this_id).attr('src',this_src + "&isitetv_player_replace_this_url="  + encodeURIComponent( document.URL ));

		//ini the post message
		isitetv_pr_ini_msg();

		setTimeout(function() {check_got_counts();},1000);
		
	};

	//**********************************************   FUNCTIONS  **************************************************
	
	$.fn.isitetv_player_get_size = function(options) {

		//tell the player
		isitetv_pr_post_message("isitetv_do_get_player_size();");
		
		if (window.console) {
			console.log('isitetv_player_get_size W:' + last_player_width + ' H:' + last_player_height);
		}
		
		var obj = {
				width: last_player_width,
				height: last_player_height
		};

		return obj;
		
	};
	
	$.fn.isitetv_player_get_current_asset_count = function(options){

		//tell the player
		isitetv_pr_post_message("isitetv_do_get_number_assets();");
		
		return last_number_assets;
		
	};

	$.fn.isitetv_player_play = function(options) {
		
		//tell the player
		isitetv_pr_post_message("isitetv_do_player_option('play');");
		
	};

	$.fn.isitetv_player_pause = function(options) {
		
		//tell the player
		isitetv_pr_post_message("isitetv_do_player_option('pause');");
		
	};

	$.fn.isitetv_player_start = function(options) {
		
		//tell the player
		isitetv_pr_post_message("isitetv_do_player_option('start');");
		
	};

	$.fn.isitetv_player_stop = function(options) {
		
		//tell the player
		isitetv_pr_post_message("isitetv_do_player_option('stop');");
		
	};

	$.fn.isitetv_player_rewind = function(options) {
		
		//tell the player
		isitetv_pr_post_message("isitetv_do_player_option('rewind');");
		
	};

	//**********************************************   EVENT FUNCTIONS  **************************************************
	
	function do_event_onAssetCount(){

		if(check_current_number_assets == 'Y'){
			
			var retval = options.onAssetCount(last_number_assets);
			
			if(retval !== false && last_number_assets > 0){

				check_current_number_assets  = 'N';
				
			}
			
		}
		
	}
	
	function do_event_onSize(){
		
		if(check_player_size == 'Y'){
			
			if(new_player_width > 0 && new_player_height > 0 && (new_player_width != last_player_width || new_player_height != last_player_height)){
	
				last_player_height = new_player_height;
				last_player_width  = new_player_width;

				if (window.console) {
					console.log('onSize W:' + last_player_width + ' H:' + last_player_height);
				}
				
				var size = {
						width: last_player_width,
						height: last_player_height
				};
	
				var retval = options.onSize(size);

				if(retval !== false && last_player_width > 0 && last_player_height > 0){
	
					//check_player_size  = 'N';
					
				}
				
			}
			
		}
		
	}
	
	//**********************************************   CHECK  **************************************************
	function check_got_counts(){

		if(check_player_size == 'Y'){

			//tell the player
			isitetv_pr_post_message("isitetv_do_get_player_size();");
			
		}

		if(check_current_number_assets == 'Y'){

			//tell the player
			isitetv_pr_post_message("isitetv_do_get_number_assets();");
			
		}
		
		if(check_player_size == 'Y' || check_current_number_assets == 'Y'){
			setTimeout(function() {check_got_counts();},2000);
		}
		
	}
	
	
	//**********************************************   POST  **************************************************
	function isitetv_pr_post_message(ipclu){
		
		if(this_id != ''){
	
			var this_src = document.getElementById(this_id).src;
			
			if($.isFunction($.postMessage)){
				
				if(child_domain == ''){
						
					//loop around the slaves
					for(var a=1; a<=number_slaves; a++){
		
						this_src = isitetv_pr_create_src(this_src,a);
						
						$.postMessage('runfunction' + ipclu,this_src,$('#' + this_id)[0].contentWindow);
						
					}
					
				}else{
	
					this_src = isitetv_pr_create_src(this_src,-1);
					
					$.postMessage('runfunction' + ipclu,this_src,$('#' + this_id)[0].contentWindow);
					
				}
				
			}else{
	
			}
			
		}
		
	}

	function isitetv_pr_ini_msg(){
		
		try{
			if($.isFunction($.receiveMessage)){
					
				$.receiveMessage(
					function(e){
						isitetv_pr_get_message(e.data);
					},
					parent_domain
				);
				
			}
		}
		catch(e){
			//alert(e);
		}
		
	}
	
	function isitetv_pr_get_message(data){
		
		if(data.indexOf('iamhere') > -1){
			
			child_domain = data.replace('iamhere','');
			
		}else if(data.indexOf('player_width') > -1){
			
			new_player_width = data.replace('player_width','');

			do_event_onSize();
			
		}else if(data.indexOf('player_height') > -1){

			new_player_height = data.replace('player_height','');
			
			do_event_onSize();

		}else if(data.indexOf('player_current_number_assets') > -1){

			last_number_assets = data.replace('player_current_number_assets','');

			do_event_onAssetCount();
			
		}else if(data.indexOf('player_group_values') > -1){

			var group_data_value = data.replace('player_group_values','').split("|");

			if(Array.isArray(group_data_value) ){
				
				if(group_data_value.length >= 1){
					
					new_player_height = parseInt(group_data_value[0]);
					
					do_event_onSize();
					
				}
				if(group_data_value.length >= 2){

					new_player_width = parseInt(group_data_value[1]);
					
					do_event_onSize();
					
				}
				if(group_data_value.length >= 3){

					last_number_assets = parseInt(group_data_value[2]);

					do_event_onAssetCount();
					
				}
				
			}
			
		}else{
			//alert(data);
		}
		
	}

	function isitetv_pr_create_src(old_src,slave_number){
		
		src = old_src;

		if(slave_number > -1){
				
			if(old_src.indexOf('new-testing.office.isitetv.com') > -1){
				src = old_src;
			}else if(old_src.indexOf('master.isitetv.com') > -1){
				src = old_src;
			}else if(old_src.indexOf('slave') > -1){
				
			}else if(old_src.indexOf('isitetv.com') > -1){
				//src = old_src.replace('isitetv.com','slave' + slave_number + '.isitetv.com');
			}
			
		}else{

			if(old_src.indexOf('new-testing.office.isitetv.com') > -1){
				src = old_src;
			}else if(old_src.indexOf('master.isitetv.com') > -1){
				src = old_src;
			}else if(old_src.indexOf('slave') > -1){
				
			}else if(old_src.indexOf('isitetv.com') > -1){
				//src = old_src.replace('isitetv.com',child_domain);
			}
			
		}
		
		return src;
		
	}

	//**********************************************   POSTMASTER.ba.js  **************************************************
	// this section is from the jquery.postmessage.js from Ben Alman 
	// it is in here so we do not have to add / get the user to add the jquery file.
	// used under the MIT license.
	/*
	 * jQuery postMessage - v0.5 - 9/11/2009
	 * http://benalman.com/projects/jquery-postmessage-plugin/
	 * 
	 * Copyright (c) 2009 "Cowboy" Ben Alman
	 * Dual licensed under the MIT and GPL licenses.
	 * http://benalman.com/about/license/
	 * 
	 */
	
	// A few vars used in older browsers.
	var interval_id, last_hash, cache_bust = 1;
	    
	// A var used in newer browsers.
	var rm_callback;
	
	// A few convenient shortcuts.
	var window = this, FALSE = !1;
	
	// Reused internal strings.
	var postMessage      = 'postMessage';
	var addEventListener = 'addEventListener';
	var p_receiveMessage;

	// I couldn't get window.postMessage to actually work in Opera 9.64!
	var user_agent = window.navigator.userAgent.toLowerCase();
	var user_vendor = window.navigator.vendor.toLowerCase();
	var is_opera   = (user_agent.indexOf('opera') > -1 || (user_vendor.indexOf('opera') > -1));
    var has_postMessage = window[postMessage] && !is_opera;
	
	$[postMessage] = function( message, target_url, target ) {
	    if ( !target_url ) { return; }
	    
	    // Serialize the message if not a string. Note that this is the only real
	    // jQuery dependency for this script. If removed, this script could be
	    // written as very basic JavaScript.
	    message = typeof message === 'string' ? message : $.param( message );
	    
	    // Default to parent if unspecified.
	    target = target || parent;
	    
	    if ( has_postMessage ) {
	      // The browser supports window.postMessage, so call it with a targetOrigin
	      // set appropriately, based on the target_url parameter.
	      target[postMessage]( message, target_url.replace( /([^:]+:\/\/[^\/]+).*/, '$1' ) );
	      
	    } else if ( target_url ) {
	      // The browser does not support window.postMessage, so set the location
	      // of the target to target_url#message. A cache
	      // bust parameter is added to ensure that repeat messages trigger the
	      // callback.
	      target.location = target_url.replace( /#.*$/, '' ) + '#' + (+new Date) + (cache_bust++) + '&' + message;
	    }
	    
	};

	$.receiveMessage = p_receiveMessage = function( callback, source_origin, delay ) {
	    if ( has_postMessage ) {
	      // Since the browser supports window.postMessage, the callback will be
	      // bound to the actual event associated with window.postMessage.
	      
	      if ( callback ) {
	        // Unbind an existing callback if it exists.
	        rm_callback && p_receiveMessage();
	        
	        // Bind the callback. A reference to the callback is stored for ease of
	        // unbinding.
	        rm_callback = function(e) {
	          if ( ( typeof source_origin === 'string' && e.origin == '' )
	            || ( $.isFunction( source_origin ) && source_origin( e.origin ) === FALSE ) ) {
	            return FALSE;
	          }
	          callback( e );
	        };
	      }
	      
	      if ( window[addEventListener] ) {
	        window[ callback ? addEventListener : 'removeEventListener' ]( 'message', rm_callback, FALSE );
	      } else {
	        window[ callback ? 'attachEvent' : 'detachEvent' ]( 'onmessage', rm_callback );
	      }
	      
	    } else {
	      // Due to browser limitations a polling loop will be started, and the
	      // callback will be called whenever the location.hash changes.
	      
	      interval_id && clearInterval( interval_id );
	      interval_id = null;
	      
	      if ( callback ) {
	        delay = typeof source_origin === 'number'
	          ? source_origin
	          : typeof delay === 'number'
	            ? delay
	            : 100;
	        
	        interval_id = setInterval(function(){
	          var hash = document.location.hash,
	            re = /^#?\d+&/;
	          if ( hash !== last_hash && re.test( hash ) ) {
	            last_hash = hash;
	            callback({ data: hash.replace( re, '' ) });
	          }
	        }, delay );
	      }
	    }
	    
	};
	  
    return this;
    
})(jQuery);
