define([
	"jquery",
	"underscore",
], function($, _){
	"use strict";

	// Slideshow
	var slideshow = {
		timeout : undefined,
		options : {
			$container 	: undefined,
			$navigation : undefined,
			current 	: 1,
			next    	: 2,
			length 		: 0,
			delay 		: 5000
		},

		init: function(options) {
			var self = this;


			this.options = $.extend(this.options, options);

			// No container or navigation? meh :|
			if (_.isUndefined(this.options.$container) || _.isUndefined(this.options.$navigation)) { return false; }



			this.options.length = this.options.$container.find('li').length;
			this.options.prev   = this.options.length;

			this.options.$container.data('slideshow', this);

			// Each li add data slide
			this.options.$container.find('li').each(function() {
				$(this).data('slide', $(this).index() + 1);
			});

			// Each a add data slide
			this.options.$navigation.find('a').each(function() {
				$(this).data('slide', $(this).index());
			});

			// re-render DOM
			this.rePaint();

			// Event listener
			this.listener();

			// Start slideshow
			this.timeout = setTimeout(function() {
					self.options.$navigation.find('a.next').trigger('click');
			}, self.options.delay);
		},

		listener: function() {
			var self = this;

			// Navigation default
			this.options.$navigation.on('click', 'a:not(.prev):not(.next)', function(e) {
				e.preventDefault();

				// Do nothing if on animate
				if (self.options.$container.hasClass('on-animate')) { return false; }

				// Add active class
				self.options.$navigation.find('.active').removeClass('active');
				$(this).addClass('active');

				// Set data for animation
				self.options.current = $(this).data('slide');
				self.options.prev    = (self.options.current - 1) <= 0 ? self.options.length : (self.options.current - 1);
				self.options.next    = self.options.current == self.options.length ? 1 : (self.options.current + 1);

				// Do animation
				self.animate();
			});

			// Navigation Prev
			this.options.$navigation.on('click', 'a.prev', function(e) {
				e.preventDefault();

				// Do nothing if on animate
				if (self.options.$container.hasClass('on-animate')) { return false; }

				// trigger navigation
				var el = self.options.$navigation.find('a:not(.prev):not(.next)').filter(function(index, $el) {
							return $(this).data('slide') == self.options.prev;
						 });

				$(el).trigger('click');
			});

			// Navigation Next
			this.options.$navigation.on('click', 'a.next', function(e) {
				e.preventDefault();

				// Do nothing if on animate
				if (self.options.$container.hasClass('on-animate')) { return false; }

				// trigger navigation
				var el = self.options.$navigation.find('a:not(.prev):not(.next)').filter(function(index, $el) {
							return $(this).data('slide') == self.options.next;
						 });

				$(el).trigger('click');
			});
		},

		animate: function() {
			var self 			= this,
				$container 		= self.options.$container,
				$currentSlide 	= $container.find('li.current'),
				$nextSlide	 	= $container.find('li').filter(function(index, $el) {
									return $(this).data('slide') == self.options.current
							  	  }),
				afterCaption, afterSlide;

			// Clear timeout
			clearTimeout(this.timeout);

			// Prevent double animation
			$container.addClass('on-animate');
			$nextSlide    = $($nextSlide);

			// Set next slide
			$nextSlide.addClass('prepared');

			// Set animate complete functions
			afterSlide = function() {
				$nextSlide.find('figcaption').stop().animate({left: 0}, function() {
					$currentSlide.removeClass('current').css({opacity: 1});
					$nextSlide.removeClass('prepared').addClass('current');

					$container.removeClass('on-animate');

					// Start slideshow
					self.timeout = setTimeout(function() {
							self.options.$navigation.find('a.next').trigger('click');
					}, self.options.delay);
				});
			};

			afterCaption = function() {
				$currentSlide.stop().animate({opacity: 0}, 300, afterSlide);
			};

			// Hide caption
			$currentSlide.find('figcaption').stop().animate({left: '-100%'}, 300, afterCaption);
		},

		rePaint: function() {
			var self = this,
				debouncedResize, slideHeight;

			// Initialize
			debouncedResize = _.debounce(function() {
				slideHeight = self.options.$container.find('li:first').height();

				// append rule ul
				self.options.$container.find('ul').css({height: slideHeight});

				// self.options.$container.find('li').each(function() {
				// 	$(this).css({height: '100%'});
				// });
			}, 300);

			$(window).bind('resize', debouncedResize);



			// Append class current for first slide
			this.options.$container.find('li:first').addClass('current');

			// Debounce now
			debouncedResize();
		}
	};

	// ------------------------------------------------------------------------

	var defaultActions = {
		MainApp: 		undefined,

		// Initialize
		// ------------------------------------------------------------------------

		initialize: function(MainApp) {
			this.MainApp = MainApp;

			// Call defaults
			this.def();
		},

		// Email string checker
		// ------------------------------------------------------------------------

		checkEmail: function(value) {
			return (! /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i.test(value)) ?
				false : true;
		},

		// Default actions
		// ------------------------------------------------------------------------

		def: function() {
			var self = this,
				debouncedResize;

			// Bind event for smartphone
			// ------------------------------------------------------------------------

			// Show Menu for smartphone device
			if ($('.main-header').find('a.btn-showmenu').length) {
				$('.main-header').on('click', 'a.btn-showmenu', function(e) {
					e.preventDefault();

					$('#page-root').toggleClass('show-menu');
					$('html').toggleClass('menu-opened');

					if ($('html').hasClass('menu-opened')) {
						// Set html height
						var windowHeight = $(window).height(),
							menuHeight   = $('.smartphone-menu').height(),
							htmlHeight   = windowHeight > menuHeight ? '100%' : menuHeight;

						$('html').css({'height' : htmlHeight});


						// Append overlay to prevent #page content clicked
						$('#page').append('<div class="overlay"></div>');
					} else {
						$('html').css({'height' : 'auto'});

						// Remove overlay
						$('#page').find('> .overlay').remove();
					}
				});
			}

			// Show Subcription for smartphone device
			if ($('.main-header').find('a.btn-showsubscription').length) {
				$('.main-header').on('click', 'a.btn-showsubscription', function(e) {
					e.preventDefault();

					$('#page-root').toggleClass('show-subscription');
					$('html').toggleClass('menu-opened');


					if ($('html').hasClass('menu-opened')) {
						// Set html height
						var windowHeight 		 = $(window).height(),
							subscriptionHeight   = $('.smartphone-subscription').height(),
							htmlHeight   		 = windowHeight > subscriptionHeight ? '100%' : subscriptionHeight;

						$('html').css({'height' : htmlHeight});


						// Append overlay to prevent #page content clicked
						$('#page').append('<div class="overlay"></div>');
					} else {
						$('html').css({'height' : 'auto'});

						// Remove overlay
						$('#page').find('> .overlay').remove();
					}
				});
			}

			// Bind main search
			// ------------------------------------------------------------------------

			if ($('.search-block').length) {
				$('.search-block').on('click', 'a.btn-submit', function(e) {
					e.preventDefault();

					$(this).closest('form').submit();
				});
			}

			// Bind customized checkbox
			// ------------------------------------------------------------------------

			if ($('form').find('.options').length) {
				// Radio
				$('form').on('click', 'label.radio span', function() {
					var $self 	= $(this),
						$label  = $self.parent('label'),
						$input 	= $self.siblings('input[type=radio]');

					if (! $input.length) { return; }

					if ($input.prop('checked')) { $input.prop('checked', true); }
					else { $input.prop('checked', false); }

					$label.closest('.options').find('.checked').removeClass('checked');
					$label.toggleClass('checked');
				});
			}

			// Bind Subscribe button
			// ------------------------------------------------------------------------

			if ($('a.subscribe').length) {
				$('a.subscribe').bind('click', function(e) {
					if ($(window).width() <= 640) { return true; }

					e.preventDefault();

					if ($('body').find('.overlay-popup, .subscribe-popup').length) { return false; }

					self.subscriptionPopup();
				});
			}

			// Slideshow initialize
			if ($('.slideshow').length) {
				self.slideshowInit();
			}
		},

		slideshowInit: function() {
			var self 		= this;

			// Initialize
			slideshow.init({
				$container  : $('.slideshow'),
				$navigation : $('.slideshow-nav')
			});


		},

		subscriptionPopup: function() {
			var self 	  = this,
				$template = $('script#subscribe-popup'),
				$overlay  = $('<div />', {'class' : 'overlay-popup'}),
				$body     = $('<div />', {'class' : 'subscribe-popup'});

			if (! $template.length) { return false; }

			// append template to popup body
			$body.append(_.template($template.html()));

			// add event listener
			$overlay.bind('click', function() {
				$('body').find('.overlay-popup, .subscribe-popup').remove();
			});

			$body.on('click', 'a.subscribePopup-close', function(e) {
				e.preventDefault();

				$('body').find('.overlay-popup').trigger('click');
			});


			// append to body
			$('body').append($overlay).append($body);

			// init jscrollpane
			if ($body.find('.jscrollpane').length) {
				$body.find('.jscrollpane').jScrollPane({autoReinitialise: true});
			}
		}
	};

	return defaultActions;

});