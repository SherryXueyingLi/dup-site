define(["particles","css!scripts/cv/cv","css!style/circle"], function(particlesJS){

	var controller = function($scope){
		particlesJS.load('self-info', 'scripts/cv/particlesjs-config.json', function() {
  			console.log('callback - particles.js config loaded');
		});
	};
	
	return controller;
});