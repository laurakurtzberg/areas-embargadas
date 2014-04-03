$(document).ready(function() {

	var map = L.mapbox.map('map', 'infoamazonia.hm6a0hke').setView([-7.245, -52.452], 5);
	// var layer = L.mapbox.map('infoamazonia.hm5iceem');
	// map.addLayer(layer);

	$(".areas-table").tablesorter(); 

	console.log('page loaded');

});