<?php
error_reporting(E_ALL & ~E_NOTICE);
require_once('header.php');
if(file_exists(basename((isset($_GET['page']) && $_GET['page']!='' ? $_GET['page'] : 'home') . '.php')))
	require_once(basename((isset($_GET['page']) && $_GET['page']!='' ? $_GET['page'] : 'home') . '.php'));
else
	require_once("404.php");
require_once('footer.php');
?>