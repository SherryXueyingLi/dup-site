define(["css!../home/home"], function(){
	var ctl = function($scope, $element){
		
		$scope.secondPage = function(){
			
		};
		var nowActive = 0;
		var resize = function(){
			 document.getElementsByClassName("home-container")[0].style.height = window.innerHeight-50+"px";
			var slides = document.getElementsByClassName("home-slides-show");
			for(var i=0; i<slides.length; i++){
				slides[i].style.height = window.innerHeight-50+"px";
			}
		};
		var pageMove  = (directive) =>{
			var slides = document.getElementsByClassName("home-slides-show");
			for(var i=0; i<slides.length; i++){
				if(slides[i].classList.contains("current")){
					slides[i].classList.remove("current");
					document.getElementsByClassName("home-nav")[0].children[i].classList.remove("active");
					slides[directive(i, slides.length-1)].classList.add("current");
					var navs = document.getElementsByClassName("home-nav")[0].children;
					navs[directive(i, navs.length-1)].classList.add("active");
					fixNavColor(directive(i, slides.length-1));
					break;
				}
			}
		};
		
		const fixNavColor = (i) => {
			var navMap = ["#242543", "#509FCC","#1E2835",""];			
			document.getElementById("nav-dup").style.backgroundColor=navMap[i];
		};
		
		
		
		const next = (currentIndex, max)=>{
			return  n = (currentIndex === max)? 0 : currentIndex+1;		
		};
		const previous = (currentIndex, max) => {			
			return n = currentIndex ===  0 ? max : currentIndex-1;
		};
		
		const onMouseWheel = (e) => {
			e.wheelDelta < 0 ? pageMove(next) : pageMove(previous);
			fixNavColor();
		};
		
		window.addEventListener('mousewheel', onMouseWheel);
		
		resize();
		fixNavColor(0);
		$scope.$on("$destroy", function() {
			document.getElementById("nav-dup").style.backgroundColor="";
			window.removeEventListener("mousewheel", onMouseWheel);
   		});
	
	};
	return ctl;
});