const path = require("path");
const { watch, src, dest } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
sass.compiler = require("node-sass");

const output = path.resolve(__dirname, "public/dist");
const mode = process.env.NODE_ENV;

function scss() {
    return src("./src/scss/style.scss")
        .pipe(sass({ outputStyle: mode === "production" ? "compressed" : "expanded" }).on("error", sass.logError))
        .pipe(dest(output))
        .pipe(browserSync.stream());
}

function dev() {
    browserSync.init({
        server: {
            baseDir: "./public",
        },
    });

    watchScss()
    watchHtml();
}

function watchScss() {
    return watch('./src/**/*.scss', scss);
}

function watchHtml() {
    return watch('./public/*.html').on('change', browserSync.reload);
}

exports.default = function () {
    return scss();
};

exports.dev = function () {
    return dev();
};
