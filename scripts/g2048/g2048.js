define(["../g2048/2048", "css!../g2048/g2048"], function(G2048){
    var ctl = function($scope){
		$scope.score = 0;
		$scope.best = 0;
		$scope.g2048 = new G2048($scope);
		$scope.g2048.init();
		$scope.g2048.onLost = function(){
			$scope.reset2048Btn = true;
		};
		$scope.reset2048 = function(){
			$scope.g2048.init();
		};
		
	
	};
	return ctl;
});