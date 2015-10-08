/*angular.module('feworkspaceApp.services',[]).factory('Tag',function($resource){
    return $resource('http://localhost:3000/api/v1/tags/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});*/

angular.module('travelApiApp.services',[]).factory('Services', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
    
    var api_host = "http://localhost:3000/api/v1/";
	
	var config = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    function handleError( response ) {
      // console.log(response);
      $rootScope.responseError.isError = false;
      if (response.status === 0) {
        $rootScope.responseError.message = 'Server is Down';
        $rootScope.responseError.isError = true;
        // console.log($rootScope.responseError);
      }
      if (response.status === 401) {
        $rootScope.responseError.message = 'You are not allowed to access this feature';
        $rootScope.responseError.isError = true;
        // ServicesLS.remove('_auth');
        // $state.go('login');
        // console.log($rootScope.responseError);
      }
      if (! angular.isObject( response.data ) || ! response.data.message ) {
        var results = [];
        results.data = response.data;
        if (response.headers) {
          results.headers = response.headers();
        };
        results.status = response.status;
        results.config = response.config;


        // return( results );
        return( $q.reject( results ) );

      }
      return( $q.reject( response.data.message ) );
    }

    function handleSuccess( response ) {
      var results = [];
      $rootScope.responseError.isError = false;
      results.data = response.data;
      results.headers = response.headers();
      results.status = response.status;
      results.config = response.config;

      return( results );
    }

    // Public API here
    return {
      getAll: function (entity, params) {
        params = typeof params !== 'undefined' ? params : {};
        $rootScope.myPromise = $http({
          url: api_host + entity + '/',
          method: 'GET',
          params: params,
          headers: config
        });
        return( $rootScope.myPromise.then( handleSuccess, handleError ) );
      },
      getItem: function(entity, id, params){
        params = typeof params !== 'undefined' ? params : {};
        $rootScope.myPromise = $http({
          url: api_host + entity + '/' + id,
          method: 'GET',
          params: params,
          headers: config
        });
        return( $rootScope.myPromise.then( handleSuccess, handleError ) );
      },
      add: function(entity, data){
        var jsonSend = entity == "tags" ? { tag: data } : { destination: data };

      	console.log(jsonSend);
        $rootScope.myPromise = $http({
          url: api_host + entity + '/',
          method: 'POST',
          data: jsonSend,
          headers: config
        });
        return( $rootScope.myPromise.then( handleSuccess, handleError ) );
      },
      update: function(entity, data){
        var jsonSend = entity == "tags" ? { tag: data } : { destination: data };

        $rootScope.myPromise = $http({
          url: api_host + entity + '/' + data.id,
          method: 'PUT',
          data: jsonSend,
          headers: config
        });
        return( $rootScope.myPromise.then( handleSuccess, handleError ) );
      },
      delete: function(entity, id, params){
        params = typeof params !== 'undefined' ? params : {};
        $rootScope.myPromise = $http({
          url: api_host + entity + '/' + id,
          method: 'DELETE',
          params: params,
          headers: config
        });
        return( $rootScope.myPromise.then( handleSuccess, handleError ) );
      }
    };
}]).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});