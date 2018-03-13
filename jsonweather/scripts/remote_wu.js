$(function () {

	var status = $('#status');

	(function getGeoLocation() {
		status.text('Getting Location...');
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				var lat = position.coords.latitude;
				var long = position.coords.longitude;

				// Call the getData function, send the lat and long
				getData(lat, long);

			});
		} else {
			status.text("Your browser doesn't support Geolocation or it is not enabled!");
		}

	})();

	function getData(lat, long){
		// Get the data from the wunderground API
		$.ajax({jQuery(document).ready(function($) {
  url : "http://api.wunderground.com/api/c8369bfc569b1c27/geolookup/forecast/conditions/q/lat,lon.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var state = parsed_json['location']['state'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  var weather = parsed_json['current_observation']['weather'];
  var feelslike_f = parsed_json['current_observation']['feelslike_f'];
  var precip = parsed_json['current_observation']['precip_today_in'];
  var wind = parsed_json['current_observation']['windchill_f'];
  
  document.getElementById('currentTemp').innerHTML =  "The current temperature is " + temp_f.toFixed(0) + "°";
  document.getElementById('current_conditions').innerHTML =  "The current weather is " + weather;
  document.getElementById('cityDisplay').innerHTML = location + ", " + state;
  document.getElementById('add1').innerHTML = "The windchill is " + wind;
  document.getElementById('add2').innerHTML = "The temperature feels like " + feelslike_f + "°";
  document.getElementById('add3').innerHTML = "The precipitation for today is " + precip + "in";
  }
  });
});







				$("#cover").fadeOut(250);
			}
		});

	}

	// A function for changing a string to TitleCase
	function toTitleCase(str){
		return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
});
