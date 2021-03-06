requirejs.config({
    baseUrl: '',
    paths: {
       "angular": "lib/angular",
	   "uiRouter": "lib/angular-ui-router",
       "ngCookies": "lib/angular-cookies",
	   "sidebar": "scripts/sideBarController",
       "particles": "lib/particles.min",
       "react": "lib/react",
       "react-dom": "lib/react-dom"
    },
	shim: {
        'angular': {
            exports: 'angular'
        },      
		"uiRouter": ["angular"],
        "ngCookies": ["angular"],
        "particles": {
            exports: 'particlesJS'
        }
    },
	map:{
		'*':{
			'css': 'lib/css'
		}
	}
});

require(['angular','sidebar', 'uiRouter', 'ngCookies', 'css!style/font-awesome.min'], function(angular, sidebar){
	var app = angular.module("explorUni", ['ui.router','ngCookies']);
	
	app.config(function($controllerProvider, $stateProvider, $urlRouterProvider) {
		app.cp = $controllerProvider;
		app.$stateProvider = $stateProvider;
		setStates($stateProvider);
		$urlRouterProvider.when("", "/home");
    });
	
	app.controller('sideBar', sidebar);
    var cache={}; 
    var setStates = function($stateProvider){
		$stateProvider.state('sns', generateConfig('sns')).state('home', generateConfig('home'))
        .state('g2048', generateConfig('g2048'))
		.state('weather', generateConfig('weather'))
		.state('journal', generateConfig('journal'))
		.state('github', generateConfig('github'))
		.state('cv', generateConfig('cv'))
        .state('succulent', generateConfig('succulent'));
	
    };
    
    function generateConfig(name){
	return {
            url: "/"+name,
            templateUrl: 'scripts/'+name+'/'+name+".html",
            name: name,
            resolve: {
                tabController: ['$state',function($state){
                    if(cache[this.name]) return;
                    var name = this.name;
                    return load(name).then(function(data){
                	//$("#"+data).click();
//                	menubarController.tabClicked(data);
                    });
                }]
            },
            controller: name
	};
    }
    
    function load(name){
		var deferred = $.Deferred();
		require(['scripts/'+name+'/'+name], function(ctrl){
			angular.module("explorUni").cp.register(name, ctrl);
			cache[name] = name;
			deferred.resolve(name);
        });
        return deferred.promise();
    }
	angular.bootstrap(document, ["explorUni"]);
});