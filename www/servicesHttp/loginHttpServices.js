app.service('loginHttpServices', function ($http) {
    
      var _salvar = function (dados) {
        return $http({
          method: 'POST',
          url: "http://findlets.azurewebsites.net/WebService/Home/novoUsuario",
          headers: {
            'Content-Type': 'application/json',
          },
          data: dados
        });
      };
    
      return {
        salvar: _salvar
      }
});