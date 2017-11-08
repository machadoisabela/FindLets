app.factory('loginModel', function() {

        var _salvarUsuario = function(dadosFront){
            var model = null;
            if(dadosFront){
                model = {
                    id: dadosFront.id,
                    access_token: dadosFront.access_token,
                    name: dadosFront.name,
                    email: dadosFront.email,
                    picture: dadosFront.picture
                };
            }
            return model;
        };
       
        return {
            salvarUsuario: _salvarUsuario
        };
    });