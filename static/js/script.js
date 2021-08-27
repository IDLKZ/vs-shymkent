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

function headerMenuShow(){
  $(".footer-nav").css('display', 'block');
  $(".footer-nav__content").animate({width: 'toggle'});
}

function headerMenuHide(){
  $(".footer-nav__content").animate({width: 'hide'}, function(){
    $(".footer-nav").css('display', 'none');
  });
}

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

  function calendarDateBtn(){
    $(".calendar__date-btn").removeClass("active");
    $(this).addClass("active");
  }

  function guideListAccordion(){
      if ($(".guide-list__accordion-trigger-svg").hasClass('active')) {
        $(".guide-list__accordion-trigger-svg").removeClass('active');
        $('.guide-list__accordion-content').hide(200);
      } else {
        $(".guide-list__accordion-trigger-svg").removeClass('active');
        $('.guide-list__accordion-content').hide(200);
        $(".guide-list__accordion-trigger-svg").parent('.guide-list__accordion-trigger').next('.guide-list__accordion-content').slideToggle(200);
        $(".guide-list__accordion-trigger-svg").addClass('active');
      }
  }

  function guideListAccordionCheckbox(){
    let check = this.checked;
    var t = $(".guide-list__accordion-trigger input").parents('.guide-list__accordion-trigger').next('.guide-list__accordion-content');
    t.find('input[type=checkbox]').each(function() {
      this.checked = (check);
    });
  }


