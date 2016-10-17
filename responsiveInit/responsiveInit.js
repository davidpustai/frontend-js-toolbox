/**
 * Wrapper for responsive javascript inicialization
 *
 * options: {
 *     bp: 'breakpoint',			// name of a breakpoint passed to `get_media_query` function, see more there
 *     desktopInit: function() {},	// function initializing desired behaviour above the breakpoint
 *     mobileInit: function() {},	// function initializing desired behaviour below the breakpoint
 *     desktopReset: function() {},	// function reseting desired behaviour above the breakpoint
 *     mobileReset: function() {}	// function reseting desired behaviour below the breakpoint
 * }
 *
 * In other words if you are changing moving viewport size accross the breakpoint, functions will be called (if defined) in this order:
 *  - making the viewport larger: mobileReset, desktopInit
 *  - making the viewport smaller: desktopReset, mobileInit
 *
 * Requirements:
 *  - `get_media_query` function (part of this frontender-toolbox)
 *  - [Modernizr](https://modernizr.com/) a Modernizr.mediaqueies
 *  - [matchMedia polyfill for IE8](https://github.com/paulirish/matchMedia.js)
 *  - [debouncedresize event](https://github.com/louisremi/jquery-smartresize)
 */
function responsiveInit(options) {
	var bp = get_media_query( options.bp ),
		state = 'default';

	if ( Modernizr.mediaqueries ) {
		// initialize desired behaviour
		if ( matchMedia( bp ).matches ) {
			if ( typeof options.desktopInit !== typeof undefined ) {
				options.desktopInit.call();
			}

			state = 'desktop';
		}
		else {
			if ( typeof options.mobileInit !== typeof undefined ) {
				options.mobileInit.call();
			}

			state = 'mobile';
		}

		// reset/initialize mobile behaviour on window resize
		$(window).on('debouncedresize', function() {
			var matches = matchMedia( bp ).matches;

			// desktop -> mobile
			if ( state == 'desktop' && ! matches ) {
				if ( typeof options.desktopReset !== typeof undefined ) {
					options.desktopReset.call();
				}

				if ( typeof options.mobileInit !== typeof undefined ) {
					setTimeout(function() {
						options.mobileInit.call();
					});
				}

				state = 'mobile';
			}
			// mobile -> desktop
			else if ( state == 'mobile' && matches ) {
				if ( typeof options.mobileReset !== typeof undefined ) {
					options.mobileReset.call();
				}

				if ( typeof options.desktopInit !== typeof undefined ) {
					setTimeout(function() {
						options.desktopInit.call();
					});
				}

				state = 'desktop';
			}
		});
	}
}
