$(document).ready(function(){
	// open in a new window
	$('a[rel="external"],.pronet-portfolio a').click(function(){
		window.open($(this).attr('href'));
		return false;
	});
	// scroll
	$('.scroll').click(function(){
		var elemIs = $(this).attr('href');
		var destIs = $(elemIs).offset().top;
		$('html,body').animate({ scrollTop: destIs-0 }, 800);
		return false;
	});
	// menu collapse
	$('.menu-ico a').toggle(function(){
		$('.primary-nav').slideDown('slow');
	},function(){
		$('.primary-nav').slideUp('slow', function(){
			$('.primary-nav').removeAttr('style');
		});
	});
	// menu collapse
	$('.products-item a').toggle(function(){
		$('.products-nav').fadeIn('slow');
	},function(){
		$('.products-nav').fadeOut('slow', function(){
			$('.products-nav').removeAttr('style');
		});
	});
	// cat menu collapse
	$('.pronet-service').toggle(function(){
		$('.pronet-service-list').slideDown('slow');
	},function(){
		$('.pronet-service-list').slideUp('slow');
	});
	$('.pronet-location').toggle(function(){
		$('.pronet-location-list').slideDown('slow');
	},function(){
		$('.pronet-location-list').slideUp('slow');
	});
	// show/hide login
	$('.logged-out a').toggle(function(){
		$('.login-wrap.login-form').fadeIn();
	},function(){
		$('.login-wrap.login-form').fadeOut();
	});
	// show/hide account
	$('.logged-in a').toggle(function(){
		$('.login-wrap.login-account').fadeIn();
	},function(){
		$('.login-wrap.login-account').fadeOut();
	});
	// zoom screens
	$('.zoom-overlay').hide();
	$('.zoom').click(function(){
		var idis = $(this).attr('id');
		var imgis = $('#'+idis+' img').attr('src');
		$('.zoom-overlay').fadeIn('slow');
		$('<img src="'+imgis+'">').appendTo('.zoom-overlay');
		return false;
	});
	$('.zoom-overlay').click(function(){
		$(this).fadeOut('slow');
		$('.zoom-overlay img').hide();
		return false;
	});

	// validate forms
	$('#showcase-apply').validate({
		errorElement: "em",
		rules: {
			title: 'required',
			showcase_apply_uri: 'required',
			showcase_apply_contact: {
				required: true,
				email: true
			},
			showcase_apply: 'required'
		},
		messages: {
			title: 'What is the name of your site?',
			showcase_apply_uri: 'We need an URI to see',
			showcase_apply_contact: 'We need to know whom to contact.',
			showcase_apply: 'We need to have some reason to interview you.'
		}
	});
	$('#event-submit').validate({
		errorElement: "em",
		rules: {
			title: 'required',
			event_uri: 'required',
			event_location: 'required',
			entry_date: 'required',
			event_description: 'required'
		},
		messages: {
			title: 'What is the name of your event?',
			event_uri: 'Where should we send folks?',
			event_location: 'Is this physical or online?',
			entry_date: 'When does it start?',
			event_description: 'Why should folks attend?'
		}
	});
	$('#pronet-join,#pronet-edit').validate({
		errorElement: "em",
		rules: {
			title: 'required',
			pronet_uri: 'required',
			pronet_desc: 'required',
			pronet_contact_name: 'required',
			pronet_contact_email: {
				required: true,
				email: true
			}
		},
		messages: {
			title: 'What is the name of your business?',
			pronet_uri: 'Where is your website?',
			pronet_desc: 'Please describe your business',
			pronet_contact_name: 'Who is the primary contact?',
			pronet_contact_email: 'What is contact\'s e-mail?'
		}
	});
});

// test for SVG. if we ever implement Modernizr (which is fatter), this would become redundant
function supportsSvg() {
    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
}

// desc: Given a DOM element elem, tell me if this is scrolled into view yet
// usage: isScrolledIntoView('.timeframe') 
// returns: Boolean
function isScrolledIntoView(elem)
{
        var st = (document.documentElement.scrollTop || document.body.scrollTop),
            ot = $(elem).offset().top,
            wh = (window.innerHeight && window.innerHeight < $(window).height()) ? window.innerHeight : $(window).height();
        return ot > st && ($(elem).height() + ot) < (st + wh);
}