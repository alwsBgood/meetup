//Форма отправки 2.0
$(function() {
    $('.db-form').on('submit', function(e) {
        var $form = $(this);
        $.ajax({
            type: 'POST',
            url: 'db/registration.php',
            dataType: 'json',
            data: $form.serialize(),
            success: function(response) {
                // console.info(response);
                if (response.status == 'success') {
                  //  window.location.href = "/done/";
                }
            }
        });

        $(":input.error").removeClass('error');
        $(".allert").remove();

        var error;
        var btn = $(this);
        var ref = btn.closest('form').find('[required]');
        var msg = btn.closest('form').find('input, textarea, select');
        var send_btn = btn.closest('form').find('[name=send]');
        var send_options = btn.closest('form').find('[name=google_doc]');
        var formType = btn.closest('form').find('[name=form_type]').val();
        var redirect = btn.closest('form').find('[name=redirect]').val();
        var alertImage = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';


        $(ref).each(function() {
            if ($(this).val() == '') {
                var errorfield = $(this);
                $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span>' + alertImage + '</div>');
                error = 1;
                $(":input.error:first").focus();
                return;
            } else {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if ($(this).attr("type") == 'email') {
                    if (!pattern.test($(this).val())) {
                        $("[name=email]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span>' + alertImage + '</div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
                var patterntel = /^()[- +()0-9]{9,18}/i;
                if ($(this).attr("type") == 'tel') {
                    if (!patterntel.test($(this).val())) {
                        $("[name=phone]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите номер телефона в формате +3809999999</span>' + alertImage + '</div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
            }
        });
        if (!(error == 1)) {
            $(send_btn).each(function() {
                $(this).attr('disabled', true);
            });
            $(send_options).each(function() {
                if ($(this).val() == 'callBack') {
                    $.ajax({
                        type: 'POST',
                        url: 'https://docs.google.com/forms/d/e/1FAIpQLSe6xZyWsAPy3-qdaLQVje5Sqj0kxZD5LE0iHwKUdxoDEabB4w/formResponse',
                        data: msg,
                        success: function() {
                            $('form').trigger("reset");
                            setTimeout(function() {
                                $("[name=send]").removeAttr("disabled");
                            }, 1000);
                            // Настройки модального окна после удачной отправки

                        },
                        error: function(xhr, str) {
                            dataLayer.push({
                                'form_type': formType,
                                'event': "form_submit"
                            });
                            $('div.md-show').removeClass('md-show');
                            $('form').trigger("reset");
                            console.log('success')
                        }
                    });
                } else {
                    $.ajax({
                        type: 'POST',
                        url: 'https://docs.google.com/forms/d/e/1FAIpQLSf-sNZ_Mc39Vu8Ozf_HIIMCF_I8-kw2PXJDRu_pDl1CHei4rg/formResponse?embedded=true',
                        data: msg,
                        statusCode: {
                            0: function() {
                                //  $( "#modal_callback_ok h4" ).remove();
                                //  $( "#modal_callback_ok" ).prepend("<h4>"+name+",</h4>");
                                $('form').trigger("reset");
                                setTimeout(function() {
                                    $("[name=send]").removeAttr("disabled");
                                }, 1000);
                                // Настройки модального окна после удачной отправки

                            }
                        },
                        error: function(xhr, str) {
                            dataLayer.push({
                                'form_type': formType,
                                'event': "form_submit"
                            });
                            $('div.md-show').removeClass('md-show');
                            $('form').trigger("reset");
                            console.log('success')
                        }
                    });
                }
            });
            
               
            var form_data = $(this).closest('form').serializeArray();
            var form_data_registration = {};
            $.each(form_data,
                function(i, v) {
                    form_data_registration[v.name] = v.value;
                });
          
            console.log(form_data_registration);
            $.ajax({
               type: 'POST',
                url: '/registration/application.php',
                data: {registration: form_data_registration},
                success: function(response) {
                    window.location.href = '/anketa/index.php?potential_id='+response;
                }   
            });
        }
        return false;
    })
});





// Smooth scroll to anchor

$('.scroll').click(function() {
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
    return false;
});


//  CURSOR ON SLIDER HOVER FUNCTION

$(document).ready(function() {
    jQuery(".slider").mousedown(function() {
        jQuery(this).removeClass("touch_mode_grab")
            .addClass("touch_mode_grabbing");
    }).mouseup(function() {
        jQuery(this).removeClass("touch_mode_grabbing")
            .addClass("touch_mode_grab");
    })
});







// Scroll BAR

$(window).scroll(function() {
    // calculate the percentage the user has scrolled down the page
    var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());

    $('.bar-long').css('width', scrollPercent + "%");

});



$(document).ready(function() {
    $('.slider_exp-main').slick({
        slidesToShow: 1,
        dots: false,
        arrows: true,
        slidesToScroll: 1,
        autoplay: false,
        fade: true,
        autoplay: true,
        asNavFor: '.slider_exp-nav',
        focusOnSelect: true,
        responsive: [{
                breakpoint: 767,
                settings: {
                    autoplay: false,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function() {
    $('.slider_exp-nav').slick({
        slidesToShow: 4,
        dots: false,
        arrows: false,
        slidesToScroll: 1,
        asNavFor: '.slider_exp-main',
        focusOnSelect: true,
        responsive: [{
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                    centerPadding: '0',
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});


$(document).ready(function() {
    $('.slider_exp1-main').slick({
        slidesToShow: 1,
        dots: false,
        arrows: true,
        slidesToScroll: 1,
        autoplay: false,
        fade: true,
        autoplay: true,
        asNavFor: '.slider_exp1-nav',
        focusOnSelect: true,
        responsive: [{
                breakpoint: 767,
                settings: {
                    autoplay: false,
                    asNavFor: null
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function() {
    $('.slider_exp1-nav').slick({
        slidesToShow: 4,
        dots: false,
        arrows: false,
        slidesToScroll: 1,
        asNavFor: '.slider_exp1-main',
        focusOnSelect: true,
        responsive: [{
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                    centerPadding: '0',
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]

    });
});

$(document).ready(function() {
    $('.phone_slider').slick({
        slidesToShow: 1,
        dots: false,
        arrows: false,
        slidesToScroll: 1,
        asNavFor: '.phone_slider--nav',
        focusOnSelect: true
    });
});

$(document).ready(function() {
    $('.phone_slider--nav').slick({
        slidesToShow: 1,
        dots: false,
        arrows: true,
        slidesToScroll: 1,
        fade: true,
        asNavFor: '.phone_slider',
    });
});


// INPUT TEL MASK
jQuery(function($){
 $("input[type='tel']").mask("+99 (999) 999-9999");
});