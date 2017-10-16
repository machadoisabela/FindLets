app.controller('loginController', function ($scope, $state, $q, UserService, $ionicLoading, loginHttpServices, loginModel) {
  
    var fbLoginSuccess = function(response) {
      if (!response.authResponse){
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;

      getFacebookProfileInfo(authResponse).then(function(profileInfo) {

        facebookConnectPlugin.api(authResponse.userID+"/?fields=birthday,first_name", ["public_profile"],function(response){
          $scope.retorno = response;        

          UserService.setUser({
            authResponse: authResponse,
            userID: profileInfo.id,
            name: profileInfo.name,
            email: profileInfo.email,
            picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large",
            birthday: $scope.retorno.birthday,
            name: $scope.retorno.first_name
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
            }else{
              profileInfo.birthday = moment(user.birthday).format();
              profileInfo.access_token = authResponse.accessToken;
              var dados = loginModel.salvarUsuario(profileInfo);
              
              loginHttpServices.salvar(dados).then(function(response){
                if(response.data == "True"){
                  alert("Usuário salvo");
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
       
      }, function(fail){
        console.log('profile info fail', fail);
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

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){

        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

    		// Check if we have our user saved
    		var user = UserService.getUser('facebook');

    		if(!user.userID){
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {
						// For the purpose of this example I will store user data on local storage
						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});

						$state.go('tab.listagem');
					}, function(fail){
						// Fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
					$state.go('tab.listagem');
				}
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
        // Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.

				console.log('getLoginStatus', success.status);

				$ionicLoading.show({
          template: 'Logging in...'
        });

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'user_birthday', 'public_profile', 'user_events', 'user_friends'], fbLoginSuccess, fbLoginError);
      }
    });
   
    
  };
});