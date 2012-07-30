// version 1.0.1 :: 2012-06

var _gaq = _gaq || [];
var wt;

try
{
   jQuery(document).ready(function() { trackerInit(); });
}
catch(err) { }

function trackerInit()
{
   var config = {
         debug: true,
         gaAccounts: {
	         prod: 'UA-xxxxxxxx-1',
	         dev: 'UA-xxxxxxxx-0'
         },
         customvars: {
         },
         domain: "some.domain.com"
      };

   try
   {
      wt = new WebTracker(config);
      wt.init();
   }
   catch(err) { }
};

function WebTracker(config)
{
   var dh = document.location.hostname,
       dp = document.location.pathname.toLowerCase(),
       domain = "", uaAcc = "",
       _config = {
            gaAccounts: {
		         prod: 'UA-xxxxxxxx-1',
		         dev: 'UA-xxxxxxxx-0'
		      },
            debug: false,
            customvars: {},
		      domain: "website.com",
            ignoredRefs: []
         };

   if( config && typeof config=="object" )
   {
      for( p in config )
      {
         _config[p] = config[p];
      }
   }

   if( !_config.debug && dh.contains(_config.domain) )
   {
      domain = _config.domain;
      uaAcc = _config.gaAccounts['prod'];
   }
   else
   {
      domain = dh;
      uaAcc = _config.gaAccounts['dev'];
   }
   
   this.debug = _config.debug;
   this.domain = domain;
   this.docpath = dp;
   this.customvars = _config.customvars;

   if( _config.debug ) // configure tracker for debug
   {
      window["_gaq"] = window["_gaq"] || [];
      _gaq.push(['_setAccount', uaAcc]);
      _gaq.push(['_setDomainName', domain]);

      if( _config.ignoredRefs.length )
      {
         for(var i = 0, count = _config.ignoredRefs.length; i<count; i++)
         {
            _gaq.push(['_addIgnoredRef', _config.ignoredRefs[i]]);
         }
      }

      this.trackPageview();
   }

   this._loadGaJs();
};

WebTracker.prototype.init = function()
{
   var wto = this,
       docpath = wto.docpath,
       docref = document.referrer || "";

   // add in tagging initialisation
};

WebTracker.prototype.checkForNoSearchResults = function()
{
   var wto = this,
       label = "", data = { Action:"", Label:"", Value:0 };

};

WebTracker.prototype.setCustomVar = function(cvSlot, cvName, cvVal, cvScope)
{
   var wto = this;

   try{
      wto._setCustomVar({ slot: cvSlot, name: cvName, value: cvVal, scope: cvScope });
   } catch(err) {}
};

WebTracker.prototype.tagAddToCart = function()
{
   var wto = this,
       action = "Not Specified", 
       productInfo = [];

};

WebTracker.prototype.tagProductView = function()
{
   var wto = this,
       action = "", label = "",
       productInfo = [], data = { action:"", label:"", value:0 };

};

WebTracker.prototype.tagRemoveFromCart = function()
{
   var wto = this;

};

WebTracker.prototype.tagSearchResults = function()
{
   var wto = this,
       action = "", page = "";

};

WebTracker.prototype.trackEvent = function(evCat, evAction, evLbl, evVal)
{
   var wto = this,
       evCategory = evCat || "", evAction = evAction || "", evLabel = evLbl || "", evValue = evVal || 0,
       evData = { category: evCategory, action: evAction, label: evLabel, value: evValue };
   
   try{
      wto._trackEvent(evData);
   } catch(err) {}
};

WebTracker.prototype.trackEventTimeout = function(linkEl, delay, evCat, evAction, evLbl, evVal)
{
   var wto = this,
       url = linkEl.href || "";

   wto.trackEvent(evCat, evAction, evLbl, evVal);

   if( delay && !!url )
      setTimeout(function(){ document.location.href = url; }, 300);
};

WebTracker.prototype.trackPageview = function(page)
{
   var wto = this, 
       page = page || "",
       pd = { page: page };
   
   try{
      wto._trackPageview(pd);
   } catch(err) {}
};

WebTracker.prototype._checkCustomVar = function()
{
   var me = this,
       docpath = me.docpath, 
       cvar = {}, cVal = "";

};

WebTracker.prototype._getCookie = function(strParam) {
   var dcookies = document.cookie.split(";"),
       nvp = [],
       val = "", strParam = strParam || "";
   
   for(var i = 0, count = dcookies.length; i < count; i++) {
      nvp = dcookies[i].split("=");
      if( nvp[0].toLowerCase().trim()==strParam.toLowerCase() ) {
         for(var j = 1, npl = nvp.length; j < npl; j++) {
            if( j>1 )
               val += "=";

            val += nvp[j];
         }
         return decodeURIComponent(val.trim());
      };
   }
   
   return val;
};

WebTracker.prototype._getHashParam = function(strParam) {
   if( !strParam )
      return "";
   
   var dochash = document.location.hash.substring(1),
       hashparams = dochash.split("&"),
       paramlist = {}, np = [], 
       hp = "", strParam = strParam || "";
   
   for(var i = 0, l = hashparams.length; i < l; i++) {
      np = hashparams[i].split("=");
      if( np.length==2 ) {
         paramlist[np[0].trim()] = np[1].trim();
      }
      if( !!strParam && np[0].toLowerCase().trim()==strParam.toLowerCase() ) {
         hp = np[1].trim();
         break;
      }
   }
   
   return hp;
};

WebTracker.prototype._getParam = function(strParam) {
   var docsearch = document.location.search.substring(1),
       qparams = docsearch.split("&"),
       np = [], strParam = strParam || "";
   
   for (var i = 0, l = qparams.length; i < l; i++) {
      np = qparams[i].split("=");
      if( np[0].toLowerCase().trim()==strParam.toLowerCase() )
         return np[1].trim();
   }
   
   return "";
};

WebTracker.prototype._loadGaJs = function()
{
   try {
      var sl = document.getElementsByTagName('script');
      for(var a = 0, slCount = sl.length; a < slCount; a++) {
         if( sl[a].src.indexOf('google-analytics.com/ga.js') > 0 )
         return;
      }
   } catch (err) { }
   
   (function () {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
   })();
};

WebTracker.prototype._log = function(msg)
{
   if( typeof(console)!="undefined" && this.debug )
      console.log(msg);
};

WebTracker.prototype._setCookie = function(cookieName, cookieValue, expire, strDomain) {
   var pdm = "";
   
   if( !!strDomain )
      pdm = " domain=" + strDomain + ";";

   if( typeof expire=="object" )
      document.cookie = cookieName + "=" + cookieValue + ";expires=" + expire.toGMTString() + "; path=/;" + pdm;
   else
      document.cookie = cookieName + "=" + cookieValue + "; path=/;" + pdm;
};

WebTracker.prototype._setCustomVar = function(data)
{
   var slot = data.slot || 0,
       name = data.name || "",
       value = data.value || "",
       scope = data.scope || 0;

   _gaq.push(['_setCustomVar', slot, name, value, scope]);

   if( this.debug )
      this._log("_setCustomVar: " + slot + ", " + name + ", " + value + ", " + scope);
};

WebTracker.prototype._trackCheckoutComplete = function()
{
   var wto = this,
       category = "Checkout", action = "Complete Checkout";

   wto.trackEvent(category, action);
};

WebTracker.prototype._trackCheckoutStart = function()
{
   var wto = this,
       category = "Checkout", action = "Start Checkout";

   wto.trackEvent(category, action);
};

WebTracker.prototype._trackCrossSell = function(data)
{
   var wto = this,
       category = "Cross Sell", action = data.action || "",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};

WebTracker.prototype._trackEvent = function(data)
{
   var category = data.category || "",
       action = data.action || "",
       label = data.label || "",
       value = data.value || 0;

   _gaq.push(['_trackEvent', category, action, label, value]);

   if( this.debug )
      this._log("_trackEvent: " + category + ", " + action + ", " + label + ", " + value);
};

WebTracker.prototype._trackOutOfStock = function(data)
{
   var wto = this,
       category = "Out of Stock", action = data.action || "",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};

WebTracker.prototype._trackPageview = function(data)
{
   var page = ( !!data )? data.page || "" : "";
   
   if( !!page )
      _gaq.push(['_trackPageview', page]);
   else
      _gaq.push(["_trackPageview"]);

   if( this.debug )
      this._log("_trackPageview: " + page);
};

WebTracker.prototype._trackPrintOrder = function()
{
   var wto = this,
       category = "Ordering", action = "Print Order";

   wto.trackEvent(category, action);
};

WebTracker.prototype._trackProductAdd = function(data)
{
   var wto = this,
       category = "Add to Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0;

   wto.trackEvent(category, action, label, value)
};

WebTracker.prototype._trackProductRemove = function(data)
{
   var wto = this,
       category = "Remove from Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0;

   wto.trackEvent(category, action, label, value);
};

WebTracker.prototype._trackProductSearchNoResults = function(data)
{
   var wto = this,
       category = "Products", action = "Searches with 0 Results",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};

WebTracker.prototype._trackProductSortOrder = function(data)
{
   var wto = this,
       category = "Product Search", action = "Search Result Sort Order",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};

WebTracker.prototype._trackProductView = function(data)
{
   var wto = this,
       category = "View Product", 
       action = data.action || "", label = data.label || "";

   wto.trackEvent(category, action, label);
};

WebTracker.prototype._trackRedeemCoupon = function(data)
{
   var wto = this,
       category = "Checkout", action = "Redeem Coupon",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};

WebTracker.prototype._trackSearchProductAdd = function(data)
{
   var wto = this,
       category = "Search - Add to Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0;

   wto.trackEvent(category, action, label, value);
};

WebTracker.prototype._trackViewCart = function()
{
   var wto = this,
       category = "Checkout", action = "View Cart";

   wto.trackEvent(category, action);
};

WebTracker.prototype._trim = function(val) 
{
   return val.replace(/^\s+|\s+$/g, '');
};

// native extensions
String.prototype.contains = function(subStr)
{
   var containsSubStr = false;
   containsSubStr = !( this.indexOf(subStr)<0 );
   return containsSubStr;
};

String.prototype.trim = function()
{
   var trimmedStr = '';
   
   try
   {
      trimmedStr = this.replace(/^\s+|\s+$/g, '');
   }
   catch( err ) {}
   
   return trimmedStr;
};