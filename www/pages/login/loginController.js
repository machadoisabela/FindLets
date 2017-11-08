app.controller('loginController', function ($scope, $state, $q, UserService, $ionicLoading, loginHttpServices, loginModel, $location) {
  
    var fbLoginSuccess = function(response) {
      if (!response.authResponse){
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;

      getFacebookProfileInfo(authResponse).then(function(profileInfo) {

          UserService.setUser({
            authResponse: authResponse,
            userID: profileInfo.id,
            name: profileInfo.name,
            email: profileInfo.email,
            picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
          });
            
          var user = UserService.getUser();

          var dadosPesquisa = {
            id: profileInfo.id,
            access_token: authResponse.accessToken
          };

          loginHttpServices.pesquisaUsuario(dadosPesquisa).then(function(response){
            if(response.data != ""){
              console.log("Usuário já cadastrado");
              $ionicLoading.hide();
              $state.go('tab.listagem');
            }
            else{
              var dados = {
                id: profileInfo.id,
                access_token: authResponse.accessToken,
                name: profileInfo.name,
                email: profileInfo.email
              };
              
              loginHttpServices.salvar(dados).then(function(response){
                if(response.data == "True"){
                  console.log("Usuário salvo");
                  $ionicLoading.hide();
                  $state.go('tab.listagem');
                }else{
                  console.log('Erro no cadastro');
                }               
              },function(response){
                alert("Erro ao salvar usuário");
                console.log(response);
              });
            }      
          });   
        }, function(response){
          console.log("Erro ao buscar");
        });       
    };

  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  //Pega as informações do perfil do usuário no Facebook
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
				console.log(response);
        info.resolve(response);
      },
      function (response) {
				console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

 
  $scope.facebookLogar = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
    		var user = UserService.getUser('facebook');

    		if(!user.userID){
					getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {

						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});

            $location.path('/listagem');
					}, function(fail){
						console.log('profile info fail', fail);
					});
				}else{
					$state.go('tab.listagem');
				}
      } 
      else {      
				$ionicLoading.show({
          template: '<ion-spinner icon="crescent"></ion-spinner>'
        });
        facebookConnectPlugin.login(
          ['email','user_birthday','public_profile','user_events','user_friends'], fbLoginSuccess, fbLoginError
        );
      }
    });
   
    
  };
});