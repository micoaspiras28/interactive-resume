/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);

// Functions
function getSections($links) {
	return $(
	  $links
		.map((i, el) => $(el).attr('href'))
		.toArray()
		.filter(href => href.charAt(0) === '#')
		.join(','),
	);
  }
  
  function activateLink($sections, $links) {
	const yPosition = $window.scrollTop();
  
	for (let i = $sections.length - 1; i >= 0; i -= 1) {
	  const $section = $sections.eq(i);
  
	  if (yPosition >= $section.offset().top) {
		return $links
		  .removeClass('active')
		  .filter(`[href="#${$section.attr('id')}"]`)
		  .addClass('active');
	  }
	}
  }
  
  function onScrollHandler() {
	activateLink($sections, $links);
  }
  
  function onClickHandler(e) {
	const href = $.attr(e.target, 'href');
  
	e.preventDefault();
	$root.animate(
	  { scrollTop: $(href).offset().top },
	  500,
	  () => (window.location.hash = href),
	);
  
	return false;
  }
  
  // Variables
  const $window = $(window);
  const $links = $('.menu > li > a');
  const $sections = getSections($links);
  const $root = $('html, body');
  const $hashLinks = $('a[href^="#"]:not([href="#"])');
  
  // Events
  $window.on('scroll', onScrollHandler);
  $hashLinks.on('click', onClickHandler);
  
  // Body
  window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = Number.MAX_SAFE_INT; // For codepen
  activateLink($sections, $links);
  