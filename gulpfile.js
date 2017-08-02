'use strict';

/*先载入这个包，因为里面有api*/
var gulp = require("gulp");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var browsersync = require("browser-sync");

/*编译 压缩 合并*/
gulp.task("style", function () {
/*
    gulp.src("src/styles/!*.less")
*/
    gulp.src(["src/styles/*.less","!src/styles/_*.less"])
        .pipe(less())
        .pipe(cssnano({'postcss-zindex':false}))
        .pipe(gulp.dest("dist/styles"))
        .pipe(browsersync.reload({stream:true}));

});
/*js合并 压缩 混淆*/
gulp.task("script", function () {
    /*
     gulp.src("src/styles/!*.less")
     */
    gulp.src("src/scripts/*.js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/scripts"))
        .pipe(browsersync.reload({stream:true}));

});
/*图片复制*/
gulp.task("img", function () {
    /*
     gulp.src("src/styles/!*.less")
     */
    gulp.src(["src/images/*.*"])
        .pipe(gulp.dest("dist/images"))
        .pipe(browsersync.reload({stream:true}));

});
/*字体复制*/
gulp.task("font", function () {
    /*
     gulp.src("src/styles/!*.less")
     */
    gulp.src(["src/font/*.*"])
        .pipe(gulp.dest("dist/font"))
        .pipe(browsersync.reload({stream:true}));

});
/*html的处理*/
gulp.task("htm", function () {
    /*
     gulp.src("src/styles/!*.less")
     */
    gulp.src(["src/*.html"])
        .pipe(htmlmin({collapseWhitespace: true,
            removeComments:true
        }))
        .pipe(gulp.dest("dist"))
        .pipe(browsersync.reload({stream:true}));

});







gulp.task("serve", function () {

    var server = {};
    browsersync.init( {server: {
        baseDir: "dist",
            routes: {
            "/bower_components": "bower_components"
        }
    }, },
        function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch("src/styles/*.less",["style"]);
    gulp.watch("src/scripts/*.js",["script"]);
    gulp.watch("src/images/*.*",["img"]);
    gulp.watch("src/*.html",["htm"]);
    gulp.watch("src/font/*.*",["font"]);
});