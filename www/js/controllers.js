app.controller('DashCtrl', function($scope) {})

// app.controller('ChatsCtrl', function($scope, Chats, UserService, listagemModel) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
//   $scope.$on('$ionicView.enter', function() {
//     $scope.listaEventos();
//   });
  
  
//     var user = UserService.getUser();
//     $scope.listaEventos = function(){
      
//       facebookConnectPlugin.api("/search?q=*&type=event&fields=id,name,cover,description,attending_count,place,start_time&access_token=" + user.authResponse.accessToken, null,
//         function (response) {
//           var retorno = response.data || {};
//           $scope.eventos = listagemModel.listaEventosFront(retorno);
//             // alert(JSON.stringify(response));
//             console.log(response);
//         },
//         function (error) {
//             alert("Failed: " + error);
//       });
//     };
   
   
// })

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

