var browser = navigator.userAgent;
var isFirefox = browser.search('Firefox') != -1;
var isMac = browser.search('Mac') != -1;
var isIE7 = browser.search('MSIE 7') != -1;
var isIE8 = browser.search('MSIE 8') != -1;
var isAndroid = browser.search('Android') != -1;
var isIE = browser.search('MSIE') != -1;

var isIphone = browser.search('iPhone') != -1;
var isIpad = browser.search('iPad') != -1;
var isIpod = browser.search('iPod') != -1;

var isIOS = isIpod || isIpad || isIphone;

var isOpera = browser.search('Opera') != -1;
var isPaused = true;
var mediaTotal = 0;
var sponsorUpdate = null;
var vusecastObj = null;
var curMediaStartTime = 0;
var isWP = browser.search('Windows Phone') != -1;
var id = null;
var isPhone = false;
var mediaPlayer = null;
var isLive = false;
var curVid = null;



//function loadEngine(valid,i){ if(valid){window.history.replaceState('Object', 'Title', "/");  id=i; } }

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-58303861-1', 'auto');
ga('send', 'pageview');


function go(i){

	init(i);
	id=i;
	/*if(valid){
		var storedId = getCookie(i);
		var curId = storedId ? storedId : i;
	} else if (!valid && i){
		setCookie(i,i,365);
	}*/

}
//Add cookie check and base the cookie on id
function set(i){  if(supports_history_api()) { /*window.history.replaceState('Object', 'Title',i == 'invalid' ? '/' : '/play/?i='+i);*/}}
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function supports_history_api() {
  return !!(window.history && history.pushState);
}

function showPreroll(preroll,video){
	//alert('showPreroll');
	//curVid = video;
	//$('vjs-controls').hide();

	//var preroll = 'sandysprings1'; //HARD OVERRIDE = REMOVE LATER

	//alert(mediaPlayer);
	//If on Windows Phone or Flash, do not play preroll because the following event will not fire..

	//if(!isIE7 || !isIE8 || !isWP){mediaPlayer.addEvent("ended", preRollEnded)};
	var debugisWP = false;

	var media;
	if(isWP || isIE7 || isIE8){
		media = video;

	}else if(debugisWP){
		media = preroll;
		mediaPlayer.addEvent("ended", function(){{preRollEnded(video)}});
	}else{
		media = preroll;
		mediaPlayer.addEvent("ended", function(){{preRollEnded(video)}});
	}

	playVideo(media);

}


function preRollEnded(curVid){
	//alert('preroll ended' + file);
	//curMediaStartTime = 50;
	mediaPlayer.removeEvent("ended", preRollEnded);
	playVideo(curVid);
}


function showAd(index,title){

	   //playVideo(title);

		$.each($(vusecastObj).find("topSponsors sponsor"), function(i, value) {
		 // alert(i);
		  if(index == i){
			var sponsorImg = $(this).attr("image");
			var sponsorLink = $(this).attr("link");
			var sponsorStartDate = $(this).attr("startDate");
			var sponsorEndDate = $(this).attr("endDate");
			var sponsorPreroll = $(this).attr("preroll");
			//alert("sponsorImg: " + sponsorStartDate);
			var sponsorMediaStartTime;
			//var sponsorPreroll = true;

			showSponsor = sponsorCheck(sponsorStartDate,sponsorEndDate);

			if(sponsorPreroll && showSponsor){
				showPreroll(sponsorPreroll,title);
			}else{
				//curMediaStartTime = 100;
				playVideo(title); //curMediaStartTime
			}



			if(sponsorImg){


				//showSponsor = sponsorCheck('2013-1-6','2013-3-21');;

				if(showSponsor){

					//alert('show sponsor');

					$('.sponsor').show();
					$('.sponsor').css('background-image','url('+sponsorImg+')');

					$('.sponsor').bind('click', function() {

			   	    	/*if(confirm('Format the hard disk?')){
				   	    	win = window.open(sponsorLink, 'sponsor');
				   	    	win.focus();
				   	    }else{return;}
			   	    	*/
			   	    	win = window.open(sponsorLink, 'sponsor');
				   	    win.focus();
			   	   });

				}else{
					//alert('hide sponsor');
					$('.sponsor').unbind();
					$('.sponsor').hide();
					$('.sponsor').css('background-image','none');
				};




		   	}else{
					//alert('hide sponsor');
					$('.sponsor').unbind();
					$('.sponsor').hide();
					$('.sponsor').css('background-image','none');
				};



		  }

		});




}




$(document).ready(function() {

	/*$('.vjs-loading-spinner').append('<i class="fa fa-spinner"></i>')*/

	if(isIphone){$('.vjs-loading-spinner').css('background','none')};



	//if(isIphone){/*$('#video').css('width','1px');*/}
	$('.sponsor').hide();
	showMenu();
    if(isAndroid || isIE || isOpera){$(".vjs-fullscreen-control").hide();}
    //alert('ready');

    if(isIE7 || isIE8){$('#flash').show();}else{$('#flash').hide();}
    isPhone = $(window).width() < 500;
    setHeight();
    //alert($(window).width());
    //alert("isPhone: " + isPhone);

    if(isPhone){

    $('.vjs-fullscreen-control').css("display","none");
    $('.vjs-fullscreen-control').css("width",0);
     //alert($('.sponsor'));
	    if($('.sponsor')){
	    	$('.sponsor').css("position","relative");
	    	$('.sponsor').css("left",0);
	    	$('.sponsor').css("top",0);
		}
	}

    $(window).resize(function() {
    	setHeight();
  	});

  	$(document).bind("contextmenu",function(e){
              return false;
       });


   $(function() {
	   $(window).keypress(function(key) {

	       switch(key.which){

		       case 32:
		       if(mediaPlayer){if(isPaused){isPaused = false;mediaPlayer.play()}else{isPaused = true;mediaPlayer.pause()};};
		       break;

		       case 109:
		       if($("#menu-container").is(":visible")){hideMenu();}else{showMenu()}
		       break;

		       case 102:
		       if(!isIE && !isOpera){mediaPlayer.requestFullScreen();}
		       break;

		       default:

	       }


	   });
	});


    });

    	if(!isIE7 && !isIE8){mediaPlayer = _V_("video")}else{mediaPlayer = null};

	     // var mediaPlayer = _V_("video", { " controlsHiding": false, "controlsHideInit": false, "preload": "auto" });

	   function setHeight(){
	  	var height = ($(window).height())-72;
	  	$("#menu-container").height(isPhone == true ? 'auto' : height-48);
	  	if(isIE8 || isIE7){$("#flash").height(height+2)}else{mediaPlayer.height(height+8);}
  	}


	function showMenu(){
		if(isIphone){$('#video').css('width','1px'); }
		//if(mediaPlayer){};

		$('#menu-btn').css({ opacity: 1 });
		$("#menu-container").fadeIn();
		if(mediaPlayer){mediaPlayer.pause();}
	}

	function hideMenu(){
		if(isIphone){ $('#video').css('width','100%');}
	    $('#menu-btn').css({ opacity: 0.5 });
		$("#menu-container").fadeOut();
	}


	function toggleMenu(){
		hideLoader();
		if(!$("#menu-container").is(":visible")){showMenu();}else{hideMenu();}
		if(mediaPlayer){isPaused = true;mediaPlayer.pause();}else{var player = document.getElementById('flash');}
	}

	function pausePlayer(){
		if(mediaPlayer){mediaPlayer.pause();}
	}

	function setMedia(data){

		vusecastObj = data;

		$(data).find("impactshot").each(function(){
			var id = $(this).attr("id");
			var googleID = $(this).attr("googID");
			var poweredBy = $(this).attr("poweredBy");
			var poweredByURL = $(this).attr("poweredByURL");
		});

		mediaTotal = ($(data).find("video").length) - 1;

		$(data).find("video").each(function(i){
			var trackId = $(this).attr("googId");
			var videoMediaDirectory = $(this).attr("mediaDirectory");
			var videoName = $(this).attr("videoName");
			var videoTitle = $(this).attr("title");
			var videoDesc = $(this).attr("desc");
			var videoTitle = $(this).attr("title");
			var videoDuration = $(this).attr("dur");


			//videoName = 'liveDemo'; //Live override !!!!!!!!!!!!!!!!!!!!!!!!!
			//videoName = 'Miami40yd002'; //override !!!!!!!!!!!!!!!!!!!!!!!!!
			//videoName = 'Askthetoughquestions'; //override !!!!!!!!!!!!!!!!!!!!!!!!!
			//videoName = '_30_Minute_Arm_Blast_FLEXDEM_TV_'; //override !!!!!!!!!!!!!!!!!!!!!!!!!
			//videoName = "chiplive";

			//alert($("#menu-container ul"));
			var duration = videoDuration==''?"hidden":"visible";

			$("#menu-container ul").append('<li id="'+i+'" style="border:1px solid #666;background-size:95%;background:no-repeat url(https://zreg9s.cloud.influxis.com/Thumbnails/'+videoName+'_screen_5.png);" title='+videoName+' class="false"><div style="background:url(img/play.png) no-repeat; background-size:77%; width:240px; left:55px;   height:140px; position:relative;"></div><div id="mediaDuration" style="visibility:'+duration+'">'+videoDuration+'</div><div style="font-family:\'Roboto\';font-size:15px; text-align:left; position:relative;top:-25px; padding:2px; background:#000">'+videoTitle+'</div></li>');

		});


		/*$('#menu-container li').bind('click', function() {
		   	   //playVideo(this.title,this.class);
		   	   showAd(this.id,this.title);
		});
		*/

		$('#menu-container li').on( "click", function(){
	        showAd(this.id,this.title);
		});


		$('#menu-btn').bind('mouseover', function() {
		   	  $('#menu-btn').css({ opacity: 1 });
		});

		$('#menu-btn').bind('mouseout', function() {
		   	  if(!$("#menu-container").is(":visible")){$('#menu-btn').css({ opacity: 0.5 });}
		});


		/*$('.vjs-seek-handle').bind("touchmove", function(ev){
			ev.preventDefault();
    	});
    	*/

    	$('.vjs-seek-handle').bind("mouseup", function(ev){
    		//ev.preventDefault();
			if(isIE){mediaPlayer.play();}
			//setTimeout(hideTime,2000);

    	});

    	$('.vjs-seek-handle').bind("mouseout", function(ev){
    		//setTimeout(hideTime,2000);
    	});

    	$('.vjs-seek-handle').bind("mousedown", function(ev){

    		//showTime();

    	});



   	    $("#video").show();
   	     //$("#video").attr('poster','http://philhuffstickler.com/media/img/aia.jpg');
   	      //MPMovieControlStyleNone

   	    if(isIE){$("#video").css('width','100%')};

   	    if(mediaTotal == 0){
   	    	 autoPlay();

   	    };
	};


	function autoPlay(){

		if(isIphone){
			setTimeout(function(){
				$('#menu-container li').trigger("click");
			},2000);

		}else if(isIpad){

		}else{
			//playVideo($('#menu-container li')[0].title);
			$('#menu-container li').trigger("click");
		}


		$('#menu-btn').hide();
	}

	function sponsorCheck(startDate,endDate){

		if (!startDate || !endDate ) { return false};

		var current = new Date().getTime(); //Get Date from php server api !!!!!!!!!!!!!!!!
		//var current = "<?= echo round(microtime(true) * 1000); ?>";
		//alert(current);

		var start = Date.parse(startDate).getTime();
		var end = Date.parse(endDate).getTime();

		var hasSponsorStarted = current > start;
		var hasSponsorEnded = current > end;

		//alert('hasSponsorStarted ' + hasSponsorStarted);
		//document.getElementById("demo").innerHTML = "Start: <b>" + start + "</b><br /> End: <b>" + end + "</b><br />Current Date: <b>" + current + "</b>";

		if(hasSponsorStarted && !hasSponsorEnded){
			//alert('true');
			return true;
			//show sponsor banner

		}else{
		  //clearInterval(sponsorUpdate);
		  //alert('false');
		  return false;
		  //hide sponsor banner
		}
	}



	function showTime(){/*$('.vjs-current-time-display').fadeIn();*/};
	function hideTime(){$('.vjs-current-time-display').fadeOut('slow');};

	function test(){
		//alert('video ended');
	}

	function onJavaScriptBridgeCreated(id)
	{
	    //alert('test');
	    var player = document.getElementById('flash');
	    player.addEventListener("complete", "test");
	}

    function playVideo(file){ //,live

    var fileType = isFirefox ?'mp4':'mp4';
    var fileSize = isFirefox ? "512" : "1024";

    //var src = 'http://zreg9s.cloud.influxis.com/ManagedContent/'+file+'_'+fileSize+'k.'+fileType;
    var src = 'http://zreg9s.cloud.influxis.com/ManagedContent/'+file+'_h264_768k_480p_aac_96k.'+fileType;
               //http://zreg9s.cloud.influxis.com/ManagedContent/DEMOvideoGEMC768_h264_768k_480p_aac_96k.mp4
    //src = 'http://mobile3.influxis.com:1935/dwjxid776brql33211_live/69_h264aac/playlist.m3u8'; For Live

    if(file != 'undefined'){
     if(!isPhone){hideMenu();}

     if(!isWP && mediaTotal > 0){$("#menu-btn").show();}

     if(isIE7 || isIE8){
	     var params = {bgcolor: "#000000",menu:false,allowfullscreen:true,allowScriptAccess:'always',javascriptCallbackFunction:'onJavaScriptBridgeCreated'};
	     swfobject.embedSWF("http://impactshot.com/play/player.swf?autoPlay=true&src="+src, "flash", '100%', '100%', "9.0.0", "expressInstall.swf","",params);
	     $('#flash').css('height',$(window).height()-65);
	}else{

	 /* if Live and safari then change the source
		  var src = 'http://mobile3.influxis.com:1935/dwjxid776brql33211_'+file+'/'+file+'_h264aac/playlist.m3u8';

		  else if still Live, then embed swf for display only .. keep the controls though.
	 */

	 //isLive = true;
	 if(isLive){src = 'http://mobile3.influxis.com:1935/dwjxid776brql33211_live/'+file+'_h264aac/playlist.m3u8';}

	 //src = 'http://impactshot.com/dev/sponsor.m3u8';
	 //src = 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8';
	 //mediaPlayer.src({ type: "video/m3u", src: src });

     mediaPlayer.src({ type: "video/"+fileType, src: src });


     if(isIOS){
    	//$('#video_html5_api').attr({'autoplay':'true'});
     	document.getElementById('video_html5_api').play();
     	return;
     	}

     //setTimeout(function(){mediaPlayer.currentTime(curMediaStartTime)},2000)

      //mediaPlayer.currentTime(0);

      setTimeout(function(){mediaPlayer.play();mediaPlayer.currentTime(0);  isPaused = false;},1000)
      //mediaPlayer.play();
     //mediaPlayer.currentTime(0);
     //isPaused = false;

      }

     }else{/*no video found*/}
    }

    function playStarted(){



       isPaused = false;
	   hideMenu();
	   hideTime();
	   $('.vjs-loading-spinner').css('visibility','visible');
       hideLoader();
	}

    function onPause(){
    	isPaused = true;
        showTime();
	    $('.vjs-loading-spinner').css('visibility','hidden');

    }

    function onLoadedData(){
    	//alert(curMediaStartTime);
	  mediaPlayer.currentTime(curMediaStartTime);
	  hideLoader();
	  mediaPlayer.addEvent("progress", onProgress);
	}

    function onLoadStart(){

     //alert("onLoadStart");
      //hideLoader();
	}


   function videoEnded(){
      showMenu();
      mediaPlayer.cancelFullScreen();
	}

   function hideLoader(){
	   $(".vjs-loading-spinner").fadeOut();
	   }

    if(!isIE7 && !isIE8){
    mediaPlayer.addEvent("play", playStarted);
    mediaPlayer.addEvent("ended", videoEnded);

   //mediaPlayer.addEvent("loadstart", onLoadStart);
   //mediaPlayer.addEvent("loadedmetadata", onLoadedMetaData);
     mediaPlayer.addEvent("loadeddata", onLoadedData);
     mediaPlayer.addEvent("pause", onPause);
     mediaPlayer.addEvent("error", onMediaError);
     mediaPlayer.addEvent("timeupdate", onTimeUpdate);
    }


	function onMediaError(){setTimeout(hideLoader,200); }

    function onTimeUpdate(){
    //var d = new Date();
    setTimeDisplay();
    //alert('onTimeUpdate');
    //hideLoader();
    //mediaPlayer.play();
    //setTimeout(hideLoader,200);
}

function setTimeDisplay(){
	//$('.vjs-current-time-display').css('left',$('.vjs-seek-handle').css('left'));
}

    function onProgress(){
      //alert('onProgress');
      hideLoader();
    };


    function init(i){
    //alert("init: " + i);
    /*http://impactshot.com/playerNEW2.php?clientid=*/
    $.ajax({
	    type: "GET",
	    url: "http://impactshot.com/dev/db2.php?id="+i,
	    dataType: "xml",
	    success: setMedia
	  });

	 set(i);

	 }
