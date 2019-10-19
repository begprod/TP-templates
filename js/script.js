$(document).ready(function() {
	hidePreloader();
	mainMenu();
	switchVideo();
	popover();
	reportForm();
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

// Переключение фильм/трейлер, проверка для кнопок, клик по обложке фильма
function switchVideo() {
	var switcherControl = $('.js-video-switcher');
	var framePlace = $('.js-frame-place');
	var playCover = $('.js-play-cover');
	var frameDataAttribute = 'data-frame';
	var activeClass = 'is-active';
	var framesData = [];

	switcherControl.each(function () {
		if ($(this).attr(frameDataAttribute).length && !$(this).hasClass(activeClass)) {
			$(this).fadeIn(300);
		} else {
			var frameAttr = $(this).attr(frameDataAttribute);

			framesData.push(frameAttr);
			$(this).fadeOut();
		}
	});

	playCover.click(function () {
		framePlace.empty().append(framesData[0]);
		$(this).remove();
	});

	switcherControl.click(function () {
		var frameAttr = $(this).attr(frameDataAttribute);

		playCover.remove();
		$(this).addClass(activeClass).siblings().removeClass(activeClass);
		framePlace.empty().append(frameAttr);
	});
}

// Popover
function popover() {
	var popoverTrigger = $('[data-trigger-popover]');

	popoverTrigger.click(function(event) {
		event.stopPropagation();
		var self = $(this);
		var popoverName = self.attr('data-trigger-popover');
		var popoverEl = $("[data-popover-name='" + popoverName + "']");

		self.toggleClass('is-active');
		popoverEl.toggleClass('is-active');
	});
}

// Автозапонение инпута в форме «Сообщить о проблеме с видео»
function reportForm() {
	var reportFormInput = $('.js-report-form-input');
	var filmName = $('.js-film-name').text();

	reportFormInput.val(filmName);
}

// Рандомные фразы в хедере
function randomPhrases() {
	var phrases = ['Всеж мы люди', 'Чего только не придумают', 'Это классика, это знать надо', 'Проходи, не задерживайся', 'Дешёвая провокация', 'Одиночный пикет', 'Смазка для общества', 'Что ж вы люди делаете?', 'Кетчупа не найдётся?', 'Бесплатные спецэффекты'];
	var element = $('.js-phrases');
	var randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

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

		if($(this).val().length !== 0) {
			searchBtn.removeAttr('disabled');
		} else {
			searchBtn.attr('disabled', 'disabled');
		}

	});
}

// Слайдеры на главной
function sliderInit() {
	$('.js-main-slider').owlCarousel({ // главный слайдер
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

	$('.js-films-slider').owlCarousel({ // слайдер с карточками фильмов
		loop: false,
		center: false,
		nav: true,
		mouseDrag: false,
		navText: [
			'<span aria-label="Предыдущий слайд"><i class="fa fa-chevron-left"></i></span>',
			'<span aria-label="Следующий слайд"><i class="fa fa-chevron-right"></i></span>'
		],
		lazyLoad:true,
		responsive: {
			0: {
				items: 2,
				slideBy: 1,
				loop: false,
				margin: 10,
				stagePadding: 20
			},
			501: {
				items: 3,
				slideBy: 1,
				loop: false,
				margin: 10,
				stagePadding: 20
			},
			601: {
				items: 3,
				slideBy: 1,
				loop: false,
				margin: 10,
				stagePadding: 20
			},
			750: {
				items: 4,
				slideBy: 1,
				loop: false,
				margin: 20,
				stagePadding: 50
			},
			1024: {
				items: 5,
				slideBy: 1,
				loop: true,
				margin: 20,
				stagePadding: 50
			},
			1279: {
				items: 6,
				slideBy: 3,
				loop: true,
				margin: 20,
				stagePadding: 0
			}
		}
	});
}
