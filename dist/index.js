(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mod;

mod = angular.module('adminr-md-login', ['adminr-datasources', 'ngMaterial', 'adminr-core']);

mod.config(["AdminrContainerManagerProvider", function(AdminrContainerManagerProvider) {
  return AdminrContainerManagerProvider.setViewForContainer('adminr-md-login-form', 'adminr-md-login-form');
}]);

mod.run([
  '$templateCache', function($templateCache) {
    $templateCache.put('adminr-md-login', require('./views/index.html'));
    return $templateCache.put('adminr-md-login-form', require('./views/form.html'));
  }
]);

mod.provider('AdminrMdLogin', [
  'AdminrContainerManagerProvider', function(AdminrContainerManagerProvider) {
    var AdminrMdLogin;
    AdminrMdLogin = (function() {
      function AdminrMdLogin() {}

      AdminrMdLogin.USERNAME_TYPE_EMAIL = 'email';

      AdminrMdLogin.USERNAME_TYPE_TEXT = 'text';

      AdminrMdLogin.prototype.usernameType = AdminrMdLogin.USERNAME_TYPE_EMAIL;

      AdminrMdLogin.prototype.setAsRootContainerView = function() {
        return AdminrContainerManagerProvider.setViewForRootContainer('adminr-md-login');
      };

      AdminrMdLogin.prototype.setLoggedView = function(view) {
        return AdminrContainerManagerProvider.setViewForContainer('adminr-md-login-content', view);
      };

      AdminrMdLogin.prototype.$get = function() {
        return this;
      };

      return AdminrMdLogin;

    })();
    return new AdminrMdLogin();
  }
]);

mod.controller('AdminrLogin', [
  '$scope', 'AdminrDataSources', '$mdDialog', function($scope, AdminrDataSources, $mdDialog) {
    $scope.dataSource = AdminrDataSources.getDataSource();
    $scope.authorizing = false;
    $scope.authorizationError = null;
    $scope.authorize = function(username, password, rememberMe) {
      if (!$scope.dataSource) {
        return console.error('datasource not defined');
      }
      $scope.authorizing = true;
      $scope.authorizationError = null;
      rememberMe = true;
      return $scope.dataSource.authorize(username, password, !rememberMe).then(function() {
        return $scope.authorizing = false;
      })["catch"](function(error) {
        var ref;
        $scope.authorizing = false;
        $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title('Login failed!').content('Reason: ' + (((ref = error.data) != null ? ref.error : void 0) || 'unknown')).ariaLabel('Login error').ok('Ok!'));
        return $scope.authorizationError = error;
      });
    };
    return $scope.getContainerKey = function() {
      var ref;
      if ((ref = $scope.dataSource) != null ? ref.isAuthorized() : void 0) {
        return 'adminr-md-login-content';
      }
      return 'adminr-md-login-form';
    };
  }
]);


},{"./views/form.html":2,"./views/index.html":3}],2:[function(require,module,exports){
module.exports = '<div ng-controller="AdminrLogin" class="adminr-md-login-form">\n    <div ng-if="dataSource.isAuthorized()" adminr-container="\'adminr-md-login-content\'" style="height: 100%;overflow: hidden"></div>\n    <div ng-if="!dataSource.isAuthorized()" style="background: #eeeeee;position:absolute;width:100%;height: 100%">\n        <div style="max-width: 420px;margin:0 auto;" layout="column">\n            <h2 style="text-align: center">Sign in to continue</h2>\n            <md-card>\n                <md-progress-linear md-mode="indeterminate" ng-hide="!authorizing"></md-progress-linear>\n                <form layout-padding ng-submit="authorize(username,password,rememberMe)">\n                    <div layout="column">\n                        <md-input-container flex>\n                            <label>{{usernameType == \'email\' ? \'E-mail\' : \'Username\'}}</label>\n                            <input type="{{usernameType == \'email\' ? \'E-mail\' : \'Username\'}}" name="username" type="{{usernameType}}" ng-model="username" ng-disabled="authorizing" required autofocus>\n                        </md-input-container>\n                        <md-input-container flex>\n                            <label>Password</label>\n                            <input type="password" ng-model="password" ng-disabled="authorizing" required>\n                        </md-input-container>\n                        <!--<md-checkbox ng-model="rememberMe">remember me</md-checkbox>-->\n                        <div layout="row">\n                            <div flex></div>\n                            <input type="submit" layout-fill value="Sign in" class="md-button md-raised md-primary" />\n                        </div>\n                    </div>\n                </form>\n            </md-card>\n        </div>\n    </div>\n</div>';
},{}],3:[function(require,module,exports){
module.exports = '<div ng-controller="AdminrLogin" class="adminr-md-login" adminr-container="getContainerKey()" style="height:100%">\n</div>';
},{}]},{},[1]);
