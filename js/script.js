/* global $ */

$(document).ready(function() {
	//глобальные функции вызываем здесь
	//остальные вызываем на нужных страницах, просто в теге <script>
	hidePreloader();
	mainMenu();
	watchFilm();
	randomPhrases();
	scrollUp();
	spoilerOpenClose();
	checkSearch();
});


// Прелоадер
function hidePreloader() {
	var preloader = $('.js-preloader'); // TODO: добавить класс в шаблонах MODX

	preloader.delay(1000).fadeOut(300);
}


// Главное меню
function mainMenu() {
	var menu = $('.js-menu'); // TODO: добавить класс в шаблонах MODX
	var trigger = $('.js-trigger'); // TODO: добавить класс в шаблонах MODX

	trigger.click(function () {
		$(this).toggleClass('menu-triger--active');
		menu.slideToggle(300);
	});
}


// Popup с фильмом или трейлером, проверка для кнопок
function watchFilm() {
	var popupTrigger = $('.js-popup-trigger'); // TODO: добавить класс в шаблонах MODX
	var popupParanja = $('.js-popup-paranja'); // TODO: добавить класс в шаблонах MODX
	var popupWrapper = $('.js-popup-wrapper'); // TODO: добавить класс в шаблонах MODX
	var popupCloseBtn = $('.js-popup-close'); // TODO: добавить класс в шаблонах MODX

	popupTrigger.each(function () {
		if ($(this).attr('data-frame').length) {
			$(this).fadeIn(300);
		}
    });

    popupTrigger.click(function () {
		var popupData = $(this).attr('data-frame');

		popupParanja.fadeIn(300);
		popupWrapper.fadeIn(300).append(popupData);
		$('body').addClass('is-cropped');
    });

    popupCloseBtn.click(function () {
		popupParanja.fadeOut(300);
		popupWrapper.fadeOut(300).find('iframe').remove();
		$('body').removeClass('is-cropped');
    });

    popupParanja.click(function () {
		popupParanja.fadeOut(300);
		popupWrapper.fadeOut(300).find('iframe').remove();
		$('body').removeClass('is-cropped');
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