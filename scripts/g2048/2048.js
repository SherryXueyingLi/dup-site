define([], function(){
	var up=38, left=37, down=40, right=39;//key code
	var moved = false;
	var G2048 = function(scope){
		this.scope = scope;
		this.best = 0;
		this.score = 0;
		
		var game=this;
		window.onkeyup = function(e) {
		   var key = e.keyCode ? e.keyCode : e.which;
		   moved = false;
		   switch(key){
		   case up: game.up();break;
		   case left: game.left(); break;
		   case down: game.down(); break;
		   case right: game.right(); break;
		   }
		   if(game.movable()){
				if(moved) game.create();
		   }else{
				game.lose();
		   }
		   scope.$apply();
		};
	};
	
	G2048.prototype.init = function(){
		this.g2048= [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		this.create();
		this.create();
		if(this.score > this.best) this.best = this.score;
		this.score = 0;
	};
	
	G2048.prototype.down = function(){
		var tmp = [];
		for(var col=0; col<this.g2048[0].length; col++){
			for(var row=0, i=0; row<this.g2048.length; row++, i++){
				tmp[i] = this.g2048[row][col];
			}
			this.score+=mergeRight(tmp);
			for(row=0, i=0; row<this.g2048.length; row++, i++){
				this.g2048[row][col] = tmp[i];
			}
		}
	};

	G2048.prototype.up = function(){
		var tmp = [];
		for(var col=0; col<this.g2048[0].length; col++){
			for(var row=this.g2048.length-1, i=0; row>=0; row--, i++){
				tmp[i] = this.g2048[row][col];
			}
			this.score+=mergeRight(tmp);
			for(row=this.g2048.length-1, i=0; row>=0; row--, i++){
				this.g2048[row][col] = tmp[i];
			}
		}
	};
	
	G2048.prototype.left = function(){
		var tmp = [];
		for(var row=0; row<this.g2048.length; row++){
			for(var col=this.g2048.length-1, i=0; col>=0; col--, i++){
				tmp[i] = this.g2048[row][col];
			}
			this.score+=mergeRight(tmp);
			for(col=this.g2048.length-1, i=0; col>=0; col--, i++){
				this.g2048[row][col] = tmp[i];
			}
		}
	};
	
	G2048.prototype.right = function(){
		var tmp = [];
		for(var row=0; row<this.g2048.length; row++){
			for(var col=0, i=0; col<this.g2048.length; col++, i++){
				tmp[i] = this.g2048[row][col];
			}
			this.score+=mergeRight(tmp);
			for(col=0, i=0; col<this.g2048.length; col++, i++){
				this.g2048[row][col] = tmp[i];
			}
		}
	};
	
	G2048.prototype.create = function(){
		if(!this.havezero())  return;
		var r1=parseInt(Math.random()*100%16);
		while(this.g2048[parseInt(r1/4)][r1%4]!==0){
			r1=parseInt(Math.random()*100%16);
		}
		this.g2048[parseInt(r1/4)][r1%4]=Math.random()>=0.2?2:4;
		if(!this.movable()){
			this.lose();
		}
	};
	G2048.prototype.havezero = function(){
		for(var row in this.g2048){
			for(var i in this.g2048[row]){
				if(this.g2048[row][i] === 0) return true;
			}
		}
		return false;
	};
		
	G2048.prototype.lose = function(){
		if(this.score > this.best) this.best = this.score;
		if(this.onLost) this.onLost();
	};
		
	G2048.prototype.movable = function(){
		for(var i=0; i<this.g2048.length; i++){
			for(var j=0; j<this.g2048[i].length; j++){
				if((j<this.g2048[i].length-1 && rightMoveable(this.g2048, i, j)) || ( i<this.g2048.length-1 && downMoveable(this.g2048, i, j)))
					return true;
			}
		}
		return false;
	};
	
	var rightMoveable = function(array, i, j){
		var x=j+1;
		return (array[i][x] ===0 || array[i][x]===array[i][j]);
	};
	
	var downMoveable = function(array, i, j){
		var x=i+1;
		return (array[x][j] ===0 || array[x][j]===array[i][j]);
	};
	
	var mergeRight = function(array){
		var nei = findMinNeibor(array);
		var score=0;
		if(nei!==null){
			array[nei[1]] = array[nei[0]]+array[nei[1]];
			score+=array[nei[1]];
			array[nei[0]] = 0;
			moved = true;
		}
		collapse(array);
		return score;
	};
	
	var findMinNeibor = function(array){
		var min=null;
		for(var i=0; i<array.length-1; i++){
			if(array[i]===0) continue;
			var n=i+1;
			while(array[n]===0 && n<array.length){
				n++;
			}
			if(array[n]===array[i] && (min===null || array[i]<=array[min[0]])) min = [i, n];
		}
		return min;
	};
	
	var collapse = function(array){
		for(var i=array.length-1; i>0; i--){
			if(array[i]===0){
				var j=i-1;
				while(j>0 && array[j]===0){
					j--;
				}
				if(j>=0 && array[j]!==0){
					array[i] = array[j];
					array[j] = 0;
					moved = true;
				}
			}
		}
	};
	
	return G2048;
});