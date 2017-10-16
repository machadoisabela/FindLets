app.controller('listagemEventosController', function ($scope, Chats, UserService, listagemModel, $location) {

  
  $scope.eventos = [];

  var user = UserService.getUser();

  var listaEventosSucesso = function(response){
    var retorno = response.data || {};
    $scope.paginacao = response.paging;
    $scope.eventos = listagemModel.listaEventosFront(retorno);
    console.log(response);
  };

  var listaEventosErro = function(response){
    alert("Failed: " + response);
  };

  $scope.listaEventos = function () {
    facebookConnectPlugin.api("/search?q=SãoPaulo&type=event&fields=id,name,cover,description,attending_count,place,start_time&limit=500&access_token=" + user.authResponse.accessToken, null, listaEventosSucesso, listaEventosErro);
  };

  $scope.detalhesEventos = function(id){
    $location.path('/detalhe/'+id);
  };
  
  // $scope.proximaPagina = function(){
    //   
    //var urlPaginacao = $scope.paginacao.next.replace('https://graph.facebook.com/v2.10','');
  //   facebookConnectPlugin.api(urlPaginacao, null, function(response){
  //     var retorno = response.data || {};
  //     $scope.paginacao = response.paging;
  //     $scope.eventos = listagemModel.listaEventosFront(retorno);
  //   });
  // };

//   var items = [];
//   $scope.apiCall = function(next) {
//     var urlPaginacao = next.replace('https://graph.facebook.com/v2.10','');
//     facebookConnectPlugin.api(urlPaginacao, null, function (response) {
//           for (var i = 0; i < response.data.length; i++) {
              //add all posts to the items array
        //       items.push(response.data[i]);
        //   }
        //   if (response.paging && response.paging.next) {
              //call function recursively until there is no "next"
        //       $scope.apiCall(response.paging.next);
        //   } else {
              //this is when it´s done
//               console.log(items);
//               $scope.eventos = listagemModel.listaEventosFront(items);
//           }
//       });
//   };

  $scope.$on('$ionicView.enter', function () {
    $scope.listaEventos();
    //$scope.apiCall("https://graph.facebook.com/v2.10/search?q=SãoPaulo&type=event&fields=id,name,cover,description,attending_count,place,start_time&limit=500&access_token=" + user.authResponse.accessToken);
  });


  
});