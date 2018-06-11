function imgLazyLoad() {
	var $images = $('.img-lazy-load'),
		active = false,
		lazyLoad = _.throttle(function() {
			if ( active === false ) {
				active = true;

				$images.each(function() {
					var $img = $(this),
						img = this,
						wH = window.innerHeight
						offset = wH;

					if ( (img.getBoundingClientRect().top - offset <= wH && img.getBoundingClientRect().bottom + offset >= 0) && getComputedStyle(img).display !== 'none' ) {
						$img
							.attr('src', $img.attr('data-src'))
							.removeClass('img-lazy-load');

						$images = $images.not($img);

						if ( $images.length === 0 ) {
							$(document).off('DOMContentLoaded scroll resize orientationchange', lazyLoad);
						}
					}
				});

				active = false;
			}

			console.log('trigger');
		}, 200);

	$(document).on('DOMContentLoaded scroll resize orientationchange', lazyLoad);
}
