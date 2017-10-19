app.factory('detalheModel', function() {
    
        var _obterEvento = function(dadosBack){
            var modelFront = null;
            if(dadosBack){
              
                modelFront = {
                    id: dadosBack.id || null,
                    nome: dadosBack.name || null,
                    descricao:dadosBack.description || null,
                    capa: dadosBack.cover ? dadosBack.cover.source : null,
                    dataInicio: dadosBack.start_time ? moment(dadosBack.start_time).format('L') : null,
                    diaInicio: dadosBack.start_time ? moment(dadosBack.start_time).format('DD') : null,
                    mesInicio: dadosBack.start_time ? moment(dadosBack.start_time).format('MMM') : null,
                    horarioInicio: dadosBack.start_time ? moment(dadosBack.start_time).format('LT') : null,
                    usuariosConfirmados: dadosBack.attending_count || null,
                    lugar: dadosBack.place ? {
                        id: dadosBack.place.id,
                        nome: dadosBack.place.name,
                        localizacao: dadosBack.place.location ? {
                            cidade: dadosBack.place.location.city,
                            latitude: dadosBack.place.location.latitude,
                            longitude: dadosBack.place.location.longitude,
                            rua: dadosBack.place.location.street,
                            estado: dadosBack.place.location.state,
                            pais: dadosBack.place.location.country
                        } : null
                    } : null
                };
            }
            return modelFront;
        };
    
        return {
            obterEvento: _obterEvento
        };
    });