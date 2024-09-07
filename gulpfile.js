/*function defaultTask(cb) {
    // place code for your default task here
    cb();
  }
  
  exports.default = defaultTask*/

/*const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Using dynamic import for autoprefixer
async function getAutoprefixer() {
  const module = await import("gulp-autoprefixer");
  return module.default;
}

async function styles() {
  const autoprefixer = await getAutoprefixer();

  return gulp
    .src("src/scss/style.scss") // Path to SCSS files
    .pipe(sass().on("error", sass.logError)) // Compile SASS to CSS
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"], // Supported browsers
        cascade: false,
      })
    )
    .pipe(gulp.dest("dist/css")); // Save the compiled CSS files
}

// Watch task to automatically process changes
function watch() {
  gulp.watch("src/scss/style.scss", styles); 
}

// Default task
exports.default = gulp.series(styles, watch);*/

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");

// Use dynamic import for ES modules
async function getAutoprefixer() {
  const module = await import("autoprefixer");
  return module.default;
}

async function getCssnano() {
  const module = await import("cssnano");
  return module.default;
}

async function styles() {
  const autoprefixer = await getAutoprefixer();
  const cssnano = await getCssnano();

  return gulp
    .src("src/scss/style.scss") // Path to SCSS files
    .pipe(sass().on("error", sass.logError)) // Compile SASS to CSS
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"], // Supported browsers
          cascade: false,
        }),
        cssnano() // Minify CSS
      ])
    )
    .pipe(gulp.dest("dist/css")); // Save the compiled CSS files
}

// Watch task to automatically process changes
function watch() {
  gulp.watch("src/scss/**/*.scss", styles); // Watch all SCSS files
}

// Default task
exports.default = gulp.series(styles, watch);
