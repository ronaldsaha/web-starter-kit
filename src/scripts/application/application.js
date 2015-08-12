define([
    'angular', 'angular-route',
    './controllers/Index',
    './Services/Index'
], function (ng) {
    'use strict';

    ng.module('application', ['application.controllers', 'application.services', 'ngRoute'])
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
            //$routeProvider.when("/", {});
            //$routeProvider.when("/:link", {
            //    template: ' ',
            //    controller: function ($scope, $routeParams, page) {
            //        console.log($routeParams.link);
            //    },
            //    resolve: {
            //        page: function ($q, $route, $timeout, pageService) {
            //            var deferred = $q.defer();
            //            $timeout(function () {
            //                deferred.resolve($route.current.params.link);
            //            }, 2000);
            //            return deferred.promise;
            //        }
            //    }
            //});
            //$routeProvider.otherwise({redirectTo: '/'});
        }])
        .run(["$rootElement", "$rootScope", "$location", "$route", "$controller", "PageService",
            function ($rootElement, $rootScope, $location, $route, $controller, pageService) {

                $rootScope.$on("$locationChangeSuccess",
                    function (event, current, previous, rejection) {
                        pageService.getPageByRoute($location.path()).then(function (page) {
                            RenderPage(page, $rootScope, $rootElement);
                        });
                    });

                function RenderPage(page, scope, element) {
                    var currentScope = scope;
                    if (page.hasParent) {
                        currentScope = RenderPage(page.parent, scope, element);
                    }
                    $controller('PageController', {scope: currentScope, element: element, page: page}).render();
                    return scope.$new();
                }

                //$rootScope.$on("$routeChangeSuccess", function ($currentRoute, $previousRoute) {
                //    console.log('$routeChangeSuccess');
                //    pageService.setupPage($route.current.params.link);
                //});
            }]);

    return {
        start: function () {
            ng.bootstrap($('body'), ['Application']);
        }
    }
});


//* ```js
//* var $div = $('<div ng-controller="MyCtrl">{{content.label}}</div>');
//* $(document.body).append($div);
//*
//* angular.element(document).injector().invoke(function($compile) {
//    *   var scope = angular.element($div).scope();
//    *   $compile($div)(scope);
//    * });
//* ```

//for (var i = 0; i < page.widgets.length; ++i) {
//    //var widgetElement = angular.element('<div ng-controller="ContentController" ng-init="initialize(' + page.widgets[i].value + ')"></div>');
//    var widgetElement = angular.element('<content-Widget key="' + page.widgets[i].value + '" />');
//    var scope = angular.element($rootElement).scope().$new();
//    var widgetDom = $compile(widgetElement)(scope);
//    $rootElement.find('#' + page.widgets[i].key).append(widgetDom);
//
//    //var $widgetNode = $('<div ng-controller="ContentController" ng-init="initialize(' + page.widgets[i].value + ')"></div>');
//    //$rootElement.find('#' + page.widgets[i].key).append($widgetNode);
//    //angular.element($rootElement).injector().invoke(function ($compile) {
//    //    var scope = angular.element($widgetNode).scope();
//    //    $compile($widgetNode)(scope);
//    //});
//}

//for (var i = 0; i < page.widgets.length; ++i) {
//    var scope = angular.element($rootElement).scope().$new();
//    var controller = $controller('ContentWidgetController', {
//        element: $rootElement.find('#' + page.widgets[i].key),
//        scope: scope
//    });
//    //var controllerDom = $compile(controller.getTemplate())(scope);
//    //$rootElement.find('#' + page.widgets[i].key).append(controllerDom);
//    //scope.initialize(page.widgets[i].value);
//}
