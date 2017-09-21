app.factory('mapaModel', function() {
    
        var _listaEventosMapaFront = function(dadosBack){
            var model = [];
            if(dadosBack){
                dadosBack.forEach(function(item){
                    model.push({
                        lat: item.place && item.place.location && item.place.location.latitude ? item.place.location.latitude : null,
                        lng: item.place && item.place.location && item.place.location.longitude ? item.place.location.longitude : null,
                        class: "custom-marker" 
                    });
                });
            }
            return model;
        };

        var _listaLugaresFront = function(dadosBack){
            var modelFront = [];
            if(dadosBack){
                dadosBack.forEach(function(item){
                    modelFront.push({
                        lat: item.location && item.location.latitude ? item.location.latitude : null,
                        lng: item.location && item.location.longitude ? item.location.longitude : null,
                        class: "custom-marker"
                    });
                });
            }
            return modelFront;
        };

        var _listaIdsFront = function(dadosBack){
            var modelFront = [];
            if(dadosBack){
                dadosBack.forEach(function(item){
                    modelFront.push(item.id);
                });
            }
            return modelFront;
        };
    
        return {
            listaEventosMapaFront: _listaEventosMapaFront,
            listaLugaresFront: _listaLugaresFront,
            listaIdsFront: _listaIdsFront
        };
    });