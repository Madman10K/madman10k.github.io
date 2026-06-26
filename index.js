'use strict'

// Replace every emoji with a Twemoji image so they look identical on all
// platforms and browsers. The library is loaded (deferred) in head.tmpl.html,
// so it is guaranteed to be available by the time DOMContentLoaded fires.
document.addEventListener('DOMContentLoaded', function () {
	if (typeof twemoji !== 'undefined') {
		twemoji.parse(document.body, { folder: 'svg', ext: '.svg' });
	}
});
