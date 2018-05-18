/* global $ */

$(document).ready(function() {
	//глобальные функции вызываем здесь
	//остальные вызываем на нужных страницах, просто в теге <script>
    hidePreloader();
    mainMenu();
	modalWindow();
	stopPlayVideo();
	randomPhrases();
	scrollUp();
	spoilerOpenClose();
	checkSearch();
});


// Прелоадер
function hidePreloader() {
	var preloader = $('.js-preloader');

	preloader.delay(1000).fadeOut(300);
}


// Главное меню
function mainMenu() {
	var menu = $('.js-menu');
	var trigger = $('.js-trigger');

	trigger.click(function () {
		$(this).toggleClass('menu-triger--active');
		menu.slideToggle(300);
	});
}


//Функция для модального окна
function modalWindow() {

	var trailerBtn = $('.btn-all--watch-trailer');
	var filmBtn = $('.btn-all--watch-film');
	var modalCloseBtn = $('.modal-body__close-btn');
	var modalBg = $('.modal-bg-layer');
	var modalBody = $('.modal-body');

	trailerBtn.click(function(event) {
		modalBg.fadeIn(200);
		modalBody.fadeIn(200);
		$('body').css('overflow','hidden');
	});
	filmBtn.click(function(event) {
		modalBg.fadeIn(200);
		modalBody.fadeIn(200);
		$('body').css('overflow','hidden');
	});
		modalCloseBtn.click(function(event) {
		modalBg.fadeOut(200);
		modalBody.fadeOut(200);
		$('body').css('overflow','auto');
	});
	modalBg.click(function(event) {
		$(this).fadeOut(200);
		modalBody.fadeOut(200);
		$('body').css('overflow','auto');
	});
}


//Показывает кнопку "Смотреть трейлер", если есть iframe
function btnTrailer() {
	var showBtnTrailer = $('.btn-all--watch-trailer');
	var checkTrailer =  showBtnTrailer.attr('data-trailer');
	var showBtnFilm = $('.btn-all--watch-film');
	var checkFilm =  showBtnFilm.attr('data-film');

	if(checkTrailer.length){
		showBtnTrailer.css('display', 'inline-block');
	} else {
		showBtnTrailer.css('display', 'none');
	}
	if(checkFilm.length){
		showBtnFilm.css('display', 'inline-block');
	} else {
		showBtnFilm.css('display', 'none');
	}
}


//Функция для видео
	function stopPlayVideo() {
		//добавилась кнопка смотреть бесплатно
		var trailerBtn = $('.btn-all--watch-trailer');
		var filmBtn = $('.btn-all--watch-film');
		var modalCloseBtn = $('.modal-body__close-btn');
		var modalBg = $('.modal-bg-layer');
		var modalBody = $('.modal-body');
		var trailerData = trailerBtn.attr('data-trailer');
		var filmData = filmBtn.attr('data-film');

		//новый алгоритм просмотра видео
		trailerBtn.click(function(){
			modalBody.append(trailerData);
		});
		filmBtn.click(function(){
			modalBody.append(filmData);
		});
		modalCloseBtn.click(function(){
			modalBody.find('iframe').remove();
		});
		modalBg.click(function(){
			modalBody.find('iframe').remove();
		});
	}


//Рандомные фразы
function randomPhrases() {
	var phrases = new Array('Всеж мы люди',
							'Чего только не придумают',
							'Это классика, это знать надо',
							'Проходи, не задерживайся',
							'Дешёвая провокация',
							'Одиночный пикет',
							'Смазка для общества',
							'Что ж вы люди делаете?',
							'Кетчупа не найдётся?',
							'Бесплатные спецэффекты');
	var randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
	var element = document.querySelector('.header__slogan');
	element.innerHTML = randomPhrase;
}


//Кнопка наверх
function scrollUp() {
	var scrollBtn = $('.scroll-up');
	var bodyHtml = $('html, body');

scrollBtn.click(function (event) {
	bodyHtml.animate({ scrollTop: 0 }, 400);
	return false;
});

$(window).scroll(function () {
	if ($(document).scrollTop() > 700) {
		scrollBtn.fadeIn(300);
	} else {
		scrollBtn.fadeOut(300);
	}
});
}


//Spoiler
function spoilerOpenClose() {
	var spoilerLink = $('.spoiler-link');
	var spoilerBlock = $('.spoiler-content');
	spoilerLink.click(function() {
		spoilerBlock.slideToggle(500);
	});
}


//Если поиск пустой, то ничего не делаем
function checkSearch() { 
	var searchInput = $('.search-form__input');
	var searchBtn = $('.search-form__search-btn');
	searchBtn.attr('disabled', 'disabled');
	searchInput.keyup(function() {
		if($(this).val().length != 0) {
			searchBtn.removeAttr('disabled');
		} else {
			searchBtn.attr('disabled', 'disabled');
		}
	});
}


//Report film form
function showReportForm() {
	var reportFormlink = $('.film-report-form-link');
	var reportForm = $('.report-film-form');
	var reportFormInput = $('.report-film-form__input');
	var reportFormClose = $('.report-film-form__close');
	var getFilmName = $('.film-hero__head').text();

	var showBtnTrailer = $('.btn-all--watch-trailer');
	var showBtnFilm = $('.btn-all--watch-film');

	reportFormlink.click(function() {
		reportForm.fadeIn(300);
		reportFormInput.val(getFilmName);
	});
	$('.modal-body__close-btn').click(function() {
		reportForm.fadeOut(100);
	});
	reportFormClose.click(function() {
		$(this).parent().fadeOut(300);
	});
}