(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mod;

mod = angular.module('adminr0');

mod.run(function($templateCache) {
  return $templateCache.put('adminr-login', require('./index.html'));
});

mod.controller('AdminrLogin', function($scope, DataSources) {
  $scope.dataSource = DataSources.getDataSource();
  return $scope.authorize = function(username, password, rememberMe) {
    return $scope.dataSource.authorize(username, password, !rememberMe);
  };
});


},{"./index.html":2}],2:[function(require,module,exports){
module.exports = '<span ng-controller="AdminrLogin">\n    <span ng-if="dataSource.isAuthorized()" adminr-show-container="\'adminr-login\'"></span>\n    <div class="container" ng-if="!dataSource.isAuthorized()">\n        <div class="row">\n            <div class="col-sm-6 col-md-4 col-md-offset-4">\n                <h1 class="text-center login-title">\n                    Sign in to continue to\n                    <br /> TheFuntasty Distribution\n                    <br /> <small>datasource: {{dataSource.name}}</small>\n                </h1>\n                <div class="account-wall">\n                    <!--<img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="">-->\n                    <form class="form-signin" ng-submit="authorize(username,password,rememberMe)">\n                        <div class="alert alert-danger" ng-if="loginError">{{loginError.error}}</div>\n                        <input type="email" class="form-control" ng-model="username" placeholder="Email" required autofocus>\n                        <input type="password" class="form-control" ng-model="password" placeholder="Password" required>\n                        <div class="checkbox">\n                            <label>\n                                <input type="checkbox" ng-model="rememberMe" value="remember-me">\n                                Remember me\n                            </label>\n                        </div>\n                        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>\n                        <!--<a href="#" class="pull-right need-help">Need help? </a><span class="clearfix"></span>-->\n                    </form>\n                </div>\n                <!--<a href="#" class="text-center new-account">Create an account </a>-->\n            </div>\n        </div>\n    </div>\n</span>';
},{}]},{},[1]);
