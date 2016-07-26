(function() {
    'use strict';

    angular
        .module('web')
        .config(config);

    /** @ngInject */
    function config($logProvider, growlProvider, blockUIConfig) {
        // Enable log
        $logProvider.debugEnabled(true);

        //growl config
        growlProvider.globalReversedOrder(true);
        growlProvider.globalTimeToLive(5000);
        growlProvider.globalDisableIcons(true);

        //block-ui
        blockUIConfig.delay = 1000;
    }

})();
