/*
 *  Add helper class to head that can be later used with matchMedia.
 *  Use
 *      get_media_query(class_name) to get the breakpoint for matchMedia and
 *      matchMedia(media_query) to check if it matches.
 *
 *  Origins from old Foundation's javascript.
 */
var mq_cache = {};
var get_media_query = function(class_name) {
	// load from cache if already known
	if ( class_name in mq_cache )
		return mq_cache[class_name];

	var head = $('head');

	if ( head.has('.mq-' + class_name).length === 0 ) {
		head.append('<meta class="mq-' + class_name + '" />');
	}

	var $meta = $('.mq-'+class_name),
		font = $meta.css('font-family');

	if ( font == $('html').css('font-family') ) {
		console.error('Breakpoint '+ class_name + ' does not exist or is not enabled for javascript with `meta.mq-<breakpoint>` selector\'s font-family rule in CSS.');
		return null;
	}

	var mq = font.replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '');

	// save to cache
	mq_cache[class_name] = mq;

	return mq;
};
