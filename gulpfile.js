const prefixer = require('autoprefixer')
const sync     = require('browser-sync')
const cssnano  = require('cssnano')
const del      = require('del')
const fs       = require('fs')
const gulp     = require('gulp')
const sass     = require('gulp-sass')
const postcss  = require('gulp-postcss')
const plumber  = require('gulp-plumber')
const changed  = require('gulp-changed')
const include  = require('gulp-file-include')
const notifier = require('node-notifier')

// Error Handling
const onError = function(error) {
  notifier.notify({
    'title': 'Error',
    'message': 'Compilation failure.'
  })

  console.log(error)
  this.emit('end')
}

// Delete the dist folder
gulp.task('clean', () => del('dist'))

// Html includes and minification
gulp.task('html', ['images'], () => {
  return gulp.src('src/html/**/*.html')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(include({
      prefix: '@',
      basepath: '@file'
    }))
    // .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist'))
})

// Sass Tasks
const processors = [
  prefixer({ browsers: 'last 10 versions' }),
  cssnano({ safe: true })
]

// Sass Compiling
gulp.task('sass', () => {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist'))
})

// Images
gulp.task('images', () => {
  return gulp.src('src/images/**/*.{gif,jpg,png}')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(changed('dist/images'))
    .pipe(gulp.dest('dist/images'))
})

// Server
const server = sync.create()
const reload = sync.reload

// Server directory settings.
const options = {
  notify: false,
  server: {
    baseDir: 'dist',
  }
}

// Watch For Changes
gulp.task('watch', () => {
  gulp.watch('src/html/**/*.html', ['html', reload])
  gulp.watch('src/sass/**/*.scss', ['sass', reload])
  gulp.watch('src/images/**/*.{gif,jpg,png,svg}', ['images', reload])
})

gulp.task('server', () => sync(options))


// Build directories
gulp.task('build', ['clean'], () => {
  fs.mkdirSync('dist')

  // Run Tasks
  gulp.start('html', 'sass', 'images')
})

// Default Task
gulp.task('default', ['build', 'server', 'watch'])
