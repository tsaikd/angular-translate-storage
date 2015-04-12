angular-translate-storage [![GitHub version](https://badge.fury.io/gh/tsaikd%2Fangular-translate-storage.png)](http://badge.fury.io/gh/tsaikd%2Fangular-translate-storage)
=========================
[![Dependency Status](https://david-dm.org/tsaikd/angular-translate-storage.png)](https://david-dm.org/tsaikd/angular-translate-storage)
[![devDependency Status](https://david-dm.org/tsaikd/angular-translate-storage/dev-status.png)](https://david-dm.org/tsaikd/angular-translate-storage#info=devDependencies)

[angular-translate]: https://github.com/angular-translate/angular-translate
[localStorageService]: https://github.com/grevory/angular-local-storage

[angular-translate][] storage service, depend on [localStorageService][]

## Usage

* Include javascript files in your application
	* `angular-translate.js`
	* `angular-local-storage.js`
	* `angular-translate-storage.js`

```html
<script src="angular-translate.js"></script>
<script src="angular-local-storage.js"></script>
<script src="angular-translate-storage.js"></script>
```

* Add the `angular-translate-storage` module to your application's dependencies.

```js
angular.module("myApp", ["angular-translate-storage"]);
```

* Config the $translateProvider

```js
angular.module("myApp")
.config([     "$translateProvider"
	, function($translateProvider) {

	$translateProvider.useStorage("translateStorage");

}])
```
