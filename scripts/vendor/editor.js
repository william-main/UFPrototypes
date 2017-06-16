var modalWidth = 800;
var startTop = document.documentElement.scrollTop; //|| document.body.scrollTop; -- Oli Removed this
var windowWidth = $(window).width();
var navHTML = $('.main-nav').html();
var newNav = $('*[data-js="mob-nav-holder"]');
var map;
var articlesToSkip = 2;

(function(){

	// makes external SVG links work on IE
  	svg4everybody();

  	$(window).on('load', function () {
  	    setTimeout(function () {
  	        if ($('.bootstrap-datetimepicker-widget')) {
  	            var version = detectIE();
  	            if (!version === false) {
  	                $('html').addClass('IE');
  	                heroBgInit();
  	            } else {
  	                heroBgInit();
  	            }


  	           // allowCookies();
  	            windowWidth = $(window).width();
  	            resizeInit();
  	            scrollInit();
  	            defineBreakpoint();
  	            scrolledHeader(startTop);
  	           // navInit($('.main-nav'));
  	            videoInit();
  	            modalInit();
  	            transitionsInit(startTop);
  	            showHideInit();
  	            //endOfPage(startTop);
  	            headerInit();
  	            matchHeightInit();
  	            carouselInit();
  	            //sliderInit();
  	            formInit();
  	            flipperInit();
  	            toggleInit();
  	            //createMap();
  	            accordionInit();
  	            faqInit();

  	            downArrowInit();
  	            showcaseInit();
  	            jumpToForm();
  	            showOverlay();
  	            lazyLoading();
  	            chatTriggerInit();
  	            $('body').attr('data-loaded', 'true');
  	        }
  	    }, 5000);
  		
	});

    $(window).on('load', function () {
        setTimeout(function () { 
            buttonsInit();
          //  initMap();
        }, 5000);
	});


    $('*[data-js-content-swap="inactive"]').hide();
    $('*[data-js-loan-type]').each(function () {
        $(this).html(getParameterByName("type"));
    });

})();

function jumpToForm() {
    if ($("#results").length != 0) {
        $('html, body').animate({
            scrollTop: $("#results").offset().top
        }, 0);
    }

    if ($("#fail").length != 0) {
        $('html, body').animate({
            scrollTop: $("#fail").offset().top
        }, 0);
    }
}

function showcaseInit() {
    $('.showcase').click(function () {

        var contentId = $(this).data('content');

        $.post("/ShowCase/Index/?contentID=" + contentId + "&take=3&skip=3", function (data) {
            alert(data);
        });


    });

}


// things to do after resize
function resizeInit() {
    // from https://css-tricks.com/snippets/jquery/done-resizing-event/
    var resizeTimer;

    // run functions just after resize finishes
    $(window).on('resize', function (e) {

        if ($(window).width() != windowWidth) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                defineBreakpoint();
                buttonsInit();
                scrollInit();
                navInit($('.main-nav'));
                scrolledHeader();
                matchHeightInit();
                carouselInit();
                heroBgInit();
                windowWidth = $(window).width();

                // stuff that relies on getting the new window width
                heroBgInit();
            }, 100);
        }
    });
}

// things to do on scroll
function scrollInit() {
    $(window).on('scroll', function (e) {
        var top = window.pageYOffset || document.documentElement.scrollTop,
		    left = window.pageXOffset || document.documentElement.scrollLeft;

        scrolledHeader(top, left);
        transitionsInit(top, left);
        //endOfPage(top);
    });
}

// change to scrolled header if the page is scrolled
function scrolledHeader(top, left) {
    if (breakpointTest() === "desktop") {
        if (top > 100) {
            $('body').attr('data-scrolled', 'true');
        } else if ($('body').attr('data-scrolled', 'true') && (top < 200)) {
            $('body').attr('data-scrolled', 'transition');
        } else {
            $('body').attr('data-scrolled', 'false');
        }
    } else {
        $('body').attr('data-scrolled', 'false');
    }
}

// add a breakpoint class to the html element
function defineBreakpoint() {
    if ($(window).outerWidth() >= 1200) {
        $('html').attr('data-window-size', 'breakpoint-lg');
    } else if ($(window).outerWidth() >= 992) {
        $('html').attr('data-window-size', 'breakpoint-md');
    } else if ($(window).outerWidth() >= 768) {
        $('html').attr('data-window-size', 'breakpoint-sm');
    } else {
        $('html').attr('data-window-size', 'breakpoint-xs');
    }
}

// initialise the nav
function navInit(navEl) {

    var navPos;
    var headerHeight;
    if (($('html').attr('data-window-size') === 'breakpoint-xs') || ($('html').attr('data-window-size') === 'breakpoint-sm')) {
        navEl.html('').hide();
        $('*[data-js="mob-nav-holder"]').html(navHTML).addClass('main-nav');
        var navHeight = newNav.height();
        headerHeight = $('*[data-js="main-header"]').outerHeight();
        navPos = $('*[data-js="main-header"]').offset().top;

        newNav.css('top', -navHeight - 100);
        $('.mobile-utility__nav-control').removeClass('mobile-utility__nav-control--active');
    } else {
        navEl.show().css('top', 0);
        $('.main-nav__nav-item').css('opacity', '1');
        if ((navEl).is(':empty')) {
            navEl.html(navHTML);
        }
        $('*[data-js="mob-nav-holder"]').removeClass('active');
    }

    $('*[data-js="mobile-nav-trigger"]').unbind('click');

    $('*[data-js="mobile-nav-trigger"]').bind('click', function () {
        $(this).toggleClass('mobile-utility__nav-control--active');
        if (newNav.hasClass('active')) {
            newNav.removeClass('active');
            newNav.animate({
                top: -navHeight - 400
            });
            $('.main-nav__nav-item').css('opacity', '0');
        } else {
            newNav.show().animate({
                top: parseInt(navPos) + parseInt(headerHeight)
            }, 500, function () {
                $('.main-nav__nav-item').animate({
                    opacity: '1'
                }, 750);
            });


            newNav.addClass('active');
        }
    });
}

// initialise header
function headerInit() {
    if (location.pathname == "/") {
        var gifUrl = $('*[data-js="animate-gif"]').attr('src');
        $('*[data-js="animate-gif"]').removeClass('u-invisible').attr('src', gifUrl);
    }

    //setTimeout(function () {
    //    $('*[data-js="animate-gif"]').removeClass('u-invisible').attr('src', gifUrl);gif
    //}, 0);
}

// initialise carousel
function carouselInit() {
    var firstSlide = Math.floor(Math.random() * (3 - 0));

    if (($('html').attr('data-window-size') === 'breakpoint-xs') || ($('html').attr('data-window-size') === 'breakpoint-sm')) {
        $('*[data-js="mobile-carousel"]').each(function () {
            var navEl = $(this).siblings('*[data-js="mobile-nav"]');
            var _this = $(this);

            _this.slick({
                arrows: false,
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 2,
                autoplay: true,
                autoplaySpeed: 7000,

                responsive: [
			    {
			        breakpoint: 600,
			        settings: {
			            slidesToShow: 1,
			            slidesToScroll: 1,
			            autoplay: true,
			            autoplaySpeed: 5000,
			            initialSlide: firstSlide
			        }
			    }]
            });
        });
    } else {
        $('*[data-js="mobile-carousel"]').each(function () {
            var navEl = $(this).siblings('*[data-js="mobile-nav"]');
            var _this = $(this);
            if (_this.hasClass('slick-initialized')) {
                _this.slick('unslick');
            }
        });

        if (('*[data-js="mobile-carousel"]')) {
            if ($(this).hasClass('slick-initialized')) {
                $('*[data-js="mobile-carousel"]').slick('unslick');
            }
        }

    }

    if ($('*[data-js="auto-carousel"]').length > 0) {
        $('*[data-js="auto-carousel"]').each(function () {
            var _this = $(this);

            _this.slick({

                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                infinite: true,
                arrows: false,
                pauseOnFocus: false,
                pauseOnHover: false,
                responsive: [
				    {
				        breakpoint: 992,
				        settings: {
				            centerMode: true,
				            slidesToShow: 4
				        }
				    },
				    {
				        breakpoint: 720,
				        settings: {
				            slidesToShow: 3,
				            centerMode: true
				        }
				    },
				    {
				        breakpoint: 480,
				        settings: {
				            centerMode: true,
				            slidesToShow: 2
				        }
				    }
                ]
            });
        });
    }

}

// initialise buttons
function buttonsInit() {
    if (($('html').attr('data-window-size') === 'breakpoint-xs')) {
        var maxBtnWidth = 0;
        $('*[data-js="multiple-btn"]').each(function () {

            $(this).find('.btn').each(function () {
                $(this).animate({
                    'opacity': '0'
                }, 0);

                var btnWidth = $(this).outerWidth();

                if (btnWidth > maxBtnWidth) {
                    maxBtnWidth = btnWidth;
                }
            });

            $(this).find('.btn').width(maxBtnWidth - 60);

        });

        $('*[data-js="multiple-btn"] .btn').animate({
            'opacity': '1'
        }, 0);

        //$('*[data-js="multiple-btn"]').equalize('outerWidth');
    } else {
        $('*[data-js="multiple-btn"]').find('button').css('width', 'auto');
    }


}

// initialise video
function videoInit() {
    $('*[data-js="storyPlayer"]').each(function () {
        var options = {
            id: 59777392,
            loop: false,
            byline: false,
            title: false,
            portrait: false,
            width: modalWidth
        };

        var player = new Vimeo.Player('player', options);

        player.setVolume(0);

        player.on('play', function () {

        });
    });

}

// initialise modal windows
function modalInit() {
    $('*[data-js="modal-trigger"]').magnificPopup({
        type: 'inline',
        closeOnBgClick: true,
        width: modalWidth
    });
}

// initialise stuff appearing as you scroll
function transitionsInit(top, left) {
    windowHeight = $(window).height();
    var elTop;
    var scrollPastAmount;

	if (breakpointTest() === 'desktop') {
		scrollPastAmount = 50;
	} else {
		scrollPastAmount = 100;
	}

	$('*[data-js="scroll-animation"]').each( function() {
		if ($(this).parents('.site-footer').length > 0) {
			elTop = $(this).parents('footer').offset().top;
			if (top + windowHeight >= elTop + 500) {
				$(this).attr('data-animation-activated', 'true');
			}
		} else {
			elTop = $(this).parents('section').offset().top;
			if (top + windowHeight >= elTop + scrollPastAmount) {
				$(this).attr('data-animation-activated', 'true');
			}
		}
	});

}

// function to test for breakpoints
function breakpointTest() {
    if (($('html').attr('data-window-size') === 'breakpoint-md') || ($('html').attr('data-window-size') === 'breakpoint-lg')) {
        return 'desktop';
    } else {
        return 'mobile';
    }
}

// initialise show/hide functionality
function showHideInit() {
    $('*[data-js="hidden-trigger"]').click(function () {
        var el = $(this).attr('data-js-controlled');

        $('*[data-js-controller="' + el + '"]').toggleClass('u-hidden');

        return false;
    });
}

// match height
function matchHeightInit() {
    $('*[data-js="videoContainer"]').equalize({ equalize: 'outerHeight', reset: true });

    $('*[data-js-matchHeight]').each(function () {
        var el = ($(this).attr("data-js-matchHeight"));
        if (el != "") {
            $(this).equalize({ children: '.' + el, reset: true });
        } else {;
            $(this).equalize({ equalize: 'outerHeight', reset: true });
        }
    })

}


// map initialisation
function initMap(el) {
    if ($('*[data-map-controller]').length) {
        createMap();
    }

    $('*[data-map-controller]').change(function () {
        createMap();

        var activeOffice = $(this).val().replace(/[^a-zA-Z 0-9]+\s+/g, '');


        $('*[data-js-office-name]').addClass('u-hidden');

        $('*[data-js-office-name = "' + activeOffice + '"]').removeClass('u-hidden');
    });

}


// initialise accordion
function accordionInit() {
    $('*[data-accordion-control]').click(function () {
        if ($(this).closest('*[data-accordion-container]').hasClass('active')) {
            $(this).closest('*[data-accordion-container]').removeClass('active');
            $(this).next('*[data-accordion-content]').removeClass('open').animate({
                opacity: 0
            }, 200, function () {
                $(this).slideToggle(200);
            }
			);
        } else {
            $(this).closest('*[data-accordion-container]').addClass('active');
            $(this).next('*[data-accordion-content]').addClass('open').slideToggle(200, function () {
                $(this).animate({
                    opacity: 1
                }, 200);
            });
        }

        return false;
    });
}

// create map function
function createMap(container, lat, lng) {
    var lat = parseFloat($('*[data-map-controller]').children('option:selected').attr('data-lat'));
    var lng = parseFloat($('*[data-map-controller]').children('option:selected').attr('data-lng'));;
    var loc = { lat: lat, lng: lng };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: loc,
        scrollwheel: false
    });
    var marker = new google.maps.Marker({
        position: loc,
        map: map
    });

}


function formInit() {

    //Oli - Scroll to form on various conditions

    if ($(".field-validation-error")[0]) {
        window.location.hash = "#form";
    }

    $('input[type="number"]').on('keypress', function (e) {
        if (e.keyCode === 101 || e.keyCode === 46) {
            e.preventDefault();
        }
    });


    //Oli - James to check start
    var currentDropDownSetting = "";

    $('*[data-js-filter-dropdown]').focusin(function () {
        if (currentDropDownSetting != $(this).val()) {
            $("*[data-category]").fadeTo("fast", 0.1, function () {
            });
        }
        else
        {
            $(".fadeInProduct").fadeTo("fast", 0.1, function () {
            });
        }
    });
    $('*[data-js-filter-dropdown]').focusout(function () {
        $("*[data-category]").css("opacity", 1);
    });
    $('*[data-js-filter-dropdown]').change(function () {
        $("*[data-category]").css("opacity", 1);
        $('*[data-js-filter-dropdown]').blur();

    });
    $('*[data-js-filter-dropdown]').blur(function () {
        $("*[data-category]").css("opacity", 1);
    });

    $('*[data-js-filter-dropdown]').click(function () {

        $('.fadeInProduct').css("opacity", 1);

    });


    $('*[data-js-filter-dropdown]').change(function () {
        $('.fadeInProduct').removeClass('fadeInProduct');
        $('.fadeOutProduct').removeClass('fadeOutProduct');
        var chosenTag = $(this).val().replace(/[^0-9a-zA-Z]+\s+/g, '').replace('-', '');
        currentDropDownSetting = chosenTag;
        if (chosenTag === 'All') {
            $('*[data-category]').addClass('fadeInProduct');
            $('*[data-category]').fadeIn();
        } else {
            $('*[data-category]').each(function () {
                var _this = $(this);
                var itemTags = [];
                itemTags = $(this).attr('data-category').split(',');
                var container = $(this).find('aside');


                $.each(itemTags, function (index, item) {

                    if (item === chosenTag) {
                        // do whatever with the selected ones
                        _this.addClass('fadeInProduct');
                    } else {
                        _this.addClass('fadeOutProduct');
                    }
                });
            });
            $('*[data-category]').hide();
            $('.fadeInProduct').fadeIn(2000);

        }
    });
    //Oli - James to check Fin



    $('*[data-js-currency-input]').each(function () {

        $(this).prev('p').hide();
        addCurrency($(this));

        $(this).bind("propertychange change click keyup input paste", function (event) {
            // If value has changed...
            if ($(this).data('oldVal') != $(this).val()) {
                // Updated stored value
                $(this).data('oldVal', $(this).val());

                // Do action
                addCurrency($(this));

                //resetRatesTable($(this).val(), $(this).parents('form'));
            }
        });
    });

    $('input[name="loan-months"]').val(getParameterByName('when-pay-back'));

    $('*[data-js-quote-form]').on('submit', function (e) {

        var isValid = $('*[data-js-quote-form]').valid();
        if (isValid) {
            e.preventDefault();
            var loanAmount = parseInt($('input[name="borrow-amount"]').val());
            var companyName = $('input[name="company-name"]').val();
            var payBackTime = $('input[name="when-pay-back"]').val();

            if (loanAmount < 50001) {
                window.location.href = "advance.html?type=advance&company-name=" + companyName + "&borrow-amount=" + loanAmount + "&when-pay-back=" + payBackTime;
            } else {
                window.location.href = "loan.html?type=loan&company-name=" + companyName + "&borrow-amount=" + loanAmount + "&when-pay-back=" + payBackTime;
            }

            return false;
        }
    });

    $('*[data-js-loan-form]').on('submit', function (e) {
        var isValid = $('*[data-js-quote-form]').valid();
        if (isValid) {
            e.preventDefault();
            var loanAmount = parseInt($('input[name="borrow-amount"]').val());
            var companyName = getParameterByName("company-name");
            var payBackTime = parseInt($('input[name="loan-months"]').val());


            window.location.href = "apply.html?type=Loan&company-name=" + companyName + "&borrow-amount=" + loanAmount + "&when-pay-back=" + payBackTime;


            return false;
        }
    });

    $('*[data-js-advance-form]').on('submit', function (e) {
        var isValid = $('*[data-js-advance-form]').valid();
        if (isValid) {
            e.preventDefault();
            var loanAmount = parseInt($('input[name="borrow-amount"]').val());
            var companyName = getParameterByName('company-name');
            var payBackTime = $('input[name="advance-days"]:checked').val();

            window.location.href = "apply.html?type=Advance%20Loan&company-name=" + companyName + "&borrow-amount=" + loanAmount + "&when-pay-back=" + payBackTime;

            return false;
        }
    });

    $('*[data-js-apply-form1]').on('submit', function (e) {
        var isValid = $('*[data-js-apply-form1]').valid();
        if (isValid) {
            e.preventDefault();
            var loanAmount = getParameterByName('borrow-amount');
            var companyName = $('input[name="company-name"]').val();
            var payBackTime = getParameterByName('when-pay-back');

            window.location.href = "apply2.html?type=" + loanType + "&company-name=" + companyName + "&borrow-amount=" + loanAmount + "&when-pay-back=" + payBackTime;

            return false;
        }
    });

    $('*[data-js-apply-form2]').on('submit', function (e) {
        var isValid = $('*[data-js-apply-form2]').valid();
        if (isValid) {
            e.preventDefault();
            var loanAmount = getParameterByName('borrow-amount');
            var companyName = getParameterByName('company-name');
            var payBackTime = getParameterByName('when-pay-back');

            window.location.href = "apply3.html?type=" + loanType + "&company-name=" + companyName + "&borrow-amount=" + loanAmount + "&when-pay-back=" + payBackTime;

            return false;
        }
    });

    $('*[data-js-apply-form3]').on('submit', function (e) {
        var isValid = $('*[data-js-apply-form3]').valid();
        if (isValid) {
            e.preventDefault();
            var loanAmount = getParameterByName('borrow-amount');
            var companyName = getParameterByName('company-name');
            var payBackTime = getParameterByName('when-pay-back');

            window.location.href = "apply4.html?type=" + loanType + "&company-name=" + companyName + "&borrow-amount=" + loanAmount + "&when-pay-back=" + payBackTime;

            return false;
        }
    });

    $('*[data-js-apply-form4]').on('submit', function (e) {
        var isValid = $('*[data-js-apply-form4]').valid();
        if (isValid) {
            e.preventDefault();
            var loanAmount = getParameterByName('borrow-amount');
            var companyName = getParameterByName('company-name');
            var payBackTime = getParameterByName('when-pay-back');

            window.location.href = "apply5.html?type=" + loanType + "&company-name=" + companyName + "&borrow-amount=" + loanAmount + "&when-pay-back=" + payBackTime;

            return false;
        }
    });

    $('*[data-js-in-page-quote]').on('submit', function (e) {
        var stage = parseFloat($(this).parents('*[data-js-product-quote]').attr('data-js-product-stage'));
        var isValid = $('*[data-js-in-page-quote]').valid();
        if (isValid) {
            e.preventDefault();

            if (stage === 1) {
                $(this).parents('*[data-js-product-quote]').attr('data-js-product-stage', 2);

                // this will fake a loading screen for testing!
                setTimeout(function () {
                    $('*[data-js-product-stage]').attr('data-js-product-stage', 3);
                }, 2000);
            }

            return false;
        }
    });

    $('*[data-js-validated-form]').each(function () {
        $(this).validate({
            errorLabelContainer: '.error-container',
            wrapper: 'div',
            errorPlacement: function (error, element) {
                if (element.hasClass('businessLookup ')) {
                    element.parent().prepend(error);
                } else {
                    error.appendTo(element.parent());
                }
            }
        });
    });

    // the following method must come AFTER .validate()
    // 2 digits rule for sort code input fields
    $('*[data-js-validated-form]').find('*[data-sort-code]').each(function () {
        $(this).rules('add', {
            minlength: 2,
            maxlength: 2,
            messages: {
                minlength: "Please enter 2 digits in every field",
                maxlength: "Please enter 2 digits in every field"
            }
        });
    });

    // Allow only 2 numbers in sort code input field : http://stackoverflow.com/questions/33299639/allow-only-2-numbers-on-input-type-number
    $('*[data-sort-code]').bind('keydown', function (e) {
        var targetValue = $(this).val();
        if (e.which === 8 || e.which === 13 || e.which === 37 || e.which === 39 || e.which === 46) { return; }

        if (e.which > 47 && e.which < 58 && targetValue.length < 2) {
            var c = String.fromCharCode(e.which);
            var val = parseInt(c);
            var textVal = parseInt(targetValue || "0");
            var result = textVal + val;

            if (result < 0 || result > 99) {
                e.preventDefault();
            }

            if (targetValue === "0") {
                $(this).val(val);
                e.preventDefault();
            }
        }
        else {
            e.preventDefault();
        }
    });

    $('*[data-js-value-from-query]').each(function () {
        var param = $(this).attr('data-js-value-from-query');
        var fieldVal = getParameterByName(param);
        if ($(this).is('input')) {
            $(this).val(fieldVal);
            if ($(this)[0].hasAttribute('data-js-currency-input')) {
                addCurrency($(this));
            }
        } else {
            $(this).html('£' + commaSeparateNumber(fieldVal));
        }
    });

    $('*[data-js-ratesAdvanceMonths]').change(function () {
        if (!$('body').hasClass('calculating')) {
            resetRatesTable($(this).parents('form').find('*[data-js-ratesvalue]').val(), $(this).parents('form'));

            $('*[data-js-loanlength]').html($('*[data-js-ratesadvancemonths]:checked').val());
        } else {
            console.log('hi');
           
        }
        //$(this).unbind();
    });

    $('*[data-js-ratesvalue]').change(function () {
        if (!$('body').hasClass('calculating')) {
            resetRatesTable($(this).parents('form').find('*[data-js-ratesvalue]').val(), $(this).parents('form'));
        }
        $(this).unbind();
    });

    $('*[data-js-ratesmonths]').change(function () {
        if (!$('body').hasClass('calculating')) {
            $('*[data-js-loanmonths]').html($('*[data-js-ratesmonths]').val());
            resetRatesTable($(this).parents('form').find('*[data-js-ratesvalue]').val(), $(this).parents('form'));
        }
        $(this).unbind();
    });

    $('*[data-js-controls]').click(function () {
        $('*[data-js-loanmonths]').html($('*[data-js-ratesmonths]').val());
    });

    $('form').each(function () {
        //  resetRatesTable($(this).find('*[data-js-currency-input]').val(), $(this));
    });

    $('*[data-js-number-input]').change(function () {
        numberSpinnerInit();
    });

    var loanType = getParameterByName('type');

    //If the type is Loan (and not Advance) remove the last 2 elements of the form steps
    if (loanType == "Loan") {
        $('.form-progress dt').slice(-2).remove();
    }

    numberSpinnerInit();
    formTipInit();
}

function addCurrency(el) {

    if ($.isNumeric(el.val())) {
        el.addClass('active').prev('p').show();
    } else {
        el.removeClass('active').prev('p').hide();
    }
}

// taken from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function resetRatesTable(value, form) {
    $('body').addClass('calculating');
    $('*[data-js-ratesAdvanceMonths]').attr('disabled', 'disabled');

    var amount;
    var url;
    var duration;
    var rate;
    $('.table--rates-table').animate({
        'opacity': '0'
    }, 100, function () {
        if (form.attr('data-js-formtype') === 'advance' && $('input[name="HowLongDays"]:checked') != undefined) {
            amount = form.find('input[name="AdvanceAmount"]').val();
            rate = parseFloat(form.find('input[name="HowLongDays"]:checked').attr('data-js-rate')) / 100;
            url = "/api/PaymentCalculator/GetPaymentsAdvance?amount=" + amount + "&rate=" + rate;
        } else if ($('*[data-js-ratesmonths]') != undefined) {
            amount = form.find('input[name="LoanAmount"]').val();
            duration = $('*[data-js-ratesmonths]').val();
            rate = parseFloat($('*[data-js-interestFieldLoan] .percentage').html()) / 100;

            url = "/api/PaymentCalculator/GetPaymentsLoan?amount=" + amount + "&rate=" + rate + '&duration=' + duration;
        }


        $.ajax({
            dataType: 'json',
            url: url,
            success: function (data, textStatus, jqXHR) {
                var data = (JSON.parse(data));
                $(form).find('*[data-js-interestField]').html(rate * 100 + '%');
                var totalInterest = commaSeparateNumber(data.TotalInterest.toFixed(2));
                $(form).find('*[data-js-totalInterestField]').html('£' + totalInterest);
                var totalRepayable = commaSeparateNumber(data.TotalRepayable.toFixed(2));
                $(form).find('*[data-js-totalField]').html('£' + totalRepayable);

                if ($(form).find('*[data-js-monthlyRepaymentField]').length !== 0) {
                    var MonthlyRepayment = commaSeparateNumber(data.MonthlyRepayment.toFixed(2));
                    $(form).find('*[data-js-monthlyRepaymentField]').html('£' + MonthlyRepayment);
                }

                $('.table--rates-table').animate({
                    'opacity': '1'
                }, function () {
                    $('body').removeClass('calculating');
                    $('*[data-js-ratesAdvanceMonths]').removeAttr('disabled');
                });
            }
        });

    });


}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}

function flipperInit() {
    var flipStatus = $('*[data-js-flipStatus]').html();
    var height;

    $('*[data-js-flipper-toggle]').click(function () {
        if ($('html').hasClass('IE')) {
            if ($(this)[0].hasAttribute('data-js-switch-content')) {
                swapContent($(this));
            }

            $('.flipPanel').toggle();

            return false;
        } else {
            var flipper = $(this).attr('data-js-flipper-controlled');
            $('*[data-js-' + flipper + ']').toggleClass('flipped');



            if ($(this)[0].hasAttribute('data-js-switch-content')) {
                swapContent($(this));
            }

            setTimeout(function () {
                formInit();
            }, 1000);


            if (($('html').attr('data-window-size') === 'breakpoint-xs') || ($('html').attr('data-window-size') === 'breakpoint-sm')) {
                $('html, body').animate({
                    scrollTop: $("#flipper").offset().top
                }, 1000);
            }

            if ($('.flip-container').hasClass('flipped')) {
                height = $('.back').height();
            } else {
                height = $('.front').height();
            }

            $('.flip-container').css('min-height', height + 'px');


            return false;
        }
    });


    if ($('.flip-container').hasClass('flipped')) {
        height = $('.back').height();
    } else {
        height = $('.front').height();
    }

    $('.flip-container').css('min-height', height + 'px');




    if (flipStatus == "False") {
        if ($('html').hasClass('IE')) {
            if ($('*[data-js-flipper-toggle]')[0].hasAttribute('data-js-switch-content')) {
                swapContent($(this));
            }

            $('.flipPanel').toggle();

            return false;
        }

	    $('*[data-js-loan-advance-flipper]').addClass('flipped');

        $('*[data-js-content-swap="active"').removeClass('swapped--active').hide(); //.attr('data-js-content-swap', 'inactive');
        $('*[data-js-content-swap="inactive"').addClass('swapped--active').show().attr('data-js-content-swap', 'active');

        $('.swapped').each(function () {
            if (!$(this).hasClass('swapped--active')) {
                $(this).attr('data-js-content-swap', 'inactive');
            }
        });
    }
}

function swapContent(el) {
    $('*[data-js-content-swap="active"]').removeClass('swapped--active').hide().attr('data-js-content-swap', 'transition');
    setTimeout(function () {
        $('*[data-js-content-swap="inactive"]').show().addClass('swapped--active').attr('data-js-content-swap', 'active');
        $('*[data-js-content-swap="transition"]').attr('data-js-content-swap', 'inactive');
    }, 400);

}

function numberSpinnerInit() {
    $('*[data-js-loanmonths]').html($('*[data-js-ratesmonths]').val());

    $('*[data-js-minus-control]').each(function () {
        $(this).unbind('click');
        var controls = $(this).attr('data-js-controls');
        var input = $('*[data-js-controlled-number]');


        if (input.val() > 1) {

            $(this).removeClass('number-input__control--disabled');
            $(this).click(function () {
                if (!$('body').hasClass('calculating')) {
                    input.val(parseFloat(input.val()) - 1);
                    numberSpinnerInit();
                    resetRatesTable($(this).parents('form').find('*[data-js-ratesValue]').val(), $(this).parents('form'));
                }
            
            });
        } else {
            $(this).addClass('number-input__control--disabled');
        }

        if (input.val() < 12) {
            $('*[data-js-plus-control]').removeClass('number-input__control--disabled');
        }
    });

    $('*[data-js-plus-control]').each(function () {
        $(this).unbind('click');
        $(this).click(function () {
            if (!$('body').hasClass('calculating')) {
                var controls = $(this).attr('data-js-controls');
                var input = $('*[data-js-controlled-number]');
                var inputVal = parseFloat(input.val());

            if (input.val() < 1 || isNaN(inputVal)) {
                input.val(1);
            } else if (input.val() > 11) {
                $(this).addClass('number-input__control--disabled');
            } else {
                $(this).removeClass('number-input__control--disabled');
                input.val(parseFloat(input.val()) + 1);
            }
            numberSpinnerInit();

                resetRatesTable($(this).parents('form').find('*[data-js-ratesValue]').val(), $(this).parents('form'));

               
            }
          
        });
    });
}

function toggleInit() {
    $('*[data-js-toggle]').click(function () {
        var toggleControlled = $(this).attr('data-js-toggle');
        $('*[data-js-toggled-by="' + toggleControlled + '"]').toggleClass('u-hidden');
    });
}

function formTipInit() {
    $('input').focusin(function () {
        var elName = $(this).attr('name');

        if ($('*[data-js-focussed-element]').length > 0) {
            $('*[data-js-focussed-element="' + elName + '"]').slideToggle();
        }
    });

    $('input').focusout(function () {
        var elName = $(this).attr('name');
        if ($('*[data-js-focussed-element]').length > 0) {
            $('*[data-js-focussed-element="' + elName + '"]').slideToggle();
        }
    });
}


// initialise accordion
function accordionInit() {
    $('*[data-accordion-control]').click(function () {
        if ($(this).closest('*[data-accordion-container]').hasClass('active')) {
            $(this).closest('*[data-accordion-container]').removeClass('active');
            $(this).next('*[data-accordion-content]').removeClass('open').animate({
                opacity: 0
            }, 200, function () {
                $(this).slideToggle(200);
            }
			);
        } else {
            $(this).closest('*[data-accordion-container]').addClass('active');
            $(this).next('*[data-accordion-content]').addClass('open').slideToggle(200, function () {
                $(this).animate({
                    opacity: 1
                }, 200);
            });
        }

        return false;
    });
}

function faqInit() {
    $('*[data-js-faq-opened]').unbind('click');

    var faqName;
    $('*[data-js-faq-opened]').click(function () {
        faqName = $(this).attr('data-js-faq-opened');

        $('*[data-js-faq-name]').addClass('u-hidden');
        $('*[data-js-faq-name="' + faqName + '"]').removeClass('u-hidden');

        $('*[data-js-faq-opened]').removeClass('faq-navigation--item--active');
        $(this).addClass('faq-navigation--item--active');
    });


    $('*[data-js-faq-select]').on('change propertychange', function () {
        faqName = $(this).val();

        $('*[data-js-faq-name]').addClass('u-hidden');
        $('*[data-js-faq-name="' + faqName + '"]').removeClass('u-hidden');
    });

}

function heroBgInit() {
    $('*[data-video-banner]').each(function () {
        if (($(this).find('source').attr('src') == '') && (windowWidth > 768)) {
            var videoSrc = $('*[data-video-src]').attr('data-video-src');
            videoSrc = videoSrc.replace('https:', ' ');
            $('*[data-video-src]').attr('src', videoSrc);

            $('*[data-video-banner]')[0].load()
        }
    });

    $('*[data-background]').each(function () {

        if (!$(this).hasClass('site-section__bg-split')) {

            var bg;
            if (!$('html').hasClass('IE')) {
                if (windowWidth < 768 && $(this).attr('data-background-mob') !== "") {

                    bg = $(this).attr('data-background-mob');
                    $(this).css({
                        'background-image': 'linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)), url(' + bg + ')',
                        'background-size': 'cover',
                        'background-position': 'top center'
                    });
                } else {
                    if ($(this).attr('data-background') !== "") {
                        bg = $(this).attr('data-background');
                        $(this).css({
                            'background-image': 'linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)), url(' + bg + ')',
                            'background-size': 'cover',
                            'background-position': 'center'
                        });
                    }
                    else {

                    }
                }
            } else {
                if (windowWidth < 768 && $(this).attr('data-background-mob') !== "") {

                    bg = $(this).attr('data-background-mob');
                    $(this).css({
                        'background-image': 'url(' + bg + ')',
                        'background-size': 'cover',
                        'background-position': 'top center'
                    });
                } else {
                    if ($(this).attr('data-background') !== "") {
                        bg = $(this).attr('data-background');
                        $(this).css({
                            'background-image': ' url(' + bg + ')',
                            'background-size': 'cover',
                            'background-position': 'center'
                        });
                    }
                    else {

                    }
                }
            }
        }
    });
}

function downArrowInit() {
    $('*[data-js="skip-arrow"]').click(function () {
        var nextSection = $(this).parents('section').next('section');

        $('html, body').animate({
            scrollTop: nextSection.offset().top
        }, 500);
    });
}

function showOverlay() {
    var i = 0;

    $('*[data-js-showOverlay]').click(function (event) {
        var isValid = $('*[data-js-combined-quote-form]').valid();

        if (isValid && $('.businessLookup').val().length > 2) {
            if (i === 0) {
                var overlay = $(this).parents('section').find('.container--overlay')
                overlay.fadeIn(250);
                var gifUrl = overlay.find('img').attr('src');
                overlay.find('img').attr('src', gifUrl);

                // THIS IS DELAYING THE FORM SUBMIT - REMOVE IF YOU WANT IT TO BE SPEEDY
                event.preventDefault();
                i++;
                setTimeout(function () {
                    $('*[data-js-showOverlay]').click();
                }, 2500);
            }
        } else {
            if ($('.businessLookup').val().length != 0) {
                $('*[data-js-combined-quote-form]').find('.error').show();
            }
            return false;
        }
    });
}

function lazyLoading() {
    var totalArticles = parseInt($("div[data-casestudycount]").attr('data-casestudycount'));
    var apiID = $("div[data-panelid]").attr('data-panelid');
    var totalLoaded = 2;

    $('*[data-js-moreArticles]').click(function () {
        if (!$(this).hasClass('executing')) {
            var _this = $(this);

            _this.addClass('executing');
            $.ajax({
                url: "/api/ShowCase/GetArticle?contentID=" + apiID + "&take=2&skip=" + articlesToSkip,
                dataType: "json"
            }).done(function (msg) {
                var data = $.parseJSON(msg);

                for (i = 0; i < data.length; i++) {
                    var blurb = data[i].blurb;
                    var buttonText = data[i].buttonText;
                    var imageLarge = data[i].imageLarge;
                    var imageSmall = data[i].imageSmall;
                    var showcaseHeading = data[i].showcaseHeading;
                    var pageURL = data[i].pageURL;
                    //_this.parents('section').before("<p>" + text + "</p>");
                    var html;

                    if ((totalLoaded) % 3 === 0) {
                        html = fullWidthText(blurb, buttonText, imageLarge, imageSmall, showcaseHeading, pageURL);

                        _this.before(html);
                        heroBgInit();
                    } else if ((totalLoaded) % 3 === 2) {
                        html = rightColText(blurb, buttonText, imageLarge, imageSmall, showcaseHeading, pageURL);

                        _this.before(html);
                        heroBgInit();
                    } else {
                        html = leftColText(blurb, buttonText, imageLarge, imageSmall, showcaseHeading, pageURL);

                        _this.before(html);
                        heroBgInit();
                    }

                    totalLoaded++;


                }

                articlesToSkip = articlesToSkip + 2;

                if (articlesToSkip === totalArticles) {
                    $('*[data-js-morearticles]').hide();
                }
            }, function () {
                $('[data-js-new-section]').animate({
                    "opacity": "1"
                }, 2000, function () {
                    $('[data-js-new-section]').removeAttr('data-js-new-section');
                    _this.removeClass('executing');
                });
            });



            return false;
        }


    });

    function leftColText(blurb, buttonText, imageLarge, imageSmall, showcaseHeading, pageURL) {


        var codeBlock = '<section class="site-section site-section--callOutSplit" data-js-new-section style="opacity: 0;">' +
        '<div class="container-fluid site-section--callOutSplit__image">' +
            '<div class="row">' +
                '<div class="col-md-6 col-md-offset-6" data-background="' + imageLarge + '" data-background-mob="' + imageSmall + '" style="background-image:url(' + imageSmall +');">' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="container site-section--callOutSplit__content u-secondary-color">' +
            '<div class="row">' +
                '<div class="col-md-5 u-text-center--mob">' +
                     '<p class="heading heading--heading-lg">' + showcaseHeading +
                     '</p>' +
                     '<p class="body-text body-text--lg u-padding-top-sm">' + blurb +
                     '</p>' +
                    '<div class="u-padding-top-md">' +
                        '<a href="' + pageURL + '" class="btn btn--btn-md btn--brand-primary btn--caps">' + buttonText + '</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '</section>'

        return codeBlock;


    }

    function rightColText(blurb, buttonText, imageLarge, imageSmall, showcaseHeading, pageURL) {
        console.log(imageLarge);
        var codeBlock = '<section class="site-section site-section--callOutSplit" data-js-new-section style="opacity: 0;">' +
       '<div class="container-fluid site-section--callOutSplit__image">' +
            '<div class="row">' +
                '<div class="col-md-6 col-md-offset6" data-background="' + imageLarge + '" data-background-mob="' + imageSmall + '" style="background-image:url(' + imageSmall + ')">' +
                '</div>' +
            '</div>' +
        '</div>' +

        '<div class="container site-section--callOutSplit__content u-secondary-color">' +
            '<div class="row">' +
                '<div class="col-md-5 col-md-offset-7 u-text-center--mob">' +
                    '<p class="heading heading--heading-lg">' + showcaseHeading +
                    '</p>' +
                    '<p class="body-text body-text--lg u-padding-top-sm">' + blurb +
                    '</p>' +
                    '<div class="u-padding-top-md">' +
                        '<a href="' + pageURL + '" class="btn btn--btn-md btn--brand-primary btn--caps">' + buttonText + '</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
       '</section>'

        return codeBlock;
    }

    function fullWidthText(blurb, buttonText, imageLarge, imageSmall, showcaseHeading, pageURL) {
        var codeBlock = '<section class="site-section site-section--padding-regular site-section--center-align u-ie-opacity" data-js-new-section style="opacity: 0;" data-background="' + imageLarge + '" data-background-mob="' + imageSmall + '">' +
        '<div class="container">' +
        '<div class="row">' +
        '<div class="col-xs-12 col-md-8 col-md-offset-2" data-js="scroll-animation" data-animation="fade-in-up" data-animation-activated="true">' +
        '<p class="heading u-margin-bottom-md u-margin-bottom-sm-mob heading--heading-lg u-white-color">' + showcaseHeading +
        '</p>' +
        '<p class="body-text u-margin-bottom-md body-text--lg u-white-color">' + blurb +
        '</p>' +
        '<a href="' + pageURL + '" class="btn btn--btn-md btn--brand-primary btn--caps">' + buttonText + '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>'

        return codeBlock;
    };
}

function allowCookies() {
    if (Cookies.get('allowCookies') !== "true") {
        $('.cookie-policy').show();
    }

    $('*[data-js-allow-cookies]').click(function () {
        Cookies.set('allowCookies', 'true', { expires: 365 });
        $('.cookie-policy').slideUp(200, function () {
            navInit($('.main-nav'));
        });
    });
}

function detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function chatTriggerInit() {
    $('*[href="chat"]').click(function (e) {
        e.preventDefault();
        $zopim.livechat.window.show();
    });

    $('*[href="Chat"]').click(function (e) {
        e.preventDefault();
        $zopim.livechat.window.show();
    });

}