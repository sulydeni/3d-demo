/*

Name:        isitetv_player_functions.js 
Version:     1.0.0
Description: JavaScript functions used in the iSiteTV player
Author:      Steve Roberts and Susan Buckle

********** */

function log_action(t_asset_list_type_id,t_playlist_tabs_contents_id,t_playlist_tabs_id,t_tab_id,t_video_asset_id,t_asset_id,t_action_code,t_reason,t_asset_title){

	isitetv_jq('#productMedias_replace').data('isitetv_player').log_action(t_asset_list_type_id,t_playlist_tabs_contents_id,t_playlist_tabs_id,t_tab_id,t_video_asset_id,t_asset_id,t_action_code,t_reason,t_asset_title);

}


function log_video_action(t_asset_list_type_id,t_playlist_tabs_contents_id,t_playlist_tabs_id,t_tab_id,video_asset_id,asset_id,timeplayed,perplayed,asset_title,run_time){

	isitetv_jq('#productMedias_replace').data('isitetv_player').log_video_action(t_asset_list_type_id,t_playlist_tabs_contents_id,t_playlist_tabs_id,t_tab_id,video_asset_id,asset_id,timeplayed,perplayed,asset_title,run_time);

}


function log_action_ini(t_id_of_media_div,t_function_to_call,t_asset_list_type_id,t_playlist_tabs_contents_id,t_playlist_tabs_id,t_tab_id,video_asset_id,asset_id,asset_title,run_time){

	isitetv_jq('#productMedias_replace').data('isitetv_player').log_action_ini(t_id_of_media_div,t_function_to_call,t_asset_list_type_id,t_playlist_tabs_contents_id,t_playlist_tabs_id,t_tab_id,video_asset_id,asset_id,asset_title,run_time);

}


function isitetv_view_video_viewed(timeplayed,perplayed){

	isitetv_jq('#productMedias_replace').data('isitetv_player').isitetv_view_video_viewed(timeplayed,perplayed);

}


function videoPlaying(){

	isitetv_jq('#productMedias_replace').data('isitetv_player').videoPlaying();

}


function videoPaused(){

	isitetv_jq('#productMedias_replace').data('isitetv_player').videoPaused();

}


function isitetv_view_video_player_ini(video_player_id){

	isitetv_jq('#productMedias_replace').data('isitetv_player').isitetv_view_video_player_ini(video_player_id);

}


function isitetv_view_video_player_ini_ip(video_player_id){

	isitetv_jq('#productMedias_replace').data('isitetv_player').isitetv_view_video_player_ini_ip(video_player_id);

}


function isitetv_view_video_loop(){

	isitetv_jq('#productMedias_replace').data('isitetv_player').isitetv_view_video_loop();

}


function isitetv_view_video_loop_ip(){

	isitetv_jq('#productMedias_replace').data('isitetv_player').isitetv_view_video_loop_ip();

}


function videoSeeking(){

	isitetv_jq('#productMedias_replace').data('isitetv_player').videoSeeking();

}


function videoSeeked(){

	isitetv_jq('#productMedias_replace').data('isitetv_player').videoSeeked();

}


function popup_video(video_url){

	return isitetv_jq('#productMedias_replace').data('isitetv_player').popup_video(video_url);

}

