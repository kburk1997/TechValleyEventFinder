var map;
        var infowindow;
        var request;
        var service;
        var markers = [];

        function initialize() {
            var center = new google.maps.LatLng(42.8035432, -74.0081847);
            map = new google.maps.Map(document.getElementById('map'), {
                center: center,
                zoom: 13
            });

            request = {
                location: center,
                radius: 8047,
                types: ['point_of_interest']
            };
            infowindow = new google.maps.InfoWindow();

            service = new google.maps.places.PlacesService(map);

            service.nearbySearch(request, callback);

            google.maps.event.addListener(map, 'rightclick', function (event) {
                map.setCenter(event.latLng);
                clearResults(markers);

                var request = {
                    location: event.latLng,
                    radius: 8047,
                    types: ['point_of_interest']
                };
                service.nearbySearch(request, callback);
            });
        }

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    markers.push(createMarker(results[i]));
                }
            }
        }

        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon: getMarkerIcon(place.types[0])
            });

            google.maps.event.addListener(marker, 'click', function () {
                //debugging
                //console.log(place);
                infoContent="<b><a href=\"https://www.google.com/maps/place/"+place.vicinity+"\">"+place.name+"</a></b><br>";
                placehead=document.getElementById('placename');
                //console.log(placehead);
                infoContent+= place.vicinity;
                infowindow.setContent(infoContent);
                infowindow.open(map, this);
            });

            return marker;
        }

        function getMarkerIcon(placeType) {
				var fileLoc = "../img/"
				var fileName;
				switch (placeType) {
					case "accounting":
						fileName = "accountancy.png"
						break;
					case "bakery":
						fileName = "cake-shop.png"
						break;
					case "bar":
						fileName = "bars.png"
						break;
					case "book_store":
						fileName = "books-media.png"
						break;
					case "cafe":
						fileName = "coffee-n-tea.png"
						break;
					case "car_dealer":
						fileName = "automotive.png"
						break;
					case "car_rental":
						fileName = "automotive.png"
						break;
					case "car_repair" :
						fileName = "automotive.png"
						break;
					case "car_wash" :
						fileName = "automotive.png"
						break;
					case "gas_station" :
						fileName = "automotive.png"
						break;
					case "electronics_store":
						fileName = "electronics.png"
						break;
					case "library":
						fileName = "libraries.png"
						break;
					case "bank":
						fileName = "financial-services.png"
						break;
					case "atm":
						fileName = "financial-services.png"
						break;
					case "storage":
						fileName = "shopping.png"
						break;	
					case "food":
						fileName = "shopping.png"
						break;	
					case "supermarket":
						fileName = "shopping.png"
						break;	
					case "department_store":
						fileName = "shopping.png"
						break;	
					case "shopping_mall":
						fileName = "retail-stores.png"
						break;
					case "store":
						fileName = "retail-stores.png"
						break;
					case "lodging":
						fileName = "hotels.png"
						break;
					case "airport":
						fileName = "transport.png"
						break;	
					case "restaurant":
						fileName = "restaurants.png"
						break;
					case "movie_theater":
						fileName = "movies.png"
						break;
					case "university":
						fileName = "schools.png"
						break;
					case "school":
						fileName = "schools.png"
						break;
					case "shoe_store":
						fileName = "retail-stores.png"
						break;
					case "home_goods_store":
						fileName = "home-services.png"
						break;
					case "doctor":
						fileName = "doctors.png"
						break;
					case "medical":
						fileName = "medical.png"
						break;
					case "health":
						fileName = "health-medical.png"
						break;
					case "point_of_interest":
						fileName = "places.png"
						break;
					default:
						return "";

				}

				return fileLoc + fileName;
			}

        function clearResults(markers) {
            for (var m in markers) {
                markers[m].setMap(null)
            }
        }
        google.maps.event.addDomListener(window, 'load', initialize);