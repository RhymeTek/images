// PUT RANDOM UTILS HERE.

;(function ( $, window, document, undefined ) {

  if(typeof(String.prototype.strip) === "undefined")
  {
      String.prototype.strip = function()
      {
          return String(this).replace(/^\s+|\s+$/g, '');
      };
  }
  var Utils = function(){};
  Utils.prototype = {
    none: function(obj){
      return (obj === null || obj === undefined);
    },
    pre: function(str){
      return String(str).replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
      //return String(str)
      //  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      //  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
  };

  window.utils = new Utils();

  //Used For Turkish Translations issue in Chrome, Safari.
  //https://code.google.com/p/chromium/issues/detail?id=304911
  function getStyle(element, style) {
    var result;

    if (document.defaultView && document.defaultView.getComputedStyle) {
      result = document.defaultView.getComputedStyle(element, '').getPropertyValue(style);
    } else if(element.currentStyle) {
      style = style.replace(/\-(\w)/g, function (strMatch, p1) {
        return p1.toUpperCase();
      });
      result = element.currentStyle[style];
    }
    return result;
  }

  function replaceRecursive(element, lang) {
    if(element.lang) {
      lang = element.lang; // Maintain language context
    }

    if (element && element.style && getStyle(element, 'text-transform') === 'uppercase') {
      if (lang === 'tr' && element.value) {
        element.value = element.value.replace(/ı/g, 'I');
        element.value = element.value.replace(/i/g, 'İ');
      }

      for (var i = 0; i < element.childNodes.length; ++i) {
        if (lang === 'tr' && element.childNodes[i].nodeType === Node.TEXT_NODE) {
          element.childNodes[i].textContent = element.childNodes[i].textContent.replace(/ı/g, 'I');
          element.childNodes[i].textContent = element.childNodes[i].textContent.replace(/i/g, 'İ');
        } else {
          replaceRecursive(element.childNodes[i], lang);
        }
      }
    } else {
      if (!element.childNodes || element.childNodes.length === 0) { return; }

      for (var n = 0; n < element.childNodes.length; ++n) {
        replaceRecursive(element.childNodes[n], lang);
      }
    }
  }

  // Deal with the hover nav
  $(document).ready(function(){
    $('header li.has-dropdown').on('mouseenter', function(){
      var $ul = $(this).find('ul');
      $ul.show();
      var right = $ul.offset().left + $ul.width();
      if (right > $(window).width()){
        $ul.addClass('off-center');
      }
    });

    $('header li.has-dropdown').on('mouseleave', function(){
      $(this).find('ul').removeClass('off-center').hide();
    });

    replaceRecursive(document.getElementsByTagName('html')[0], '');

    // ALWAYS SELECT ALL FOR READONLY TEXT AREAS.
    $('textarea[readonly]').on('focus, click', function(){
      var $this = $(this);
      $this.select();
      $this.on("mouseup", function() {
        $this.off("mouseup");
        return false;
      });
    });
  });

})( jQuery, window, document );