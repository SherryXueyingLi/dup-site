define(["css!../home/home"], function(){
	var ctl = function($scope, $element){
		
		document.body.style.overflow="hidden";
		window.scrollTo(0, 0);
		let resize = function(){
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
		
		const jumToPage = (toPageNum, fromPage) => {
			var currIndex = fromPage || getCurrentIndex();
			var toY = (window.innerHeight-50) * toPageNum;
			document.getElementsByClassName("home-container")[0].style.transform = "translate3d(0px, -"+toY+"px, 0px)";
			
			document.getElementsByClassName("home-slides-show current")[0].classList.remove("current");
			document.getElementsByClassName("home-nav")[0].getElementsByClassName("active")[0].classList.remove("active");
			
			document.getElementsByClassName("home-slides-show")[toPageNum].classList.add("current");
			document.getElementsByClassName("home-nav")[0].children[toPageNum].classList.add("active");
			setTimeout( ()=>{pageAnimate(toPageNum)}, 400);
			fixNavColor(toPageNum);
		};
		const pageAnimate = (num)=>{
			
			if(num === 3){
				document.getElementsByClassName("home-slides-show")[num].classList.remove("begin");
			}else{
				document.getElementsByClassName("home-slides-show")[3].classList.add("begin");
			}
			if(num===1){
				document.getElementById("to-animate-wobble").classList.add("animated","fadeInDown");
				document.getElementById("productive-content").classList.add("animated","fadeInUp");
				document.getElementById("proactive-footer").style.opacity = "1";
			}else{
				document.getElementById("to-animate-wobble").classList.remove("animated", "fadeInDown");
				document.getElementById("productive-content").classList.remove("animated","fadeInUp");
				document.getElementById("proactive-footer").style.opacity = "0";
			}
			if(num === 2){
				document.getElementsByClassName("home-slides-show")[num].children[1].classList.add("animated","zoomIn");
				setTimeout(()=>{
					document.getElementsByClassName("home-slides-show")[num].children[0].classList.add("animated","slideInLeft");
					document.getElementsByClassName("home-slides-show")[num].children[2].classList.add("animated","slideInRight");
				},400);
			}else{
				document.getElementsByClassName("home-slides-show")[2].children[1].classList.remove("animated","zoomIn");
				document.getElementsByClassName("home-slides-show")[2].children[0].classList.remove("animated","slideInLeft");
				document.getElementsByClassName("home-slides-show")[2].children[2].classList.remove("animated","slideInRight");
			}
			if(num===0){
				document.getElementsByClassName("home-slides-show")[num].children[0].classList.add("animated","fadeInLeft");
				document.getElementsByClassName("home-slides-show")[num].children[1].classList.add("animated","fadeInRight");
				document.getElementsByClassName("home-slides-show")[num].children[2].classList.add("animated","fadeIn");
			}else{
				document.getElementsByClassName("home-slides-show")[0].children[0].classList.remove("animated","fadeInLeft");
				document.getElementsByClassName("home-slides-show")[0].children[1].classList.remove("animated","fadeInRight");
				document.getElementsByClassName("home-slides-show")[0].children[2].classList.remove("animated","fadeIn");
			}
			if(num === 4){
				var ul = document.getElementById("sns-to-jump").children;
				for(var i=0; i<ul.length; i++){
					ul[i].classList.add( "slideInUp");
				}
			}else{
				var ul = document.getElementById("sns-to-jump").children;
				for(var i=0; i<ul.length; i++){
					ul[i].classList.remove( "slideInUp");
				}
			}
		};
		const fixNavColor = (i) => {
			var navMap = ["#242543", "#509FCC","#1E2835","#3FA6B5","#90c9e8"];			
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
		
		$scope.jumToPage = jumToPage;
		
		$scope.$on("$destroy", function() {
			document.getElementById("nav-dup").style.backgroundColor="";
			window.removeEventListener("mousewheel", onMouseWheel);
			window.onresize = null;
			document.body.style.overflow=null;
   		});
	
	};
	return ctl;
});