define(["css!../../style/weather-icons.min"], function(){
    var controller = function($scope, $element, $http, $cookies){
        
        $scope.loading = false;
        $scope.loadingWeather = false;
        let interval;
        $scope.query = function(){
            getLocation($scope.location);
           
        };

        let bg = document.getElementById("bgforweather");
        bg.style.height = window.innerHeight + "px";
        $scope.geolocation = {lat: $cookies.get("dupsiteweatherlat"), lng: $cookies.get("dupsiteweatherlng")}
       
        $scope.chooseCity = function(lat, lng){
            $scope.geolocation.lat =  lat;
            $scope.geolocation.lng =  lng;
            $scope.getWeather();
            setTimer();
        };

        let setTimer = ()=>{
                console.log("setting timeout");
                window.clearTimeout(interval);
                interval = window.setTimeout($scope.getWeather, 1000*60*10);//10 minute = 1000*60*10
        };

        $scope.getWeather = function(){
            let lat = $scope.geolocation.lat, lng = $scope.geolocation.lng;
             $scope.loadingWeather = true;
            var req = {
                method: 'GET',
                url: `https://simple-weather.p.mashape.com/weatherdata?lat=${lat}&lng=${lng}`,
                headers: {
                "X-Mashape-Key": "r4Vg2bsHUNmshPpHRKsICcP8LHiOp1BkNHijsn458JavIBHwMl",
                "Accept": "application/json"
                },
            };
            
            let getDatta = new Promise((resolve, reject)=>{
                 $http(req).then(function(data){
                    $scope.weather = data.data.query.results;
                    $scope.cities = null;
                    $cookies.put("dupsiteweatherlat", lat);
                    $cookies.put("dupsiteweatherlng", lng);
                    $scope.loadingWeather = false;
                    resolve();
                });
            });
            getDatta.then(setTimer);
           
        };

        $scope.getClass = function(code){
            return `wi wi-yahoo-${code}`;
        };

        var getLocation = function(cityName){
            $scope.loading = true;
            var req = {
                method: 'GET',
                url: 'https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location='+cityName,
                headers: {
                "X-Mashape-Key": "r4Vg2bsHUNmshPpHRKsICcP8LHiOp1BkNHijsn458JavIBHwMl",
                "Accept": "application/json"
            }
            };

            $http(req).then(function(cityList){
                $scope.cities = cityList.data.Results;
                $scope.loading = false;
            });
        };
         if( $scope.geolocation.lat &&  $scope.geolocation.lng){
              $scope.getWeather();
             
         }
           

    };
    return controller;
});