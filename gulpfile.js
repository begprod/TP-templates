const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const rigger = require('gulp-rigger');
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
		css: './css/style.sass',
		js: './js/script.js'
	},
	watch: {
		html: './html/**/*.html',
		css: './css/**/*.sass',
		js: './js/**/.js'
	}
}

const serverConfig = {
	server: {
		baseDir: './build'
	},
	tunnel: false,
	hots: 'localhost',
	port: 9000,
	logPrefix: 'trashopoisk_project'
}

//HTML
gulp.task('html', () => {
	gulp.src(paths.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(paths.build.html))
		.pipe(reload({
			stream: true
		}));
});

//SASS
gulp.task('sass', () => {
	gulp.src(paths.src.css)
		.pipe(sass({
			outputStyle: 'compressed'
		})).on('error', sass.logError)
		.pipe(csso())
		.pipe(prefixer())
		.pipe(gulp.dest(paths.build.css))
		.pipe(reload({
			stream: true
		}));
});

//JS
gulp.task('js', () => {
	gulp.src(paths.src.js)
		.pipe(uglify())
		.pipe(gulp.dest(paths.build.js))
		.pipe(reload({
			stream: true
		}));
});

//COMMON TASK
gulp.task('common', [
	'html',
	'sass',
	'js'
]);

//WATCH OR DIE
gulp.task('watch', () => {
	watch([paths.watch.html], (event, cb) => {
		gulp.start('html');
	});
	watch([paths.watch.css], (event, cb) => {
		gulp.start('sass');
	});
	watch([paths.watch.js], (event, cb) => {
		gulp.start('js');
	});
});

//DEV LOCAL SERVER
gulp.task('server', () => {
	browserSync(serverConfig);
});

//DEFAULT TASK
gulp.task('default', ['common', 'watch', 'server']);