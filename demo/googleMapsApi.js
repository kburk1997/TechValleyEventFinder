var map;
        var infowindow;
        var request;
        var service;
        var markers = [];
        var Value = [];


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
            //    console.log(document.getElementById('map'.innerHTML);
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




        /*
         * library dependencies:
         *      jquery
         */

        // plugin 1.0


        $(document).ready(function () {
            "use strict";
            var pluginName = "selectionator";
            var defaults = {
                propertyName: "selectionator",
                src: null,
                orgElement: null,
                checkedItems: [],
                // custom callback events
                onError: function (error) { }
            };
            function Plugin(element, options) {
                this.element = element;
                this.selector = null;
                this.options = $.extend({}, defaults, options);
                this._defaults = defaults;
                this._name = pluginName;
                this.init();
            }
            Plugin.prototype = {
                init: function () {
                    console.log("options: ", this.options);
                    var that = this;
                    var self = $(that.element);
                    that.options.src = that.element.getAttribute('data-src');
                    that.selector = that.createFromJson(that.options.data);
                    that.options.orgElement = that.element.parentNode.replaceChild(that.selector, that.element);
                    $(that.selector).addClass(that._name);
                },
                createFromJson: function (options) {
                    var that = this;
                    var select = document.createElement('select');
                    var popup = document.createElement('div');
                    var header = document.createElement('div');
                    var search = document.createElement('span');
                    var overlay = document.createElement('span');
                    overlay.className = 'overlay';
                    var shadow = document.createElement('span');
                    shadow.className = 'shadow';
                    var placeholder = document.createTextNode('Options');
                    search.className = 'search';
                    search.appendChild(shadow);
                    search.appendChild(overlay);
                    search.appendChild(placeholder);
                    popup.appendChild(search);
                    var menu = document.createElement('ul');
                    select.style.display = 'none';
                    menu.className = 'list';
                    var box = document.createElement('div');
                    box.className = 'menu';
                    box.appendChild(menu);
                    popup.appendChild(box);
                    console.log("optgroup", options.optgroups);
                    options.optgroups.forEach(function (optgroup, index) {


                        var menuItem = document.createElement('li');
                        //menuItem.className('header');
                        var header = document.createElement('span');
                        header.className = 'header';
                        var caption = document.createTextNode(optgroup.label);
                        header.appendChild(caption);
                        menuItem.appendChild(header);
                        var menuItems = document.createElement('ul');
                        menuItems.className = 'optgroup';
                        menuItem.appendChild(menuItems);
                        menu.appendChild(menuItem);

                        optgroup.options.forEach(function (option, index) {
                            var opt = new Option(option.text, option.value, option.defaultSelected, option.selected);
                            select.options.add(opt);
                            var item = document.createElement('li');
                            var label = document.createElement('label');
                            label.setAttribute("for", option.value);
                            var checkbox = document.createElement('input');
                            $(checkbox).data(option);
                            checkbox.setAttribute('type', 'checkbox');

                            checkbox.addEventListener('change', function (event) {
                                var checkbox = event.target;
                                var $el = $(event.srcElement);
                                if (checkbox.checked) {
                                    that.options.checkedItems.push(event.srcElement);
                                    placeholder.nodeValue = "Selected: " + that.options.checkedItems.length + " out of " + $(that.selector).find('input[type="checkbox"]').length;
                                 


                                } else {
                                    that.options.checkedItems.pop();
                                    that.options.checkedItems = that.options.checkedItems.filter(function (items, index) {
                                        return items.value != $el.data().value;
                                    });
                                    placeholder.nodeValue = "Selected: " + that.options.checkedItems.length + " out of " + $(that.selector).find('input[type="checkbox"]').length;
                                }
                                console.log("data: ", that.options.checkedItems);
                            });
                            checkbox.id = option.value;
                            var caption = document.createTextNode(option.text);
                            label.appendChild(caption);
                            item.appendChild(checkbox);
                            item.appendChild(label);
                            menuItems.appendChild(item);
                        });
                    });
                    return popup;
                },
                onAddFriend: function (data) {
                    var that = this;
                    return that.options.onAddFriend(that, data);
                },
                onRemoveFriend: function (data) {
                    var that = this;
                    var self = $(that.element);
                    return that.options.onRemoveFriend(data);
                },
                destroy: function () {
                    var that = this;
                    $(that.element).unbind("destroyed", that.teardown);
                    that.teardown();
                },
                teardown: function () {
                    var that = this;
                    $(that.element).removeClass(that._name);
                    $(that.selector).replaceWith(that.options.orgElement);
                    $(that.element).removeData(that._name);
                    that.unbind();
                    that.element = null;
                },
                bind: function () { },
                unbind: function () { }
            };
            $.fn[pluginName] = function (options) {
                return this.each(function () {
                    if (!$.data(this, pluginName)) {
                        $.data(this, pluginName, new Plugin(this, options));
                    }
                });
            };
        });
        //Attach plugin to all matching element
        $(document).ready(function () {
            $('#select').selectionator({
                data: {
                    optgroups: [{
                        label: 'Food',
                        options: [{
                            value: 0,
                            text: 'cafe',
                            defaultSelected: true,
                            selected: false
                        }, {
                            value: 345,
                            text: 'store',
                            defaultSelected: false,
                            selected: false
                        }, {
                            value: 111,
                            text: "bank",
                            defaultSelected: false,
                            selected: false
                        }, {
                            value: 433,
                            text: "lodging",
                            defaultSelected: false,
                            selected: true
                        }]
                    }, {
                        label: 'Other',
                        options: [{
                            value: 555,
                            text: 'linda',
                            defaultSelected: false,
                            selected: false
                        }, {
                            value: 333,
                            text: "mike",
                            defaultSelected: false,
                            selected: false
                        }]
                    }]
                }
            });





            setTimeout(function () {
                $(".selectionator").addClass('opened');
            }, 500);
            setTimeout(function () {
                $(".selectionator").removeClass('opened');
            }, 1250);
        });

