/*
 * ADOBE SYSTEMS INCORPORATED
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.

 * NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
 * terms of the Adobe license agreement accompanying it.  If you have received this file from a
 * source other than Adobe, then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 */
	
	//notification
	function adobe_do_notification(){
			
		(function() {
		    'use strict';
		
		    if(adobe_video_information["consolelog"] == "Y"){
		    	console.log('scripts adobe5 app notification.center.js');
		    }
		
		    /**
		     * A generic event dispatcher.
		     *
		     * @constructor
		     */
		    function EventDispatcher() {
		        this._events = {};
		    }
		
		    /**
		     * Register an event-listener method to the event dispatcher.
		     *
		     * @param {string} name Unique string value identifying the event.
		     *
		     * @param {Function} listener Function that will be called when the event is dispatched.
		     *
		     * @param {Object} context Context in which the listener method is called.
		     *
		     */
		    EventDispatcher.prototype.addEventListener = function(name, listener, context) {
		        if (!name || !listener) return;
		        context = context || window;
		
		        this._events[name] = (this._events[name] || []);
		        this._events[name].push({cb: listener, ctx: context});
		    };
		
		    /**
		     * Un-register an event-listener method to the event dispatcher.
		     *
		     * NOTE: for an event listener to be removed all the three coordinates must match
		     * (name, listener and context) with the values provided during registration.
		     *
		     * @param {string} name Unique string value identifying the event.
		     *
		     * @param {Function} listener Function that will be called when the event is dispatched.
		     *
		     * @param {Object} context Context in which the listener method is called.
		     */
		    EventDispatcher.prototype.removeEventListener = function(name, listener, context) {
		        if (!name || !listener) return;
		        context = context || window;
		
		        // Check to see if the event name was registered with us.
		        var i, key, isNameRegistered = false;
		        for (key in this._events) {
		            if (name === key) {
		                isNameRegistered = true;
		                break;
		            }
		        }
		
		        // This event name was not registered with us. Just exit.
		        if (!isNameRegistered) return;
		
		        // Search for the target event listener
		        for (i = this._events[key].length - 1; i >= 0; i--) {
		            var _listener = this._events[key][i];
		            if (listener === _listener.cb && context === _listener.ctx) {
		                this._events[key].splice(i, 1);
		            }
		        }
		
		        // If we are left with an empty list of listeners for a particular
		        // event name, we delete it.
		        if (!this._events[key].length) delete this._events[key];
		    };
		
		    /**
		     * Dispatch en event. It goes through the entire list of listener methods that are registered
		     * for the target event and calls that function in the specified context.
		     *
		     * @param {string} name The name of the event.
		     */
		    EventDispatcher.prototype.dispatchEvent = function(name) {
		        if (!name) return;
		
		        var key, i;
		        for (key in this._events) {
		            if (this._events.hasOwnProperty(key) && name === key) {
		                var listeners = this._events[key],
		                    copyOnWrite = listeners.slice(0),
		                    length = copyOnWrite.length;
		
		                for (i = 0; i < length; i++) {
		                    copyOnWrite[i].cb.call(copyOnWrite[i].ctx);
		                }
		                break;
		            }
		        }
		    };
		
		    function NotificationCenter() {
		        // Provide a singleton EventDispatcher
		        if (!NotificationCenter.prototype._instance) {
		            NotificationCenter.prototype._instance = new EventDispatcher();
		        }
		
		        return NotificationCenter.prototype._instance;
		    }
		
		    // Export symbols.
		    window.NotificationCenter = NotificationCenter;
		})();
		
	}
		
	//config
	function adobe_do_config(){
			
		(function() {
		    'use strict';
		
		    if(adobe_video_information["consolelog"] == "Y"){
		    	console.log('scripts adobe5 app configuration.js');
		    }
		
		    // Export symbols.
		    window.Configuration = {
		        PLAYER: {
		            NAME: adobe_video_information['playerName'],
		            VIDEO_ID: adobe_video_information['video_id'],
					VIDEO_NAME: adobe_video_information['video_name']
		        },
		
		        VISITOR: {
		            MARKETING_CLOUD_ORG_ID: adobe_video_information['org_id'],
		            TRACKING_SERVER: adobe_video_information['trackingServer']
		        },
		
		        APP_MEASUREMENT: {
		            RSID: adobe_video_information['account'],
		            TRACKING_SERVER: adobe_video_information['trackingServer'],
					PAGE_NAME: adobe_video_information['page_name']
		        },
		
		        HEARTBEAT: {
		            TRACKING_SERVER: adobe_video_information['HeartbeatTrackingServer'],
		            PUBLISHER: adobe_video_information['publisher'],
		            CHANNEL: adobe_video_information['account'],
		            OVP: 'sample-ovp',
		            SDK: 'sample-sdk'
		        }
		    };
		})();
		
	}
	
	//player video
	function adobe_do_video(){
	
		(function() {
		    'use strict';
	
		    if(adobe_video_information["consolelog"] == "Y"){
		    	console.log('scripts adobe5 app player video.player.js');
		    }
	
		    var AssetType = ADB.va.plugins.videoplayer.AssetType;
		    var VideoInfo = ADB.va.plugins.videoplayer.VideoInfo;
		    var AdBreakInfo = ADB.va.plugins.videoplayer.AdBreakInfo;
		    var AdInfo = ADB.va.plugins.videoplayer.AdInfo;
		    var ChapterInfo = ADB.va.plugins.videoplayer.ChapterInfo;
		    var QoSInfo = ADB.va.plugins.videoplayer.QoSInfo;
	
		    var PlayerEvent = {
		        VIDEO_LOAD: 'video_load',
		        VIDEO_UNLOAD: 'video_unload',
		        PLAY: 'play',
		        PAUSE: 'pause',
		        COMPLETE: 'COMPLETE',
		        BUFFER_START: 'buffer_start',
		        BUFFER_COMPLETE: 'buffer_complete',
		        SEEK_START: 'seek_start',
		        SEEK_COMPLETE: 'seek_complete',
		        AD_START: "ad_start",
		        AD_COMPLETE: "ad_complete",
		        CHAPTER_START: "chapter_start",
		        CHAPTER_COMPLETE: "chapter_complete"
		    };
	
	
		    // This sample VideoPlayer simulates a mid-roll ad at time 15:
		    var AD_START_POS = 0;
		    var AD_END_POS = 0;
		    var AD_LENGTH = 0;
	
		    var CHAPTER1_START_POS = 0;
		    var CHAPTER1_END_POS = 0;
		    var CHAPTER1_LENGTH = 0;
	
		    var CHAPTER2_START_POS = 0;
		    var CHAPTER2_LENGTH = 0;
	
		    var MONITOR_TIMER_INTERVAL = 500;
	
		    function VideoPlayer(id) {
		        this._playerName = Configuration.PLAYER.NAME;
		        this._videoId = Configuration.PLAYER.VIDEO_ID;
		        this._videoName = Configuration.PLAYER.VIDEO_NAME;
		        this._streamType = AssetType.ASSET_TYPE_VOD;
	
		        this._videoLoaded = false;
	
		        this._videoInfo = null;
		        this._adBreakInfo = null;
		        this._adInfo = null;
		        this._chapterInfo = null;
	
		        // Build a static/hard-coded QoS info here.
		        this._qosInfo = new QoSInfo();
		        this._qosInfo.bitrate = parseInt(adobe_video_information["bitrate"]);
		        this._qosInfo.fps = parseInt(adobe_video_information["fps"]);
		        this._qosInfo.droppedFrames = parseInt(adobe_video_information["droppedframes"]);
	
		        this._clock = null;
	
		        this.$el = isitetv_jq('#' + id);
	
		        var self = this;
		        if (this.$el) {
		            this.$el.on('play', function() {
		                self._onPlay();
		            });
		            this.$el.on('seeking', function() {
		                self._onSeekStart();
		            });
		            this.$el.on('seeked', function() {
		                self._onSeekComplete();
		            });
		            this.$el.on('pause', function() {
		                self._onPause();
		            });
		            this.$el.on('ended', function() {
		                self._onComplete();
		            });
		        }
		    }
	
		    VideoPlayer.prototype.getVideoInfo = function() {
		        if (this._adInfo) { // During ad playback the main video playhead remains
		            // constant at where it was when the ad started
		            this._videoInfo.playhead = AD_START_POS;
		        } else {
		            var vTime = this.getPlayhead();
		            this._videoInfo.playhead = (vTime < AD_START_POS) ? vTime : vTime - AD_LENGTH;
		        }
	
		        return this._videoInfo;
		    };
	
		    VideoPlayer.prototype.getAdBreakInfo = function() {
		        return this._adBreakInfo;
		    };
	
		    VideoPlayer.prototype.getAdInfo = function() {
		        return this._adInfo;
		    };
	
		    VideoPlayer.prototype.getChapterInfo = function() {
		        return this._chapterInfo;
		    };
	
		    VideoPlayer.prototype.getQoSInfo = function() {
		        return this._qosInfo;
		    };
	
		    VideoPlayer.prototype.getDuration = function() {
		        //return this.$el.get(0).duration - AD_LENGTH;
		        return parseFloat(this.$el.attr('duration')) - AD_LENGTH;
		    };
	
		    VideoPlayer.prototype.getPlayhead = function() {
		        //return this.$el.get(0).currentTime;
		    	var t1 = parseFloat(this.$el.attr('currenttime'));
		    	var t2 = parseFloat(isitetv_jq('#' + adobe_video_information['video_player_id']).attr('currentTime'));
		    	if(t1 > t2){
		    		return t1;
		    	}else{
		    		return t2;
		    	}
		    };
	
		    VideoPlayer.prototype._onPlay = function(e) {
		        this._openVideoIfNecessary();
		        NotificationCenter().dispatchEvent(PlayerEvent.PLAY);
		    };
	
		    VideoPlayer.prototype._onPause = function(e) {
		        NotificationCenter().dispatchEvent(PlayerEvent.PAUSE);
		    };
	
		    VideoPlayer.prototype._onSeekStart = function(e) {
		        this._openVideoIfNecessary();
		        NotificationCenter().dispatchEvent(PlayerEvent.SEEK_START);
		    };
	
		    VideoPlayer.prototype._onSeekComplete = function(e) {
		        this._doPostSeekComputations();
		        NotificationCenter().dispatchEvent(PlayerEvent.SEEK_COMPLETE);
		    };
	
		    VideoPlayer.prototype._onComplete = function(e) {
		        this._completeVideo();
		    };
	
		    VideoPlayer.prototype._openVideoIfNecessary = function() {
		        if (!this._videoLoaded) {
		            this._resetInternalState();
	
		            this._startVideo();
	
		            // Start the monitor timer.
		            var self = this;
		            this._clock = setInterval(function() {
		                self._onTick();
		            }, MONITOR_TIMER_INTERVAL);
		        }
		    };
	
		    VideoPlayer.prototype._completeVideo = function() {
		        if (this._videoLoaded) {
		            // Complete the second chapter
		            this._completeChapter();
	
		            NotificationCenter().dispatchEvent(PlayerEvent.COMPLETE);
	
		            this._unloadVideo();
		        }
		    };
	
		    VideoPlayer.prototype._unloadVideo = function() {
		        NotificationCenter().dispatchEvent(PlayerEvent.VIDEO_UNLOAD);
		        clearInterval(this._clock);
	
		        this._resetInternalState();
		    };
	
		    VideoPlayer.prototype._resetInternalState = function() {
		        this._videoLoaded = false;
		        this._clock = null;
		    };
	
		    VideoPlayer.prototype._startVideo = function() {
		        // Prepare the main video info.
		        this._videoInfo = new VideoInfo();
		        this._videoInfo.id = this._videoId;
		        this._videoInfo.name = this._videoName;
		        this._videoInfo.playerName = this._playerName;
		        this._videoInfo.length = this.getDuration();
		        this._videoInfo.streamType = this._streamType;
		        this._videoInfo.playhead = this.getPlayhead();
	
		        this._videoLoaded = true;
	
		        NotificationCenter().dispatchEvent(PlayerEvent.VIDEO_LOAD);
		    };
	
		    VideoPlayer.prototype._startChapter1 = function() {
		        // Prepare the chapter info.
		        this._chapterInfo = new ChapterInfo();
		        this._chapterInfo.length = CHAPTER1_LENGTH;
		        this._chapterInfo.startTime = CHAPTER1_START_POS;
		        this._chapterInfo.position = 1;
		        this._chapterInfo.name = "First chapter";
	
		        NotificationCenter().dispatchEvent(PlayerEvent.CHAPTER_START);
		    };
	
		    VideoPlayer.prototype._startChapter2 = function() {
		        // Prepare the chapter info.
		        this._chapterInfo = new ChapterInfo();
		        this._chapterInfo.length = CHAPTER2_LENGTH;
		        this._chapterInfo.startTime = CHAPTER2_START_POS;
		        this._chapterInfo.position = 2;
		        this._chapterInfo.name = "Second chapter";
	
		        NotificationCenter().dispatchEvent(PlayerEvent.CHAPTER_START);
		    };
	
		    VideoPlayer.prototype._completeChapter = function() {
		        // Reset the chapter info.
		        this._chapterInfo = null;
	
		        NotificationCenter().dispatchEvent(PlayerEvent.CHAPTER_COMPLETE);
		    };
	
		    VideoPlayer.prototype._startAd = function() {
		        // Prepare the ad break info.
		        this._adBreakInfo = new AdBreakInfo();
		        this._adBreakInfo.name = "First Ad-Break";
		        this._adBreakInfo.position = 1;
		        this._adBreakInfo.playerName = this._playerName;
		        this._adBreakInfo.startTime = AD_START_POS;
	
		        // Prepare the ad info.
		        this._adInfo = new AdInfo();
		        this._adInfo.id = "001";
		        this._adInfo.name = "Sample ad";
		        this._adInfo.length = AD_LENGTH;
		        this._adInfo.position = 1;
	
		        // Start the ad.
		        NotificationCenter().dispatchEvent(PlayerEvent.AD_START);
		    };
	
		    VideoPlayer.prototype._completeAd = function() {
		        // Complete the ad.
		        NotificationCenter().dispatchEvent(PlayerEvent.AD_COMPLETE);
	
		        // Clear the ad and ad-break info.
		        this._adInfo = null;
		        this._adBreakInfo = null;
		    };
	
		    VideoPlayer.prototype._doPostSeekComputations = function() {
		        var vTime = this.getPlayhead();
	
		        // Seek inside the first chapter.
		        if (vTime < CHAPTER1_START_POS) {
		            // If we were not inside the first chapter before, trigger a chapter start
		            if (!this._chapterInfo || this._chapterInfo.position != 1) {
		                this._startChapter1();
	
		                // If we were in the ad, clear the ad and ad-break info, but don't send the AD_COMPLETE event.
		                if (this._adInfo) {
		                    this._adInfo = null;
		                    this._adBreakInfo = null;
		                }
		            }
		        }
	
		        // Seek inside the ad.
		        else if (vTime >= AD_START_POS && vTime < AD_END_POS) {
		            // If we were not inside the ad before, trigger an ad-start
		            if (!this._adInfo) {
		                this._startAd();
	
		                // Also, clear the chapter info, without sending the CHAPTER_COMPLETE event.
		                this._chapterInfo = null;
		            }
		        }
	
		        // Seek inside the second chapter.
		        else {
		            // If we were not inside the 2nd chapter before, trigger a chapter start
		            if (!this._chapterInfo || this._chapterInfo.position != 2) {
		                this._startChapter2();
	
		                // If we were in the ad, clear the ad and ad-break info, but don't send the AD_COMPLETE event.
		                if (this._adInfo) {
		                    this._adInfo = null;
		                    this._adBreakInfo = null;
		                }
		            }
		        }
		    };
	
		    VideoPlayer.prototype._onTick = function() {
		        if (this.$el.get(0).seeking || this.$el.get(0).paused) {
		            return;
		        }
	
		        var vTime = this.getPlayhead();
	
		        // If we're inside the ad content:
		        if (vTime >= AD_START_POS && vTime < AD_END_POS) {
		            if (this._chapterInfo) {
		                // If we were inside a chapter, complete it.
		                this._completeChapter();
		            }
	
		            if (!this._adInfo) {
		                // Start the ad (if not already started).
		                this._startAd();
		            }
		        }
	
		        // Otherwise, we're outside the ad content:
		        else {
		            if (this._adInfo) {
		                // Complete the ad (if needed).
		                this._completeAd();
		            }
	
		            if (vTime < CHAPTER1_END_POS) {
		                if (this._chapterInfo && this._chapterInfo.position != 1) {
		                    // If we were inside another chapter, complete it.
		                    this._completeChapter();
		                }
	
		                if (!this._chapterInfo) {
		                    // Start the first chapter.
		                    this._startChapter1();
		                }
		            } else {
		                if (this._chapterInfo && this._chapterInfo.position != 2) {
		                    // If we were inside another chapter, complete it.
		                    this._completeChapter();
		                }
	
		                if (!this._chapterInfo) {
		                    // Start the second chapter.
		                    this._startChapter2();
		                }
		            }
		        }
		    };
	
		    // Export symbols.
		    window.PlayerEvent = PlayerEvent;
		    window.VideoPlayer = VideoPlayer;
		})();
		
	}

	//heartbeat delegate
	function adobe_do_heartbeat_delegate(){
			
		(function() {
		    'use strict';
	
		    if(adobe_video_information["consolelog"] == "Y"){
		    	console.log('scripts adobe5 app analytics sample.video.heartbeat.delegate.js');
		    }
	
		    var HeartbeatDelegate = ADB.va.HeartbeatDelegate;
	
		    isitetv_jq.extend(SampleHeartbeatDelegate.prototype, HeartbeatDelegate.prototype);
	
		    function SampleHeartbeatDelegate() {
		    }
	
		    SampleHeartbeatDelegate.prototype.onError = function(errorInfo) {
		        console.log("Heartbeat error: " + errorInfo.getMessage() + " | " + errorInfo.getDetails());
		    };
	
		    // Export symbols.
		    window.SampleHeartbeatDelegate = SampleHeartbeatDelegate;
		})();
		
	}
	
	//heartbeat plugin delegate
	function adobe_do_heartbeat_plugin_delegate(){
			
		(function() {
		    'use strict';
	
		    if(adobe_video_information["consolelog"] == "Y"){
		    	console.log('scripts adobe5 app analytics sample.adobe.heartbeat.plugin.delegate.js');
		    }
	
		    var AdobeHeartbeatPluginDelegate = ADB.va.plugins.ah.AdobeHeartbeatPluginDelegate;
	
		    isitetv_jq.extend(SampleAdobeHeartbeatPluginDelegate.prototype, AdobeHeartbeatPluginDelegate.prototype);
	
		    function SampleAdobeHeartbeatPluginDelegate() {
		    }
	
		    SampleAdobeHeartbeatPluginDelegate.prototype.onError = function(errorInfo) {
		        console.log("AdobeHeartbeatPlugin error: " + errorInfo.getMessage() + " | " + errorInfo.getDetails());
		    };
	
		    // Export symbols.
		    window.SampleAdobeHeartbeatPluginDelegate = SampleAdobeHeartbeatPluginDelegate;
		})();
		
	}


	//adobe analysis
	function adobe_do_adobe_analysis(){
			
		(function() {
		    'use strict';
	
		    if(adobe_video_information["consolelog"] == "Y"){
		    	console.log('scripts adobe5 app analytics sample.adobe.analytics.plugin.delegate.js');
		    }
	
		    var AdobeAnalyticsPluginDelegate = ADB.va.plugins.aa.AdobeAnalyticsPluginDelegate;
	
		    isitetv_jq.extend(SampleAdobeAnalyticsPluginDelegate.prototype, AdobeAnalyticsPluginDelegate.prototype);
	
		    function SampleAdobeAnalyticsPluginDelegate() {
		    }
	
		    SampleAdobeAnalyticsPluginDelegate.prototype.onError = function(errorInfo) {
		        console.log("AdobeAnalyticsPlugin error: " + errorInfo.getMessage() + " | " + errorInfo.getDetails());
		    };
	
		    // Export symbols.
		    window.SampleAdobeAnalyticsPluginDelegate = SampleAdobeAnalyticsPluginDelegate;
		})();
		
	}
		
	//video player plugin
	function adobe_do_video_player_plugin(){
			
		(function() {
		    'use strict';
	
		    if(adobe_video_information["consolelog"] == "Y"){
		    	console.log('scripts adobe5 app analytics sample.video.player.plugin.delegate.js');
		    }
	
		    var VideoPlayerPluginDelegate = ADB.va.plugins.videoplayer.VideoPlayerPluginDelegate;
	
		    isitetv_jq.extend(SampleVideoPlayerPluginDelegate.prototype, VideoPlayerPluginDelegate.prototype);
	
		    function SampleVideoPlayerPluginDelegate(player) {
		        this._player = player;
		    }
	
		    SampleVideoPlayerPluginDelegate.prototype.getVideoInfo = function() {
		        return this._player.getVideoInfo();
		    };
	
		    SampleVideoPlayerPluginDelegate.prototype.getAdBreakInfo = function() {
		        return this._player.getAdBreakInfo();
		    };
	
		    SampleVideoPlayerPluginDelegate.prototype.getAdInfo = function() {
		        return this._player.getAdInfo();
		    };
	
		    SampleVideoPlayerPluginDelegate.prototype.getChapterInfo = function() {
		        return this._player.getChapterInfo();
		    };
	
		    SampleVideoPlayerPluginDelegate.prototype.getQoSInfo = function() {
		        return this._player.getQoSInfo();
		    };
	
		    // Export symbols.
		    window.SampleVideoPlayerPluginDelegate = SampleVideoPlayerPluginDelegate;
		})();
		
	}
	
	//video analysis provider
	function adobe_do_analysis_provider(){
			
		(function() {
		    'use strict';
		    
		    if(adobe_video_information["consolelog"] == "Y"){
		    	console.log('scripts adobe5 app analytics video.analytics.provider.js');
		    }
	
		    var Heartbeat = ADB.va.Heartbeat;
		    var HeartbeatConfig = ADB.va.HeartbeatConfig;
	
		    var VideoPlayerPlugin = ADB.va.plugins.videoplayer.VideoPlayerPlugin;
		    var VideoPlayerPluginConfig = ADB.va.plugins.videoplayer.VideoPlayerPluginConfig;
	
		    var AdobeAnalyticsPlugin = ADB.va.plugins.aa.AdobeAnalyticsPlugin;
		    var AdobeAnalyticsPluginConfig = ADB.va.plugins.aa.AdobeAnalyticsPluginConfig;
	
		    var AdobeHeartbeatPlugin = ADB.va.plugins.ah.AdobeHeartbeatPlugin;
		    var AdobeHeartbeatPluginConfig = ADB.va.plugins.ah.AdobeHeartbeatPluginConfig;
	
	
		    function VideoAnalyticsProvider(player) {
		        if (!player) {
		            throw new Error("Illegal argument. Player reference cannot be null.")
		        }
		        this._player = player;
	
		        // Set-up the Visitor and AppMeasurement instances.
		        var visitor = new Visitor(Configuration.VISITOR.MARKETING_CLOUD_ORG_ID);
		        visitor.trackingServer = Configuration.VISITOR.TRACKING_SERVER;
	
		        // Set-up the AppMeasurement component.
		        var appMeasurement = new AppMeasurement();
		        appMeasurement.visitor = visitor;
		        appMeasurement.trackingServer = Configuration.APP_MEASUREMENT.TRACKING_SERVER;
		        appMeasurement.account = Configuration.APP_MEASUREMENT.RSID;
		        appMeasurement.pageName = Configuration.APP_MEASUREMENT.PAGE_NAME;
		        appMeasurement.charSet = "UTF-8";
		        //appMeasurement.visitorID = adobe_video_information['visitor_id'];
	
		        // Setup the video-player plugin
		        this._playerPlugin = new VideoPlayerPlugin(new SampleVideoPlayerPluginDelegate(this._player));
		        var playerPluginConfig = new VideoPlayerPluginConfig();
		        playerPluginConfig.debugLogging = true; // set this to false for production apps.
		        this._playerPlugin.configure(playerPluginConfig);
	
		        // Setup the AppMeasurement plugin.
		        this._aaPlugin = new AdobeAnalyticsPlugin(appMeasurement, new SampleAdobeAnalyticsPluginDelegate());
		        var aaPluginConfig = new AdobeAnalyticsPluginConfig();
		        aaPluginConfig.channel = Configuration.HEARTBEAT.CHANNEL;
		        aaPluginConfig.debugLogging = true; // set this to false for production apps.
		        this._aaPlugin.configure(aaPluginConfig);
	
		        // Setup the AdobeHeartbeat plugin.
		        var ahPlugin = new AdobeHeartbeatPlugin(new SampleAdobeHeartbeatPluginDelegate());
		        var ahPluginConfig = new AdobeHeartbeatPluginConfig(
		            Configuration.HEARTBEAT.TRACKING_SERVER,
		            Configuration.HEARTBEAT.PUBLISHER);
		        ahPluginConfig.ovp = Configuration.HEARTBEAT.OVP;
		        ahPluginConfig.sdk = Configuration.HEARTBEAT.SDK;
		        ahPluginConfig.debugLogging = true; // set this to false for production apps.
		        ahPlugin.configure(ahPluginConfig);
	
		        var plugins = [this._playerPlugin, this._aaPlugin, ahPlugin];
	
		        // Setup and configure the Heartbeat lib.
		        this._heartbeat = new Heartbeat(new SampleHeartbeatDelegate(), plugins);
		        var configData = new HeartbeatConfig();
		        configData.debugLogging = true; // set this to false for production apps.
		        this._heartbeat.configure(configData);
	
		        this._installEventListeners();
		    }
	
		    VideoAnalyticsProvider.prototype.destroy = function() {
		        if (this._player) {
		            this._heartbeat.destroy();
		            this._heartbeat = null;
	
		            this._uninstallEventListeners();
		            this._player = null;
		        }
		    };

	
		    /////////
		    // Notification handlers
		    /////////
	
		    VideoAnalyticsProvider.prototype._onLoad = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: VIDEO_LOAD');
		    	}
		        this._aaPlugin.setVideoMetadata(
		        	adobe_video_information['metadata']
		        );
		        this._playerPlugin.trackVideoLoad();
		    };
	
		    VideoAnalyticsProvider.prototype._onUnload = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: VIDEO_UNLOAD');
		    	}
		        this._playerPlugin.trackVideoUnload();
		    };
	
		    VideoAnalyticsProvider.prototype._onPlay = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: PLAY');
		    	}
		        this._playerPlugin.trackPlay();
		    };
	
		    VideoAnalyticsProvider.prototype._onPause = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: PAUSE');
		    	}
		        this._playerPlugin.trackPause();
		    };
	
		    VideoAnalyticsProvider.prototype._onSeekStart = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: SEEK_START');
		    	}
		        this._playerPlugin.trackSeekStart();
		    };
	
		    VideoAnalyticsProvider.prototype._onSeekComplete = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: SEEK_COMPLETE');
		    	}
		        this._playerPlugin.trackSeekComplete();
		    };
	
		    VideoAnalyticsProvider.prototype._onBufferStart = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: BUFFER_START');
		    	}
		        this._playerPlugin.trackBufferStart();
		    };
	
		    VideoAnalyticsProvider.prototype._onBufferComplete = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: BUFFER_COMPLETE');
		    	}
		        this._playerPlugin.trackBufferComplete();
		    };
	
		    VideoAnalyticsProvider.prototype._onAdStart = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: AD_START');
		    	}
		        this._aaPlugin.setAdMetadata({
		            affiliate: "Sample affiliate",
		            campaign: "Sample ad campaign"
		        });
		        this._playerPlugin.trackAdStart();
		    };
	
		    VideoAnalyticsProvider.prototype._onAdComplete = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: AD_COMPLETE');
		    	}
		        this._playerPlugin.trackAdComplete();
		    };
	
		    VideoAnalyticsProvider.prototype._onChapterStart = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: CHAPTER_START');
		    	}
		        this._aaPlugin.setChapterMetadata({
		            segmentType: "Sample segment type"
		        });
		        this._playerPlugin.trackChapterStart();
		    };
	
		    VideoAnalyticsProvider.prototype._onChapterComplete = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: CHAPTER_COMPLETE');
		    	}
		        this._playerPlugin.trackChapterComplete();
		    };
	
		    VideoAnalyticsProvider.prototype._onComplete = function() {
		    	if(adobe_video_information["consolelog"] == "Y"){
		    		console.log('Player event: COMPLETE');
		    	}
		        this._playerPlugin.trackComplete(function() {
		        	if(adobe_video_information["consolelog"] == "Y"){
		        		console.log("The completion of the content has been tracked.");
		        	}
		        });
		    };
	
	
		    /////////
		    // Private helper functions
		    /////////
	
		    VideoAnalyticsProvider.prototype._installEventListeners = function() {
		        // We register as observers to various VideoPlayer events.
		        NotificationCenter().addEventListener(PlayerEvent.VIDEO_LOAD, this._onLoad, this);
		        NotificationCenter().addEventListener(PlayerEvent.VIDEO_UNLOAD, this._onUnload, this);
		        NotificationCenter().addEventListener(PlayerEvent.PLAY, this._onPlay, this);
		        NotificationCenter().addEventListener(PlayerEvent.PAUSE, this._onPause, this);
		        NotificationCenter().addEventListener(PlayerEvent.SEEK_START, this._onSeekStart, this);
		        NotificationCenter().addEventListener(PlayerEvent.SEEK_COMPLETE, this._onSeekComplete, this);
		        NotificationCenter().addEventListener(PlayerEvent.BUFFER_START, this._onBufferStart, this);
		        NotificationCenter().addEventListener(PlayerEvent.BUFFER_COMPLETE, this._onBufferComplete, this);
		        NotificationCenter().addEventListener(PlayerEvent.AD_START, this._onAdStart, this);
		        NotificationCenter().addEventListener(PlayerEvent.AD_COMPLETE, this._onAdComplete, this);
		        NotificationCenter().addEventListener(PlayerEvent.CHAPTER_START, this._onChapterStart, this);
		        NotificationCenter().addEventListener(PlayerEvent.CHAPTER_COMPLETE, this._onChapterComplete, this);
		        NotificationCenter().addEventListener(PlayerEvent.COMPLETE, this._onComplete, this);
		    };
	
		    VideoAnalyticsProvider.prototype._uninstallEventListeners = function() {
		        // We register as observers to various VideoPlayer events.
		        NotificationCenter().removeEventListener(PlayerEvent.VIDEO_LOAD, this._onLoad, this);
		        NotificationCenter().removeEventListener(PlayerEvent.VIDEO_UNLOAD, this._onUnload, this);
		        NotificationCenter().removeEventListener(PlayerEvent.PLAY, this._onPlay, this);
		        NotificationCenter().removeEventListener(PlayerEvent.PAUSE, this._onPause, this);
		        NotificationCenter().removeEventListener(PlayerEvent.SEEK_START, this._onSeekStart, this);
		        NotificationCenter().removeEventListener(PlayerEvent.SEEK_COMPLETE, this._onSeekComplete, this);
		        NotificationCenter().removeEventListener(PlayerEvent.BUFFER_START, this._onBufferStart, this);
		        NotificationCenter().removeEventListener(PlayerEvent.BUFFER_COMPLETE, this._onBufferComplete, this);
		        NotificationCenter().removeEventListener(PlayerEvent.AD_START, this._onAdStart, this);
		        NotificationCenter().removeEventListener(PlayerEvent.AD_COMPLETE, this._onAdComplete, this);
		        NotificationCenter().removeEventListener(PlayerEvent.CHAPTER_START, this._onChapterStart, this);
		        NotificationCenter().removeEventListener(PlayerEvent.CHAPTER_COMPLETE, this._onChapterComplete, this);
		        NotificationCenter().removeEventListener(PlayerEvent.COMPLETE, this._onComplete, this);
		    };
	
		    // Export symbols.
		    window.VideoAnalyticsProvider = VideoAnalyticsProvider;
		})();
		
	}

	var videoPlayer;
	var analyticsProvider;

	function adobe_video_main(){
		
		adobe_do_notification();
		adobe_do_config();
		adobe_do_video();
		adobe_do_heartbeat_delegate();
		adobe_do_heartbeat_plugin_delegate();
		adobe_do_adobe_analysis();
		adobe_do_video_player_plugin();
		adobe_do_analysis_provider();
		
	
		if(adobe_video_information["consolelog"] == "Y"){
			console.log('scripts adobe5 main.js ' + adobe_video_information['video_player_id']);
		}
	
	    // Create the VideoPlayer.
	    videoPlayer = new VideoPlayer(adobe_video_information['video_player_id']);
	
	    // Create the AnalyticsProvider instance and attach it to the VideoPlayer instance.
	    analyticsProvider = new VideoAnalyticsProvider(videoPlayer);
	
	    // Setup the ad label.
	    NotificationCenter().addEventListener(PlayerEvent.AD_START, onEnterAd);
	    NotificationCenter().addEventListener(PlayerEvent.AD_COMPLETE, onExitAd);
	    NotificationCenter().addEventListener(PlayerEvent.SEEK_COMPLETE, onSeekComplete);
	    NotificationCenter().addEventListener(PlayerEvent.VIDEO_UNLOAD, onExitAd);
	
	}

    function onEnterAd() {
        isitetv_jq('#pub-label').show();
    }

    function onExitAd() {
        isitetv_jq('#pub-label').hide();
    }

    function onSeekComplete() {
        if (!videoPlayer.getAdInfo()) {
            // The user seeked outside the ad.
            onExitAd();
        }
    }
    
    function adobe_kill_logging(){
    	
    	analyticsProvider = null;
    	videoPlayer       = null;
    	
    }
    
    
    
