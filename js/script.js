/* global $ */
$(document).ready(function() {
	//call functions here bitch
	showMainMenu();
	animatMenu();
	animateDescMainPage();
	modalWindow();
	btnTrailer();
	stopPlayVideo();
	randomPhrases();
	scrollUp();
	spoilerOpenClose();
});

//Две функции для анимации меню
function showMainMenu() {

	var menuTrigger = $('.menu-triger');
	var menu = $('.menu');

	menuTrigger.click(function(event) {
		menu.slideToggle(200);
	});
}

function animatMenu() {

	var menuTrigger = $('.menu-triger');

	menuTrigger.click(function(event) {
		$(this).toggleClass('active');
	});
}

//Здеся анимации для всплывающего очка на превью фильма только для десктопа
function animateDescMainPage() {

	var descrUnit = $('.desc-cat-unit');
	var catUnit = $('.category-unit');

       if($(window).width() > 1024) {
       		descrUnit.css('display', 'none');
       		catUnit.hover(function() {
				$(this).find('.desc-cat-unit').fadeIn(200);
			}, function() {
				descrUnit.fadeOut(200);
			});
        } else {
       		descrUnit.css('display', 'block');
       	}
}

//Функция для модального окна
function modalWindow() {

	var trailerBtn = $('.btn-all--watch-trailer');
	var modalCloseBtn = $('.modal-body__close-btn');
	var modalBg = $('.modal-bg-layer');
	var modalBody = $('.modal-body');

	trailerBtn.click(function(event) {
		modalBg.fadeIn(200);
		modalBody.fadeIn(200);
	});
		modalCloseBtn.click(function(event) {
		modalBg.fadeOut(200);
		modalBody.fadeOut(200);
	});
	modalBg.click(function(event) {
		$(this).fadeOut(200);
		modalBody.fadeOut(200);
	});
}

//Показывает кнопку "Смотреть трейлер", если есть iframe
function btnTrailer() {

	var checkEl =  $('div.modal-body iframe');
	var showEl = $('.btn-all--watch-trailer');

	if(checkEl.length > 0){
		showEl.css('display', 'block');
	}
}

//Функция для видео
function stopPlayVideo() {

	var trailerBtn = $('.btn-all--watch-trailer');
	var modalCloseBtn = $('.modal-body__close-btn');
	var modalBg = $('.modal-bg-layer');
	//var modalBody = $('.modal-body');

	//Получаем фрейм с видео
	var trailerIframe = $('.modal-body > iframe');
	//Получаем атрибут
	var src = trailerIframe.attr('src');


	trailerBtn.click(function(event) {
		//Поклику автовоспроизведение видео
		trailerIframe.attr('src', src + '?rel=0&autoplay=1&controls=2');
	});
		modalCloseBtn.click(function(event) {
		//Останавливаем воспроизведение
		trailerIframe.attr('src', src - '?rel=0&autoplay=1&controls=2');
	});
	modalBg.click(function(event) {
		//Останавливаем воспроизведение
		trailerIframe.attr('src', src - '?rel=0&autoplay=1&controls=2');
	});
}

//Рандомные фразы
function randomPhrases() {
	var phrases = new Array('Всеж мы люди',
							'Моча какая-то',
							'Найди Свое Говно',
							'Чего только не придумают',
							'Креативная дезориентация',
							'Это классика, это знать надо',
							'Проходи, не задерживайся',
							'Дешёвая провокация',
							'Одиночный пикет',
							'Смазка для общества',
							'Что ж вы люди делаете?',
							'Кетчупа не найдётся?',
							'Бесплатные спецэффекты');
	var randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
	var element = document.querySelector('.slogan');
	element.innerHTML = randomPhrase;
}
//Кнопка наверх
function scrollUp() {
	var scrollBtn = $('.scroll-up');
	var bodyHtml = $("html, body");

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
//Прелоадер
$(document).ready(function () {
	var preloader = $('.preloader-block');
	preloader.delay(1000).fadeOut(400);
});

//Spoiler
function spoilerOpenClose() {
	var spoilerLink = $('.spoiler-link');
	var spoilerBlock = $('.spoiler');
	spoilerLink.click(function() {
		spoilerBlock.slideToggle(500);
});
}
