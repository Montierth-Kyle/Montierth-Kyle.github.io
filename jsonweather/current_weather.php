<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Ogden, UT</title>
	<meta name="viewport" content="width=device-width">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<link rel="stylesheet" href="/jsonweather/css/weather_style.css" type="text/css">
    <script src="/jsonweather/scripts/remote_wu.js"></script>
    <script src="/jsonweather/scripts/jquery-3.x.min.js"></script>
    <script src="/jsonweather/scripts/weather.json"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
 <script>
jQuery(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/c8369bfc569b1c27/geolookup/forecast/conditions/q/autoip.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var state = parsed_json['location']['state'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  var weather = parsed_json['current_observation']['weather'];
  var feelslike_f = parsed_json['current_observation']['feelslike_f'];
  var precip = parsed_json['current_observation']['precip_today_in'];
  var wind = parsed_json['current_observation']['windchill_f'];

  document.getElementById('currentTemp').innerHTML =  temp_f.toFixed(0) + "°";
  document.getElementById('current_conditions').innerHTML =  weather;
  document.getElementById('cityDisplay').innerHTML = location + ", " + state;
  document.getElementById('add1').innerHTML = "The windchill is " + wind;
  document.getElementById('add2').innerHTML = "The temperature feels like " + feelslike_f + "°";
  document.getElementById('add3').innerHTML = "The precipitation for today is " + precip + "in";
  document.getElementById('summary').innerHTML = "It is going to be a great day!";
  }
  });
});
</script>
</head>
<body>
	<div id="wrapper">
		<header id="page-header">
			<?php include '/modules/_header.php'; ?>
		</header>
		<nav id="page-nav">
			<?php include '/modules/_navigation.php'; ?>
		</nav>
		<main id="page-main">
			<section class="weather-container">
				<div id="cover">
					<div id="status">Loading...</div>
				</div>
				<h1 id="cityDisplay"></h1>
				<h2>Current Conditions</h2>
				<h3 id="current_conditions"></h3>
					<h4 id="currentTemp"></h4>
					<h4 id="summary"></h4>
					<h4 id="add1"></h4>
					<h4 id="add2"></h4>
					<h4 id="add3"></h4>
			</section>
		</main>
		<footer id="page-footer">
			<?  php include '/modules/_footer.php';  ?>
			<small>Last updated: <?php echo date('j F, Y', getlastmod()); ?></small>
		</footer>
		<script src="/jsonweather/scripts/jquery-2.2.0.min.js"></script>
		<script src="/jsonweather/scripts/remote_wu.js"></script>
	</div>
</body>

</html>
