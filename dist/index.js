(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mod;

mod = angular.module('adminr-login', ['adminr-datasources', 'ngMaterial']);

mod.run(["$templateCache", function($templateCache) {
  return $templateCache.put('adminr-login', require('./index.html'));
}]);

mod.controller('AdminrLogin', ["$scope", "DataSources", function($scope, DataSources) {
  $scope.dataSource = DataSources.getDataSource();
  $scope.authorizing = false;
  $scope.authorizationError = null;
  return $scope.authorize = function(username, password, rememberMe) {
    $scope.authorizing = true;
    $scope.authorizationError = null;
    return $scope.dataSource.authorize(username, password, !rememberMe).then(function() {
      return $scope.authorizing = false;
    })["catch"](function(error) {
      $scope.authorizing = false;
      return $scope.authorizationError = error;
    });
  };
}]);


},{"./index.html":2}],2:[function(require,module,exports){
module.exports = '<div ng-controller="AdminrLogin">\n    <div ng-if="dataSource.isAuthorized()" adminr-container="\'adminr-login\'"></div>\n    <div ng-if="!dataSource.isAuthorized()" style="background: #eeeeee;position:absolute;width:100%;height: 100%">\n        <div style="max-width: 420px;margin:0 auto;" layout="column">\n            <h2 style="text-align: center">Sign in to continue</h2>\n            <md-card>\n                <form ng-submit="authorize(username,password,rememberMe)">\n                    <div layout-padding layout="column">\n                        <md-input-container flex>\n                            <label>Username</label>\n                            <input type="text" ng-model="username" ng-disabled="authorizing" required autofocus>\n                        </md-input-container>\n                        <md-input-container flex>\n                            <label>Password</label>\n                            <input type="password" ng-model="password" ng-disabled="authorizing" required>\n                        </md-input-container>\n                        <md-checkbox ng-model="rememberMe">remember me</md-checkbox>\n                        <div layout="row">\n                            <div flex></div>\n                            <input type="submit" value="Sign in" class="md-button md-primary" />\n                        </div>\n                    </div>\n                </form>\n            </md-card>\n        </div>\n    </div>\n</div>';
},{}]},{},[1]);
