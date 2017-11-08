app.controller('listagemEventosController', function ($scope, UserService, listagemModel, $location, $ionicLoading, eventosHttpServices) {

  
  $scope.listaEventos = [];
  $scope.favoritosUsuario = [];
  $scope.dataEventos = moment().format();

  var user = UserService.getUser();

  var listaEventosSucesso = function(response){
    var retorno = response.data || {};
    $scope.paginacao = response.paging;
    $scope.listaEventos = listagemModel.listaEventosFront(retorno);
    //$scope.$apply();
    $ionicLoading.hide();
    console.log(response);
  };

  $scope.listaFavoritos = function(){
    var dados = {
        id_user: user.userID
    };
    eventosHttpServices.listaEventosFavoritados(dados).then(function(response){
      $scope.favoritosUsuario = response.data;
      $scope.listaEventos(); 
    });
  };
  $scope.listaFavoritos();

  var listaEventosErro = function(response){
    alert("Failed: " + response);
  };

  $scope.listaEventos = function () {
    facebookConnectPlugin.api("/search?q=SãoPaulo&type=event&fields=id,name,cover,description,attending_count,place,start_time&limit=500&access_token=" + user.authResponse.accessToken, null, listaEventosSucesso, listaEventosErro);
  };

  $scope.detalhesEventos = function(id){
    $location.path('/detalhe/'+id);
  };

  // $scope.selecionaFavorito = function(item){
  //   return $scope.favoritosUsuario.indexOf(item.id != -1);
  // };
   
  $ionicLoading.show({
    template: '<ion-spinner icon="crescent"></ion-spinner>'
  });

  $scope.favoritar = function(idEvento){
    var dados = {
      id_user: user.userID,
      id_event: idEvento
    };
    eventosHttpServices.favoritarEvento(dados).then(function(response){
      if(response.data == 'True'){
        $ionicPopup.alert({
          title: 'Favoritado!',
          template: 'Evento adicionado a sua lista de favoritos'
        });
      }else{
        console.log("Erro", response.data);
      }
    });
  };


  
});