$(document).ready(function() {

	var map = L.mapbox.map('map', 'infoamazonia.hm6a0hke').setView([-7.245, -52.452], 5);
	$(".areas-table").tablesorter(); 

	var svg = d3.select(map.getPanes().overlayPane).append("svg"),
	    g = svg.append("g").attr("class", "leaflet-zoom-hide");


	d3.json("/static/topojson/states.min.json", function(collection) {
	
		var transform = d3.geo.transform({point: projectPoint}),
		    path = d3.geo.path().projection(transform);

		var feature = g.selectAll('path')
			.data(topojson.feature(collection, collection.objects.states).features)
			.enter().append("path")
			.attr('d', path)
			.attr('fill-opacity', 0.5)
			.attr('stroke', 'red')
			.attr('stroke-opacity', 0.7)
			.on('mouseover', function() {
				console.log('mouseover');
			});

		g.selectAll(".place-label")
		    .data(topojson.feature(collection, collection.objects.states).features)
		  .enter().append("text")
		    .attr("class", "place-label")
		    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
		    .attr("dy", ".35em")
		    .attr('font-family', 'OpenSansCondensedBold')
		    .style('text-anchor', 'middle')
		    .style('fill', 'white')
		    .text(function(d) { return d.properties.name; });

		map.on("viewreset", reset);
		reset();

		function reset() {
			var bounds = path.bounds(topojson.mesh(collection, collection.objects.states));
			var topLeft = bounds[0];
		    var bottomRight = bounds[1];

		  	svg.attr("width", bottomRight[0] - topLeft[0])
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