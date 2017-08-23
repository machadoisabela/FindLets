app.controller('DashCtrl', function($scope) {})

app.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.cards =[
    {
      imagem: "http://www.smartkids.com.br/content/articles/images/768/thumb/festa-junina.png",
      texto: "meu evento",
      like: "4 likes",
      comentario: "4 comentários"
    },
    {
      imagem: "http://www.smartkids.com.br/content/articles/images/768/thumb/festa-junina.png",
      texto: "meu evento",
      like: "4 likes",
      comentario: "4 comentários"
    }
  ]

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

// app.controller('loginController',function ($scope, $ionicModal, $timeout, ngFB) {
//   $scope.fbLogin = function () {
//     ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
//         function (response) {
//             if (response.status === 'connected') {
//                 console.log('Facebook login succeeded');
//                 $scope.closeLogin();
//             } else {
//                 alert('Facebook login failed');
//             }
//         });
//   };
// });
