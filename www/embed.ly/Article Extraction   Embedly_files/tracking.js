/*globals ga:true, gaID:true */

// Tracking events for Google Analytics

;(function ( $, window, document, undefined ) {

  // Add google analytics.
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window, document, 'script','//www.google-analytics.com/analytics.js','ga');

  // Seperate for tr.embed.ly and embed.ly
  var host = (/embed\.ly/).test(window.location.hostname) ? window.location.hostname : 'none';

  // Actually set it up.
  ga('create', gaID, {
    'allowLinker': true,
    'cookieDomain': host
  });

  // Send a page view
  ga('send', 'pageview');


  // Create the button tracker.
  var tracker = {
    page: null,
    product: null,
    path: null
  };

  tracker.category = function(){
    if (tracker.page && tracker.product){
      return tracker.product + '-' + tracker.page;
    } else if (tracker.page){
      return tracker.page;
    } else if (tracker.path){
      return tracker.path;
    }
    return window.location.pathname;
  };

  tracker.event = function(action, label, data){
    var category = tracker.category();
    ga('send', 'event', category, action, label, data);
  };

  // Wait for the track to move
  tracker._click = function($elem, evt, label){
    var url = $elem.attr('href');

    if (!url){
      return true;
    }

    // If we aren't relative, we should hit the old pause button.
    var data = {};
    if ((/^https?:\/\//).test(url)){
      evt.preventDefault();
      data.hitCallback = function () {
        document.location = url;
      };

      // If we don't return quickly, then just redirect.
      setTimeout(function(){
        document.location = url;
      }, 350);
    }
    label = (label ? label+'-' : '') + url;

    tracker.event('click', label, data);
    return true;
  };

  tracker.click = function($elem, evt, label){
    try {
      return tracker._click($elem, evt, label);
    } catch(err){
      if (window.console && window.console.error){
        window.console.error(err);
      }
    }
    return true;
  };

  // navigation.
  $('.header-logo, header .link-list a').on('click', function(evt){
    return tracker.click($(this), evt, 'header-nav');
  });

  //footer
  $('footer a').on('click', function(evt){
    return tracker.click($(this), evt, 'footer-nav');
  });

  // All buttons.
  $('a.button').on('click', function(evt){
    var $this = $(this), label;

    if ($this.data('label')){
      label = $this.data('label');
    } else {
      label = $.trim($(this).text().toLowerCase());
    }

    label = label ? label : 'button';

    return tracker.click($(this), evt, label);
  });

  window.tracker = tracker;

})( jQuery, window, document );
