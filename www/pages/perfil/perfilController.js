app.controller('perfilController', function ($scope, UserService, eventosHttpServices, listagemModel,  $ionicLoading) {       

    $scope.user = UserService.getUser();
    $scope.idsEventos = {};
    $scope.listaFavoritos = function(){
        var dados = {
            id_user: $scope.user.userID
        };
        eventosHttpServices.listaEventosFavoritados(dados).then(function(response){
            var retorno = response.data;
            $scope.idsEventos = retorno.join();
            $scope.listaEventos();
        });
    };
    $scope.listaFavoritos();

    var listaEventosSucesso = function(response){
        var retorno = response || {};
        var arrayLocaisComEventos = [];
        for (var key in retorno) {
            arrayLocaisComEventos.push(retorno[key]);
        }  
        $scope.listaEventos = listagemModel.listaEventosFront(arrayLocaisComEventos);
        //$scope.$apply();
        $ionicLoading.hide();
        console.log(response);
    };

    var listaEventosErro = function(response){
        alert("Failed: " + response);
    };
    
    $scope.listaEventos = function () {
        facebookConnectPlugin.api("/?ids="+$scope.idsEventos+"&fields=id,name,cover,description,attending_count,place,start_time&limit=500&access_token=" + $scope.user.authResponse.accessToken, null, listaEventosSucesso, listaEventosErro);
    };
    
});