app.factory('listagemModel', function() {

    var _listaEventosFront = function(dadosBack){
        var modelFront = [];
        if(dadosBack){
            dadosBack.forEach(function(item){
                modelFront.push({
                    id: item.id || null,
                    nome: item.name || null,
                    descricao:item.description || null,
                    capa: item.cover ? item.cover.source : null,
                    dataInicio: item.start_time ? moment(item.start_time).format('L') : null,
                    diaInicio: item.start_time ? moment(item.start_time).format('DD') : null,
                    mesInicio: item.start_time ? moment(item.start_time).format('MMM') : null,
                    horarioInicio: item.start_time ? moment(item.start_time).format('LT') : null,
                    usuariosConfirmados: item.attending_count || null,
                    lugar: item.place ? {
                        id: item.place.id,
                        nome: item.place.name,
                        localizacao: item.place.location ? {
                            cidade: item.place.location.city,
                            latitude: item.place.location.latitude,
                            longitude: item.place.location.longitude
                        } : null
                    } : null
                });
            });
        }
        return modelFront;
    };

    return {
        listaEventosFront: _listaEventosFront
    };
});