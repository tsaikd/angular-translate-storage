var gulp = require("gulp"),
	dateformat = require("dateformat"),
	sync = require("gulp-sync")(gulp),
	header = require("gulp-header"),
	concat = require("gulp-concat"),
	uglifyjs = require("gulp-uglifyjs"),
	replace = require("gulp-replace"),
	karma = require("gulp-karma"),
	run = require("gulp-run");

var pkg = require("./package.json"),
	root = ".";

var banner = [
		"/* " + pkg.name + " v" + pkg.version + " " + dateformat(new Date(), "yyyy-mm-dd"),
		" * " + pkg.homepage,
		" * License: " + pkg.license,
		" */\n\n"
	].join("\n"),
	paths = {
		"js": ["!**/*.tmp.js", "!**/*.test.js", "!"+root+"/src/**/*.min.js", root+"/src/**/*.js"],
		"test": ["!**/*.tmp.js",
			"lib/angular/angular.js",
			"lib/angular-local-storage/angular-local-storage.js",
			"lib/angular-mocks/angular-mocks.js",
			"lib/angular-translate/angular-translate.js",
			"angular-translate-storage.js",
			"src/**/*.spec.js"]
	},
	ngModule = pkg.name;

gulp.task("default", ["build"]);

gulp.task("build", ["js", "compress", "bower.json"]);

gulp.task("up", ["update-npm", "update-bower"]);

gulp.task("js", function(done) {
	gulp.src(paths.js)
		.pipe(concat(pkg.name + ".js"))
		.pipe(header(banner))
		.pipe(gulp.dest(root))
		.on("end", done);
});

gulp.task("compress", function(done) {
	gulp.src(paths.js)
		.pipe(uglifyjs(pkg.name + ".min.js", {
			outSourceMap: true
		}))
		.pipe(header(banner))
		.pipe(gulp.dest(root))
		.on("end", done);
});

gulp.task("test", function(done) {
	gulp.src(paths.test)
		.pipe(karma({
			configFile: "karma.config.js",
			action: "run"
		}))
		.on("end", done);
});

gulp.task("bower.json", function(done) {
	gulp.src(["bower.json"])
		.pipe(replace(/"name": "[^"]*"/, "\"name\": \"" + pkg.name + "\""))
		.pipe(replace(/"version": "[^"]*"/, "\"version\": \"" + pkg.version + "\""))
		.pipe(replace(/"description": "[^"]*"/, "\"description\": \"" + pkg.description + "\""))
		.pipe(gulp.dest("./"))
		.on("end", done);
});

gulp.task("update-npm", function(done) {
	var cmd = "sh -c './node_modules/npm-check-updates/bin/npm-check-updates -u'";
	run(cmd).exec().on("end", done);
});

gulp.task("update-bower", function(done) {
	var bowerjson = require("./bower.json");
	var deps = [];
	var i, cmd;

	for (i in bowerjson.dependencies) {
		deps.push(i);
	}
	cmd = "bower install --save --force-latest " + deps.join(" ");
	run(cmd).exec().on("end", done);
});
