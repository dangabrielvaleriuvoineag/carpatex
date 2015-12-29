function ___getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		if(document.documentElement.clientWidth){
			windowWidth = document.documentElement.clientWidth; 
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = xScroll;		
	} else {
		pageWidth = windowWidth;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
};
function ___getPageScroll() {
	var xScroll, yScroll;
	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
		xScroll = self.pageXOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
		xScroll = document.documentElement.scrollLeft;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
		xScroll = document.body.scrollLeft;	
	}
	arrayPageScroll = new Array(xScroll,yScroll);
	return arrayPageScroll;
};
	
$.videoPopup = function (settings){
	var defaults = {
		url:'',
		height:'385px',
		width:'480px',
		border:'0',
		overlayBgColor:	'#000',
		overlayOpacity:			0.8
	};
	settings = $.extend(defaults,settings);
	append = 'http://www.youtube.com/v/'+settings.url+'?fs=1&amp;hl=en_US&amp;rel=0&amp;border='+settings.border;
	
	
	function _finish() {
		$('#popup').remove();
		$('#jquery-overlay').fadeOut(function() { 
			$(this).remove();
		});
		// Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
		$('embed, object, select').css({ 'visibility' : 'visible' });
	}
	function _start(){
		$('embed, object, select').css({ 'visibility' : 'hidden' });
		
		html = '<div id="jquery-overlay"></div><div id="popup"><div id="innerpopup"><a href="#" id="popupclose"></a></div></div>';
		vid = '<object id="popupvid" type="application/x-shockwave-flash" data="http://www.youtube.com/v/'+settings.url+'?fs=1&amp;hl=en_US&amp;rel=0&amp;border='+settings.border+'" class="singleVid"> <param value="http://www.youtube.com/v/'+settings.url+'?fs=1&amp;hl=en_US&amp;rel=0&amp;border='+settings.border+'" name="movie"> </object>';
		$('body').append(html);
		$('#innerpopup').append(vid);
		$('#popupclose').click(function(event){
			event.preventDefault();
			_finish();
		});
		$('#innerpopup').animate(
			{'width':settings.width}
			,1000,function(){
					$('#popupvid').css({height:settings.height,width:settings.width,visibility:'visible'});
				});
		var arrPageSizes = ___getPageSize();
		
		$('#jquery-overlay').css({
			backgroundColor:	settings.overlayBgColor,
			opacity:			settings.overlayOpacity,
			width:				arrPageSizes[0],
			height:				arrPageSizes[1]
		}).fadeIn();
		var arrPageScroll = ___getPageScroll();
		$('#popup').css({
			top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
			left:	arrPageScroll[0]
		}).show();
		$(window).resize(function() {
			// Get page sizes
			var arrPageSizes = ___getPageSize();
			// Style overlay and show it
			$('#jquery-overlay').css({
				width:		arrPageSizes[0],
				height:		arrPageSizes[1]
			});
			// Get page scroll
			var arrPageScroll = ___getPageScroll();
			// Calculate top and left offset for the jquery-lightbox div object and show it
			$('#popup').css({
				top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
				left:	arrPageScroll[0]
			});
		});
	}	
	_start();
};
	
$.fn.printPopup = function (settings){
	$(this).click(function(e){
		e.preventDefault();
		var src = $(this).attr('href');
		var defaults = {
			height:'385px',
			width:'600px',
			border:'0',
			overlayBgColor:	'#000',
			overlayOpacity:	0.8
		};
		settings = $.extend(defaults,settings);	
		
		function _finish() {
			$('#popup').remove();
			$('#jquery-overlay').fadeOut(function() { $('#jquery-overlay').remove(); });
			// Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
			$('embed, object, select').css({ 'visibility' : 'visible' });
		}
		function _start(){
			$('embed, object, select').css({ 'visibility' : 'hidden' });
			
			html = '<div id="jquery-overlay"></div><div id="popup"><div id="innerpopup"><a href="#" id="popupclose"></a></div></div>';
			frame = $('<iframe />', {
				src:    src,
				css:{
					border:0,
					width:'100%',
					height:'100%',
					display:'none'
				}
			});
			$('body').append(html);
			$('#innerpopup').append(frame);
			$('#popupclose').click(function(event){
				event.preventDefault();
				_finish();
			});
			$('#innerpopup').animate({
					'width': settings.width
				},
				400,
				
				function(){
				
					$('#innerpopup').animate({
							'height': settings.height
						},
						400,
						function(){
						$('#innerpopup iframe').css('display', 'block');
						}
			);
				}
			);
			var arrPageSizes = ___getPageSize();
			
			$('#jquery-overlay').css({
				backgroundColor:	settings.overlayBgColor,
				opacity:			settings.overlayOpacity,
				width:				arrPageSizes[0],
				height:				arrPageSizes[1]
			}).fadeIn();
			var arrPageScroll = ___getPageScroll();
			$('#popup').css({
				top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
				left:	arrPageScroll[0]
			}).show();
			$(window).resize(function() {
				// Get page sizes
				var arrPageSizes = ___getPageSize();
				// Style overlay and show it
				$('#jquery-overlay').css({
					width:		arrPageSizes[0],
					height:		arrPageSizes[1]
				});
				// Get page scroll
				var arrPageScroll = ___getPageScroll();
				// Calculate top and left offset for the jquery-lightbox div object and show it
				$('#popup').css({
					top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
					left:	arrPageScroll[0]
				});
			});
		}	
		_start();
	});
};

$.comandaPopup = function (settings){
	var defaults = {
		formurl:'sources/ajax.php?a=comanda&b=formular',
		submiturl:'sources/ajax.php?a=comanda&b=submit',
		border:'0',
		width:320,
		overlayBgColor:	'#000',
		overlayOpacity:			0.8
	};
	settings = $.extend(defaults,settings);
	//append = 'http://www.youtube.com/v/'+settings.url+'?fs=1&amp;hl=en_US&amp;rel=0&amp;border='+settings.border;
	
	
	function _finish() {
		$('#popup').remove();
		$('#jquery-overlay').fadeOut(function() { $('#jquery-overlay').remove(); });
		// Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
		$('embed, object, select').css({ 'visibility' : 'visible' });
	}
	function _get_form(){
		$.get(settings.formurl,function(form){
			$('#innerpopup').append(form);
			// _submission();
			$('#innerpopup').animate({width:(parseInt(settings.width)+30)+'px'},400,function(){
				$(this).animate({minHeight:$('#comanda_form_eon').innerHeight()},400,function(){
					$('#comanda_form_eon').fadeIn();
				});
			});
		});	
	}
	$.comandaPopup._submission = function (t){
		$.post(settings.submiturl,$(t).serialize(),function(res){
			$('#comanda_form_eon').fadeOut(function(){
				$(this).remove();
				$('#innerpopup').append(res).animate({minHeight:$('#comanda_form_eon').innerHeight()},400,function(){
					$('#comanda_form_eon').fadeIn();
				});
			});
		});	
	}
	function _retry(){
		$('#comanda_esec a').click(function(){
			$('#comanda_esec').fadeOut(function(){
				$('#comanda_esec').parent('form').remove();
				_get_form();
			});
		});	
	}
	function _start(){
		$('embed, object, select').css({ 'visibility' : 'hidden' });
		
		html = '<div id="jquery-overlay"></div><div id="popup"><div id="innerpopup"><a href="#" id="popupclose"></a></div></div>';
		$('body').append(html);
		$('#popupclose').click(function(event){
			event.preventDefault();
			_finish();
		});
		
		_get_form();
		
			
		var arrPageSizes = ___getPageSize();
		
		$('#jquery-overlay').css({
			backgroundColor:	settings.overlayBgColor,
			opacity:			settings.overlayOpacity,
			width:				arrPageSizes[0],
			height:				arrPageSizes[1]
		}).fadeIn();
		var arrPageScroll = ___getPageScroll();
		$('#popup').css({
			top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
			left:	arrPageScroll[0]
		}).show();	
		$(window).resize(function() {
			// Get page sizes
			var arrPageSizes = ___getPageSize();
			// Style overlay and show it
			$('#jquery-overlay').css({
				width:		arrPageSizes[0],
				height:		arrPageSizes[1]
			});
			// Get page scroll
			var arrPageScroll = ___getPageScroll();
			// Calculate top and left offset for the jquery-lightbox div object and show it
			$('#popup').css({
				top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
				left:	arrPageScroll[0]
			});
		});
	}	
	_start();
}
$.fn.initMenu = function (options) {
	var defaults = {
		effectTime: 1000
	};
	var opts = $.extend(defaults, options);
    $(this).find('>li>ul').each(function(){
       var visible = false;
       if(!$(this).hasClass('display-sub-menu')){
         $(this).hide();
       }
    });
	$('.active').parents('ul').show();
    $(this).find(' > li > a').click(function(event){
		if($(this).next('ul').length>0)
			event.preventDefault();
		$(this).next('ul').slideToggle('normal');
		$(this).parent().siblings('li').find(' > ul').slideUp('fast');
	});
}
$.fn.slideSwitch =  function (options){
	var defaults = {
		effectTime: 1000
	};
	var opts = $.extend(defaults, options);
		$(this).each(function(){			
			var $active = $(this).children('img.active');			
			var $next = $active.next();			
			var $next =  $active.next().length ? $active.next(): $(this).children('img:first');
			$active.addClass('last-active');
			$next.css({opacity: 0.0}).addClass('active').animate({opacity: 1.0}, defaults.effectTime, function(){
				$active.removeClass('active last-active');
			});
		})
};

$.fn.notEmpty = function(){
	return $(this).val().length > 0;
}

$.fn.minLength = function(params){
	return $(this).val().length >= params[0];
}

$.fn.regex = function(params){
	return $(this).val().match(new RegExp(params[0]));
}

$.fn.email = function(){
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;/*"*/
	return $(this).val().match(emailRegex);
}

$.fn.option = function(params){
	return typeof(params[0][$(this).val()]) != 'undefined';
}

$.fn.form = function(prefix, valid, callback){
	$(this).submit(function(e){
		var ok = true;
		for(var i in valid){
			var fieldId = '#' + prefix + '_' + i;
			var field = $(fieldId);
			var okF = true;
			for(var v in valid[i]){
				if(
						typeof(valid[i][v].noJs) == 'undefined' || 
						!valid[i][v].noJs
				){
					if(field.hasClass('defaultTextActive')){
						field.val('');
					}
					var validated = $(fieldId)[valid[i][v].validation](valid[i][v].params);
					if(field.hasClass('defaultTextActive')){
						field.val($(fieldId).attr('title'));
					}
					if(!validated){
						e.preventDefault();
						var wrapper = fieldId + '_wrapper';
						$(wrapper).find('.error').text(valid[i][v].error).slideDown();
						ok = false;
						okF = false;
						break;
					}else{
						//console.log(fieldId, valid[i][v].error, '[PASSED OK :)]');
					}
				}
			}
			if(okF){
				var wrapper = fieldId + '_wrapper';
				$(wrapper).find('.error').slideUp();
			}
		}
		if(ok && typeof(callback) == 'function'){
			e.preventDefault();
			callback(this);
		}
	});
};

$.fn.previewShow = function(){
	$(this).each(function(){
		var wrapper = $('#' + $(this).attr('id'));
		var bigPic = wrapper.find('.pozaMarePrev');
		wrapper.find('.gallery_preview_EON_list_image').lightBox();
		wrapper.find('.mypixel').click(function(e){
			e.preventDefault();
			bigPic.find('img').attr('src', $(this).attr('rel'));
			bigPic.attr('rel', $(this).parents('.gallery_preview_EON_list_thumbEO').attr('id'))
		});
		wrapper.find('.pozaMarePrev').click(function(e){
			e.preventDefault();
			$('#' + $(this).attr('rel') + ' a').trigger('click');
			console.log('#' + $(this).attr('rel'));
		});
	});
};

$.fn.formLabel = function(){
	$(this).find(':input').each(function(){
		if($(this).attr('type') == 'text' || $(this).is('textarea')){
			$(this).val($(this).attr('title'));
			$(this).addClass('lbl');
		}
	});
	$(this).find(':input').blur(function(){
		if($(this).val() == ''){
			$(this).addClass('lbl');
			$(this).val($(this).attr('title'));
		}
	}).focus(function(){
		if($(this).val() == $(this).attr('title')){
			$(this).removeClass('lbl');
			$(this).val('');
		}
	});
	$(this).submit(function(){
		$(this).find(':input').each(function(){
			if($(this).val() == $(this).attr('title')){
				$(this).val('');
			}
		});
	});
}

$(document).ready(function() {

	var currentUrl = $(location).attr('href');

	$('a[href="' + currentUrl +'"]').each(function(index) {
		$(this).addClass('active-item');
	});
	
	// $('.formLabel').formLabel();
	/*
	$('body').on('click','.paginatie a',function(e){
		
		e.preventDefault();			
		var vhref=$(this).attr('href');
		var vhref2=vhref.split('/').pop().split('?').shift();
	
		$('.wrapperProduse').append('<div class="wrapperProduseAjax"></div>');
		$('.wrapperProduseAjax').fadeIn('slow');		
		window.setTimeout(function() {

		if (vhref2=='search'){
			$.get(vhref+'&is_ajax=true',function(rezultat){	
				$('.wrapperProduseAjax').fadeOut('slow');
				window.setTimeout(function() {
					$('.paginatie').remove();
					$('.wrapperProduse').replaceWith(rezultat);	
				},1000);
			})	
				
		}else{
			$.get(vhref+'?is_ajax=true',function(rezultat){
				$('.wrapperProduseAjax').fadeOut('slow');
				window.setTimeout(function() {
					$('.paginatie').remove();
					$('.wrapperProduse').replaceWith(rezultat);
				},1000);
			})
			
		}
			    },1000);
		
	});
	 */
	$('.gallery_preview_EON').previewShow();
    $('.sliderEO').cycle({
        fx: 'scrollLeft' // choose your transition type, ex: fade, scrollUp, shuffle, zoom, turnDown, curtainX, scrollRight  etc...
    });
	$('.open').click(function(){
		$.comandaPopup();
	});	
	$('#meniu-categorii  ul').initMenu();
	$('.scrollableEO').scrollable({'circular':true, 'steps' : 1}).autoscroll({'autoscroll':true});
	
	$('.lbox').lightBox(); // LIGHTBOX
	$('.lbox2').lightBox(); // LIGHTBOX
	$('.lbox3').lightBox(); // LIGHTBOX
	//setInterval("$('#slideshow').slideSwitch({ effectTime: 1000 })",3000); // SLIDE SHOW
	
	$('.gallery_block_eon').each(function(){
		$(this).find('.thumbEO a').lightBox();
	});

	$('.gallery_scroller_eon').each(function(){
		$(this).find('.sthumbEO a').lightBox();
	});
	

	$('a.new-window').click(function(){window.open(this.href);return false;}) // NEW WINDOW SCRIPT
	
	$('body').delegate('.captchaRefresh', 'click', function(e){
		e.preventDefault();
		var captcha = $(this).siblings('.captchaImg');
		var url = captcha.attr('src');
		var splitsies = url.split('#');
		if(splitsies.length > 1){
			splitsies[1] = Math.random();
		}else{
			splitsies.push(Math.random());
		}
		captcha.attr('src', splitsies.join('#'));
	});
	
	$('.lightBoxPrint').printPopup();
});