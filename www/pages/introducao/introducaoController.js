app.controller('introducaoController', function ($scope,  $ionicSlideBoxDelegate, $state) {
    
    $scope.proximoSlide = function(){
        $ionicSlideBoxDelegate.next();  
        $scope.numero = $ionicSlideBoxDelegate.currentIndex();    
    };

    $scope.explorar = function(){
        $state.go('login');
    };

 });