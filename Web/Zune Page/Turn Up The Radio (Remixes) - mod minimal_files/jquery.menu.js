/*Copyright(c)2006,2007JonathanSharpDuallicensedundertheMIT(MIT-LICENSE.txt)andGPL(GPL-LICENSE.txt)licenses.*/
jQuery.fn.customFadeIn = function(speed, callback) { 
    return this.animate({opacity: 'show'}, speed, function() { 
        if (jQuery.browser.msie)  
            this.style.removeAttribute('filter');  
        if (jQuery.isFunction(callback)) 
            callback();  
    }); 
}; 
jQuery.fn.customFadeOut = function(speed, callback) { 
    return this.animate({opacity: 'hide'}, speed, function() { 
        if (jQuery.browser.msie)  
            this.style.removeAttribute('filter');  
        if (jQuery.isFunction(callback)) 
            callback();  
    }); 
}; 
jQuery.fn.customFadeTo = function(speed,to,callback) { 
    return this.animate({opacity: to}, speed, function() { 
        if (to == 1 && jQuery.browser.msie)  
            this.style.removeAttribute('filter');  
        if (jQuery.isFunction(callback)) 
            callback();  
    }); 
};

$(function(){$('ul.menu').menu();});
(function($){
  function addEvents(ul){
    var settings = $.data( $(ul).parents().andSelf().filter('ul.menu')[0], 'menuSettings' );
    $('> li', ul)
      .bind('mouseenter.menu mouseleave.menu', function(evt) {
        $(this).toggleClass('hover');
        var ul = $('> ul', this);
        if ( ul.length == 1 ) {
          clearTimeout( this.$menuTimer );
          var enter = ( evt.type == 'mouseenter' );
          var fn = ( enter ? showMenu : hideMenu );
          this.$menuTimer = setTimeout(function() {
            fn( ul[0], settings.onAnimate, settings.isVertical );
          }, enter ? settings.showDelay : settings.hideDelay );
        }
      })
      .bind('click.menu', function(evt) {
        var ul = $('> ul', this);
        if ( ul.length == 1 && 
          ( settings.disableLinks == true || $(this).hasClass('accessible') ) ) {
          showMenu( ul, settings.onAnimate, settings.isVertical );
          return false;
        }
        
        if ( evt.target == this ) {
          var link = $('> a', evt.target).not('.accessible');
          if ( link.length > 0 ) {
            var a = link[0];
            if ( !a.onclick ) {
              window.open( a.href, a.target || '_self' );
            } else {
              $(a).trigger('click');
            }
          }
        }
        if ( settings.disableLinks || 
          ( !settings.disableLinks && !$(this).parent().hasClass('menu') ) ) {
          $(this).parent().menuHide();
          evt.stopPropagation();
        }
      })
      .find('> a')
        .bind('focus.menu blur.menu', function(evt) {
          var p = $(this).parents('li:eq(0)');
          if ( evt.type == 'focus' ) {
            p.addClass('hover');
          } else { 
            p.removeClass('hover');
          }
        })
        .filter('.accessible')
          .bind('click.menu', function(evt) {
            evt.preventDefault();
          });
  }

  function showMenu(ul, animate, vertical) {
    var ul = $(ul);
    if ( ul.is(':visible') ) {
      return;
    }
    ul.bgiframe();
    var li = ul.parent();
    if(li.hasClass("full"))
    { 
      li = li.parent().children(":first");
    }
    ul.trigger('menuShow')
      .position({ target: li[0], 
              targetPos:  ( vertical === true || !li.parent().hasClass('menu') ? 1 : 3 ), 
              elementPos: 0,
              hideAfterPosition: true
              });
    if ( !ul.hasClass('events') ) {
      ul.addClass('events');
      addEvents(ul);
    }
    li.addClass('active')
      .siblings('li').find('> ul:eq(0):visible')
        .each(function(){
          hideMenu( this ); 
        });
    if ( animate === undefined ) {
      ul.customFadeIn('fast');
    } else {
      animate.apply( ul[0], [true] );
    }
  }
  
  function hideMenu(ul, animate) {
    var ul = $(ul);
    $('.bgiframe', ul).remove();
    ul.filter(':not(.menu)')
      .find('> li > ul:eq(0):visible')
        .each(function() {
          hideMenu( this );
        })
      .end();
    if ( animate === undefined ) {
      ul.customFadeOut('fast');
    } else {
      animate.apply( ul[0], [false] );
    }

    ul.trigger('menuHide')
      .parents('li:eq(0)')
        .removeClass('active hover')
      .end()
        .find('> li')
        .removeClass('active hover');
  }
  
  $.fn.menu = function(settings) {
    var settings = $.extend({
                  showDelay: 50,
                  hideDelay: 300,
                  disableLinks: false
                  }, settings);
    if(!$.isFunction(settings.onAnimate)){settings.onAnimate = undefined;}
    return this.filter('ul.menu').each(function() {
      $.data( this, 
          'menuSettings', 
          $.extend({ isVertical: $(this).hasClass('menu_v') }, settings) 
          );
      addEvents(this);
    });
  };
  
  $.fn.menuUnbind = function() {$('ul.events', this).unbind('.menu').find('> a').unbind('.menu');};
  $.fn.menuHide = function() {return this.filter('ul').each(function(){ hideMenu( this );});
  };

  $(window).bind('click.menu', function(){$('ul.menu ul:visible').menuHide();});
})(jQuery);
