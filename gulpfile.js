const { src, dest, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

const path = {
    src: {
        server: "./src",
        styles: "./src/scss",
        js: "./src/js",
    },
    dest: {
        server: "./dist/",
        styles: "./dist/css",
        js: "./dist/js",
    },
};

const serve = function () {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        port: 5500,
        browser: "firefox",
    });
};

const sassFn = function () {
    const route = mode === "dev" ? "src" : "dest";
    return src(path.src.styles + "/**/*.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(dest(path.dest.server));
};

const defaultTask = function () {
    serve();
    sassFn();
    watch("/**/*.html", function (cb) {
        browserSync.reload();
        cb();
    });
    watch(path.src.styles + "/**/*.scss", function (cb) {
        sassFn();
        browserSync.reload();
        cb();
    });
};

exports.sass = sassFn;
exports.default = defaultTask;