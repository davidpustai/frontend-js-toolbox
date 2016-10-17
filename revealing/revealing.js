/**
 * Requires:
 *  - Modernizr & Modernizr.csstransitions
 */
function revealing( O ) {
	window.template.revealing.lastId++;

	var revealingId = window.template.revealing.lastId, // revealing instance id
		idString = '', // string of controlled sections' ids
		idI = 1, // index of element id (increment for each section id)
		clickHandler = function(e) {
			e.preventDefault();

			if ( O.section.hasClass('is-revealed') )
				revealingClose( O );
			else
				revealingOpen( O );
		};

	// add id to each section and
	O.section.each(function() {
		var id = $(this).attr('id');

		if ( typeof id === 'undefined' ) {
			id = 'revealing-' + revealingId + '-' + idI;
			$(this).attr('id', id);
			idString += ' ' + id;
			idI++;
		}
		else {
			idString += ' ' + id;
		}
	});

	O.section
		.addClass('js-revealing')
		.attr('aria-hidden', 'true')
		.attr('data-revealing-id', revealingId);

	O.button
		.attr('aria-expanded', 'false')
		.attr('aria-controls', idString)
		.on('click', clickHandler)
		.on('keydown', function(e) {
			if ( e.keyCode == 13 ) { // on Enter
				clickHandler(e);
			}
		});

	O.id = revealingId;
	window.template.revealing.objects.push( O );
}

/*
 * Get the revealing object according to given id.
 */
function revealingGetO( id ) {
	var revealing = window.template.revealing.objects,
		indexes = $.map(revealing, function(obj, i) {
			if ( obj.id == id )
				return i;
		}),
		i = indexes[0],
		O = revealing[i];

	return O;
}

function revealingOpen( O ) {
	// call before
	if ( typeof O.beforeOpen !== 'undefined' )
		O.beforeOpen.call();

	// show menu
	O.section
		.addClass('is-focusable')
		.attr('aria-hidden', 'false');
	O.button
		.addClass('is-revealed')
		.attr('aria-expanded', 'true');

	// transition in
	setTimeout(function() {
		O.section.addClass('is-revealed');
	});

	// callback
	if ( typeof O.afterOpen !== 'undefined' ) {
		// if menu has transition, wait until end of transition to call the callback
		if ( parseFloat( O.section.css('transition-duration') ) != 0 && Modernizr.csstransitions ) {
			O.section.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
				O.afterOpen.call();
				O.section.unbind();
			});

		}
		// if it doesn't, call it instantly
		else {
			O.afterOpen.call();
		}
	}
}

function revealingClose( O ) {
	// call before
	if ( typeof O.beforeClose !== 'undefined' )
		if ( O.beforeClose.call() == false )
			return false;

	// transition out
	O.section
		.removeClass('is-revealed');
	O.button
		.removeClass('is-revealed')

	// if menu has transition, wait until end of transition to hide it
	if ( parseFloat( O.section.css('transition-duration') ) != 0 && Modernizr.csstransitions ) {
		O.section.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
			O.section
				.removeClass('is-focusable')
				.attr('aria-hidden', 'true')
				.unbind();
			O.button
				.attr('aria-expanded', 'false');
		});
	}
	// if it doesn't, hide it instantly
	else {
		O.section
			.removeClass('is-focusable')
			.attr('aria-hidden', 'true');
		O.button
				.attr('aria-expanded', 'false');
	}

	// no need to restore focus, as it is already on (some) close button

	// callback
	if ( typeof O.afterClose !== 'undefined' )
		O.afterClose.call();
}

function revealingDestroy( O ) {
	var revealing = window.template.revealing.objects,
		indexes = $.map(revealing, function(obj, i) {
			if ( obj.id
				== O.id )
				return i;
		}),
		i = indexes[0];

	O.section
		.removeClass('js-revealing')
		.removeClass('is-focusable')
		.removeClass('is-revealed')
		.removeAttr('aria-hidden')
		.removeAttr('data-revealing-id');

	O.button
		.removeClass('is-revealed')
		.removeAttr('aria-expanded')
		.removeAttr('aria-controls')
		.off('click')
		.off('keydown');

	// remove from global array of menus
	window.template.revealing.objects.splice(i, 1);
}
