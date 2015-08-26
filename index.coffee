mod = angular.module('adminr-md-login',['adminr-datasources','ngMaterial'])

mod.run(($templateCache)->
  $templateCache.put('adminr-md-login',require('./index.html'))
)

mod.controller('AdminrLogin',($scope,DataSources,$mdDialog)->
  $scope.dataSource = DataSources.getDataSource()

  $scope.authorizing = no
  $scope.authorizationError = null

  $scope.authorize = (username,password,rememberMe)->
    $scope.authorizing = yes
    $scope.authorizationError = null
    $scope.dataSource.authorize(username,password,!rememberMe).then(()->
      $scope.authorizing = no
    ).catch((error)->
      $scope.authorizing = no
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(true)
        .title('Login failed!')
        .content('Reason: ' + (error.data.error || 'unknown'))
        .ariaLabel('Login error')
        .ok('Ok!')
      );
      $scope.authorizationError = error
    )
)

