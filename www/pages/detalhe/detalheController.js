app.controller('detalheController', function ($scope, $stateParams, UserService, detalheModel, $ionicLoading) {    
      
    var idEvento = $stateParams.id;
    var user = UserService.getUser();
    $scope.detalheEvento = {};

    var obterEventoSucesso = function(response){
        var retorno = response;
        $scope.detalheEvento = detalheModel.obterEvento(retorno);
        $scope.$apply();
        $ionicLoading.hide();
    };

    var obterEventoErro = function(response){
        console.log('erro', response);
    };

    $scope.obterEvento = function(){
        facebookConnectPlugin.api("/"+idEvento+"?fields=id,name,cover,description,category,ticket_uri,attending_count,place,start_time&limit=500&access_token=" + user.authResponse.accessToken, null, obterEventoSucesso, obterEventoErro);
    };
 
    $scope.obterEvento();
    $ionicLoading.show({
        template: '<ion-spinner icon="crescent"></ion-spinner>'
    });

    
      
});