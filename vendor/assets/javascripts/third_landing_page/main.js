"use strict";
var $ = jQuery;


// for fix offer image
function fixOfferImageHeight() {
	var image = $('.offer-image-area img');
	if ( image.length > 0 ) {
		var height = image.height() + 'px';
		$('.offer-content-wrapper').css('min-height', height);
	}
}

// for fix banner height
function fixBannerHeight() {
	var banner = $('.banner');
	if ( banner.length > 0 ) {
		var height = $(window).height();
		banner.css('min-height', height);
	}
}


// Fix features height

function fixFeaturesHeight(){
	var featureItems = $('.feature-lists-style-three .feature-list');

	if ( featureItems.length > 0 ) {
		var featureHeight = featureItems.getMaxHeight();
		featureItems.height(featureHeight);
	}
}

// Screenshoot Slider
(function(){
	var screenshoot_slider_obj = {};

	screenshoot_slider_obj.callback = function() {
		screenshoot_slider_obj.addingClasses(this);
	};

	screenshoot_slider_obj.addingClasses = function(e) {

		$(e.$owlItems).removeClass('opacity80 opacity100 left-item center-item right-item');
		var $currentItems = $(e.$owlWrapper).find('.owl-item.active');
		var middleItemIndex;

		if ( e.options.items == 5 ) {
			middleItemIndex = $currentItems.eq(2).index();
		} else if ( e.options.items == 3 ) {
			middleItemIndex = $currentItems.eq(1).index();
		} else {
			middleItemIndex = $currentItems.eq(0).index();
		}

		$(e.$owlItems).each(function(){
			if ( $(this).index() < middleItemIndex ) {
				$(this).addClass('left-item');
			} else if ( $(this).index() > middleItemIndex ) {
				$(this).addClass('right-item');
			} else {
				$(this).addClass('center-item');
			}
		});
	};


	var $screenshoot_slider  = $('#screenshoot_slider');


	if ( $screenshoot_slider.length > 0 ) {
		$screenshoot_slider.owlCarousel({
		    stopOnHover : true,
			slideSpeed : 800,
			autoHeight : true,
			itemsCustom: [
				[320, 1],
				[450, 2],
				[580, 3],
				[992, 5]
			],
			addClassActive : true,
			afterInit : screenshoot_slider_obj.callback,
			afterMove : screenshoot_slider_obj.callback
		});

		screenshoot_slider_obj.slider = $screenshoot_slider.data('owlCarousel');

		$('.screenshoot-arrow').click(function(e){

			e.preventDefault();

			if ( $(this).hasClass('left-arrow') ) {
				screenshoot_slider_obj.slider.prev();
			} else {
				screenshoot_slider_obj.slider.next();
			}
		});
	}
}());

// App brief Slider
(function(){
	var app_brief_slider_obj = {};

	app_brief_slider_obj.callback = function() {
		app_brief_slider_obj.addingClasses(this);
	};

	app_brief_slider_obj.addingClasses = function(e) {
		var $currentItem = $(e.$owlWrapper).find('.owl-item.active'),
			middleItemIndex = $currentItem.index();

		$(e.$owlItems).each(function(){
			if ( $(this).index() < middleItemIndex ) {
				$(this).removeClass('center left-item right-item').addClass('left-item');
			} else if ( $(this).index() > middleItemIndex ) {
				$(this).removeClass('center left-item right-item').addClass('right-item');
			} else {
				$(this).removeClass('center left-item right-item');
			}
		});
	};


	var $app_brief_slider  = $('#app-brief-slider');


	if ( $app_brief_slider.length > 0 ) {
		$app_brief_slider.owlCarousel({
			slideSpeed : 1200,
			paginationSpeed : 1200,
			rewindSpeed : 2000,
			addClassActive : true,
			singleItem : true,
			afterInit : app_brief_slider_obj.callback,
			afterMove : app_brief_slider_obj.callback
		});

		app_brief_slider_obj.slider = $app_brief_slider.data('owlCarousel');

		$('app-brief-arrow').click(function(e){

			e.preventDefault();

			if ( $(this).hasClass('left-arrow') ) {
				app_brief_slider_obj.slider.prev();
			} else {
				app_brief_slider_obj.slider.next();
			}
		});
	}
}());


// Testimonial Slider
(function(){

	var testimonial_slider_obj = {},
		thumbLists = $('#testimonial-thumb-ctrl li');

	testimonial_slider_obj.beforeMoveCallback = function(){
		var currentIndex = this.currentItem;
		thumbLists.removeClass('active').eq(currentIndex).addClass('active');
	};

	var $testimonial_slider = $('#testimonial');

	if ( $testimonial_slider.length > 0 ) {

		$testimonial_slider.owlCarousel({
		    stopOnHover : true,
			slideSpeed : 800,
			singleItem : true,
			pagination : false,
			afterMove : testimonial_slider_obj.beforeMoveCallback
		});

		testimonial_slider_obj.slider = $testimonial_slider.data('owlCarousel');

		$('#testimonial-thumb-ctrl li a').on('click', function(e){
			e.preventDefault();
			var userSlide = $(this).parent().index();
			testimonial_slider_obj.slider.goTo(userSlide);
		});
	}

}());

// Why Slider

(function(){
	function show( item ) {
		item.removeClass('inactive').addClass('active').animate({
			'left' : '0px'
		}, 1300, 'swing');

		lists.eq(current).addClass('active').siblings('li').removeClass('active');
	}

	function hide( item ) {
		item.removeClass('active').addClass('inactive').animate({
			'left' : '-100%'
		}, 1300, 'swing', function(){
			$(this).css('left', '100%').removeClass('inactive');
		});
	}
	
	if ( $('#whySlider:visible').length > 0 ) {
		var sliderWrap = $('#whySlider:visible'),
			slideItems = sliderWrap.children(),
			height = slideItems.getMaxHeight(),
			lists = $('#why-feature-lists li'),
			current = 0;
		sliderWrap.height( height );

		$(window).resize(function(){
			height = slideItems.getMaxHeight();
			sliderWrap.height( height );
		});


		sliderWrap.waypoint({
			handler: function(event, direction) {
				show( slideItems.eq(current) );
				$(this).waypoint('destroy');
			},
			offset: '60%'
		});

		lists.find('a').on('click', function(e){
			e.preventDefault();

			if ( jQuery.browser.mobile === true ) {
				return false;
			}

			if ( slideItems.is(':animated') ) {
				return false;
			}

			var oldCurrent = current;
			current = $(this).parent().index();

			if ( current === oldCurrent ) {
				return false;
			}

			hide( slideItems.eq(oldCurrent) );
			show( slideItems.eq(current) );

			return $(this);
		});
	}
}());


// Banner Sldier
(function(){

	var banner_slider_obj = {};

	banner_slider_obj.beforeMoveCallback = function(){
		var currentIndex = this.currentItem;
		$('#banner-slider-controller a').removeClass('active').eq(currentIndex).addClass('active');
	};

	var $banner_slider = $('#banner-sldier');

	if ( $banner_slider.length > 0 ) {

		$banner_slider.owlCarousel({
		    stopOnHover : true,
			slideSpeed : 800,
			singleItem : true,
			pagination : false,
			afterMove : banner_slider_obj.beforeMoveCallback
		});

		banner_slider_obj.slider = $banner_slider.data('owlCarousel');

		$('#banner-slider-controller a').on('click', function(e){
			e.preventDefault();
			var userSlide = $(this).index();
			banner_slider_obj.slider.goTo(userSlide);
		});
	}
}());


// stellar parallux init
if ( jQuery.browser.mobile !== true && typeof jQuery.stellar === 'function') {
	$(window).stellar();
}


// window scroll Sections scrolling
(function(){
	var sections = $(".scroll-section");

	function getActiveSectionLength(section, sections) {
		return sections.index(section);
	}
	
	if ( sections.length > 0 ) {


		sections.waypoint({
			handler: function(event, direction) {
				var active_section, active_section_index, prev_section_index;
				active_section = $(this);
				active_section_index = getActiveSectionLength($(this), sections);
				prev_section_index = ( active_section_index - 1 );

				if (direction === "up") {
					active_section = sections.eq(prev_section_index);
				}


				if ( active_section.attr('id') != 'home' ) {
					var active_link = $('.menu-smooth-scroll[href="#' + active_section.attr("id") + '"]');
					active_link.parent('li').addClass("current").siblings().removeClass("current");
				} else {
					$('.menu-smooth-scroll').parent('li').removeClass('current');
				}
			},
			offset: '35%'
		});
	}

}());





// initialize fitvid plugin
$("body").fitVids();


// Tweets show and slider
(function(){
	if ( $('#tweets').length > 0 ) {
		$('#tweets').twittie({
			dateFormat: '%b-%d-%Y',
			template : '<p class="timeago tweet-date" title="{{date}}">{{date}}</p><p class="tweet-text">{{tweet}}</p><div class="tweet-controlls"><a class="relpy-btn" href="https://twitter.com/intent/tweet?in_reply_to={{tweetId}}"><i class="ion-reply"></i> Reply</a><a class="retweet-btn" href="https://twitter.com/intent/retweet?tweet_id={{tweetId}}"><i class="fa fa-retweet"></i> Retweet</a><a class="favorite-btn" href="https://twitter.com/intent/favorite?tweet_id={{tweetId}}"><i class="ion-heart"></i> Favorite</a></div>'
		}, function(){

			jQuery(".timeago").timeago();

			var $tweet_slider = $("#allTweets");

			if ( $tweet_slider.length > 0 ) {
				$tweet_slider.owlCarousel({
					slideSpeed : 800,
					singleItem : true
				});

				var tweetSlider = $tweet_slider.data('owlCarousel');


				$('.tweets-arrow').on('click', function(e){
					e.preventDefault();

					if ( $(this).hasClass('left-arrow') ) {
						tweetSlider.prev();
					} else {
						tweetSlider.next();
					}
				});
			}
		});
	}
}());



// Map
var mapStyle = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 50
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 20
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 30
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": -0
            },
            {
                "saturation": -0
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#00baff"
            },
            {
                "lightness": -10
            },
            {
                "saturation": -95
            }
        ]
    }
];

var $mapWrapper = $('#map'), draggableOp;


if ( jQuery.browser.mobile === true ) {
	draggableOp = false;
} else {
	draggableOp = true;
}

if ( $mapWrapper.length > 0 ) {
	var map = new GMaps({
		div: '#map',
		lat : 23.79473005386213, // Provide your longtitude
		lng : 90.41430473327637,  // Provide your longtitude
		scrollwheel: false,
		draggable: draggableOp,
		zoom: 16,
		disableDefaultUI: true,
		styles : mapStyle
	});

	map.addMarker({
		lat : 23.79473005386213, // Provide your longtitude
		lng : 90.41430473327637, // Provide your longtitude
		icon: 'img/marker.png',
		infoWindow: {
			content: '<p>this is some text</p>' // Provide your address to show on pop up
		}
	});
}



// callback after ready the document
$(document).ready(function(){});

// callback after loading the window
$(window).load(function(){

	/*============ Fix Offer Image ============*/

	fixOfferImageHeight();


	/*============ Fix Features Height ============*/

	fixFeaturesHeight();


	/*============ Fix Banner Height ============*/
	
	fixBannerHeight();



	/*========= Newsletter animations =========*/

	var $NLFA = $('.newsletter-form-area');

	if ( $NLFA.length > 0 ) {
		var $NLIT = $NLFA.find('form input[type="email"]'),
			$NLIS = $NLFA.find('form input[type="submit"]').fadeOut(0),
			$NLIC = $NLFA.find('form .mail-icon').fadeOut(0);

		$NLIT.on('click', function(e){
			e.stopImmediatePropagation();
			$NLIS.stop(true).fadeIn(600);
			$NLIC.stop(true).fadeIn(600);
		});

		$(window).click(function(){
			$NLIS.stop(true).fadeOut(300);
			$NLIC.stop(true).fadeOut(300);
		});
	}



	/*=========== count up statistic ==========*/

	var $countNumb = $('.countNumb');

	if ( $countNumb.length > 0 ) {
		$countNumb.counterUp({
			delay: 15,
			time: 2000
		});
	}




	/*===== menu click Sections scrolling =====*/

	$('.menu-smooth-scroll').scrollingTo({
		easing : 'easeOutQuart',
		animationTime : 1800,
		callbackBeforeTransition : function(e){
			if (e.currentTarget.hash !== "") {
				if ( e.currentTarget.hash != '#home' ) {
					$(e.currentTarget).parent().addClass('current').siblings().removeClass('current');
				}

				if ( e.currentTarget.hash == '#contact' ) {
					$('.contact-content-wrapper').slideDown(600,'easeOutQuart');
				}
			}
		},
		callbackAfterTransition : function(e){
			if (e.currentTarget.hash !== "") {
				if ( e.currentTarget.hash == '#home' ) {
					window.location.hash = '';
				} else {
					window.location.hash = e.currentTarget.hash;
				}

			}
		}
	});



	/*====== other button scrolling ======*/

	$('.smooth-scroll:visible').scrollingTo({
		easing : 'easeOutQuart'
	});

});


// callback after resize the window
$(window).resize(function(){
	fixOfferImageHeight();
	fixBannerHeight();
	fixFeaturesHeight();
});







/* ------------------------------------------------------------------------
	MAILCHIMP
	------------------------------------------------------------------------ */

(function($){


    var mchimpMessageArea = $('.mailchimp-form-message');

    $(document).click(function(){
    	mchimpMessageArea.slideUp();
    });

	$('.mailchimpForm').ajaxChimp({
		callback: function(resp) {

			console.log(resp);

			if (resp.result === 'success') {
				mchimpMessageArea.removeClass('error').addClass('success').html('<p>Almost finished... Please confirm your email address.</p>').slideDown();
			} else if(resp.result === 'error') {
				mchimpMessageArea.removeClass('success').addClass('error').html('<p>Please enter a valid email address.</p>').slideDown();
			}
		},
		url: "https://coderpixel.us10.list-manage.com/subscribe/post?u=3918a7d4d5fe9e4c1baa3d912&amp;id=1a52016f23" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
	});
}(jQuery));