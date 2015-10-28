//This will generate breadcrumbs based on the url.  The output goes to a <div> with and id set to "output" (see last statement to modify the id).  
//For white colored text, the div should use the "cms_3rdtiernavdefault" CSS class.  
//For black text, the div should use the cms_3rdtiernavheader" CSS class.

var host = document.location.hostname;
var directoryArr = document.location.pathname.split("/");
var locale = directoryArr[1];
var linksBase = "http://"+host+"/"+locale;
var breadCrumbsHash = {};
 
function xmlReceived(xml)
{
  
var linksHash = {};

  for(var i = 2; i < directoryArr.length - 1; i++){
     var dir = directoryArr[i];
     var crumb = $(xml).find("directory[url='"+dir+"']").attr("friendly");

     if (crumb == undefined) {

         var pUrl = directoryArr[i - 1];
         var key = pUrl + "|" + dir;
         crumb = $(xml).find("directory[url='" + key + "']").attr("friendly");

     } 
  
     if(crumb != undefined){
        
        breadCrumbsHash[directoryArr[i]] = crumb;
        linksBase += "/"+directoryArr[i];
        linksHash[directoryArr[i]] = linksBase; 

     }

  }

   constructBreadCrumbs(linksHash);
    
}

function constructBreadCrumbs(linksHash)
{

    var breadcrumbs = "";
    var isFirstCrumb = true;

    for(var k in breadCrumbsHash)
    {

       friendlyName = breadCrumbsHash[k];

        if(!isFirstCrumb)
        {

           breadcrumbs += " > ";
    
        }
      
       isFirstCrumb = false;
       breadcrumbs += "<a href='"+linksHash[k]+"'>"+friendlyName+"</a>";

    }
  
    $("#output").append(breadcrumbs);

}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://" + host + "/" + locale + "/xml/breadcrumbs.xml",
        dataType: "xml",
        success: xmlReceived
    });
});
