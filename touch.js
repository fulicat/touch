/**
 * 
 * @authors Jack.Chan (fulicat@qq.com)
 * @date    2014-07-17 11:03:51
 * @update  2014-07-17 11:37:35
 * @version 1.1
 *
 * function:
	when finger touches moved out of element borders then cancel touchend event.
 * useage:
 * $('#button').touch('end', function(e){});
 * $(document).touch('end', '#button', function(e){});
 */
;(function($){
	$.fn.touch = function(){
		var browser = {
			ua: navigator.userAgent,
			platform: navigator.platform,
			isChrome: (typeof window.chrome=='object'),
		};
		browser.isMobileChrome = (browser.isChrome && browser.ua.indexOf('Android')>-1);
		browser.isChromeEmulation = (browser.isChrome && browser.ua.indexOf('Chrome')<0 && browser.platform.indexOf('Linux')<0);
		browser.isSupportTouch = (function(){
			var el = document.createElement('div');
			el.addEventListener('touchstart', function(){});
			return (typeof el.ontouchstart==='object' || browser.isChromeEmulation);
		})();
		var args = arguments;
		if(args.length>1){
			var et = args[0] ? args[0] : '';
			et = (et=='click' || et=='end' ? (browser.isSupportTouch ? 'touchend' : 'click') : 'touch'+et);
			var fn = args.length>2 ? args[2] : args[1];
			var ob = args.length>2 ? args[1] : '';
			$(this).on(et, ob, function (e){
				if(typeof fn=='function'){
					var te = e.changedTouches ? e.changedTouches[0] : e;
					if(et!='touchend' || (et=='touchend' && document.elementFromPoint(te.pageX, te.pageY) == this)){
						fn.apply(this, [e]);
					};
				};
			});
		};
		return this;
	};
})($);
