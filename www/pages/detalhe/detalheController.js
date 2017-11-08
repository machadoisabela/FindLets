app.controller('detalheController', function ($scope, $stateParams, UserService, detalheModel, $ionicLoading) {    
      
    var idEvento = $stateParams.id;
    var user = UserService.getUser();
    $scope.detalheEvento = {};
    $scope.lugarEvento = {};


    var lugarEventoSucesso = function(response){
        var lugarEvento = response;
        $scope.lugarEvento = detalheModel.obterLugarEvento(lugarEvento);
        $scope.$apply();
    };

    var lugarEventoErro = function(response){
        console.log("Erro", response);
    };

    $scope.obterLugarEvento = function(idLugar){
        facebookConnectPlugin.api($scope.detalheEvento.lugar.id+"?fields=id,name,about,cover.fields(id,source),picture.type(large),category,category_list.fields(name)&access_token=" + user.authResponse.accessToken, ['user_events'], lugarEventoSucesso, lugarEventoErro);
    };

    var obterEventoSucesso = function(response){
        var retorno = response;
        $scope.detalheEvento = detalheModel.obterEvento(retorno);
        $scope.$apply();
        $scope.obterLugarEvento($scope.detalheEvento.lugar.id);
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

    $scope.voltar = function(){
        history.back();
    };

    
      
});