app.service('eventosHttpServices', function ($http) {
    
      var _favoritarEvento = function (dados) {
        return $http({
          method: 'POST',
          url: "http://findlets.azurewebsites.net/WebService/User/FavoritaEvento",
          headers: {
            'Content-Type': 'application/json',
          },
          data: dados
        });
      };
    
      var _desfavoritarEvento = function (dados) {
        return $http({
          method: 'POST',
          url: "http://findlets.azurewebsites.net/WebService/User/DesfavoritaEvento",
          headers: {
            'Content-Type': 'application/json',
          },
          data: dados
        });
      };

      var _listaEventosFavoritados = function (dados) {
        return $http({
          method: 'POST',
          url: "http://findlets.azurewebsites.net/WebService/User/ListaEventos",
          headers: {
            'Content-Type': 'application/json',
          },
          data: dados
        });
      };
    
      return {        
        favoritarEvento: _favoritarEvento,
        desfavoritarEvento: _desfavoritarEvento,
        listaEventosFavoritados: _listaEventosFavoritados 
      }
});