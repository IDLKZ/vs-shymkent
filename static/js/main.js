$(function() {

    // Уведомления account page

    $('.header__notifications-showmore').on('click', function() {
        $(this).addClass('active');
        $('.header__notifications-list').addClass('active');
    })

    $('.header__notifications-icon').on('click', function() {
        $('.header__notifications').toggleClass('active');
        $('.header__notifications-showmore').removeClass('active');
        $('.header__notifications-list').removeClass('active');
    })

    // ширина input litepicker

    $('#calendar__timing[placeholder]').each(function () {
        $(this).attr('size', $(this).attr('placeholder').length);
    });

    // фиксация точек в routes-item

    $(function(){
        var navbar =  $('.routes-item__map-points');
        var wrapper = $('.routes-item__map-inner');
        const fixPoints = function(){
            var headerHeight = $('.header').height();
            var mapHeight = $('.routes-item__map').height() + 30;
            var nsc = $(document).scrollTop();
            var bp1 = wrapper.offsetTop + mapHeight - headerHeight;
            var bp2 = bp1 + wrapper.outerHeight() - $(window).height() - mapHeight + headerHeight;

            if (nsc > bp1) {
                navbar.css('position','fixed');
                navbar.width($('.routes-item__map-inner').width());
            }
            else {
                navbar.css('position','static');
            }
            if (nsc > bp2) {
                navbar.css('top', (bp2 - nsc + 150));
            }
            else {
                navbar.css('top', headerHeight + 'px');
            }
        }
        fixPoints();
        $(window).scroll(function() {
            fixPoints();
        });
    });


    // popup для vr-тур

     $('.vr-tour__btn').magnificPopup({
		type: 'inline',
		preloader: false,
    });

    // выбор кол-ва звезд для отзывов

    $(function() {
        $('.reviews-form__stars').barrating({
          theme: 'fontawesome-stars'
        });
     });

    // popup для отзывов

    $('.reviews-btn').magnificPopup({
		type: 'inline',
		preloader: false,
    });

    // popup для отзывов (ошибки)

    $('.error-form-link').magnificPopup({
		type: 'inline',
		preloader: false,
    });

    // выбор картинки в форме об ошибках

    let fields = $('.error-form__field-file');
    Array.prototype.forEach.call(fields, function (input) {
    let label = input.nextElementSibling,
    labelVal = label.querySelector('.error-form__field-file-fake').innerText;

    input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
          countFiles = this.files.length;
        if (countFiles)
          label.querySelector('.error-form__field-file-fake').innerText = 'Выбрано картинок: ' + countFiles;
        else
          label.querySelector('.error-form__field-file-fake').innerText = labelVal;
      });
    });


    // фильтры категорий

    $(function() {
        $(".open-filter").click(function(){
            $(this).toggleClass('active');
            $(this).next().toggleClass("active");
            $(this).parent().children('.do-filter').toggleClass("active");
        });

        $(window).resize(function(){
            if( $(window).width() > 1000 ) {
                $(".do-filter").removeClass('active');
                $(".open-filter").removeClass('active');
                $(".open-filter").next().removeClass("active");
            }
        });
    });

    // модальные окна

    $('.popup-modal').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: true,
    });
    $(document).on('click', '.popup-modal-dismiss', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    $(".popup-modal").on('click', function() {
        $('.header__nav').removeClass('active');
        $('.header__burger-menu').removeClass('active');
    });


    // кнопки в меню хэдера -----------------------------------------

    $(".header__search").hover(function() {
        $('.header__map').removeClass("active");
        $('.header__personal-account').removeClass("active");
        $('.header__search').addClass("active");
    }, function(){
        // $('.header__search').removeClass("active");
	});

    $(".header__map").hover(function() {
        $('.header__search').removeClass("active");
        $('.header__personal-account').removeClass("active");
        $('.header__map').addClass("active");
    }, function(){
        // $('.header__map').removeClass("active");
    });

    $(".header__personal-account").hover(function() {
        $('.header__search').removeClass("active");
        $('.header__map').removeClass("active");
        $('.header__personal-account').addClass("active");
    }, function(){
        // $('.header__personal-account').removeClass("active");
    });

    // Выбор даты в календаре событий

    $(document).click(function(e) {
        if ($(e.target).closest('#calendar__timing').length) {
            $('.calendar__timing-svg').addClass("active");
            return;
        }
        $('.calendar__timing-svg').removeClass("active");
    });

    // footer slider

    $('.footer__slider').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        focusOnSelect: true,
        prevArrow: $('.footer__slider-prev'),
        nextArrow: $('.footer__slider-next'),
        responsive: [
            {
              breakpoint: 1250,
              settings: {
                slidesToShow: 7,
              }
            },
            {
              breakpoint: 1110,
              settings: {
                slidesToShow: 6,
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 5,
              }
            },
            {
              breakpoint:600,
              settings: {
                autoplay: true,
                slidesToShow: 4,
                dots: true,
                arrows: false,
                dotsClass: 'footer-slider__dots',
                customPaging: function(slider, i) {
                    return '<span class="footer-slider__dot"></span>';
                },
              }
            }
          ]
    });

    // выбор даты в calendar page

    $(function() {
        new Litepicker({
            element: document.getElementById('calendar__timing'),
            singleMode: true,
            numberOfMonths: 1,
            lang: 'ru-RU',
            format: 'D MMM, YYYY',
        });

        if ($(window).width() < 700) {
            $('#calendar__timing').on('click', function() {
                $(".litepicker").css("left", "auto");
                $(".litepicker").css("right", "35px");
            });
        }
        if ($(window).width() < 366) {
            $('#calendar__timing').on('click', function() {
                let rightWidth = ($(window).width() - 296) / 2;
                $(".litepicker").css("right", "");
                $(".litepicker").css("left", rightWidth);
            });
        }
    });

    // выбор категории в calendar page

    $(function() {
        $('ul.calendar-page__categories').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
        });
    });

    // выбор языка --------------------------------------------------

    $(document).click(function(e) {
        if ($(e.target).closest('.header__lang-current').length) {
            $('.header__lang-list').addClass("active");
            $('.header__lang-current').addClass("active");
            return;
        }
        $('.header__lang-list').removeClass("active");
        $('.header__lang-current').removeClass("active");
    });

    $(document).click(function(e) {
        if ($(e.target).closest('.footer__lang').length) {
            $('.footer__lang-list').addClass("active");
            $('.footer__lang-current').addClass("active");
            return;
        }
        $('.footer__lang-list').removeClass("active");
        $('.footer__lang-current').removeClass("active");
    });

    // выбор категории в хэдере

    $(document).click(function(e) {
        if ($(e.target).closest('.header__more-btn').length) {
            $('.header__more-wrapper').addClass("active");
            $('.header__more-btn').addClass("active");
            return;
        }
        $('.header__more-wrapper').removeClass("active");
        $('.header__more-btn').removeClass("active");
    });

    //  Мобильное меню

    $('.header__menu-btn').on('click', function() {
        $(".footer-nav").css('display', 'block');
        $(".footer-nav__content").animate({width: 'toggle'});
    });

    $('.footer-nav__background').on('click', function() {
        $(".footer-nav__content").animate({width: 'hide'}, function(){
            $(".footer-nav").css('display', 'none');
        });
    });

    $(function() {
        $('ul.footer-nav__items').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active');
        });
    });

    $(function() {
        $('ul.footer-nav__content-list').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active');
        });
    });

    $(function() {
        $('ul.header__menu').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active');
        });
    });

    // выбор даты в календарь событий


    $(document).ready(function() {
        $(".calendar__date-btn").click(function() {
            $(".calendar__date-btn").removeClass("active");
            $(this).addClass("active");
        });
    });

    // выбор сортировки и категории в blog-list page и news-list


    $(document).ready(function() {
        $(".blog-list__sorting-item").click(function() {
            $(".blog-list__sorting-item").removeClass("active");
            $(this).addClass("active");
        });
    });

    $(document).ready(function() {
        $(".blog-list__categories-item").click(function() {
            $(".blog-list__categories-item").removeClass("active");
            $(this).addClass("active");
        });
    });

    $(document).ready(function() {
        $(".news-list__categories-item").click(function() {
            $(".news-list__categories-item").removeClass("active");
            $(this).addClass("active");
        });
    });



    // select (calendar-page) ---------------------------------------

    let select = function() {
        let selectHeader = $('.select__header');
        let selectItem = $('.select__item');

        selectHeader.each(item => {
            item.addEventListener('click', selectToggle)
        });

        selectItem.each(item => {
            item.addEventListener('click', selectChoose)
        });

        function selectToggle() {
            this.parentElement.classList.toggle('is-active');
        }

        function selectChoose() {
            let text = this.innerText,
            select = this.closest('.select'),
            currentText = select.querySelector('.select__current');
            currentText.innerText = text;
            select.classList.remove('is-active');
        }

    };


    select();

    $(function() {
        $('.calendar-page__select-body, .guide-list__select-body').on('click', '.calendar-page__select-item:not(.active), .guide-list__select-item:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
        });
    });

    // account page

    // посчет символов textarea

    $('.account__blog-textarea').keyup(function () {
        if (this.value.length > 150)
        this.value = this.value.substr(0, 150);

        var max = 150;
        var len = $(this).val().length;
        if (len >= max) {
          $('.account__blog-item-text').text('Вы превысили допустимый лимит');
        } else {
          var char = max - len;
          $('.account__blog-item-text').text('Осталось ' + char + ' символов');
        }
    });

    $('.account__event-item-textarea--first').keyup(function () {
        if (this.value.length > 150)
        this.value = this.value.substr(0, 150);

        var max = 150;
        var len = $(this).val().length;
        if (len >= max) {
          $('.account__textarea-text--first').text('Вы превысили допустимый лимит');
        } else {
          var char = max - len;
          $('.account__textarea-text--first').text('Осталось ' + char + ' символов');
        }
    });

    $('.account__event-item-textarea--second').keyup(function () {
        if (this.value.length > 1500)
        this.value = this.value.substr(0, 1500);

        var max = 1500;
        var len = $(this).val().length;
        if (len >= max) {
          $('.account__textarea-text--second').text('Вы превысили допустимый лимит');
        } else {
          var char = max - len;
          $('.account__textarea-text--second').text('Осталось ' + char + ' символов');
        }
    });

    // загрузка картинок в блог

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.account__blog-img').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }

        $('.account__blog-img-del').css('display', 'block');
    }

    $(".account__blog-img-input").change(function(){
        readURL(this);
    });

    $('.account__blog-img-del').on('click', function() {
        $('.account__blog-img').attr('src', '../images/form.jpg');
        $('.account__blog-img-del').css('display', 'none');
        $('.account__blog-img-input').val(null);
    });


    // загрузка картинок в мероприятия

    function checkURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader(input);
            reader.onload = function (e) {
                $(input).parent('.account__event-img-item').children('.account__event-label').children('.account__event-img').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }

        $(input).parent('.account__event-img-item').children('.account__event-img-del').css('display', 'block');
        $(input).parent('.account__event-img-item').children('.account__event-label').children('.account__event-label-text').css('display', 'none');
    }

    $(".account__event-img-input").change(function(){
        checkURL(this);
    });

    $('.account__event-img-del').on('click', function() {
        $(this).parent('.account__event-img-item').children('.account__event-label').children('.account__event-img').attr('src', '../images/form.jpg');
        $(this).css('display', 'none');
        $(this).parent('.account__event-img-item').children('.account__event-img-input').val(null);
        $(this).parent('.account__event-img-item').children('.account__event-label').children('.account__event-label-text').css('display', 'block');
    });


    // tabs

    $(function() {
        $('ul.account__tabs-caption').on('click', 'a:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.account__tabs').find('div.account__tabs-content').removeClass('active').eq($(this).index()).addClass('active');
        });
    });

    $(function() {
        $('ul.account__save-tabs-caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.account__save-tabs').find('div.account__save-tabs-content').removeClass('active').eq($(this).index()).addClass('active');
        });
    });

    // account page

    let inputs = $('.input__file');
    Array.prototype.forEach.call(inputs, function (input) {
      let label = input.nextElementSibling,
        labelVal = label.querySelector('.input__file-button-text').innerText;

      input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
          countFiles = this.files.length;

        if (countFiles)
          label.querySelector('.input__file-button-text').innerText = 'Фото загружено';
        else
          label.querySelector('.input__file-button-text').innerText = labelVal;
      });
    });

    // page about

    $(function() {
        $('ul.about__tabs-caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.about__tabs').find('div.about__tabs-content').removeClass('active').eq($(this).index()).addClass('active');
        });
    });

    $(function(){
        $('.linkToTop').click(function(){$('html,body').animate({scrollTop:$('.crumbs').offset().top - 110}, 500);});
    });

    $('.about__slider').slick({
        fade: true,
        arrows: false,
        asNavFor: '.about__slider-nav'
    });

    $('.about__slider-nav').slick({
        asNavFor: '.about__slider',
        slidesToShow: 5,
        focusOnSelect: true,
        prevArrow: $('.about__slider-prev'),
        nextArrow: $('.about__slider-next'),
        responsive: [
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint:600,
              settings: {
                slidesToShow: 3,
              }
            }
        ]
    });

    // about-page (gallery tabs)

    $(function() {
        $('ul.about__gallery-tabs-caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.about__gallery-tabs').find('div.about__gallery-tabs-content').removeClass('active').eq($(this).index()).addClass('active');
        });
    });

    $(document).ready(function() {
        $('#first-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1]
            }
        });

        $('#second-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1]
            }
        });
    });

    // calendar-item page

    $('.calendar-item__slider').slick({
        fade: true,
        arrows: false,
        asNavFor: '.calendar-item__slider-nav'
    });

    $('.calendar-item__slider-nav').slick({
        asNavFor: '.calendar-item__slider',
        slidesToShow: 3,
        focusOnSelect: true,
        prevArrow: $('.calendar-item__slider-prev'),
        nextArrow: $('.calendar-item__slider-next'),
    });

    // page guide-item

    $('.guide-item__slider').slick({
        fade: true,
        arrows: false,
        asNavFor: '.guide-item__slider-nav'
    });

    $('.guide-item__slider-nav').slick({
        asNavFor: '.guide-item__slider',
        slidesToShow: 5,
        focusOnSelect: true,
        prevArrow: $('.guide-item__slider-prev'),
        nextArrow: $('.guide-item__slider-next'),
    });

    $('.guide-item__sameplace-slider').slick({
        arrows: false,
        dots: true,
        autoplay: true,
        dotsClass: 'guide-item__sameplace-slider-dots',
        customPaging: function(slider, i) {
            return '<span class="guide-item__sameplace-slider-dot"></span>';
        },
        responsive: [
            {
                breakpoint: 1270,
                settings: {
                    slidesToShow: 2,
                }
            }
        ],
    });




    // page routes-item

    $( ".routes-points__slider-wrapper" ).each(function(index) {
        $('.routes-points__item-slider', $(this)).slick({
            fade: true,
            arrows: false,
            asNavFor: $(this).find('.routes-points__item-slider-nav')
        });
        $('.routes-points__item-slider-nav', $(this)).slick({
            focusOnSelect: true,
            slidesToShow: 5,
            prevArrow: $(this).find('.routes-points__slider-prev'),
            nextArrow: $(this).find('.routes-points__slider-next'),
            asNavFor: $(this).find('.routes-points__item-slider'),
        });
    });

    $(function() {
        $('ul.routes-item__map-points').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active');
        });
    });


    // page routes-item поместить карту внутрь контента / перемещение элементов в tour-guide / souvenirs-item / craftman / guide page

    const moveItems = function () {
        if( $(window).width() <= 1110 ) {
            // routes-item
            $(".routes-item__map-inner").insertBefore($(".routes-points"));
            // tour-guide
            if( !($('.items-inner').length) ){
                $('<div class="items-inner"></div>').insertBefore($(".tour-guide__content"));
                $(".tour-guide__name").appendTo($(".items-inner"));
                $(".tour-guide__content-feedback-item--rating").appendTo($(".items-inner"));
            }
            // tour-agency
            if( !($('.items-inner').length) ){
                $('<div class="items-inner"></div>').insertBefore($(".tour-agency__content"));
                $(".tour-agency__name").appendTo($(".items-inner"));
                $(".tour-agency__content-feedback-item--rating").appendTo($(".items-inner"));
            }
        }
        if( $(window).width() > 1110 ) {
            // routes-item
            $(".routes-item__map-inner").appendTo(".routes-item__wrapper");
            // tour-guide
            $(".tour-guide__name").insertBefore($(".tour-guide__wrapper"));
            $(".tour-guide__content-feedback-item--rating").prependTo($(".tour-guide__content-feedback"));
            $(".items-inner").remove();
            // tour-agency
            $(".tour-agency__name").insertBefore($(".tour-agency__wrapper"));
            $(".tour-agency__content-feedback-item--rating").prependTo($(".tour-agency__content-feedback"));
            $(".items-inner").remove();
        }


        if( $(window).width() <= 930 ) {
            // souvenir-item
            $(".souvenirs-item__content-info-item--move").appendTo($(".souvenirs-item__wrapper"));
            $(".souvenirs-item__name").prependTo($(".souvenirs-item__content"));
        }
        if( $(window).width() > 930 ) {
            // souvenir-item
            $(".souvenirs-item__content-info-item--move").appendTo($(".souvenirs-item__content-info"));
            $(".souvenirs-item__name").insertBefore($(".souvenirs-item__wrapper"));
        }


        if( $(document).width() <= 800 ) {
            // craftman
            $(".souvenirs-item__content-info--move").appendTo($(".souvenirs-item__wrapper"));
            //guide
            if( !($('.guide-page__top-inner .container .guide-page__top-wrapper').length) ){
                $(".guide-page__top-wrapper").appendTo($(".guide-page__top-inner .container"));
            }
        }
        if( $(document).width() > 800 ) {
            // craftman
            $(".souvenirs-item__content-info--move").appendTo($(".souvenirs-item__content"));
            //guide
            if( !($('.guide-page__item .guide-page__top-wrapper').length) ){
                $(".guide-page__top-wrapper").prependTo($(".guide-page__item"));
            }
        }

        if( $(window).width() <= 1160 ) {
            // craftman
            $(".souvenirs-item__content-aside--move").appendTo($(".souvenirs .container"));
            $(".souvenirs-item__aside-item--move").appendTo($(".souvenirs-item__content"));
        }
        if( $(window).width() > 1160 ) {
            // craftman
            $(".souvenirs-item__content-aside--move").appendTo($(".souvenirs-item__content"));
            $(".souvenirs-item__aside-item--move").prependTo($(".souvenirs-item__content-aside"));
        }
    }

    $(document).ready(function(){
        moveItems();
        $(window).on("resize", function(){
            moveItems();
        });
    });


    // guide page

    $(function() {
        var distance = $(".container").getBoundingClientRect();
        var dist = $(window).width();
        var a = dist - distance.right;

        $(".guide-page__item").css("left", (a + "px"));
    });

    $("#show-list-map").on('click', function(){
        $('.elem').css('display', 'block').addClass('active');
    });

    $('.guide-page__title').on('click', function() {
        $('.elem').css('display', 'none').removeClass('active');
        $(this).parent().parent().css('display', 'block');
    });

    window.onresize = function() {
        var distance = $(".container").getBoundingClientRect();
        var dist = $(window).width();
        var a = dist - distance.right;

        $(".guide-page__item").css("left", (a + "px"));
    };

    // guide-list page

    $(function() {
        $(".guide-list__accordion-trigger-svg").click(function(){
            if ($(this).hasClass('active')) {
                $(".guide-list__accordion-trigger-svg").removeClass('active');
                $('.guide-list__accordion-content').hide(200);
            } else {
                $(".guide-list__accordion-trigger-svg").removeClass('active');
                $('.guide-list__accordion-content').hide(200);
                $(this).parent('.guide-list__accordion-trigger').next('.guide-list__accordion-content').slideToggle(200);
                $(this).addClass('active');
            }
        });
    });

    $(function() {
        $(".guide-list__accordion-trigger input").click(function () {
            check = this.checked;
            var t = $(this).parents('.guide-list__accordion-trigger').next('.guide-list__accordion-content');
            t.find('input[type=checkbox]').each(function() {
                this.checked = (check);
            });
          });
    });

    // routes-page

    $(function() {
        $('ul.routes-page__tabs-caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.routes-page__tabs').find('div.routes-page__tabs-content').removeClass('active').eq($(this).index()).addClass('active');
            $routesText = $(this).text();
            $('.crumbs__item.current').text($routesText);
        });
    });


    // souvenirs page

    $(function() {
        $('ul.souvenirs-page__tabs-caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.souvenirs-page__tabs').find('div.souvenirs-page__tabs-content').removeClass('active').eq($(this).index()).addClass('active');
            $routesText = $(this).text();
            $('.crumbs__item.current').text($routesText);
        });
    });

    // blog-list page

    $(function() {
        $('ul.blog-list__tabs-caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active');
        });
    });

    $(function() {
        $('.blog-list__select-body').on('click', '.blog-list__select-item:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
        });
    });

    $(function() {
        $('.author-page__select-body').on('click', '.author-page__select-item:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
        });
    });


    // calendar-item обрезка текста у карточек

    (function() {

        const cropElement = $('.calendar__item-text'), // выбор элементов
            size = 235 // кол-во символов
        endCharacter = '...'; // окончание

        cropElement.each(el => {
            let text = el.innerHTML;

            if (el.innerHTML.length > size) {
                text = text.substr(0, size);
                el.innerHTML = text + endCharacter;
            }
        });

    }());

    // news-list page

    $(function(){
        $('.news-list__last-news-link').click(function(){$('html,body').animate({scrollTop:$('.news-list__items').offset().top - 170}, 500);});
    });


    // главная форма ------------------------------------------------

    $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    $('.quantity').each(function() {
        var spinner = $(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });

    $('.quantity-button').on('click', function() {
        numOne = $('.adults').val();
        numTwo = $('.children').val();
        numThree = $('.babies').val();
        numOne = parseInt(numOne);
        numTwo = parseInt(numTwo);
        numThree = parseInt(numThree);

        let summ = numOne + numTwo + numThree;
        $('.summ').html(summ);
    });

    $('.quantity-button').on('click', function() {
        numOne = $('.adults__tab-3').val();
        numTwo = $('.children__tab-3').val();
        numThree = $('.babies__tab-3').val();
        numOne = parseInt(numOne);
        numTwo = parseInt(numTwo);
        numThree = parseInt(numThree);

        $('.adults-count').html(numOne);
        $('.children-count').html(numTwo);
        $('.babies-count').html(numThree);
    });

    $('.quantity-button').on('click', function() {
        numOne = $('.adults__tab-4').val();
        numTwo = $('.children__tab-4').val();
        numThree = $('.babies__tab-4').val();
        numOne = parseInt(numOne);
        numTwo = parseInt(numTwo);
        numThree = parseInt(numThree);

        let guests = numOne + numTwo + numThree;
        $('.guests').html(guests);
    });


    $('.trip__radio-item').on('click', function() {
        let radioItem = $(this).data('class');
        $('.trip-class').html(radioItem);
    });

    $(document).click(function(e) {
        if ($(e.target).closest('.trip__form-control').length) {
            $('.trip__dropdown').addClass("active-dropdown");
            return;
        }
        $('.trip__dropdown').removeClass("active-dropdown");
    });


    // табсы ---------------------------------------------------------

    let tabs = $('.trip__tabs')
    let btns = $('.trip__tabs > .trip__tabs-item')
    let items = $('.trip__tabs > .trip__tab')

    function change(arr, i) {
        arr.forEach(item => {
            item.forEach(i => { i.classList.remove('active') })
            item[i].classList.add('active')
        })
    }

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', () => {
            change([btns, items], i)
        })
    }

    // слайдер -------------------------------------------------------
    $('.slider__content').slick({
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
            breakpoint: 1200,
            settings: {
                autoplay: false,
            }
        }]
    });


    // список городов для главной формы (выпадающий список) ---------

    var sities = [
        'Алматы', 'Нур-Султан', 'Павлодар', 'Семей', 'Шымкент', 'Актобе', 'Караганда', 'Тараз',
    ];

    $(function() {
        $(".trip__input-name input").autocomplete({
            source: [sities]
        });
    });


    // календарь в главной форме ------------------------------------

    $(function() {
        if ($(window).width() > 1200) {
            new Litepicker({
                element: document.getElementById('start-date-1'),
                elementEnd: document.getElementById('end-date-1'),
                singleMode: false,
                numberOfMonths: 2,
                lang: 'ru-RU',
                format: 'D MMM, YYYY',
            })

            new Litepicker({
                element: document.getElementById('start-date-2'),
                elementEnd: document.getElementById('end-date-2'),
                singleMode: false,
                numberOfMonths: 2,
                lang: 'ru-RU',
                format: 'D MMM, YYYY',
            })

            new Litepicker({
                element: document.getElementById('start-date-3'),
                elementEnd: document.getElementById('end-date-3'),
                singleMode: false,
                numberOfMonths: 2,
                lang: 'ru-RU',
                format: 'D MMM, YYYY',
            })

            new Litepicker({
                element: document.getElementById('start-date-4'),
                elementEnd: document.getElementById('end-date-4'),
                singleMode: false,
                numberOfMonths: 2,
                lang: 'ru-RU',
                format: 'D MMM, YYYY',
            })

            $('#start-date-1').on('click', function() {

                var distance = document.getElementById("end-date-1").getBoundingClientRect();
                var dist = $(window).width();
                var a = dist - distance.right - 10;

                $(".litepicker").css("left", "auto");
                $(".litepicker").css("right", (a + "px"));

            });

            $('#end-date-1').on('click', function() {

                var distance = document.getElementById("end-date-1").getBoundingClientRect();
                var dist = $(window).width();
                var a = dist - distance.right - 10;

                $(".litepicker").css("left", "auto");
                $(".litepicker").css("right", (a + "px"));

            });

            $('#start-date-2').on('click', function() {

                var distance = document.getElementById("end-date-2").getBoundingClientRect();
                var dist = $(window).width();
                var a = dist - distance.right - 10;

                $(".litepicker").css("left", "auto");
                $(".litepicker").css("right", (a + "px"));

            });

            $('#end-date-2').on('click', function() {

                var distance = document.getElementById("end-date-2").getBoundingClientRect();
                var dist = $(window).width();
                var a = dist - distance.right - 10;

                $(".litepicker").css("left", "auto");
                $(".litepicker").css("right", (a + "px"));

            });

            $('#start-date-3').on('click', function() {

                var distance = document.getElementById("end-date-3").getBoundingClientRect();
                var dist = $(window).width();
                var a = dist - distance.right - 10;

                $(".litepicker").css("left", "auto");
                $(".litepicker").css("right", (a + "px"));

            });

            $('#end-date-3').on('click', function() {

                var distance = document.getElementById("end-date-3").getBoundingClientRect();
                var dist = $(window).width();
                var a = dist - distance.right - 10;

                $(".litepicker").css("left", "auto");
                $(".litepicker").css("right", (a + "px"));

            });

            $('#start-date-4').on('click', function() {

                var distance = document.getElementById("end-date-4").getBoundingClientRect();
                var dist = $(window).width();
                var a = dist - distance.right - 10;

                $(".litepicker").css("left", "auto");
                $(".litepicker").css("right", (a + "px"));

            });

            $('#end-date-4').on('click', function() {

                var distance = document.getElementById("end-date-4").getBoundingClientRect();
                var dist = $(window).width();
                var a = dist - distance.right - 10;

                $(".litepicker").css("left", "auto");
                $(".litepicker").css("right", (a + "px"));

            });
        }
    });


    // --------------------------------------------------------------



});
