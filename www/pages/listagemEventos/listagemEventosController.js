app.controller('listagemEventosController', function($scope, Chats, UserService, listagemModel) {

    $scope.$on('$ionicView.enter', function() {
         $scope.listaEventos();
    });
  
      var user = UserService.getUser();
      $scope.listaEventos = function(){
        
        facebookConnectPlugin.api("/search?q=*&type=event&fields=id,name,cover,description,attending_count,place,start_time&access_token=" + user.authResponse.accessToken, null,
          function (response) {
            var retorno = response.data || {};
            $scope.eventos = listagemModel.listaEventosFront(retorno);
              // alert(JSON.stringify(response));
              console.log(response);
          },
          function (error) {
              alert("Failed: " + error);
        });
      };          
});