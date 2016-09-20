/* global moment:false */
(function() {
  'use strict';

  angular
    .module('web')
    .constant('moment', moment)
    .constant('_', window._);

})();
