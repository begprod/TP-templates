$(document).ready(function() {
	//call functions here bitch
	showMainMenu();
	animatMenu();
	modalWindow();
	stopPlayVideo();
	randomPhrases();
	scrollUp();
	spoilerOpenClose();
	checkSearch();
});


//Прелоадер
$(document).ready(function () {
	var preloader = $('.preloader-block');
	preloader.delay(1000).fadeOut(400);
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
	var searchBtn = $('.btn-all--search-btn');
	searchBtn.attr('disabled', 'disabled');
	searchInput.keyup(function() {
		if($(this).val().length != 0) {
			searchBtn.removeAttr('disabled');
		} else {
			searchBtn.attr('disabled', 'disabled');
		}
	});
}