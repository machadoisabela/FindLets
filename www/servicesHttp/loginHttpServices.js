app.service('loginHttpServices', function ($http) {
    
      var _salvar = function (dados) {
        return $http({
          method: 'POST',
          url: "http://findlets.azurewebsites.net/WebService/User/NovoUsuario",
          headers: {
            'Content-Type': 'application/json',
          },
          data: dados
        });
      };

      var _pesquisaUsuario = function (dados) {
        return $http({
          method: 'POST',
          url: "http://findlets.azurewebsites.net/WebService/User/PesquisaUsuario",
          headers: {
            'Content-Type': 'application/json',
          },
          data: dados
        });
      };
    
      return {
        salvar: _salvar,
        pesquisaUsuario: _pesquisaUsuario
      }
});