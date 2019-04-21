$(document).ready(function() {
	hidePreloader();
	mainMenu();
	watchFilm();
	randomPhrases();
	scrollUpBtn();
	spoilerContent();
	checkSearch();
	sliderInit();
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
		$(this).toggleClass('menu-trigger--active');
		menu.slideToggle(300);
	});
}

// Popup с фильмом или трейлером, проверка для кнопок
function watchFilm() {
	var popupTrigger = $('.js-popup-trigger');
	var popupParanja = $('.js-popup-paranja');
	var popupWrapper = $('.js-popup-wrapper');
	var popupCloseBtn = $('.js-popup-close');
	// Report form
	var reportFormTrigger = $('.js-film-report-form-trigger');
	var reportForm = $('.js-report-form');
	var reportFormInput = $('.js-report-form-input');
	var reportFormClose = $('.js-report-form-close');
	var filmName = $('.js-film-name').text();

	popupTrigger.each(function () {
		if ($(this).attr('data-frame').length) {
			$(this).fadeIn(300);
		} else {
			$(this).remove();
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
		reportForm.fadeOut(100);
		$('body').removeClass('is-cropped');
	});

	popupParanja.click(function () {
		popupParanja.fadeOut(300);
		popupWrapper.fadeOut(300).find('iframe').remove();
		reportForm.fadeOut(100);
		$('body').removeClass('is-cropped');
	});

//Report film form
	reportFormTrigger.click(function() {
		reportForm.fadeIn(300);
		reportFormInput.val(filmName);
	});

	reportFormClose.click(function() {
		$(this).parent().fadeOut(300);
	});
}

// Рандомные фразы в хедере
function randomPhrases() {
	var phrases = ['Всеж мы люди', 'Чего только не придумают', 'Это классика, это знать надо', 'Проходи, не задерживайся', 'Дешёвая провокация', 'Одиночный пикет', 'Смазка для общества', 'Что ж вы люди делаете?', 'Кетчупа не найдётся?', 'Бесплатные спецэффекты'];
	var randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
	var element = $('.js-phrases');

	element.text(randomPhrase);
}

// Кнопка наверх
function scrollUpBtn() {
	var trigger = $('.js-scroll-up-btn');
	var bodyHtml = $('html, body');

	trigger.click(function () {
		bodyHtml.animate({
			scrollTop: 0
		}, 400);
	});

	$(window).scroll(function () {
		if ($(document).scrollTop() > 700) {
			trigger.fadeIn(300);
		} else {
			trigger.fadeOut(300);
		}
	});
}

// Spoiler
function spoilerContent() {
	var spoilerContainer = $('.js-spoiler');

	spoilerContainer.each(function () {
		var trigger = $(this).find('.js-spoiler-trigger');
		var spoilerContent = $(this).find('.js-spoiler-content');

		trigger.click(function () {
			spoilerContent.slideToggle();
		});
	});
}

// Проверка поля поиска
function checkSearch() {
	var searchInput = $('.js-search-input');
	var searchBtn = $('.js-search-btn');

	searchBtn.attr('disabled', 'disabled');

	searchInput.keyup(function() {

		if($(this).val().length != 0) {
			searchBtn.removeAttr('disabled');
		} else {
			searchBtn.attr('disabled', 'disabled');
		}

	});
}

function sliderInit() {
	$('.js-main-slider').owlCarousel({
		items: 1,
		loop: true,
		center: true,
		nav: true,
		mouseDrag: false,
		navText: [
			'<span aria-label="Предыдущий слайд"><i class="fa fa-chevron-left"></i></span>',
			'<span aria-label="Следующий слайд"><i class="fa fa-chevron-right"></i></span>'
		],
		lazyLoad:true,
		responsive: {
			0: {
				margin: 10,
				stagePadding: 30
			},
			768: {
				margin: 20,
				stagePadding: 150
			},
			1279: {
				margin: 20,
				stagePadding: 250
			}
		}
	});

	$('.js-films-slider').owlCarousel({
		mouseDrag: false,
		nav: true,
		navText: [
			'<span aria-label="Предыдущий слайд"><i class="fa fa-chevron-left"></i></span>',
			'<span aria-label="Следующий слайд"><i class="fa fa-chevron-right"></i></span>'
		],
		lazyLoad:true,
		responsive: {
			0: {
				items: 1,
				slideBy: 1,
				loop: true,
				margin: 20,
				stagePadding: 50
			},
			500: {
				items: 2,
				slideBy: 1,
				loop: true,
				margin: 20,
				stagePadding: 50
			},
			768: {
				items: 2,
				slideBy: 1,
				loop: true,
				margin: 20,
				stagePadding: 150
			},
			1024: {
				items: 4,
				slideBy: 2,
				loop: false,
				margin: 20,
				stagePadding: 0
			},
			1279: {
				items: 6,
				slideBy: 3,
				loop: false,
				margin: 20,
				stagePadding: 0
			}
		}
	});
}
