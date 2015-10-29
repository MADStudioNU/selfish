var gulp       = require('gulp')
  , gutil      = require('gulp-util')
  , source     = require('vinyl-source-stream')
  , buffer     = require('vinyl-buffer')
  , browserify = require('browserify')
  , watchify   = require('watchify')
  , karma      = require('karma')

function bundle (b, name, dest) {
  return b.bundle()
    .pipe(source(name))
    .pipe(buffer())
    .pipe(gulp.dest(dest))
}

gulp.task('bundle:src', function () {

  var b = browserify({
    entries: 'src'
  })

  b.on('log', gutil.log)

  return bundle(b, 'selfish.bundle.js', 'dist')
})

gulp.task('bundle:src:watch', function () {
  var b = browserify({
    debug: true,
    entries: 'src'
  })

  function _bundle() {
    return bundle(b, 'selfish.bundle.js', 'dist')
  }

  b = watchify(b);

  b.on('log', gutil.log)
  b.on('update', _bundle);

  _bundle();
})

gulp.task('bundle:test', function () {

  var b = browserify({
    entries: [ 'tests/selfish.spec.js' ]
  })

  b.on('log', gutil.log)

  return bundle(b, 'selfish.spec.js', 'dist')
})

gulp.task('bundle:test:watch', function () {

  var b = browserify({
    entries: [ 'tests/selfish.spec.js' ]
  })

  function _bundle () {
    return bundle(b, 'selfish.spec.js', 'dist')
  }

  b = watchify(b)

  b.on('log', gutil.log)
  b.on('update', _bundle)

  return _bundle()
})

gulp.task('bundle:watch', ['bundle:src:watch', 'bundle:test:watch'])

gulp.task('test', [ 'bundle:src', 'bundle:test' ], function (done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done)
  server.start();
})

gulp.task('test:travis', [ 'bundle:src', 'bundle:test' ], function (done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: [ 'PhantomJS', 'Firefox' ]
  }, done);
  server.start();
})

gulp.task('tdd', [ 'bundle:watch' ], function (done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
  }, done)
  return server.start();
})

gulp.task('default', [ 'bundle:src' ]);
