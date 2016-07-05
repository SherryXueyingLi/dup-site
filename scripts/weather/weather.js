define(["css!../../style/weather-icons.min"], function(){
    var controller = function($scope, $element, $http, $cookies){
        
        $scope.loading = false;
        $scope.loadingWeather = false;
      
        $scope.query = function(){
            getLocation($scope.location);
        };

        let bg = document.getElementById("bgforweather");
        bg.style.height = window.innerHeight + "px";
       
        $scope.getWeather = function(lat, lng){
             $scope.loadingWeather = true;
            var req = {
                method: 'GET',
                url: `https://simple-weather.p.mashape.com/weatherdata?lat=${lat}&lng=${lng}`,
                headers: {
                "X-Mashape-Key": "r4Vg2bsHUNmshPpHRKsICcP8LHiOp1BkNHijsn458JavIBHwMl",
                "Accept": "application/json"
                },
            };

            $http(req).then(function(data){
                $scope.weather = data.data.query.results;
                $scope.cities = null;
                let s = JSON.stringify($scope.weather);
                $cookies.put("dupsiteweatherlat", lat);
                $cookies.put("dupsiteweatherlng", lng);
                $scope.loadingWeather = false;
            });
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
         if($cookies.get("dupsiteweatherlat"))
            $scope.getWeather($cookies.get("dupsiteweatherlat"), $cookies.get("dupsiteweatherlng"));

    };
    return controller;
});