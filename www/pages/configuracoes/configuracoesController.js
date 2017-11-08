app.controller('detalheController', function ($scope, $ionicLoading) {    
    
  $ionicLoading.show({
      template: '<ion-spinner icon="crescent"></ion-spinner>'
  });

  $scope.voltar = function(){
      history.back();
  };  
    
});