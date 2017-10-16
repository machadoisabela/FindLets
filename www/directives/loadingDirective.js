app.directive('flLoading', ['$http', function($http) {
    return {
        restrict: 'AE',
        template: '<ion-spinner icon="crescent"></ion-spinner>',
        link: function($scope, $element) {

            $scope.isLoading = function() {
                return $http.pendingRequests.length > 0;
            };

            $scope.$watch($scope.isLoading, function(inLoading) {
                if (inLoading) {
                    $element.show();
                } else {
                    $element.hide();
                }
            });
        }
    };
}]);