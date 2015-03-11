(function($) {
$.analytics = $.Analytics = 
{
  atlasUri: "https://switch.atdmt.com/jaction/{0}",
  tags: [],
  initAtlas: function()
  {
    this.tags.atlas = [];
  },
  queueAtlas: function(tag)
  {
    if(tag)
    {
      var tags = this.tags;
      tags.atlas.push(tag);
    }
  },
  sendAtlas: function(tag)
  {
    var tags = this.tags;
    $.analytics.queueAtlas(tag);
    for(var i =0; i < tags.atlas.length; i++)
    {
      var url = this.atlasUri.format(tags.atlas[i]);
      $.getScript(url);
    }
    $.analytics.initAtlas();
  },
  sendTags: function()
  {
    $.analytics.sendAtlas();
  }
};

function initAnalytics(){
  $.analytics.initAtlas();
  $(document).ready($.analytics.sendTags);
}
    
initAnalytics();

})(jQuery);
