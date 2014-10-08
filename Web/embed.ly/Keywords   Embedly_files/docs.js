/*globals utils:true, prettyPrint:true*/
;(function ( $, window, document, undefined ) {


  /*
    From a document create the subnav.
  */

  var DocRightNav = function ($elem) {
    this.init($elem);
  };
  DocRightNav.prototype = {
    init: function($elem){
      this.$nav = $elem.find('.right-nav');
      this.$content = $elem.find('.docs-content');
      // build the tree
      this.build();
    },
    one: function($elem, attrs){
      var text = $elem.text();
      var ref = text.toLowerCase().strip().replace(' ', '-');
      // adds the ref
      $elem.before('<a name="'+ref+'"></a>');
      var $li = $('<li><a href="#'+ref+'">'+text+'</a></li>');
      if (!utils.none(attrs)){
        $li.attr(attrs);
      }

      return $li;
    },
    build: function(){
      // add the header
      var $h1 = this.$content.find('h1').eq(0),
        $li = this.one($h1, {'class': 'header'});
      this.$nav.append($li);
      var self = this;
      // Add all the h2 and h3s.
      $('h2,h3').each(function(i, e){
        var $e = $(e);
        var tag = e.nodeName.toLowerCase();
        if (tag === 'h2'){
          self.$nav.append(self.one($e));
        } else if (tag === 'h3'){
          var $last = self.$nav.children('li').last();
          if ($last.hasClass('header')){
            return true;
          }

          var $ul = $last.children('ul');
          if ($ul.length === 0){
            $ul = $('<ul></ul>');
            $last.append($ul);
          }
          $ul.append(self.one($e));
        }
      });
    }
  };


  $(document).ready(function(){
    //
    //var right = new DocRightNav($('.docs'));

    $('pre').each(function(i,e){
      $(e).text(utils.pre($(e).text()));
    });

    prettyPrint();

    $('pre.prettyprint ol').each(function(){
      if ($(this).find('li').length > 99){
        $(this).css('margin-left', '45px');
      }
    });

  });
})( jQuery, window, document );