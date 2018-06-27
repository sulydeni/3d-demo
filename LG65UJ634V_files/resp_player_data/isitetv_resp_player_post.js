/**
 *
 *
 * All of the function to post message.
 *
 * @author Susan Buckle
 * @copyright Copyright (c) 2015, iSiteTV
 * @version 1.0.0
 * @name isitetv_resp_player_post.js
 *      
*/


	var isitetv_post_vars = {width:0, height:0, number_current_assets:0};
	
	var isitetv_post_message_from_url = '';
	var isitetv_last_slave_url        = '';
	var isitetv_parent_domain         = '';
	var last_send_data_time           = 1000;
	var isitetv_group_data            = 'N';
	var isitetv_group_data_value      = new Array();

	var isitetv_last_player_width     = 0;
	var isitetv_last_player_height    = 0;
	var isitetv_last_number_assets    = 0;

	isitetv_group_data_value[0] = 0;	//height
	isitetv_group_data_value[1] = 0;	//width
	isitetv_group_data_value[2] = 0;	//asset counts
	
	function isitetv_pr_ini_msg(){
		
		//console.log('isitetv_pr_ini_msg');
		
		try{
			if(isitetv_jq.isFunction(isitetv_jq.receiveMessage)){
					
				isitetv_jq.receiveMessage(
					function(e){
						isitetv_pr_get_message(e.data);
					},
					isitetv_parent_domain
				);
				
			}
		}
		catch(e){
			//alert(e);
		}
		
	}

	function isitetv_pr_post_message(message2post){

		//console.log('isitetv_pr_post_message ' + message2post);
		
		if(isitetv_post_message_from_url == ''){
			isitetv_post_message_from_url = hash_search('get','postmessageurl');
			//console.log('isitetv_post_message_from_url =  ' + isitetv_post_message_from_url);
			if(isitetv_post_message_from_url == '' || isitetv_post_message_from_url == undefined){
				isitetv_post_message_from_url = get_url_parameter('isitetv_player_replace_this_url');
			}
		}
  
		if(isitetv_jq.isFunction(isitetv_jq.postMessage)){
			isitetv_jq.postMessage(
					message2post,
					isitetv_post_message_from_url,
					parent
			);
		}

	}
	
	function isitetv_pr_get_message(lburl){

		//console.log('isitetv_pr_get_message');
		
		if(lburl.indexOf("runfunction") > -1){
			
			var tv = lburl.substr(11);
			tv = tv.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			eval(tv);
			location.hash = 'isitetv';

		}
		
	}

	function hash_search(dw,key,value){

		//console.log('hash_search ' + dw);
		
		var params, hashArray, keyVal;
		var hashStr = window.location.hash;

		params = {};
		hashStr = hashStr.substring(1, hashStr.length);
		hashArray = hashStr.split('&');

		for(var i = 0; i < hashArray.length; i++) {
			keyVal = hashArray[i].split('=');
			params[unescape(keyVal[0])] = (typeof keyVal[1] != "undefined") ? unescape(keyVal[1]) : keyVal[1];
		}

		switch (dw)
		{
			case "keyExists":
				return params.hasOwnProperty(key);
			case "get":
				return params[key];
			case "addHash":
				set(key, value);
    			return true;
			case "removeHash":
				set(key, value);
    			return true;
			default:
				return false;
				
		}
		
		
       function set(key, value) {
          params[key] = value;
          push();
       };

       function remove(key, value) {
          delete params[key];
          push();
       };

       function push() {
           var hashBuilder = [], key, value;

           for(key in params) if (params.hasOwnProperty(key)) {
               key = escape(key), value = escape(params[key]); // escape(undefined) == "undefined"
               hashBuilder.push(key + ( (value !== "undefined") ? '=' + value : "" ));
           }

           window.location.hash = hashBuilder.join("&");
       };

    }
	
	function get_url_parameter(param_name){

		//console.log('get_url_parameter ' + param_name );
		
		var retval = '';
		var wlocal = window.location.href;
		
		//any params
		if(wlocal.indexOf("?") > 0){
			
			wlocal = wlocal.substr(wlocal.indexOf("?") + 1);
			
			//remove the #
			if(wlocal.indexOf("#") > 0){
				
				wlocal = wlocal.substr(0, wlocal.indexOf("#") - 1);
				
			}
			
			//create the array
			var t_array = wlocal.split('&');
			
			//ini the data array
			var d_array = new Array();
			var t2a     = new Array();
			
			//loop to create the array of key pairs
			for(var a = 0; a < t_array.length; a++){
				
				if(t_array[a].indexOf("=") > 0){
					t2a = t_array[a].split('=');
				}else{
					t2a[0] = t_array[a];
					t2a[1] = '';
				}
				
				if(t2a[0] in d_array){
					
				}else{
					d_array[t2a[0]] = t2a[1];
				}
				
			}
			
			//if the param is in the array
			if(param_name in d_array){
				
				retval = d_array[param_name];

				retval = retval.replace(/%3A/gi,':');
				retval = retval.replace(/%2F/gi,'/');
				
			}
			
		}

		//console.log('get_url_parameter ' + param_name + ' = ' + retval);
		
		return retval;
		
	}
	
	function isitetv_check_the_passed_prams(dw){

		var temp_slave_url = isitetv_jq('#productMedias_replace').data('isitetv_player').get_slave_url();

		var sent_1 = 'N';
		var sent_2 = 'N';
		var sent_3 = 'N';
		
		if(temp_slave_url != isitetv_last_slave_url){
			
			isitetv_last_slave_url = temp_slave_url;
			
			isitetv_pr_post_message('iamhere' +  isitetv_last_slave_url);
			
			sent_1 = 'Y';
			
		}
		
		sent_2 = isitetv_do_get_player_size();
		
		sent_3 = isitetv_do_get_number_assets();
		
		if(isitetv_group_data == 'Y' && (sent_1 == 'Y' || sent_2 == 'Y' || sent_3 == 'Y') ){
			
			isitetv_pr_post_message_group_values();
			
		}
		
		//setTimeout(function() {isitetv_check_the_passed_prams();},last_send_data_time);
		
		//if(sent_1 == 'Y' || sent_2 == 'Y' || sent_3 == 'Y'){
		//	last_send_data_time = 2000;
		//}else{
		//	last_send_data_time = last_send_data_time + 1000;
		//}
		
	}
	
	function isitetv_pr_post_message_group_values(){
		
		isitetv_pr_post_message('player_group_values' + isitetv_group_data_value[0] + '|' + isitetv_group_data_value[1] + '|' + isitetv_group_data_value[2]);
		
	}
	
	function isitetv_do_get_player_size(){
		
		var retval = 'N';

		//get the player size
		if (typeof isitetv_post_vars != "undefined") {

			if (typeof isitetv_post_vars.height != "undefined") {
				
				if(isitetv_last_player_height != isitetv_post_vars.height){
					
					retval = 'Y';
					
					isitetv_last_player_height = isitetv_post_vars.height;
						
					if(isitetv_group_data == 'N'){
						isitetv_pr_post_message('player_height' + isitetv_post_vars.height);
					}else{
						isitetv_group_data_value[0] = isitetv_post_vars.height;
					}
					
				}
				
			}else{
				if(isitetv_group_data == 'N'){
					isitetv_pr_post_message('player_height0');
				}else{
					isitetv_group_data_value[0] = 0;
				}
			}
			

			if (typeof isitetv_post_vars.width != "undefined") {

				if(isitetv_last_player_width != isitetv_post_vars.width){

					retval = 'Y';
					
					isitetv_last_player_width = isitetv_post_vars.width;
							
					if(isitetv_group_data == 'N'){
						isitetv_pr_post_message('player_width' + isitetv_post_vars.width);
					}else{
						isitetv_group_data_value[1] = isitetv_post_vars.width;
					}
					
				}
			}else{
				if(isitetv_group_data == 'N'){
					isitetv_pr_post_message('player_width0');
				}else{
					isitetv_group_data_value[1] = 0;
				}
			}
			
		}
		
		return retval;

	}
	
	function isitetv_do_get_number_assets(){

		var retval = 'N';

		if (typeof isitetv_post_vars != "undefined") {
				
			if (typeof isitetv_post_vars.number_current_assets != "undefined") {

				if(isitetv_last_number_assets != isitetv_post_vars.number_current_assets){
					
					retval = 'Y';
					
					isitetv_last_number_assets = isitetv_post_vars.number_current_assets;
							
					if(isitetv_group_data == 'N'){
						isitetv_pr_post_message('player_current_number_assets' + isitetv_post_vars.number_current_assets);
					}else{
						isitetv_group_data_value[2] = isitetv_post_vars.number_current_assets;
					}
					
				}
				
			}else{
				if(isitetv_group_data == 'N'){
					isitetv_pr_post_message('player_current_number_assets0');
				}else{
					isitetv_group_data_value[2] = 0;
				}
			}
			
		}

		return retval;

	}

	function isitetv_player_set_option(dw,val){

		switch(dw){
	
			case 'height':
				if(isitetv_last_player_height != parseInt(val)){
					isitetv_post_vars.height = parseInt(val);
					isitetv_check_the_passed_prams(dw);
				}
				break;
			case 'width':
				if(isitetv_last_player_width != parseInt(val)){
					isitetv_post_vars.width = parseInt(val);
					isitetv_check_the_passed_prams(dw);
				}
				break;
			case 'assets':
				if(isitetv_last_number_assets != parseInt(val)){
					isitetv_post_vars.number_current_assets = parseInt(val);
					isitetv_check_the_passed_prams(dw);
				}
				break;
				
		}
		
		
	}

	function isitetv_do_player_option(dw){
			
		switch(dw){
		
			case 'play':
				if(typeof isitetv_do_video_action == 'function') {
					isitetv_do_video_action(dw);
				}
				break;
			case 'pause':
				if(typeof isitetv_do_video_action == 'function') {
					isitetv_do_video_action(dw);
				}
				break;
			case 'start':
				if(typeof isitetv_do_video_action == 'function') {
					isitetv_do_video_action(dw);
				}
				break;
			case 'stop':
				if(typeof isitetv_do_video_action == 'function') {
					isitetv_do_video_action(dw);
				}
				break;
			case 'rewind':
				if(typeof isitetv_do_video_action == 'function') {
					isitetv_do_video_action(dw);
				}
				break;
				
		}
		
	}
    
	isitetv_jq(document).ready(function() {

		//console.log('ready');

		//get the parent domain
		isitetv_parent_domain = document.URL;
		isitetv_parent_domain = isitetv_parent_domain.replace('http://','').replace('https://','').split(/[/?#]/)[0];	
		
		isitetv_pr_ini_msg();

		isitetv_check_the_passed_prams();
		
	});


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
	
(function(isitetv_jq){

	//console.log(isitetv_jq.browser.opera);
	
	// A few vars used in older browsers.
	var interval_id, last_hash, cache_bust = 1;
	    
	// A var used in newer browsers.
	var rm_callback;
	
	// A few convenient shortcuts.
	var window = this, FALSE = !1;
	
	// Reused internal strings.
	var postMessage = 'postMessage';
	var addEventListener = 'addEventListener';
	var p_receiveMessage;

	// I couldn't get window.postMessage to actually work in Opera 9.64!
	if(window.navigator !== undefined && window.navigator.userAgent !== undefined){
		var user_agent = window.navigator.userAgent.toLowerCase();
	}else{
		var user_agent = '';
	}
	if(window.navigator !== undefined && window.navigator.vendor !== undefined){
		var user_vendor = window.navigator.vendor.toLowerCase();
	}else{
		var user_vendor = '';
	}
	var is_opera   = (user_agent.indexOf('opera') > -1 || (user_vendor.indexOf('opera') > -1));
    has_postMessage = window[postMessage] && !is_opera;
    
    if ( has_postMessage ) {
    	isitetv_group_data = 'N';
    }else{
    	isitetv_group_data = 'Y';
    }
	
	isitetv_jq[postMessage] = function( message, target_url, target ) {

		//console.log('postMessage ' + message);
		
	    if ( !target_url ) { return; }

	    // Serialize the message if not a string. Note that this is the only real
	    // jQuery dependency for this script. If removed, this script could be
	    // written as very basic JavaScript.
	    message = typeof message === 'string' ? message : isitetv_jq.param( message );
	    
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

	isitetv_jq.receiveMessage = p_receiveMessage = function( callback, source_origin, delay ) {

		//console.log('p_receiveMessage ');
		
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
	            || ( isitetv_jq.isFunction( source_origin ) && source_origin( e.origin ) === FALSE ) ) {
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
	  
})(jQuery);