app.config(['$stateProvider','$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

           $stateProvider

                // setup an abstract state for the tabs directive
                .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
                })

                .state('tab.listagem', {
                    url: '/listagem',
                    views: {
                    'tab-listagem': {
                        templateUrl: 'pages/listagemEventos/listagemEventos.html',
                        controller: 'listagemEventosController'
                    }
                    }
                })

                .state('tab.mapa', {
                    url: '/mapa',    
                    views: {
                        'tab-mapa': {
                        templateUrl: 'pages/mapa/mapa.html',
                        controller: 'mapaController'
                        }
                    }
                })

                .state('tab.explorar', {
                    url: '/explorar',    
                    views: {
                        'tab-explorar': {
                        templateUrl: 'pages/explorar/explorar.html',
                        controller: 'explorarController'
                        }
                    }
                })

                .state('detalhe', {
                    url: '/detalhe/:id',                       
                    templateUrl: 'pages/detalhe/detalhe.html',
                    controller: 'detalheController'                                        
                })

                .state('login', {
                    url: '/login',               
                    templateUrl: 'pages/login/login.html',
                    controller: 'loginController' 
                })

                .state('introducao', {
                    url: '/introducao',               
                    templateUrl: 'pages/introducao/introducao.html',
                    controller: 'introducaoController' 
                })

                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/introducao');

        }]);

