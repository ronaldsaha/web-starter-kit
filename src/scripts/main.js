define([
    'angular',
    'application/application'
], function (ng) {
    'use strict';

    ng.injector(['application.Factories']).get('ApplicationContext').startApplication();
});