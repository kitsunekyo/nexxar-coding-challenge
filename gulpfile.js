const path = require("path");
const { watch, src, dest, parallel } = require("gulp");
const postcss = require("gulp-postcss");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

const output = path.resolve(__dirname, "public/dist");
// const mode = process.env.NODE_ENV;
// .pipe(sass({ outputStyle: mode === "production" ? "compressed" : "expanded" }).on("error", sass.logError))

function scss() {
    return src("./src/scss/style.css")
        .pipe(sourcemaps.init())
        .pipe(postcss([require("precss"), require("autoprefixer")]))
        .pipe(sourcemaps.write("."))
        .pipe(dest(output))
        .pipe(browserSync.stream());
}

function javascript() {
    return src("./src/*.js").pipe(dest(output)).pipe(browserSync.stream());
}

function watchScss() {
    scss();
    return watch("./src/**/*.scss", scss);
}

function watchJavascript() {
    javascript();
    return watch("./src/**/*.js", javascript);
}

function watchHtml() {
    return watch("./public/*.html").on("change", browserSync.reload);
}

function dev(cb) {
    browserSync.init({
        server: {
            baseDir: "./public",
        },
    });

    watchJavascript();
    watchScss();
    watchHtml();

    cb();
}

exports.default = parallel(javascript, scss);
exports.build = parallel(javascript, scss);
exports.dev = dev;
