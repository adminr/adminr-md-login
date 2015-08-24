mod = angular.module('adminr-login',[])

mod.run(($templateCache)->
  $templateCache.put('adminr-login',require('./index.html'))
)

mod.controller('AdminrLogin',($scope,DataSources)->
  $scope.dataSource = DataSources.getDataSource()

  $scope.authorize = (username,password,rememberMe)->
    $scope.dataSource.authorize(username,password,!rememberMe)
)

