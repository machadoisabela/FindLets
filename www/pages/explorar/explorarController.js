app.controller('explorarController', function ($scope, UserService, explorarModel, $ionicModal, $timeout) {

    var user = UserService.getUser();
    $scope.textoPesquisa = null;

    $scope.clearSearch = function(){
        $scope.textoPesquisa = null;
    };

    var explorarSucesso = function(response){
        var retorno = response.data;
        $scope.eventosExplorados = explorarModel.explorarEventosFront(retorno);
        $scope.$apply();
        $scope.openModal();
    };

    var explorarErro = function(response){
        console.log("Erro");
    };

    $scope.explorarEventos = function(textoPesquisa){
        facebookConnectPlugin.api("/search?q="+textoPesquisa+",SãoPaulo&type=event&fields=id,name,cover,description,attending_count,place,start_time&limit=500&access_token=" + user.authResponse.accessToken, null, explorarSucesso, explorarErro);
    };

    $scope.detalhesEventos = function(id){
        $location.path('/detalhe/'+id);
    };    

    $ionicModal.fromTemplateUrl('explorar-eventos.html', {
        scope: $scope,
        animation: 'slide-in-up',
    }).then(function(modal) {
        $scope.modal = modal;
    });
      
    $scope.openModal = function() {
        $timeout(function(){
            $scope.modal.show(); 
        },0)
    };
      
     $scope.closeModal = function() {
        $scope.modal.hide();
     };
});