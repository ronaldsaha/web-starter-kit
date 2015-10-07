/// <reference path="../../packages_typescript/requirejs/require.d.ts" />
require.config({
    baseUrl: 'scripts',
    paths: {
        'domReady': '../../packages/requirejs-domready/domReady',
        'text': '../../packages/requirejs-text/text',
        'JSON': '../../packages/json2/json2',
        'jQuery': '../../packages/jquery/dist/jquery.min',
        'bootstrap':'../../packages/bootstrap/dist/js/bootstrap.min',
        'angular': '../../packages/angular/angular',
        'angular-route': '../../packages/angular-route/angular-route'
    },
    shim: {
        'JSON': {
            exports: 'JSON'
        },
        'jQuery': {
            exports: 'jQuery'
        },
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        }
    },
    deps: [
        'main'
    ]
    //,urlArgs: 'v=' + new Date().getTime()
});
