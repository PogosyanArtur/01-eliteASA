'use strict'

const gulp = require('gulp'),
    // common
    browserSync = require('browser-sync').create(),
    rigger = require('gulp-rigger'),
    watch = require('gulp-watch'),
    // css
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    //js
    pump = require('pump'),
    babel = require("gulp-babel"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    // img
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    svgSprite = require("gulp-svg-sprites"),
    //html
    htmlmin = require('gulp-htmlmin');


////////////////////////
// PATH
///////////////////////

const path = {

    // src

    src: {
        scss: [
            './src/0-screen-xl/screen-xl.scss',
            './src/1-screen-lg/screen-lg.scss',
            './src/2-screen-md/screen-md.scss',
            './src/3-screen-sm/screen-sm.scss',
            './src/4-screen-xs/screen-xs.scss',
        ],
        html: './src/*.html',
        js: {
            lib: [
                './src/0-screen-xl/lib/jquery/jquery-3.3.1.min.js',
                './src/0-screen-xl/lib/jquery/jquery-migrate-1.4.1.min.js',
                './src/0-screen-xl/lib/svg4everybody/svg4everybody.min.js',
                './src/0-screen-xl/lib/fullPage/jquery.fullpage.extensions.min.js',
                './src/0-screen-xl/lib/fullPage/jquery.fullpage.js',
                './src/0-screen-xl/lib/lightGallery/js/lightgallery-all.min.js',
            ],
            babel: [
                './src/js/main.js'
            ]
        },
        svg: "./src/svg/**/*.svg",
        video: './src/**/*.{mp4}'
    },

    //bundle

    bundle: {
        css: { in: './bundle/css/',
            out: [
                'screen-xl.css',
                'screen-md.css',
                'screen-sm.css',
                'screen-lg.css',
                'screen-xs.css'
            ]
        },
        html: { 
            in: './bundle/',
            out: './bundle/*.html',
        },
        js: { in: './bundle/js',
            out: [
                './bundle/js/lib.js',
                './bundle/js/babel.js',
            ],
        },
        video:'./bundle/video/*.*',
        img:'./bundle/img/*.*',
        fonts:'./bundle/fonts/*.*'
    },

    // dist

    dist: {
        css: "./dist/css",
        js: "./dist/js",
        img: "./dist/img",
        fonts: "./dist/fonts",
        video: "./dist/video",
        html: "./dist/",
    },
    // watch
    watch: {
        scss: "./src/**/*.scss",
        html: './src/**/*.html',
        js: './src/**/*.js',
    },
    // serever

    server: "./dist",
}


////////////////////////
// HTML
///////////////////////

// bundle html

gulp.task('bundle:html', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.bundle.html.in))
        .pipe(browserSync.stream())
});

// build html

gulp.task('build:html', function () {
    return gulp.src(path.bundle.html.out)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(path.dist.html));
});


////////////////////////
// CSS
///////////////////////

// bundle css
gulp.task('bundle:css', function () {
    return gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.bundle.css.in))
        .pipe(browserSync.stream())
});


// bulid CSS
gulp.task('build:css', function () {
        gulp.src('./bundle/css/*.css')
            .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
            .pipe(csso({
                restructure: true,
                sourceMap: true,
                debug: true
            }))
            .pipe(cssnano())
            .pipe(gulp.dest('./dist/css/'))

});

////////////////////////
// JACASCRIPT
///////////////////////

// bundle lib js
gulp.task('bundle:libjs', function (cb) {
    pump([
            gulp.src(path.src.js.lib),
            concat('lib.js'),
            gulp.dest(path.bundle.js.in)
        ],
        cb
    );
});

// bundle babel js
gulp.task('bundle:babeljs', function () {
    gulp.src(path.src.js.babel)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('babel.js'))
        .pipe(gulp.dest(path.bundle.js.in))
        .pipe(browserSync.stream())
});

// bulid js
gulp.task('build:js', function (cb) {
    pump([
            gulp.src(path.bundle.js.out),
            concat('all.js'),
            uglify(),
            gulp.dest(path.dist.js)
        ],
        cb
    );
});


////////////////////////
// MEDIA
///////////////////////

// Make a sprite file for svg images

gulp.task('sprites', function() {
    const config = {
        mode: "symbols",
        svg: {
            symbols: "sprite.svg"
        },
        preview: {
            symbols: "sprite.html"
        },
    }
    return gulp.src("./src/svg/**/*.svg")
        .pipe(svgmin())
        .pipe(svgSprite(config))
        .pipe(gulp.dest(path.dest.img));
});

// remove video
gulp.task('build:video', function() {
    gulp.src(path.bundle.video)
        .pipe(gulp.dest(path.dist.video))
});

// build image
gulp.task('build:img', function(){
    gulp.src(path.bundle.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist.img))
});

////////////////////////
// FONTS
///////////////////////

// remove fonts
gulp.task('build:fonts', function() {
    gulp.src(path.bundle.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});

////////////////////////
// GENERAL TASKS
///////////////////////

// watch
gulp.task('start',['bundle:html','bundle:css','bundle:babeljs'], function(){
    browserSync.init({
        server: path.server
    });
    watch([path.watch.html], function(event, cb) {
        gulp.start('bundle:html').on('change', browserSync.reload);
    });
    watch([path.watch.scss], function(event, cb) {
        gulp.start('bundle:css').on('change', browserSync.reload);
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('bundle:babeljs').on('change', browserSync.reload);
    });
    // watch([path.watch.img], function(event, cb) {
    //     gulp.start('image:build');
    // });
    // watch([path.watch.fonts], function(event, cb) {
    //     gulp.start('fonts:build');
    // });
});

// build production
gulp.task('build', ['build:html', 'build:css', 'build:js','build:img', 'build:video', 'build:fonts', ]);

