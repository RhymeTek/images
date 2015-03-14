/*
 *
 * Copyright (c) 2006-2008 Sam Collett (http://www.texotela.co.uk)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Version 2.0.2
 * Demo: http://www.texotela.co.uk/code/jquery/newsticker/
 *
 * $LastChangedDate$
 * $Rev$
 *
 */
 
(function($) {
$.fn.newsTicker = $.fn.newsticker = function(delay)
{
	delay = delay || 4000;
	initTicker = function(el)
	{
		$.newsticker.clear(el);
		el.items = $("li", el);
		el.items.not(":eq(0)").hide().end();
		el.currentitem = 0;
		startTicker(el);
	};
	startTicker = function(el)
	{
		el.tickfn = setInterval(function() { doTick(el) }, delay)
	};
	doTick = function(el)
	{
		if(el.pause) return;
		$.newsticker.pause(el);
		$(el.items[el.currentitem]).fadeOut("slow",
			function()
			{
				$(this).hide();
				el.currentitem = ++el.currentitem % (el.items.size());
				$(el.items[el.currentitem]).fadeIn("fast",
					function()
					{
						$.newsticker.resume(el);
					}
				);
			}
		);
	};
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase()!= "ul") return;
			initTicker(this);
		}
	)
	.addClass("newsticker")
	.hover(
		function()
		{
			$.newsticker.pause(this);
		},
		function()
		{
			$.newsticker.resume(this);
		}
	);
	return this;
};


$.newsticker = $.newsTicker =
{
	pause: function(el)
	{
		(el.jquery ? el[0] : el).pause = true;
	},
	resume: function(el)
	{
		(el.jquery ? el[0] : el).pause = false;
	},
	clear: function(el)
	{
		el = (el.jquery ? el[0] : el);
		clearInterval(el.tickfn);
		el.tickfn = null;
		el.items = null;
		el.currentItem = null;
	}
}

})(jQuery);