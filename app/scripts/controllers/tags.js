angular.module('travelApiApp.tags',[]).controller('TagListController',function($scope,$state,popupService,$window,Services){

    function getResultsPage() {
      Services.getAll('tags', undefined)
      .then(function(results) {
        //var pagingData = angular.fromJson(results.headers['x-pagination']);
        $scope.tags = results.data;
      });
    }

    getResultsPage();

    $scope.deleteTag=function(tag){
        if(popupService.showPopup('Really delete this?')){
            Services.delete('tags', tag.id)
            .then(function(){
                getResultsPage();
            });
        }
    }

}).controller('TagViewController',function($rootScope,$state,$scope,$stateParams, popupService, Services){
    
    Services.getItem('tags', $stateParams.id)
    .then(function(results){
        $scope.tag=results.data;
    });

    $scope.deleteDestination=function(destination){
        if(popupService.showPopup('Really delete this?')){
            Services.delete('destinations', destination.id)
            .then(function(){
                $state.go($rootScope.previousState);
            });
        }
    }

}).controller('TagCreateController',function($scope,$state,$stateParams,Services){

    $scope.tag = {
        id: '',
        title:'',
        image:''
    };

    $scope.addTag=function(){
        Services.add('tags', $scope.tag)
        .then(function(results){
            $state.go('tags');
        });
    }

}).controller('TagEditController',function($scope,$state,$stateParams,Services){
    
    $scope.tag = {
        id: '',
        title:'',
        image:''
    };

    $scope.updateTag=function(){
        Services.update('tags', $scope.tag)
        .then(function(results){
            $state.go('tags');
        });
    };

    $scope.loadTag=function(){
        Services.getItem('tags', $stateParams.id)
        .then(function(results){
            $scope.tag=results.data;
        });
    };

    $scope.loadTag();
});