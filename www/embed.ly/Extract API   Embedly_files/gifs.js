;(function ( $, window, document, undefined ) {

  $(document).ready(function(){

    $('div.gif').each(function(){
      var $this = $(this);
      if ($this.data('image-src')){
        // Get the attributes.
        var url = $this.data('image-src'),
          width = $this.data('image-width'),
          height = $this.data('image-height');

        // set the widths and heights.
        $this.css({width:width, height:height});

        // Get the still first screen.
        var src = $.embedly.display.display(url, {query:{animate:false}, key:$.embedly.defaults.key});

        // Add the placeholder.
        $this.html('<img class="gif-placeholder" src="'+src+'"/>');

        // Add the full gif, this is really just to get the bad boy in the browsers cache.
        var $full = $('<img class="gif-full" src="'+url+'"/>');
        $this.append($full);

        // set up the overlay.
        var $overlay = $('<div class="gif-overlay"></div>');
        $overlay.css({width:width, height:height});
        $this.append($overlay);

        // set up the play.
        var $play = $('<span class="gif-play"></span>');
        $play.css({left:Math.ceil(width/2)-50, top:Math.ceil(height/2)-50});
        $play.on('click', function(){
          $full.remove();
          var $one = $('<img class="gif-show" src="'+url+'"/>');
          $this.append($one);
          $one.one('mouseleave', function(){
            // This is important, otherwise you will start the gif randomly.
            $one.get(0).src = '';
            $one.remove();
          });
          return false;
        });
        $this.append($play);
      }
    });

  });
})( jQuery, window, document );