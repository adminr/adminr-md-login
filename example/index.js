var mod = angular.module('adminr-core-test',['adminr-md-login']);

mod.config(function(AdminrDataSourcesProvider,AdminrMdLoginProvider){
    AdminrMdLoginProvider.setAsRootContainerView()

    AdminrMdLoginProvider.setLoggedView('logged-view.html')
    AdminrMdLoginProvider.usernameType = AdminrMdLoginProvider.TEXT
    var datasource = AdminrDataSourcesProvider.createDataSource('Test','https://adminr-test-api.herokuapp.com')

    datasource.addResource('Me','/me')
})

//mod.run(function($templateCache){
//    $templateCache.put('logged-view.html','<div ng-controller="TestCtrl"><h1>Hello {{me.loading ? \'...\' : me.data.username}} <br /><small>You are now logged!</small></h1><button ng-click="datasource.logout()">logout</button></div>')
//})