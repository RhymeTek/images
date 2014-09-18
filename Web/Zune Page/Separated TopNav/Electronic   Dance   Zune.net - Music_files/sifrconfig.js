
function cufonConfig()
{
    if(typeof Cufon != "undefined")
    {
        Cufon.set("fontFamily","segoe light").replace(".cms_pageheader30px");
        Cufon.set("fontFamily","segoe light").replace(".cms_heroheadline40px");
        Cufon.set("fontFamily","segoe light").replace(".cms_pagesubhead1gray");
        Cufon.set("fontFamily","segoe light").replace(".cms_pagesubhead1white");
        Cufon.set("fontFamily","segoe light").replace(".BlackZwrapper h1");
        Cufon.set("fontFamily","segoe light").replace("h1")("h2");
    }
}

// proxy function for all those places we call sifrConfig
function sifrConfig(){cufonConfig();}
cufonConfig();