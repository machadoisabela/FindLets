app.controller('detalheController', function ($scope, $stateParams, UserService) {    
      
    var idEvento = $stateParams.id;
    var user = UserService.getUser();

    var obterEventoSucesso = function(response){
        console.log(response);
    };

    var obterEventoErro = function(response){
        console.log('erro', response);
    };

    $scope.obterEvento = function(){
        facebookConnectPlugin.api("/"+idEvento+"?fields=id,name,cover,description,attending_count,place,start_time&limit=500&access_token=" + user.authResponse.accessToken, null, obterEventoSucesso, obterEventoErro);
    };
    $scope.obterEvento();
      
});