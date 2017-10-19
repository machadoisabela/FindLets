app.controller('mapaController', function ($scope, $ionicLoading, $cordovaGeolocation, UserService, mapaModel, $ionicActionSheet, $ionicModal, $timeout, NgMap, $ionicBackdrop) {

    var user = UserService.getUser();

    $scope.customMarkers = [];   
    $scope.dataHoje = moment().format();

    // $scope.init = function(map) {
    //     $scope.mymap = map;
    //     $scope.$apply();
    // };
    NgMap.getMap().then(function (map) {
        $scope.map = map;
    });
    

    $scope.atualizaLocalizacao = function(localizacaoAtual){
        $scope.customMarkers = localizacaoAtual;
        $scope.$apply();
        alert("setou array");
    };

    var eventosPorLugarSucesso = function(response){
        var retorno = response || {}
        var arrayLocaisComEventos = [];
        for (var key in retorno) {
            arrayLocaisComEventos.push(retorno[key]);
        }  
        var modelRetorno = [];
        $scope.arrayEventos = angular.isArray(arrayLocaisComEventos) ? arrayLocaisComEventos.map(function(item){
            if(item.events && item.events.data.length > 0){
                return{
                    id: item.id,
                    nome: item.name,
                    rua: item.location && item.location.street ? item.location.street : null,
                    estado: item.location && item.location.state ? item.location.state : null,
                    latitude: item.location && item.location.latitude ? item.location.latitude : null,
                    longitude: item.location && item.location.longitude ? item.location.longitude : null,
                    capa: item.cover && item.cover.source ? item.cover.source : null,
                    eventos: angular.isArray(item.events.data) ? item.events.data.map(function(evento){
                        return{
                            idEvento: evento.id,
                            nomeEvento: evento.name,
                            capaEvento: evento.cover && evento.cover.source ? evento.cover.source : null,
                            dataInicioEvento: evento.start_time ? moment(evento.start_time).format('L') : null,
                            diaInicioEvento: evento.start_time ? moment(evento.start_time).format('DD') : null,
                            mesInicioEvento: evento.start_time ? moment(evento.start_time).format('MMM') : null,
                            horarioInicioEvento: evento.start_time ? moment(evento.start_time).format('LT') : null,
                        };
                    }):[]
                   };
            }else{
                return{};
            }               
        }):[]            
        
        $scope.atualizaLocalizacao($scope.arrayEventos);   
        console.log($scope.arrayEventos);
    };

    var eventosPorLugarErro = function(response){
        console.log('Erro', response);
    };
   
    $scope.eventosPorLugar = function(eventosProximos){
        var idsConcatenados = eventosProximos.join();
        facebookConnectPlugin.api("/?ids="+idsConcatenados+"&fields=id,name,about,emails,cover.fields(id,source),picture.type(large),category,category_list.fields(name),location,events.fields(id,type,name,cover.fields(id,source),picture.type(large),description,start_time,end_time,category,attending_count,declined_count,maybe_count,noreply_count).since("+$scope.dataHoje+")&access_token=" + user.authResponse.accessToken, ['user_events'], eventosPorLugarSucesso, eventosPorLugarErro); 
    };

    var onSuccess = function(position) {
        
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n'+
            'all: ' + position.coords+ '\n');

            $scope.minhaLatitude = position.coords.latitude;
            $scope.minhaLongitude = position.coords.longitude;

            facebookConnectPlugin.api("/search?q=*&type=place&fields=id&center="+position.coords.latitude+","+position.coords.longitude+"&distance=1000&limit=50&access_token=" + user.authResponse.accessToken, null,function(response){
               
                var retorno = response.data || {};
                $scope.idsEventosProximos = mapaModel.listaIdsFront(retorno);     
                $scope.eventosPorLugar($scope.idsEventosProximos);                        
                
            }); 
    };
    
    var onError = function(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    };

    $scope.tryGeoLocation = function(){
        // $ionicLoading.show({
        //   template: '<ion-spinner icon="crescent"></ion-spinner>'
        // });
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    $scope.tryGeoLocation();
    $ionicModal.fromTemplateUrl('detalhes-eventos.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: true
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

    $scope.mostrarDetalhes = function(event, item){
        console.log(item);
        $scope.eventosLocalEscolhido = item.os.reverse();
        $scope.localEvento = item.nome;
       $scope.openModal();
    };
    
});