const fs = require('fs');
const glob = require('glob');
const { series, dest, src, parallel, watch } = require('gulp');
const gulpTypescript = require('gulp-typescript');
const gulpClean = require('gulp-clean');
const gulpLess = require('gulp-less');
const gulpConcat = require('gulp-concat');
const gulpJsonminify = require('gulp-jsonminify');

const config = {
  src: './src',
  dist: './dist',
  deploy: `${process.env.FOUNDRY_DATA}/Data/modules/dnd5-cheatsheet`,
};

/**
 * Gulp clean task
 *  - Delete dist folder
 * @param {function} done Done callback function
 * @returns
 */
function clean(done) {
  if (fs.existsSync(config.dist)) {
    return src(config.dist, { read: false }).pipe(gulpClean({ force: true }));
  }
  done();
}
exports.clean = clean;

/**
 * Gulp tsCompile task
 *  - Compile Typescript file
 * @returns
 */
function tsCompile() {
  const tsProject = gulpTypescript.createProject('./tsconfig.json');
  return tsProject.src().pipe(tsProject()).js.pipe(dest(config.dist));
}
exports.tsCompile = tsCompile;

/**
 * Gulp foundryCompilePack task
 *  - Generate .db foundry files
 * @param {function} done Done callback function
 * @returns
 */
function foundryCompilePack(done) {
  glob(`${config.src}/packs/*[!\.md]`, (err, packs) => {
    for (const pack of packs) {
      src(`${pack}/*.json`)
        .pipe(gulpJsonminify())
        .pipe(gulpConcat(pack.substring(pack.lastIndexOf('/'))))
        .pipe(dest(`${config.dist}/packs`));
    }
    done();
  });
}
exports.foundryCompilePack = foundryCompilePack;

/**
 * Gulp styleCompile task
 *  - Compile less file
 *  - Concat everything in one css file
 * @returns
 */
function styleCompile() {
  return src(`${config.src}/styles/**/*.less`)
    .pipe(
      gulpLess({
        paths: [`${config.src}/styles`],
      }),
    )
    .pipe(gulpConcat('dnd5-cheatsheet.css'))
    .pipe(dest(`${config.dist}/styles`));
}
exports.styleCompile = styleCompile;

/**
 * Gulp copyTemplates task
 *  - Copy templates in dist folder
 * @returns
 */
function copyTemplates() {
  return src(`${config.src}/templates/**`).pipe(
    dest(`${config.dist}/templates`),
  );
}
exports.copyTemplates = copyTemplates;

/**
 * Gulp copyIcons task
 *  - Copy icons in dist folder
 * @returns
 */
function copyIcons() {
  return src(`${config.src}/icons/**`).pipe(dest(`${config.dist}/icons`));
}
exports.copyIcons = copyIcons;

/**
 * Gulp copyLang task
 *  - Copy lang in dist folder
 * @returns
 */
function copyLang() {
  return src(`${config.src}/lang/**`).pipe(dest(`${config.dist}/lang`));
}
exports.copyLang = copyLang;

/**
 * Gulp copyModule task
 *  - Copy module.json in dist folder
 * @returns
 */
function copyModule() {
  return src(`${config.src}/module.json`).pipe(dest(config.dist));
}
exports.copyModule = copyModule;

/**
 * Gulp build task
 */
const build = series(
  clean,
  tsCompile,
  styleCompile,
  parallel(copyTemplates, copyIcons, copyLang, copyModule),
);
exports.build = build;

/**
 * Gulp clean deploy task
 *  - Delete deploy folder
 * @param {function} done Done callback function
 * @returns
 */
function cleanDeploy(done) {
  if (fs.existsSync(config.deploy)) {
    return src(config.deploy, { read: false }).pipe(gulpClean({ force: true }));
  }
  done();
}
exports.cleanDeploy = cleanDeploy;

/**
 * Gulp deploy tasks
 * @returns
 */
function deploy() {
  return src(`${config.dist}/**`).pipe(dest(config.deploy));
}
exports.deploy = series(cleanDeploy, deploy);

// --------------------------------------------------------
//                       Watcher
// --------------------------------------------------------

/**
 * Gulp build watcher
 *  - Watch source and rebuild
 * @returns
 */
function buildWatch() {
  return watch([`${config.src}/**`], series(build, cleanDeploy, deploy));
}
exports.watch = buildWatch;

exports.default = exports.build;
