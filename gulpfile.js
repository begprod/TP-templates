// TODO:
// Сделать папку с картинками заглушками и таску билда для этой папки
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
const rigger = require('gulp-rigger'); // TODO: ???заменить на vue???
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const paths = {
	build: {
		html: './build',
		css: './build/css',
		js: './build/js',
		fonts: './build/fonts',
		images: './build/images'
	},
	src: {
		html: './src/html/*.html',
		css: './src/css/style.css',
		js: './src/js/**/*.js',
		fonts: './src/fonts/**/*.*',
		images: './src/images/**/*.*'
	},
	watch: {
		html: './src/html/**/*.html',
		css: './src/css/**/*.css',
		js: './src/js/**/*.js',
		fonts: './src/fonts/**/*.*',
		images: './src/images/**/*.*'
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

gulp.task('fonts', () => {
	return gulp.src(paths.src.fonts)
		.pipe(gulp.dest(paths.build.fonts))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('images', () => {
	return gulp.src(paths.src.images)
		.pipe(gulp.dest(paths.build.images))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('watch', () => {
	gulp.watch(paths.watch.html, gulp.series('html'));
	gulp.watch(paths.watch.css, gulp.series('css'));
	gulp.watch(paths.watch.js, gulp.series('js'));
	gulp.watch(paths.watch.fonts, gulp.series('fonts'));
	gulp.watch(paths.watch.images, gulp.series('images'));
});

gulp.task('server', () => {
	browserSync(serverConfig);
});

gulp.task('default', gulp.series(
	gulp.series(
		'html',
		'css',
		'js',
		'fonts',
		'images'
	),
	gulp.parallel(
		'server',
		'watch'
	)
));