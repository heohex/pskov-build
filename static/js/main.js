
// Патчим Jquery
$.fn.extend({
  toggleText: function (a, b) {
    return this.text(this.text() == b ? a : b);
  },
});

// Слайдер "Ближайшие мероприятия"
$(".events-closest_js").slick({
  fade: true,
  autoplay: false,
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
  const i = (currentSlide ? currentSlide : 0) + 1;

  $currentSlide.text(i);
  $allSlides.text(`/${slick.slideCount}`);
});

$spickersSlider.slick({
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
const $partnersSlide  = $(".partners-slide");

//общая функция вычисления размера
function initEmptySlide(slidesCollection, slidenumber = 0) {
  const margin = $(".container")[0].getClientRects()[0].x;
  slidesCollection
    .eq(slidenumber)
    .css("margin-left", Math.floor(margin) + 20);
}

//реагируем на изменения экрана, но нужно было сделать через debounce
$(window).resize(function () {
  initEmptySlide($partnersSlide);
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
  const i = (currentSlide ? currentSlide : 0) + 1;
  setProgress(i, slick.slideCount);
});

$(document).ready(function () {
  initEmptySlide($partnersSlide);
  $partnersSlider.slick({
    dots: false,
    focusOnSelect: false,
    infinite: false,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $(".partners-slider-prev_js"),
    nextArrow: $(".partners-slider-next_js"),
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
  if($(".feedbacks_item-wrapper:hidden").length === 0){
    $(".loadMore_js").hide();
  }
  $(".loadMore_js").click(function(e){
    e.preventDefault();
    $(".feedbacks_item-wrapper:hidden").slice(0,1).fadeIn("slow");
    if($(".feedbacks_item-wrapper:hidden").length === 0){
       $(".loadMore_js").hide();
    }
  });
});


// красивые селекты
$(document).ready(function () {
  $(".select-controller").each(function () {
    const $wrapper = $(this),
      $select = $wrapper.find(".custom-select");
    $select
      .select2({
        dropdownParent: $wrapper,
        minimumResultsForSearch: -1,
        width: 'element',
      })
      .on("select2:open", function (e) {
        $wrapper
          .find(".select2-dropdown")
          .addClass("animate__animated animate__fadeIn");
      });
  });
});


$('.custom-select').on("select2:selecting",function(e){
  if($(this).data('type')) {
    const currentHref = location.href;
    const url = new URL(`${currentHref}`);
    url.searchParams.set($(this).data('type'), e.params.args.data.id);
    window.location.href = url.href;
  }
});

$(document).ready(function () {
    if(location.search) {
      const queryDict = {}
      //берем с урла параметры если они есть и записываем в объект
      location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
      for (let prop in queryDict) {
        // если есть селект, то сетим ему значение
        if($(`select[data-type=${prop}]`)) {
          $(`select[data-type=${prop}]`).val(`${queryDict[prop]}`).trigger('change');
        }
      }
    }
});

// ОБРАБОТКА ВИДЕО С ЮТУБА НАЧАЛО
$(document).ready(function () {
  $('.js-videoWrapper').each(function (index,item) {
    const iframe = $(item).find('.js-videoIframe');
    const embedCode = youtubeUrlParse(iframe.data('origin'));
    $(this).find('button').css('background-image', `url(https://img.youtube.com/vi/${embedCode}/maxresdefault.jpg)`);
    const youtubeLink = `https://www.youtube.com/embed/${embedCode}?autoplay=1&modestbranding=1&rel=0&hl=ru&showinfo=0&color=white`;
    $(this).find('.js-videoIframe').data('src', youtubeLink);
  })
})

function youtubeUrlParse(url){
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match&&match[7].length===11)? match[7] : false;
}

$(document).on('click','.js-videoPoster',function(e) {
  //отменяем стандартное действие button
  e.preventDefault();
  const poster = $(this);
  // ищем родителя ближайшего по классу
  const wrapper = poster.closest('.js-videoWrapper');
  videoPlay(wrapper);
});

//вопроизводим видео, при этом скрывая постер
function videoPlay(wrapper) {
  const iframe = wrapper.find('.js-videoIframe');
  // Берем ссылку видео из data
  const src = iframe.data('src');
  // скрываем постер
  wrapper.addClass('videoWrapperActive');
  // подставляем в src параметр из data
  iframe.attr('src',src);
}

// ОБРАБОТКА ВИДЕО С ЮТУБА КОНЕЦ


//СЛАЙДЕР С ВИДЕО
const $contentSlider = $(".content-slider");
const $contentSlide = $(".content-slider_slide");


$(window).resize(function () {
  initEmptySlide($contentSlide);
});


$contentSlider.on("init", function (e, slick) {
  const current = $(this).find('div.slick-slide').eq(0);
  current.find('.content-slider_slide').css({'width':'650px', 'height': '500px'})
});

$contentSlider.on("beforeChange", function (event, slick, prevSlide, nextSlide) {
  if (prevSlide < nextSlide && prevSlide !== nextSlide){
    const slide = $(this).find('div.slick-slide').eq(nextSlide);
    slide.find('.content-slider_slide').css({'width': '650px', 'height': '500px'});
    initEmptySlide($contentSlide, nextSlide);
  } else if (prevSlide > nextSlide && prevSlide !== nextSlide){
    const slide = $(this).find('div.slick-slide').eq(prevSlide);
    slide.find('.content-slider_slide').css({'width': '', 'height': '', 'margin-left': ''});
  }
});

$(document).ready(function () {
  initEmptySlide($contentSlide);
  $contentSlider.slick({
    dots: false,
    focusOnSelect: false,
    infinite: false,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $contentSlider.next().find('.controllers_left'),
    nextArrow: $contentSlider.next().find('.controllers_right'),
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


// ЗУМ КАРТИНОК НАЧАЛО

const bg_color_img_box = 'rgba(0,0,0,0.9)';
const allow_hide_scroll_img_box = 'yes';
const use_fade_inout_img_box = 'yes';
const speed_img_box = 0.08;
const z_index_dv_img_box = 999;
let vopa_img_box, idpopup_img_box

window.onload = function() {
  const crtdv_img_box = document.createElement('div');
  crtdv_img_box.id = 'img_box';
  document.getElementsByTagName('body')[0].appendChild(crtdv_img_box)
  idpopup_img_box = document.getElementById("img_box")
  idpopup_img_box.style.top = 0
  idpopup_img_box.style.left = 0
  idpopup_img_box.style.opacity = 0
  idpopup_img_box.style.width = '100vw'
  idpopup_img_box.style.height = '100%'
  idpopup_img_box.style.display = 'none'
  idpopup_img_box.style.position = 'fixed'
  idpopup_img_box.style.cursor = 'zoom-out'
  idpopup_img_box.style.textAlign = 'center'
  idpopup_img_box.style.zIndex = z_index_dv_img_box
  idpopup_img_box.style.backgroundColor = bg_color_img_box
}

function img_box(self) {
  var namepic_img_box = typeof self === 'string' ? self : self.src
  vopa_img_box = 0
  var hwin_img_box = window.innerHeight
  var wwin_img_box = window.innerWidth
  var himg_img_box, padtop_img_box, idfadein_img_box
  var img_img_box = new Image()
  img_img_box.src = namepic_img_box
  img_img_box.onload = function() {
    himg_img_box = img_img_box.height
    wimg_img_box = img_img_box.width
    idpopup_img_box.innerHTML = '<img src=' + namepic_img_box + '>'

    if (wimg_img_box > wwin_img_box) {
      idpopup_img_box.getElementsByTagName('img')[0].style.width = '90%'
    }
    else if (himg_img_box > hwin_img_box) {
      idpopup_img_box.getElementsByTagName('img')[0].style.height = '90%'
      himg_img_box = hwin_img_box * 90 / 100
    }

    if (himg_img_box < hwin_img_box) {
      padtop_img_box = (hwin_img_box / 2) - (himg_img_box / 2)
      idpopup_img_box.style.paddingTop = padtop_img_box + 'px'
    }
    else {
      idpopup_img_box.style.paddingTop = '0px'
    }

    if (allow_hide_scroll_img_box === 'yes') {
      document.body.style.overflowY = 'hidden'
    }
    idpopup_img_box.style.display = 'block'
  }

  if (use_fade_inout_img_box === 'yes') {
    idfadein_img_box = setInterval(function() {
      if (vopa_img_box <= 1.1) {
        idpopup_img_box.style.opacity = vopa_img_box
        vopa_img_box += speed_img_box
      }
      else {
        idpopup_img_box.style.opacity = 1
        clearInterval(idfadein_img_box)
      }
    }, 10)
  }
  else {
    idpopup_img_box.style.opacity = 1
  }

  idpopup_img_box.onclick = function() {
    if (use_fade_inout_img_box == 'yes') {
      var idfadeout_img_box = setInterval(function() {
        if (vopa_img_box >= 0) {
          idpopup_img_box.style.opacity = vopa_img_box
          vopa_img_box -= speed_img_box
        } else {
          idpopup_img_box.style.opacity = 0
          clearInterval(idfadeout_img_box)
          idpopup_img_box.style.display = 'none'
          idpopup_img_box.innerHTML = ''
          document.body.style.overflowY = 'visible'
          vopa_img_box = 0
        }
      }, 10)
    }
    else {
      idpopup_img_box.style.opacity = 0
      idpopup_img_box.style.display = 'none'
      idpopup_img_box.innerHTML = ''
      document.body.style.overflowY = 'visible'
    }
  }
}

$('.zoom-image').on('click', function () {
  img_box(this);
});

// ЗУМ КАРТИНОК КОНЕЦ

// ТАБЫ НАЧАЛО
$(document).ready(function(){
  $('.tab-link').click(function(){
    const tab_id = $(this).attr('data-tab');
    $('.tab-link').removeClass('tab-link--current form-switchers--active');
    $('.tab-content').removeClass('tab-content--current');
    $(this).addClass('tab-link--current form-switchers--active');
    $("#"+tab_id).addClass('tab-content--current');
  })
})
// ТАБЫ КОНЕЦ

// реагируем на выбор файла в инпут
$('.custom-file-upload input').on('change', function () {
  if ($(this).prop('files').length > 0) {
    $(this).parent().find('span').text($(this).prop('files')[0].name)
  } else {
    $(this).parent().find('span').text('Прикрепить презентацию')
  }
})

// рэйтинг

$('.rating svg').on('click', function () {

  const self = $(this);
  const $parent = self.parent();

  if ($parent.data('vote') !== 1) {

  // id тыкнутой звезды(комментария)
  const id = $parent.data('rating');
  // счетчик тыкнутой звезды
  let counter = +$parent.children('.rating-counter').text() || 0;
  // отправляемые данные
  const data = JSON.stringify({id: id});
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      type: "GET",
      data: data
    }).done(function (res) {
      $parent.data('vote', 1)
      $parent.toggleClass('rating--active');
      $parent.children('.rating-counter').text(counter + 1)
    });
  }
});

// Задать вопрос форма
$('.question-form').on('submit',function (e) {
  e.preventDefault();
  const $textarea = $(this).find('textarea');

  if(!$textarea.val().trim()){
    $textarea.parent().addClass('is-invalid');
    setTimeout(() => $textarea.parent().removeClass('is-invalid'), 2000);
    return
  }
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: "POST",
    data: 'data'
  }).done(function (res) {
    $('.question-modalJS').fadeIn();
    $textarea.val('');
  });
});

// Участвовать как спикер
$('.contestUsSpeakerJS').on('click', function () {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: "POST",
    data: 'data'
  }).done(function (res) {
    $('.congratulation-modalJS').fadeIn()
  });
});

// Участвовать как слушатель
$('.contestUsListenerJS').on('click', function () {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: "POST",
    data: 'data'
  }).done(function (res) {
    $('.congratulation-modalJS').fadeIn();
  });
});

$('.modal-close').on('click', function () {
  $(this).closest('.modal-wrapper').fadeOut();
})

$('.modal-content_actions-buttonJS').on('click', function () {
  $(this).closest('.modal-wrapper').fadeOut();
})

$('.authFormJS').validate({
  rules: {
    name: {
      required: true,
      minlength: 3,
    },
    email: {
      required: true,
      email: true
    }
  },
  messages: {
    name: "Минимальная длина 2 символа",
    email: "введите email"
  },
  submitHandler: function() {
    console.log()
  }
});