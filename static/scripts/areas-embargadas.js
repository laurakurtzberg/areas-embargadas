$(document).ready(function() {

	var map = L.mapbox.map('map', 'infoamazonia.hm6a0hke').setView([-7.245, -52.452], 5);
	$(".areas-table").tablesorter(); 

	var svg = d3.select(map.getPanes().overlayPane).append("svg"),
	    g = svg.append("g").attr("class", "leaflet-zoom-hide");


	d3.json("/static/geojson/ap-state.json", function(collection) {
	
		var transform = d3.geo.transform({point: projectPoint}),
		    path = d3.geo.path().projection(transform);

		var feature =  g.selectAll("path")
						.data(collection.features)
		  				.enter().append("path");

		map.on("viewreset", reset);
		reset();

		function reset() {
		  var bounds = path.bounds(collection),
		      topLeft = bounds[0],
		      bottomRight = bounds[1];

		  svg .attr("width", bottomRight[0] - topLeft[0])
		      .attr("height", bottomRight[1] - topLeft[1])
		      .style("left", topLeft[0] + "px")
		      .style("top", topLeft[1] + "px");

		  g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

		  feature.attr("d", path);
		}

		function projectPoint(x, y) {
		  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
		  this.stream.point(point.x, point.y);
		}

	});

});