<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title> | Weather Center</title>
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="/jsonweather/css/weather-style.css" type="text/css" media="screen">
</head>

	<body>
		<div id="wrapper">
			<header id="page-header">
				<?php include '../modules/header.php'; ?>
			</header>
			<nav id="page-nav">
				<?php include '../modules/navigation.php'; ?>
			</nav>
			<main id="page-main">
				<section class="weather-container">
					<div id="cover">
						<div id="status">Loading...</div>
					</div>
					<h1 id="cityDisplay"></h1>
					<h2>Current Conditions</h2>
					<ul id="current_conditions">
						<li id="currentTemp"></li>
						<li id="summary"></li>

					</ul>
				</section>
			</main>
			<footer id="page-footer">
				<?php include 'jsonweather/modules/footer.php'; ?>
				<small>Last updated: <?php echo date('j F, Y', getlastmod()); ?></small>
			</footer>
			<script src="jsonweather/scripts/jquery-2.2.0.min.js"></script>
			<script src="scripts/weather.json"></script>
		</div>
	</body>
</html>
