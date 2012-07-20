// version 1.0.1 :: 2012-06
/** @version 1.0.1 */

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
      wt = new WebTracker(config); // set up the tracker
      wt.init();
   }
   catch(err) { }
};

// ------------------------------------------------------------
/**
* @class WebTracker interacts with the core web analytics library to add an abstraction layer to fire events
* @constructor
* @param {Object} config Configuration object for the tracker.
*/
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

/**
* Returns the value for a specified cookie
* @private
* @param {String} cookieName. Name of the cookie.
* @author Panalysis Pty Ltd
* @version 1.0
* @return {String} Cookie value
*/
WebTracker.prototype._getCookie = function(strParam) {
   var _ucookies = document.cookie.split(";"),
         np = [],
         val = "";
   for (var i = 0, count = _ucookies.length; i < count; i++) {
      np = _ucookies[i].split("=");
      if (this._trim(np[0].toLowerCase()) == strParam.toLowerCase()) {
         for (var j = 1, npl = np.length; j < npl; j++) {
            if (j > 1)
               val += "=";

            val += np[i];
         };
         return decodeURIComponent(this._trim(val));
      };
   }
   return "";
};

/**
* Retrieves the a query parameter from the document hash
* @private
* @param {String} strParam The name of the parameter to find.
* @author Panalysis Pty Ltd
* @version 1.0
* @return {String} The query parameter value if found.
*/
WebTracker.prototype._getHashParam = function(strParam) {
   if( !strParam )
      return "";
   var _pstr = document.location.hash.substring(1),
      _uparams = _pstr.split("&"),
      _paramlist = {},
      np = [], hp = "";
   for (var i = 0, l = _uparams.length; i < l; i++) {
      np = _uparams[i].split("=");
      if( np.length==2 ) {
         _paramlist[this._trim(np[0])] = this._trim(np[1]);
      };
      if( !!strParam && this._trim(np[0].toLowerCase())==strParam.toLowerCase() ) {
         hp = this._trim(np[1]);
         break;
      };
   }
   return hp;
};

/**
* Retrieves a query parameter from the document URL
* @private
* @param {String} strParam The name of the parameter to find.
* @author Panalysis Pty Ltd
* @version 1.0
* @return {String} The query parameter value if found.
*/
WebTracker.prototype._getParam = function(strParam) {
   var _pstr = document.location.search.substring(1),
      _uparams = _pstr.split("&"),
      np = [];
   for (var i = 0, l = _uparams.length; i < l; i++) {
      np = _uparams[i].split("=");
      if (this._trim(np[0].toLowerCase()) == strParam.toLowerCase())
         return this._trim(np[1]);
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

/**
* Logs the message to the console if available.
* @private
* @param {String} Message to log.
*/
WebTracker.prototype._log = function(msg)
{
   if( typeof(console)!="undefined" && this.debug )
      console.log(msg);
};

/**
* Sets a cookie
* @private
* @param {String} CookieName the name of the cookie
* @param {String} Value the value to store in the cookie
* @param {Date} Expires The time when the cookie will expire
* @param {String} Domain The domain name for the cookie
* @author Panalysis Pty Ltd
* @version 1.0
* @return void
*/
WebTracker.prototype._setCookie = function(cookieName, cookieValue, expire, strDomain) {
   var pdm = "";
   if (strDomain && strDomain != "")
      pdm = " domain=" + strDomain + ";";

   if ((typeof (expire)) == "object")
      document.cookie = cookieName + "=" + cookieValue + ";expires=" + expire.toGMTString() + "; path=/;" + pdm;
   else
      document.cookie = cookieName + "=" + cookieValue + "; path=/;" + pdm;
};

/**
* Sets a custom variable.
* @public
* @param {Object} data Data defining the custom variable. Should include slot, name, value, scope.
* @return void
*/
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

/**
* Records a 'Checkout/Complete Checkout' event.
* @public
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackCheckoutComplete = function()
{
   var wto = this,
       category = "Checkout", action = "Complete Checkout";

   wto.trackEvent(category, action);
};

/**
* Records a 'Checkout/Start Checkout' event.
* @public
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackCheckoutStart = function()
{
   var wto = this,
       category = "Checkout", action = "Start Checkout";

   wto.trackEvent(category, action);
};

/**
* Records a 'Cross Sell' event.
* @public
* @param {Object} data Event data object. Should have action and label properties.
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackCrossSell = function(data)
{
   var wto = this,
       category = "Cross Sell", action = data.action || "",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};

/**
* Tracks an event in Google analytics.
* @public
* @param {Object} data Event data. Should include category, action, label (optional), value (optional).
* @example
* // Google Analytics
* wt._trackEvent({ category: 'category', action: 'action', label: 'label', value: 1});
* @return void
*/
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

/**
* Records a 'Out of Stock' event.
* @public
* @param {Object} data Event data object. Should have action and label properties.
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackOutOfStock = function(data)
{
   var wto = this,
       category = "Out of Stock", action = data.action || "",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};

/**
* Records a page view.
* @public
* @param {Object} data Object for the page view in JSON notation (optional)
* @example
* // Google Analytics
* wt.TrackPageview({page:"/my-page-name.html"});
* @return void
*/
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

/**
* Records a 'Print Order' event.
* @public
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackPrintOrder = function()
{
   var wto = this,
       category = "Ordering", action = "Print Order";

   wto.trackEvent(category, action);
};

/**
* Records an 'Add to Cart' event.
* @public
* @param {Object} data Event data object. Should have action, label and value properties.
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackProductAdd = function(data)
{
   var wto = this,
       category = "Add to Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0;

   wto.trackEvent(category, action, label, value)
};

/**
* Records a 'Remove from Cart' event.
* @public
* @param {Object} data Event data object. Should have action and label properties.
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackProductRemove = function(data)
{
   var wto = this,
       category = "Remove from Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0;

   wto.trackEvent(category, action, label, value);
};

/**
* Records a 'Product searches with 0 results' event.
* @public
* @param {Object} data Event data object. Should have label property.
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackProductSearchNoResults = function(data)
{
   var wto = this,
       category = "Products", action = "Searches with 0 Results",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};

/**
* Records a 'Product search selected sort order' event.
* @public
* @param {Object} data Event data object. Should have label property.
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackProductSortOrder = function(data)
{
   var wto = this,
       category = "Product Search", action = "Search Result Sort Order",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};

/**
* Records a 'View Product' event.
* @public
* @param {Object} data Event data object. Should have action and label properties.
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackProductView = function(data)
{
   var wto = this,
       category = "View Product", 
       action = data.action || "", label = data.label || "";

   wto.trackEvent(category, action, label);
};

/**
* Records a 'Redeem Coupon' event.
* @public
* @param {Object} data Event data object. Should have label property.
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackRedeemCoupon = function(data)
{
   var wto = this,
       category = "Checkout", action = "Redeem Coupon",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};

/**
* Records a 'Search - Add to Cart' event.
* @public
* @param {Object} data Event data object. Should have action and label properties.
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackSearchProductAdd = function(data)
{
   var wto = this,
       category = "Search - Add to Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0;

   wto.trackEvent(category, action, label, value);
};

/**
* Records a 'Checkout/View Cart' event.
* @public
* @author Panalysis Pty Ltd
* @version 1.0
*/
WebTracker.prototype._trackViewCart = function()
{
   var wto = this,
       category = "Checkout", action = "View Cart";

   wto.trackEvent(category, action);
};

/**
* Trims leading and trailing whitespace
* @private
* @param {String} val String value to trim.
* @author Panalysis Pty Ltd
* @version 1.0
* @return {String} Trimmed string.
*/
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