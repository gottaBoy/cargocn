//https://github.com/nimojs/gulp-book
// 获取 gulp
var gulp = require('gulp')
var gutil = require('gulp-util')
var watchPath = require('gulp-watch-path')
var sourcemaps = require('gulp-sourcemaps')

var autoprefixer = require('gulp-autoprefixer');
//var concat = require('gulp-concat');
var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}
var combiner = require('stream-combiner2')

// 获取 minify-css 模块（用于压缩 CSS）
var minifycss = require('gulp-minify-css')

// 获取 gulp-less 模块
var less = require('gulp-less')

// 获取 gulp-ruby-sass 模块
var sass = require('gulp-ruby-sass')

// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify')

// 获取 gulp-imagemin 模块
var imagemin = require('gulp-imagemin')

//var livereload = require('gulp-livereload')
var browserSync = require('browser-sync').create()

var pkg = require('./package.json')

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

gulp.task('log', function () {
    gutil.log('message')
    gutil.log(gutil.colors.red('error'))
    gutil.log(gutil.colors.green('message:') + "some")
})

// 压缩 css 文件
// 在命令行使用 gulp css 启动此任务
gulp.task('css', function () {
    // 1. 找到文件
    gulp.src('build/css/*.css')
    // 2. 压缩文件
        .pipe(minifyCSS())
    // 3. 另存为压缩文件
        .pipe(gulp.dest('dist/css'))
})

// 在命令行使用 gulp auto 启动此任务
gulp.task('watchcss', function () {
    // 监听文件修改，当文件被修改则执行 css 任务
    //gulp.watch('build/css/*.css', ['css'])
    gulp.watch('build/css/**/*.css', function (event) {
        var paths = watchPath(event, 'build/', 'dist/')
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
              browsers: 'last 2 versions'
            }))
            .pipe(minifycss())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir))
    })
});


// 编译less
// 在命令行输入 gulp less 启动此任务
gulp.task('less', function () {
    // 1. 找到 less 文件
    gulp.src('build/less/**.less')
    // 2. 编译为css
        .pipe(less())
    // 3. 另存文件
        .pipe(gulp.dest('dist/css'))
});

gulp.task('lesscss', function () {
    var combined = combiner.obj([
            gulp.src('build/less/**/*.less'),
            sourcemaps.init(),
            autoprefixer({
              browsers: 'last 2 versions'
            }),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest('dist/css/')
        ])
    combined.on('error', handleError)
})

// 在命令行使用 gulp auto 启动此任务
gulp.task('watchless', function () {
    // 监听文件修改，当文件被修改则执行 less 任务
    //gulp.watch('build/less/**.less', ['less'])
     gulp.watch('build/less/**/*.less', function (event) {
        var paths = watchPath(event, 'build/less/', 'dist/css/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            autoprefixer({
              browsers: 'last 2 versions'
            }),
            less(),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])
        combined.on('error', handleError)
    })
})

// 编译sass
// 在命令行输入 gulp sass 启动此任务
gulp.task('sass', function() {
    return sass('build/sass/') 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('dist/css'))
});

gulp.task('sasscss', function () {
        sass('build/sass/')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
})

// 在命令行使用 gulp auto 启动此任务
gulp.task('watchsass', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    //gulp.watch('build/sass/**/*.scss', ['sass'])
     gulp.watch('build/sass/**/*', function (event) {
        var paths = watchPath(event, 'build/sass/', 'dist/css/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)
        sass(paths.srcPath)
            .on('error', function (err) {
                console.error('Error!', err.message);
            })
            .pipe(sourcemaps.init())
            .pipe(minifycss())
            .pipe(autoprefixer({
              browsers: 'last 2 versions'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir))
    })
});

// 压缩 js 文件
// 在命令行使用 gulp uglifyjs 启动此任务
gulp.task('uglifyjs', function() {
    // 1. 找到文件
    gulp.src('build/js/**/*.js')
    // 2. 压缩文件
        .pipe(uglify())
    // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
})

// 在命令行使用 gulp auto 启动此任务
gulp.task('watchjs', function () {
    // 监听文件修改，当文件被修改则执行 uglifyjs 任务
    //gulp.watch('build/js/*.js', ['uglifyjs'])
    //watchPath(event, search, replace, distExt)
    gulp.watch('build/js/**/*.js', function (event) {
        var paths = watchPath(event, 'build/', 'dist/')
        /*
        paths
            { srcPath: 'build/js/log.js',
              srcDir: 'build/js/',
              distPath: 'dist/js/log.js',
              distDir: 'dist/js/',
              srcFilename: 'log.js',
              distFilename: 'log.js' }
        */
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            uglify(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])

        combined.on('error', handleError)
    })
})

// 压缩图片任务
// 在命令行输入 gulp images 启动此任务
gulp.task('images', function () {
    // 1. 找到图片
    gulp.src('build/images/**/*')
    // 2. 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
    // 3. 另存图片
        .pipe(gulp.dest('dist/images'))
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('watchimage', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    //gulp.watch('build/images/*.*)', ['images'])
    gulp.watch('build/images/**/*', function (event) {
        var paths = watchPath(event,'build/','dist/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir))
    })
});

//copy font 
gulp.task('copy', function () {
    gulp.src('build/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
})

gulp.task('watchcopy', function () {
    gulp.watch('build/fonts/**/*', function (event) {
        var paths = watchPath(event)

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir))
    })
})

// Copy vendor libraries from /bower_components into /vendor
// gulp.task('copybower', function() {
//     gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/jquery/dist/jquery.min.js'])
//         .pipe(gulp.dest('vendor/jquery'))

//     gulp.src(['bower_components/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
//         .pipe(gulp.dest('vendor/bootstrap'))

//     gulp.src(['bower_components/bootstrap-social/*.css', 'bower_components/bootstrap-social/*.less', 'bower_components/bootstrap-social/*.scss'])
//         .pipe(gulp.dest('vendor/bootstrap-social'))

//     gulp.src(['bower_components/font-awesome/**/*', '!bower_components/font-awesome/*.json', '!bower_components/font-awesome/.*'])
//         .pipe(gulp.dest('vendor/font-awesome'))
    
// })


// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './site',//'./webportal',
            index:"/index.html"
        }
    })
})

gulp.task('devPage', ['browserSync'], function() {
    // Reloads the browser whenever HTML or JS files change
    //gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('site/*.html', browserSync.reload);
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 uglifyjs 任务和 auto 任务
gulp.task('default', ['watchjs', 'watchcss', 'watchless', 'watchsass', 'watchimage', 'watchcopy'])