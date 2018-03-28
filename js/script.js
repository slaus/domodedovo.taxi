//Slider settings
jQuery(function ($) {

    var initialDate = new Date(),
        $year = $("#year");

    if ($year.length) {
        $year.text(initialDate.getUTCFullYear());
    }

    //Smooth scrolling of the page when you click on the menu
    $(".smooth-scroll").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

//Smooth scrolling of the page when you click on the menu
    $(".smooth-scroll").on("click", function (event) {

        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);

    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100 && $(".menu").hasClass("default")) {
            $(".menu").removeClass("default").addClass("fixed");
        } else if ($(this).scrollTop() <= 100 && $(".menu").hasClass("fixed")) {
            $(".menu").removeClass("fixed").addClass("default");
        }

//Back to top button
        if ($(this).scrollTop() > 400) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

// scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    //Slider settings
    var jcarousel = $('.jcarousel');

    jcarousel
        .jcarousel({
            animation: {
                duration: 1000,
                speed: 1000,
                easing: 'linear',
                complete: function () {
                }
            }
        })
        .jcarouselAutoscroll({
            interval: 5000,
            target: '+=1',
            autostart: true,
        })
        .on('mouseover', function (e) {
            $(this).jcarouselAutoscroll('stop');
        })
        .on('mouseout', function (e) {
            $(this).jcarouselAutoscroll('start');
        });

    jcarousel
        .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                width = carousel.innerWidth();

            if (width >= 768) {
                width = width / 2;
            } else {
                width = width / 1;
            }

            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        })
        .jcarousel({
            wrap: 'circular'
        });


    $('.jcarousel-control-prev')
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function () {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function () {
            $(this).removeClass('active');
        })
        .on('click', function (e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            perPage: 1,
            item: function (page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        });

    //Mobile menu
    var mobile = $('#mobile');
    menu = $('#top-menu ul');
    menuHeight = menu.height();

    $(mobile).on('click', function (e) {
        e.preventDefault();
        menu.slideToggle();
    });

    //SEND MESSAGE
    var form = $("#contact-form");

    $(form).submit(function (event) {
        event.preventDefault();
        var formData = $(form).serialize();
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'), data: formData
            }
        ).done(function (response) {
            //$(form).hide();
            $('#successMessage h3').text(response);
            $('#successMessage').show();
            setTimeout(function() { $('#successMessage').hide(); }, 5000);
            $('#name').val('');
            $('#email').val('');
            $('#phone').val('');
            $('#message').val('');
        }).fail(function (data) {
            $('#errorMessage h3').text(data.responseText);
            $('#errorMessage').show();
        });

        return false;
    });

});


