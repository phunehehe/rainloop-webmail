var editorScript = document.body.dataset.editorScript;
var libsScript = document.body.dataset.libsScript;
var mainScript = document.body.dataset.mainScript;
var user = document.body.dataset.user;

if (!window.navigator || !window.navigator.cookieEnabled) {
	window.document.location.replace('./?/NoCookie');
}

if (window.rainloopAppData && window.rainloopAppData['NewThemeLink']) {
	window.document.getElementById('rlThemeLink').href = window.rainloopAppData['NewThemeLink'];
}

if (window.rainloopAppData && window.rainloopAppData['IncludeCss']) {
	__includeStyle(window.rainloopAppData['IncludeCss']);
}

(function (window) {
	var
		oE = window.document.getElementById('rl-loading'),
		oElDesc = window.document.getElementById('rl-loading-desc')
	;
	if (oElDesc && window.rainloopAppData['LoadingDescriptionEsc']) {
		oElDesc.innerHTML = window.rainloopAppData['LoadingDescriptionEsc'];
	}
	if (oE && oE.style) {
		oE.style.opacity = 0;
		window.setTimeout(function () {
			oE.style.opacity = 1;
		}, 300);
	}
}(window));


if (window.$LAB && window.rainloopAppData && window.rainloopAppData['TemplatesLink'] && window.rainloopAppData['LangLink'])
{
	window.rainloopProgressJs = progressJs();

	window.rainloopProgressJs.setOptions({'theme': 'rainloop'});
	window.rainloopProgressJs.start().set(5);

	window.$LAB
		.script(function () {
			return [
				{'src': libsScript, 'type': 'text/javascript', 'charset': 'utf-8'}
			];
		})
		.wait(function () {

			window.rainloopProgressJs.set(20);

			if (window.rainloopAppData['IncludeBackground']) {
				$('#rl-bg').attr('style', 'background-image: none !important;').backstretch(
					window.rainloopAppData['IncludeBackground'].replace(user,
						(window.__rlah ? window.__rlah() || '0' : '0')), {
					'fade': 100, 'centeredX': true, 'centeredY': true
				}).removeAttr('style');
			}
		})
		.script(function () {
			return [
				{'src': window.rainloopAppData['TemplatesLink'], 'type': 'text/javascript', 'charset': 'utf-8'},
				{'src': window.rainloopAppData['LangLink'], 'type': 'text/javascript', 'charset': 'utf-8'}
			];
		})
		.wait(function () {
			window.rainloopProgressJs.set(30);
		})
		.script(function () {
			return {'src': mainScript, 'type': 'text/javascript', 'charset': 'utf-8'};
		})
		.wait(function () {
			window.rainloopProgressJs.set(50);
		})
		.script(function () {
			return window.rainloopAppData['PluginsLink'] ?
				{'src': window.rainloopAppData['PluginsLink'], 'type': 'text/javascript', 'charset': 'utf-8'} : null;
		})
		.wait(function () {
			window.rainloopProgressJs.set(70);
			__runBoot(false);
		})
		.script(function () {
			return {'src': editorScript, 'type': 'text/javascript', 'charset': 'utf-8'};
		})
		.wait(function () {
			if (window.CKEDITOR && window.__initEditor) {
				window.__initEditor();
				window.__initEditor = null;
			}
		})
	;
}
else
{
	__runBoot(true);
}
