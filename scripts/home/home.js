define([], function(){
	var ctl = function($scope){
		$scope.score = 0;
		$scope.best = 0;
		$scope.g2048= [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		
		var init = function(){
			var r1=parseInt(Math.random()*100%16), r2=parseInt(Math.random()*100%16);
			while(r1===r2){r2=parseInt(Math.random()*100%16);}
			$scope.g2048[parseInt(r1/4)][r1%4]=2;
			$scope.g2048[parseInt(r2/4)][r2%4]=2;
		};
		init();
		var down = function(){
			
		};
		
		var up = function(){
		};
		
		var left = function(){
		};
		
		var right = function(){
		};
		
		var create = function(){
			if(!havezero())  lose();
			var r1=parseInt(Math.random()*100%16);
			while($scope.g2048[parseInt(r1/4)][r1%4]!==0){
				r1=parseInt(Math.random()*100%16);
			}
			$scope.g2048[parseInt(r1/4)][r1%4]=2;
			if(!movable(parseInt(r1/4), r1%4)){
				lose();
			}
		};
		
		var havezero = function(){
			for(var row in $scope.g2048){
				for(var i in $scope.g2048[row]){
					if($scope.g2048[row][i] === 0) return true;
				}
			}
			return false;
		};
		
		var lose = function(){
			if($scope.score > $scope.best) $scope.best = $scope.score;
			for(var row in $scope.g2048){
				for(var i in $scope.g2048[row]){
					$scope.g2048[row][i] = 0;
				}
			}
			init();
		};
		
		var movable = function(){
		};
	
	};
	return ctl;
});