angular.module('travelApiApp.destinations',[]).controller('DestinationListController',function($rootScope, $scope,$state,popupService,$window,Services){

    function getResultsPage() {
      Services.getAll('destinations', undefined)
      .then(function(results) {
        $scope.destinations = results.data;
      });
    }

    getResultsPage();

    $scope.deleteDestination=function(destination){
        if(popupService.showPopup('Really delete this?')){
            Services.delete('destinations', destination.id)
            .then(function(){
                getResultsPage();
            });
        }
    }

}).controller('DestinationViewController',function($rootScope, $scope,$stateParams,Services){
    
    Services.getItem('destinations', $stateParams.id)
    .then(function(results){
        $scope.destination=results.data;
    });

}).controller('DestinationCreateController',function($scope,$state,$stateParams,Services){

    $scope.destination = {
        id: '',
        name:'',
        description:'',
        image:'',
        tag_id: ''
    };

    $scope.addDestination=function(){
        Services.add('destinations', $scope.destination)
        .then(function(results){
            $state.go('destinations');
        });
    }


    $scope.loadTagsCombobox=function(){
        Services.getAll('tags')
        .then(function(results){
            $scope.tags=results.data;
        });
    };
    
    $scope.loadTagsCombobox();

}).controller('DestinationEditController',function($rootScope, $scope,$state,$stateParams,Services){
    
    $scope.destination = {
        id: '',
        name:'',
        description:'',
        image:'',
        tag_id: ''
    };

    $scope.updateDestination=function(){
        Services.update('destinations', $scope.destination)
        .then(function(results){
            $state.go($rootScope.previousState);
        });
    };

    $scope.loadDestination=function(){
        Services.getItem('destinations', $stateParams.id)
        .then(function(results){
            $scope.destination=results.data;
        });
    };

    $scope.loadTagsCombobox=function(){
        Services.getAll('tags')
        .then(function(results){
            $scope.tags=results.data;
        });
    };

    $scope.loadDestination();
    $scope.loadTagsCombobox();
});