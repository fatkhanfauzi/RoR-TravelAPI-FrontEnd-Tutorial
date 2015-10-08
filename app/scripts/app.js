'use strict';

/**
 * @ngdoc overview
 * @name feworkspaceApp
 * @description
 * # travelApiApp
 *
 * Main module of the application.
 */
angular
  .module('travelApiApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'travelApiApp.tags',
    'travelApiApp.destinations',
    'travelApiApp.services'
  ]);

  angular.module('travelApiApp').config(function($stateProvider,$httpProvider){
    $stateProvider.state('tags',{
        url:'/tags',
        templateUrl:'views/partials/tags.html',
        controller:'TagListController'
    }).state('viewTag',{
       url:'/tags/:id/view',
       templateUrl:'views/partials/tags-view.html',
       controller:'TagViewController'
    }).state('newTag',{
        url:'/tags/new',
        templateUrl:'views/partials/tags-add.html',
        controller:'TagCreateController'
    }).state('editTag',{
        url:'/tags/:id/edit',
        templateUrl:'views/partials/tags-edit.html',
        controller:'TagEditController'
    }).state('destinations',{
       url:'/destinations',
       templateUrl:'views/partials/destinations.html',
       controller:'DestinationListController'
    }).state('viewDestination',{
       url:'/destinations/:id/view',
       templateUrl:'views/partials/destinations-view.html',
       controller:'DestinationViewController'
    }).state('editDestination',{
       url:'/destinations/:id/edit',
       templateUrl:'views/partials/destinations-edit.html',
       controller:'DestinationEditController'
    }).state('newDestination',{
       url:'/destinations/new',
       templateUrl:'views/partials/destinations-add.html',
       controller:'DestinationCreateController'
    });
}).run(['$rootScope', '$state', function($rootScope, $state) {
  // Error message
  $rootScope.responseError = {};

  // Track the state
  $rootScope.previousState;
  $rootScope.currentState;
  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
      $rootScope.previousState = from.name;
      $rootScope.currentState = to.name;
  });

  $state.go('tags');
}]);