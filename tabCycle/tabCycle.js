/*
 * Cycle tab focus in one element.
 */
function tabCycleOn( $element ) {
	// focus cycle
	var $focusable = $('input, button, a, [tabindex]', $element),
		focusableLast = $focusable.last().get(0),
		focusableFirst = $focusable.first().get(0);

	$element.on('keydown', function(e) {
		if ( e.keyCode == 9 ) { // Tab
			// DOM can be updated, check new elements every time
			$focusable = $('input:not([type="hidden"]), button, a, [tabindex]', $element);
			focusableLast = $focusable.last().get(0);
			focusableFirst = $focusable.first().get(0);

			// last -> first
			if ( e.target == focusableLast && ! e.shiftKey ) {
				e.preventDefault();
				$focusable.first().focus();
			}
			// first -> last
			else if ( e.target == focusableFirst && e.shiftKey ) {
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
