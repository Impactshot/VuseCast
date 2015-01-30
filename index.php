<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Vusecast℠</title>
	<link rel="shortcut icon" href="img/favicon.ico" />
	<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
	<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="format-detection" content="telephone=no">
	<meta name="MobileOptimized" content="device-width" />
	<meta name="HandheldFriendly" content="true" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1.0, maximum-scale=1.0">
	<link href="css/styles.css" rel="stylesheet" />
	<link href="css/customstyles.css" rel="stylesheet" />
	<script src="js/modernizr.custom.12080.js"></script>
	<script src="js/jquery-1.7.2.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/video.js"></script>

    <script src="js/date.js"></script>

	<?php /*$browser = $_SERVER['HTTP_USER_AGENT']; if(!stristr($browser, "msie 7")) echo '<script src="js/video.js"></script>';*/ ?>
</head>

<body>
<div id="menu-head">
	<img class="logo" src="img/logo.png" />
	<div id="menu-btn" onclick="javascript:toggleMenu()"><i class="fa fa-th-large"></i></div>
</div>

<div align="center">
	<div class="sponsor"></div>
</div>
	<div id="menu-container"><ul></ul></div>

<video id="video" width="100%" class="media-player media-skin" controls preload="auto" ><div id="flash"></div></video>

<script type="text/javascript" src="js/engine.js"></script>
<script type="text/javascript" src="js/swfobject.js"></script>
<script type="text/javascript">
<?php
$includePath = $_SERVER["DOCUMENT_ROOT"];
$sqlConn = "$includePath/com/sysConfig.php";
require_once($sqlConn);

$caller = $_GET["c"];
//$caller = "philhuffstickler.com";

$id = "'".$_GET["i"]."'";

$id = str_replace(" ", "+", $id);

$id = str_replace("+", "~", $id);


/*
$arrClientInfo = split("-",$_GET["i"]);
$idQuery = $arrClientInfo[sizeof($arrClientInfo)-1];
*/

//mysql_connect(localhost, '[impactshot_db_admin', "impactshot_db_pw") or die(mysql_error());
//mysql_select_db("[impactshot-db-name]") or die(mysql_error());

/*
$data = mysql_query("SELECT vl.callingurl FROM videolists vl WHERE vl.videolistid=".$idQuery);

if ( mysql_error() && $_SESSION["enabledebug"] ) {
					echo mysql_error();
				}

				if( mysql_num_rows($data) ) {
					$rowObj = mysql_fetch_object($data);
					$callerArray = $rowObj->callingurl;
					$validCallers = explode(',', $callerArray);

					foreach ($validCallers as $value) {
						if(trim($value)==$caller)
						{
							$validated = true;

							break;
						}else{
							//$validated = false;
							$validated = true;
						}
					}


				} else {
					//$validated = false;
					$validated = true;
				}
*/


$validated = true; /* HARD CODED */

if($validated){
	//echo "go(".$id.")";
	$id = "$id";
	echo "go(".$id.")";

}else{
	echo "set('invalid')";
}

?>

</script>

</body>
</html>
