mod = angular.module('adminr-md-login',['adminr-datasources','ngMaterial','adminr-core'])

mod.config((AdminrContainerManagerProvider)->
  AdminrContainerManagerProvider.setViewForContainer('adminr-md-login-form','adminr-md-login-form')
)

mod.run(['$templateCache',($templateCache)->
  $templateCache.put('adminr-md-login',require('./views/index.html'))
  $templateCache.put('adminr-md-login-form',require('./views/form.html'))
])

mod.provider('AdminrMdLogin',['AdminrContainerManagerProvider',(AdminrContainerManagerProvider)->
  class AdminrMdLogin
    @USERNAME_TYPE_EMAIL = 'email'
    @USERNAME_TYPE_TEXT = 'text'
    usernameType: @USERNAME_TYPE_EMAIL

    setAsRootContainerView:()->
      AdminrContainerManagerProvider.setViewForRootContainer('adminr-md-login')

    setLoggedView:(view)->
      AdminrContainerManagerProvider.setViewForContainer('adminr-md-login-content',view)

    $get:()->
      return @

  return new AdminrMdLogin()
])

mod.controller('AdminrLogin',['$scope','AdminrDataSources','$mdDialog',($scope,AdminrDataSources,$mdDialog)->
  $scope.dataSource = AdminrDataSources.getDataSource()

  $scope.authorizing = no
  $scope.authorizationError = null

  $scope.authorize = (username,password,rememberMe)->
    if not $scope.dataSource
      return console.error('datasource not defined')
    $scope.authorizing = yes
    $scope.authorizationError = null
    rememberMe = yes
    $scope.dataSource.authorize(username,password,!rememberMe).then(()->
      $scope.authorizing = no
    ).catch((error)->
      $scope.authorizing = no
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(true)
        .title('Login failed!')
        .content('Reason: ' + (error.data?.error || 'unknown'))
        .ariaLabel('Login error')
        .ok('Ok!')
      );
      $scope.authorizationError = error
    )

  $scope.getContainerKey = ()->
    if $scope.dataSource?.isAuthorized()
      return 'adminr-md-login-content'
    return 'adminr-md-login-form'
])