// Forms service used to communicate Forms REST endpoints
(function () {
    'use strict';

    angular
        .module('forms')
        .factory('CountriesService', CountriesService);

    CountriesService.$inject = ['$resource'];

    function CountriesService($resource) {
        return $resource('api/countries/', null,
            {
                'allCountries': {method: 'GET', isArray:true}
            });
    }
}());
