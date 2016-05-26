define(["css!../home/home"], function(){
	var ctl = function($scope, $element){
		
		$scope.secondPage = function(){
			
		};
		document.body.style.overflow="hidden";
		var nowActive = 0;
		var resize = function(){
			var slides = document.getElementsByClassName("home-slides-show");
			for(var i=0; i<slides.length; i++){
				slides[i].style.height = window.innerHeight-50+"px";
			}
			document.getElementsByClassName("home-nav")[0].style.top =  (window.innerHeight-90)/2+"px";
			document.getElementsByClassName("home-container")[0].style.transform = "translate3d(0px, -0px, 0px)";
			
			jumToPage(getCurrentIndex());
		};

		const movePageTo = (direction)=>{
			var currIndex = getCurrentIndex();
			jumToPage(direction(currIndex, document.getElementsByClassName("home-slides-show").length-1), currIndex);
		};
		
		const getCurrentIndex = ()=>{
			return  Array.prototype.indexOf.call(document.getElementsByClassName("home-slides-show"), document.getElementsByClassName("home-slides-show current")[0]);
		};
		
		var jumToPage = (toPageNum, fromPage) => {
			var currIndex = fromPage || getCurrentIndex();
			var toY = (window.innerHeight-50) * toPageNum;
			document.getElementsByClassName("home-container")[0].style.transform = "translate3d(0px, -"+toY+"px, 0px)";
			document.getElementsByClassName("home-container")[0].style.transition="all 700ms ease";
			
			document.getElementsByClassName("home-slides-show current")[0].classList.remove("current");
			document.getElementsByClassName("home-nav")[0].getElementsByClassName("active")[0].classList.remove("active");
			
			document.getElementsByClassName("home-slides-show")[toPageNum].classList.add("current");
			document.getElementsByClassName("home-nav")[0].children[toPageNum].classList.add("active");
			fixNavColor(toPageNum);
		};
		
		const fixNavColor = (i) => {
			var navMap = ["#242543", "#509FCC","#1E2835","#3FA6B5"];			
			document.getElementById("nav-dup").style.backgroundColor=navMap[i];
		};
		
		
		
		const next = (currentIndex, max)=>{
			return  n = (currentIndex === max)? 0 : currentIndex+1;		
		};
		const previous = (currentIndex, max) => {			
			return n = currentIndex ===  0 ? max : currentIndex-1;
		};
		
		var underProcess = false;
		const onMouseWheel = (e) => {
			if(underProcess) return;
			underProcess=true;
			e.wheelDelta < 0 ? movePageTo(next) : movePageTo(previous);
			fixNavColor();
			setTimeout(()=>{underProcess=false;}, 500);
		};
		
		window.addEventListener('mousewheel', onMouseWheel);
		window.onresize = resize;
		
		resize();
		fixNavColor(0);
		$scope.$on("$destroy", function() {
			document.getElementById("nav-dup").style.backgroundColor="";
			window.removeEventListener("mousewheel", onMouseWheel);
			window.onresize = null;
			document.body.style.overflow=null;
   		});
	
	};
	return ctl;
});