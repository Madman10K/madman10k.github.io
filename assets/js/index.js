'use strict'

// Replace every emoji with a Twemoji image so they look identical on all
// platforms and browsers. The library is bundled in front of this file (see
// head.html) and its SVGs are served from /twemoji/svg/ (see hugo.toml mounts).
document.addEventListener('DOMContentLoaded', function () {
	if (typeof twemoji !== 'undefined') {
		twemoji.parse(document.body, { base: '/twemoji/', folder: 'svg', ext: '.svg' });
	}
});
