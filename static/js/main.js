"use strict";

// Патчим Jquery
$.fn.extend({
  toggleText: function (a, b) {
    return this.text(this.text() == b ? a : b);
  },
});

// Слайдер "Ближайшие мероприятия"
$(".events-closest_js").slick({
  fade: true,
  autoplay: true,
  speed: 1000,
  nextArrow: $(".events-slider-next_js"),
  prevArrow: $(".events-slider-prev_js"),
});

// Слайдер "Популярные мероприятия"
$(".events-popular_js").slick({
  fade: true,
  autoplay: true,
  speed: 1000,
  prevArrow: $(".events-sliderpop-prev_js"),
  nextArrow: $(".events-sliderpop-next_js"),
});

// Кнопка меняет отображения слайдеров "Ближайшие мероприятия"/"Популярные мероприятия"
$(".show-else").on("click", function () {
  const $closestE = $(".events-closest_js");
  const $popularE = $(".events-popular_js");
  $closestE.slideToggle();
  $popularE.slideToggle();
  $closestE.slick("setPosition");
  $popularE.slick("setPosition");
  $(".heading-sliders_js").toggleText(
    "Ближайшие мероприятия",
    "Популярные мероприятия"
  );
  $(".show-else-text").toggleText(
    "Популярные мероприятия",
    "Ближайшие мероприятия"
  );
});

//Слайдер спикеры
//Слайдер спикеры
//Слайдер спикеры
//Слайдер спикеры
//Слайдер спикеры
var $currentSlide = $(".slider-counter--current");
var $allSlides = $(".slider-counter--all");

var $spickersSlider = $(".spickers-slider");

$spickersSlider.on("init reInit afterChange", function (
  event,
  slick,
  currentSlide,
  nextSlide
) {
  var i = (currentSlide ? currentSlide : 0) + 1;

  $currentSlide.text(i);
  $allSlides.text(`/${slick.slideCount}`);
});

$(".spickers-slider").slick({
  fade: false,
  autoplay: true,
  speed: 1000,
  arrows: true,
  initialSlide: 0,
  nextArrow: $(".spickers-slider-next_js"),
  prevArrow: $(".spickers-slider-prev_js"),
});

// Слайдер "Партнеры"
// Слайдер "Партнеры"
// Слайдер "Партнеры"
// Слайдер "Партнеры"
const $partnersSlider = $(".partners-slider");

function initEmptySlide() {
  const margin = $(".container")[0].getClientRects()[0].x;
  $(".partners-slide")
    .eq(0)
    .css("margin-left", Math.floor(margin) - 10);
}
$(window).resize(function () {
  initEmptySlide();
});

function setProgress(next, all) {
  const calc = ((next + 1) / all) * 100;
  $(".progress-bar--partners").css("background-size", `${calc}% 100%`);
}

setProgress(0);

$partnersSlider.on("init reInit afterChange", function (
  event,
  slick,
  currentSlide,
  nextSlide
) {
  var i = (currentSlide ? currentSlide : 0) + 1;
  setProgress(i, slick.slideCount);
});

$(document).ready(function () {
  initEmptySlide();
  $partnersSlider.slick({
    dots: false,
    focusOnSelect: false,
    infinite: false,
    variableWidth: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: $(".partners-slider-prev_js"),
    nextArrow: $(".partners-slider-next_js"),
    infinite: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          infinite: true,
        },
      },
    ],
  });
});


// Кнопка "показать еще на главной"
$(document).ready(function(){
  $(".feedbacks_item-wrapper").slice(0,3).show();
  $(".loadMore_js").click(function(e){
    e.preventDefault();
    $(".feedbacks_item-wrapper:hidden").slice(0,1).fadeIn("slow");
    if($(".feedbacks_item-wrapper:hidden").length == 0){
       $(".loadMore_js").hide();
    }
  });
});