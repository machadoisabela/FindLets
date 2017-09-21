app.config(['$stateProvider','$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

           $stateProvider

                // setup an abstract state for the tabs directive
                .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
                })

                // Each tab has its own nav history stack:

                .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                    templateUrl: 'templates/tab-dash.html',
                    controller: 'DashCtrl'
                    }
                }
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
                .state('tab.chat-detail', {
                    url: '/chats/:chatId',
                    views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                    }
                })

                .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountCtrl'
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

