
$(document).ready(function(){

  if ($("#st-search-input").length && $("#st-search-input").length){
    $("#st-search-input").swiftype({
       engineKey: "xs3zzjB-9s6fZ86B1oS9"
    });
    // set up search
    $("#st-search-input").swiftypeSearch({
     engineKey: "xs3zzjB-9s6fZ86B1oS9",
     resultContainingElement: "#st-results-container"
    });
  }

});
