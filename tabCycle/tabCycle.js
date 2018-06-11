/*
 * Cycle focus (pressing tab) inside `$element`.
 */
function tabCycleOn( $element ) {
	var focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'; // all focusable elements (https://classroom.udacity.com/courses/ud891/lessons/7962031279/concepts/79621414230923)

	$element.on('keydown', function(e) {
		if ( e.keyCode === 9 ) { // Tab
			// DOM could be updated, check new elements every time
			var $focusable = $(focusableSelector, $element).filter(':not([tabindex="-1"])');

			// last -> first
			if ( e.target == $focusable.last().get(0) && ! e.shiftKey ) {
				e.preventDefault();
				$focusable.first().focus();
			}
			// first -> last
			else if ( e.target == $focusable.first().get(0) && e.shiftKey ) {
				e.preventDefault();
				$focusable.last().focus();
			}
		}
	});
}

/*
 * Remove the tab cycle from element.
 */
function tabCycleOff( $element ) {
	$element.off('keydown');
}
