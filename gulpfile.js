// TODO:
// Починить шрифты, сделать таску которая копирует шрифты
// Сделвть таску которая копирует вендор js
// gulp vue

const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const postcssCustomProperties = require('postcss-custom-properties');
const postCssCustomMedia = require('postcss-custom-media');
const autoPrefixer = require('autoprefixer');
const cssNano = require('cssnano');
const uglify = require('gulp-uglify');
const rigger = require('gulp-rigger'); // заменить на pug
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const paths = {
	build: {
		html: './build',
		css: './build/css',
		js: './build/js'
	},
	src: {
		html: './html/*.html',
		css: './css/style.css',
		js: './js/script.js'
	},
	watch: {
		html: './html/**/*.html',
		css: './css/**/*.css',
		js: './js/**/*.js'
	}
};

const serverConfig = {
	server: {
		baseDir: './build'
	},
	tunnel: false,
	hots: 'localhost',
	port: 9000,
	logPrefix: 'trashopoisk_project'
};

gulp.task('html', () => {
	return gulp.src(paths.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(paths.build.html))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('css', () => {
	const plugins = [
		postcssImport,
		postcssCustomProperties,
		postCssCustomMedia,
		autoPrefixer(),
		cssNano
	];

	return gulp.src(paths.src.css)
		.pipe(postcss(plugins))
		.pipe(gulp.dest(paths.build.css))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('js', () => {
	return gulp.src(paths.src.js)
		.pipe(rigger())
		.pipe(uglify())
		.pipe(gulp.dest(paths.build.js))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('watch', () => {
	gulp.watch(paths.watch.html, gulp.series('html'));
	gulp.watch(paths.watch.css, gulp.series('css'));
	gulp.watch(paths.watch.js, gulp.series('js'));
});

gulp.task('server', () => {
	browserSync(serverConfig);
});

gulp.task('default', gulp.series(
	gulp.series(
		'html',
		'css',
		'js'
	),
	gulp.parallel(
		'server',
		'watch'
	)
));