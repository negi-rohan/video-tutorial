(function() {
    'use strict';

    angular
        .module('web')
        .controller('HomeController', HomeController);


    /** @ngInject */
    function HomeController() {
        var vm = this;

        vm.isCollapsed = true;

        activate();

        function activate() {
            
        }
    }
})();
