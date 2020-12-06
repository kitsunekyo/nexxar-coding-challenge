const path = require("path");
const { watch, src, dest, parallel } = require("gulp");
const postcss = require("gulp-postcss");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

const output = path.resolve(__dirname, "public/dist");

function styles() {
    return src("./src/css/style.css")
        .pipe(sourcemaps.init())
        .pipe(postcss([require("precss"), require("autoprefixer")]))
        .pipe(sourcemaps.write("."))
        .pipe(dest(output))
        .pipe(browserSync.stream());
}

function javascript() {
    return src("./src/*.js").pipe(dest(output)).pipe(browserSync.stream());
}

function watchStyles() {
    styles();
    return watch("./src/**/*.css", styles);
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
    watchStyles();
    watchHtml();

    cb();
}

exports.default = parallel(javascript, styles);
exports.build = parallel(javascript, styles);
exports.dev = dev;
