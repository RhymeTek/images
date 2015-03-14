;(function ( $, window, document, undefined ) {
  $(document).ready(function () {
    var verifyUrl = function(value){
      return  /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }

    var addEmbedInputModal =  function($input, $button){
      if($input.length !=0 && $button.length !=0){
        $input.on('focus', function(){
          $(this).val("");
          $(this).attr("enabled", true);
        })

        $(document).keypress(function(e) {
          if(e.which == 13) {
            $button.click();
          }
        });

        $button.on('click', function(){
          var url = $input.val();
          if( url !== "" && $input.attr('enabled') ){

            url = $.trim(url);

            if (!(/^https?:\/\//i).test(url)){
              url = 'http://' + url;
            }

            if(verifyUrl(url)){
              if(smallWidth() || isMobile()){
                var lookup_url = '/code?url=' +  window.encodeURIComponent(url);
                window.open(lookup_url, "_self");
              } else {
                embedly.modal({url:url});
              }
            } else {
              $input.before('<small class="error">Please enter a valid URL</small>');
              setTimeout(function(){$('.error').fadeOut('slow')},1000);
            }
          }
          return false;
        });
      }
    }

    var isMobile = function(){
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(window.navigator.userAgent);
    }

    var smallWidth = function(){
      return (window.innerWidth < 768);
    }


    addEmbedInputModal($("#embed-url-input"),$(".input-btn",".home-embed-input-mod"));
    addEmbedInputModal($("#embed-url-input"),$(".input-btn", ".cards-product-header"));
  });
})(jQuery, window, document);
