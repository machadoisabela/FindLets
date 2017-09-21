app.controller('mapaController', function ($scope, $ionicLoading, $cordovaGeolocation, UserService, mapaModel) {

    var user = UserService.getUser();

    $scope.search = { input: '' };
    $scope.markers_collection = []; 
    $scope.customMarkers = [];   

    $scope.init = function(map) {
        $scope.mymap = map;
        $scope.$apply();
    };

    $scope.atualizaLocalizacao = function(localizacaoAtual){
        $scope.customMarkers = localizacaoAtual;
        alert("setou array");
    };
    
    // $scope.listaEventosPorLugares = function(ids){
    //     var idsConcatenados = ids.join();
    //     facebookConnectPlugin.api("/?ids="+ids+"&fields=city,name,category,location,picture,events.fields(id,type,name,start_time,end_time,cover,category)&access_token=" + user.authResponse.accessToken, null,function(response){
    //         var retorno = response.data || {}
    //         var array = [];
    //         retorno.forEach(function(item) {
    //             array.push({
    //                 id: item.id
    //             });
    //         });
    //         console.log(array);
    //     }); 

       
    // };  

    $scope.tryGeoLocation = function(){
        // $ionicLoading.show({
        //   template: 'Getting current position ...'
        // });
      
        $scope.search.input = "";

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

                console.log(user.authResponse.accessToken);

                $scope.minhaLatitude = position.coords.latitude;
                $scope.minhaLongitude = position.coords.longitude;

                facebookConnectPlugin.api("/search?q=*&type=place&fields=id&center="+position.coords.latitude+","+position.coords.longitude+"&distance=1000&limit=1000&access_token=" + user.authResponse.accessToken, null,function(response){
                   
                    var retorno = response.data || {};
                    $scope.lugaresProximos = mapaModel.listaLugaresFront(retorno);
                    $scope.idsEventosProximos = mapaModel.listaIdsFront(retorno);                                  
                    
                }); 
        };

        $scope.eventosPorLugar = function(){
            var idsConcatenados = $scope.idsEventosProximos.join();
            facebookConnectPlugin.api("/?ids="+idsConcatenados+"&fields=city,name,category,location,picture,events.fields(id,type,name,start_time,end_time,cover,category)&access_token=" + user.authResponse.accessToken, null,function(response){
                var retorno = response.data || {}
                var array = [];
                retorno.forEach(function(item) {
                    array.push({
                        id: item.id
                    });
                });
                $scope.atualizaLocalizacao($scope.eventosProximos);   
                console.log(array);
            },function(){
                alert("erro");
            }); 
        };
    
        var onError = function(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        };
    
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    
});