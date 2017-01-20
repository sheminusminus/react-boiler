var plugins = require('gulp-load-plugins');
var gulp = require('gulp');
var yaml = require('js-yaml');
var fs = require('fs');
var rimraf = require('rimraf');
var yargs = require('yargs');
var imagemin = require('imagemin');

// load all gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// load settings from config.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// build the "dist" folder
gulp.task('build',
 gulp.series(clean, gulp.parallel(pages, sass, nosass, javascript, images, copy)));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', watch));

// delete the dist folder to rebuild
function clean(done) {
  rimraf(PATHS.dist, done);
}

// skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
}

// copy over site pages
function pages() {
  return gulp.src('src/pages/*.{php,html}')
    .pipe(gulp.dest(PATHS.dist));
}

// compile sass into css
function sass() {
  return gulp.src('src/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/css'));
}

// bundle up js
function javascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel({
	    presets: ['es2015']
    }))
    .pipe($.concat('script.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/js/static'));
}

// copy images
function images() {
  return gulp.src('src/img/*.{jpg,png,svg,gif}')
	.pipe(gulp.dest(PATHS.dist + '/assets/img'));
}
        
// copy regular css styles
function nosass() {
  return gulp.src(PATHS.css)
    .pipe(gulp.dest(PATHS.dist + '/css'));
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/pages/*.html').on('change', pages);
  gulp.watch('src/scss/**/*.scss').on('change', sass);
  gulp.watch('src/js/**/*.js').on('change', javascript);
  gulp.watch('src/img/**/*').on('change', images);
  gulp.watch('src/css/**/*.css').on('change', nosass);
}

