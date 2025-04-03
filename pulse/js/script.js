/* const { name } = require("browser-sync"); */

$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/slider/icon_chevron_left.png"></button>',
        nextArrow:  '<button type="button" class="slick-next"><img src="../icons/slider/icon_chevron_right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false
                }
            }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });



      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
        })
      };

      toggleSlide ('.catalog-item__link');
      toggleSlide ('.catalog-item__back');

      // Modal

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();

      });
      $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
      });

      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });

      function valideForms(form) {
        $(form).validate ({
          rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: 'required',
            email: {
              required: true,
              email: true
            },
            messages: {
              name: "Пожалуйста, ввекдите свое имя",
              phone: "Пожалуйста, введите свой номер телефона",
              email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильно введен адрес почты"
              }
            }
          }
        })
      };
      valideForms('#consultation-form')
      valideForms('#consultation form')
      valideForms('#order form')

      $('input[name=phone]').mask('+7 (999) 999-99-99')
});