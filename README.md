# web-starter-kit


#### angularjs-starter-kit
[article link](http://www.startersquad.com/blog/angularjs-requirejs/)

##### Key points
- A module consists of 3 parts, definition, component, loader

###### Defintion [module.js]
```javascript
define(['angular'], function (ng) {
    'use strict';
    return ng.module('app.controllers', []);
});
```

###### Component [my-ctrl-1.js]
```javascript
define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('MyCtrl1', [function ($scope) {}]);
});
```

###### Loader [index.js]
```javascript
define([
    './my-ctrl-1',
    './my-ctrl-2'
], function () {});
```

NOTE:
It is like first a module namespace is defined,
then each module is defined and it requires module definition
last the loader that loads all modules.
so the whole module namespace will loaded once the loader is loaded.


#### Using RequireJS in AngularJS Applications
[article link](http://www.sitepoint.com/using-requirejs-angularjs-applications/)


The dependency injection system built into AngularJS deals with the objects needed in a component;
while dependency management in RequireJS deals with the modules or, JavaScript files.


[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

[Angular Video Tutorials](https://egghead.io/)
[Angular Tips](https://github.com/johnlindquist/AngularJSTopTenTips)
[Angular Resolve](https://github.com/johnlindquist/angular-resolve)
