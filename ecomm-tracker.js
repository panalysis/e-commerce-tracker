// version 1.0.2 :: 2013-01

var _gaq = _gaq || [];
var wt;

try
{
   jQuery(document).ready(function() { trackerInit(); });
}
catch(err) { }
/**
* @description Responsible for defining config and creating new WebTracker object. Executes once DOM loaded.
* @example
* jQuery(document).ready(function() { trackerInit(); });
*/
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
/**
* @class WebTracker Manages analytics tracking in the application.
* @constructor
* @param {Object} config Configuration object for the tracker.
* @description The configuration parameter is an object with the following properties
* @example
   var config = {
         debug: true,
         gaAccounts: {
	         prod: 'UA-xxxxxxxx-1',
	         dev: 'UA-xxxxxxxx-0'
         },
         customvars: {
         },
         ignoredRefs: [ ignoredreferrer1.com, ignoredreferrer2.com ],
         domain: "some.domain.com"
      };
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

   if( !_config.debug && _config.domain && dh.contains(_config.domain) )
   {
      uaAcc = _config.gaAccounts['prod'];
   }
   else
   {
      uaAcc = _config.gaAccounts['dev'];
   }
   
   domain = ( _config.domain && _config.domain!="none" && !_config.debug && dh.contains(_config.domain) )? _config.domain : dh;
   
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
/**
* @description Performs any inisitalisation to support tracking.
* Much tagging is likely conditional to specific parts of the website, so you'll likely have code in the init function such as:
* @example
   if( docpath.contains('/search') )
   {
      wto.tagSearchResults();
      wto.checkForNoSearchResults();
   }
*/
WebTracker.prototype.init = function()
{
   var wto = this,
       docpath = wto.docpath,
       docref = document.referrer || "";

   // add in tagging initialisation
};
/**
* @description Performs a check for indication of banner click (indicated by well-known hash param 'ac') and if found, records event.
* Should be called during init. Event details: category = "Promo Click".
* @public
*/
WebTracker.prototype.checkBannerClick = function()
{
   var wto = this, 
       docref = document.referrer || "",
       hp = "";
   
   hp = wto._getHashParam('ac');
   if( hp )
   {
      hp = decodeURIComponent(hp);
      wto.trackEvent("Promo Click", hp, docref);
   }
};
/**
* @description Performs a check for zero search results. (Should only execute on a search results page.) If a zero search result is found
* then make an appropriate call to _trackProductSearchNoResults.
* @public
*/
WebTracker.prototype.checkForNoSearchResults = function()
{
   var wto = this,
       label = "", data = { Action:"", Label:"", Value:0 };

};
/**
* @description Sets a custom variable.
* @param {String} cvName Name of the custom variable object
* @param {String} cvVal Value to set
* @public
*/
WebTracker.prototype.setCustomVar = function(cvName, cvVal)
{
   var wto = this,
       cvar = {}, 
       cName = cvName || "", cVal = cvVal || "";
   
   try{
      cvar = wto.customvars[cName];
      wto._setCustomVar({ slot: cvar.slot, name: cvar.name, value: cVal, scope: cvar.scope });
   } catch(err) {}
};
/**
* @description Tags elements for add to cart tracking. Appropriate elements should be identified and event handlers added that include
* call to _trackProductAdd.
* @public
* @example
   WebTracker.prototype.tagAddToCart = function()
   {
      var wto = this,
          action = "Not Specified", 
          productInfo = [];

      if( !!$("h1#product-category").length )
         action = $("h1#product-category").text();

      $("#add-to-cart-btn").click(function(ev) {
         var data = { Action:action, Label:"", Value:1 };
         productInfo[0] = $("span.product-id").text();
         productInfo[1] = $("span.product-name").text();
         data.Label = productInfo.join("-");
      
         wto._trackProductAdd(data);
      });
   };
*/
WebTracker.prototype.tagAddToCart = function()
{
   var wto = this,
       action = "Not Specified", 
       productInfo = [];

};
/**
* @description Tags appropriate elements for product view tracking. Appropriate elements should be identified and event handlers added that include
* call to _trackProductView.
* @public
*/
WebTracker.prototype.tagProductView = function()
{
   var wto = this,
       action = "", label = "",
       productInfo = [], data = { action:"", label:"", value:0 };

};
/**
* @description Tags appropriate elements for remove from cart tracking. Appropriate elements should be identified and event handlers added that include
* call to _trackProductRemove.
* @public
*/
WebTracker.prototype.tagRemoveFromCart = function()
{
   var wto = this;

};
/**
* @description Tags search results. i.e. performs any required tagging of search results.
* @public
*/
WebTracker.prototype.tagSearchResults = function()
{
   var wto = this,
       action = "", page = "";

};
/**
* @description Tracks an event in GA.
* @param {String} evCat The event category (required).
* @param {String} evAction The event action (required).
* @param {String} evLbl The event label.
* @param {Integer} evVal The event value.
* @public
*/
WebTracker.prototype.trackEvent = function(evCat, evAction, evLbl, evVal)
{
   var wto = this,
       evCategory = evCat || "", evAction = evAction || "", evLabel = evLbl || "", evValue = evVal || 0,
       evData = { category: evCategory, action: evAction, label: evLabel, value: evValue };
   
   try{
      wto._trackEvent(evData);
   } catch(err) {}
};
/**
* @description Tracks an event in GA and sets a timeout to navigate to the link href
* @param {Object} linkEl Object representing a DOM anchor element.
* @param {Bool} delay true if should set timeout.
* @param {String} evCat The event category (required).
* @param {String} evAction The event action (required).
* @param {String} evLbl The event label.
* @param {Integer} evVal The event value.
* @public
*/
WebTracker.prototype.trackEventTimeout = function(linkEl, delay, evCat, evAction, evLbl, evVal)
{
   var wto = this,
       url = linkEl.href || "";

   wto.trackEvent(evCat, evAction, evLbl, evVal);

   if( delay && !!url )
      setTimeout(function(){ document.location.href = url; }, 300);
};
/**
* @description Tracks a pageview in GA.
* @param {String} page The page path to set as the recorded pageview (defaults to current URL).
* @public
*/
WebTracker.prototype.trackPageview = function(page)
{
   var wto = this, 
       page = page || "",
       pd = { page: page };
   
   try{
      wto._trackPageview(pd);
   } catch(err) {}
};
/**
* @description Checks if any custom variable setting is required.
* @public
*/
WebTracker.prototype._checkCustomVar = function()
{
   var me = this,
       docpath = me.docpath, 
       cvar = {}, cVal = "";

};
/**
* Returns the value for a specified cookie.
* @param {String} strParam Name of the cookie.
* @return {String} Cookie value
*/
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
/**
* Retrieves the a query parameter from the document hash
* @param {String} strParam The name of the parameter to find.
* @return {String} The query parameter value if found.
*/
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
/**
* Retrieves a query parameter from the document URL
* @param {String} strParam The name of the parameter to find.
* @return {String} The query parameter value if found.
*/
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
/**
* Loads the ga.js script if it is not already present.
*/
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
* @param {String} msg Message to log.
*/
WebTracker.prototype._log = function(msg)
{
   if( typeof(console)!="undefined" && this.debug )
      console.log(msg);
};
/**
* Sets a cookie
* @param {String} cookieName The name of the cookie.
* @param {String} cookieValue The value to store in the cookie.
* @param {Date} expire The time when the cookie will expire.
* @param {String} strDomain The domain name for the cookie.
* @return void
*/
WebTracker.prototype._setCookie = function(cookieName, cookieValue, expire, strDomain) {
   var pdm = "";
   
   if( !!strDomain )
      pdm = " domain=" + strDomain + ";";

   if( typeof expire=="object" )
      document.cookie = cookieName + "=" + cookieValue + ";expires=" + expire.toGMTString() + "; path=/;" + pdm;
   else
      document.cookie = cookieName + "=" + cookieValue + "; path=/;" + pdm;
};
/**
* Sets a custom variable.
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
* Records a 'Checkout/Complete Checkout' event. Event details: category = "Checkout", action = "Complete Checkout".
* @public
*/
WebTracker.prototype._trackCheckoutComplete = function()
{
   var wto = this,
       category = "Checkout", action = "Complete Checkout";

   wto.trackEvent(category, action);
};
/**
* Records a 'Checkout/Start Checkout' event. Event details: category = "Checkout", action = "Start Checkout".
* @public
*/
WebTracker.prototype._trackCheckoutStart = function()
{
   var wto = this,
       category = "Checkout", action = "Start Checkout";

   wto.trackEvent(category, action);
};
/**
* Records a 'Cross Sell' event. e.g. a click on a related product item featured on an origin product page.
* @public
* @param {Object} data Event data object. Should have action and label properties.
* @example
* wt._trackCrossSell({action: 'Click', label: '[origin product]>[related product]'});
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
* wt._trackEvent({category: 'category', action: 'action', label: 'label', value: 1});
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
* Records a 'Out of Stock' event. Event details: category = "Out of Stock".
* e.g. to be recorded on a product view page where a product is out of stock.
* @public
* @param {Object} data Event data object. Should have action and label properties.
* @example
   wto._trackOutOfStock({ action:"Add Reminder", label:"[product info]" });
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
* wt._trackPageview({page:"/my-page-name.html"});
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
* @description Records a 'Print Order' event. Event details: category = "Ordering", action = "Print Order".
* @public
*/
WebTracker.prototype._trackPrintOrder = function()
{
   var wto = this,
       category = "Ordering", action = "Print Order";

   wto.trackEvent(category, action);
};
/**
* Records an 'Add to Cart' event. Event details: category = "Add to Cart".
* @public
* @param {Object} data Event data object. Should have action, label and value properties.
* @example
   wto._trackProductAdd({action:"[product category]", label:"[product info]", value:[quantity]});
*/
WebTracker.prototype._trackProductAdd = function(data)
{
   var wto = this,
       category = "Add to Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0;

   wto.trackEvent(category, action, label, value)
};
/**
* Records a 'Remove from Cart' event. Event details: category = "Remove from Cart".
* @public
* @param {Object} data Event data object. Should have action, label and properties.
* @example
   wto._trackProductRemove({action:"[product category/action]", label:"[product info]", value:[total amount rounded]});
*/
WebTracker.prototype._trackProductRemove = function(data)
{
   var wto = this,
       category = "Remove from Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0;

   wto.trackEvent(category, action, label, value);
};
/**
* Records a 'Product searches with 0 results' event. Event details: category = "Product Search", action = "Searches with 0 Results".
* @public
* @param {Object} data Event data object. Should have label property.
* @example
   wto._trackProductSearchNoResults({label:"[search term]"});
*/
WebTracker.prototype._trackProductSearchNoResults = function(data)
{
   var wto = this,
       category = "Product Search", action = "Searches with 0 Results",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};
/**
* Records a 'Product search selected sort order' event. Event details: category = "Product Search", action = "Search Result Sort Order".
* Should be recorded when user interacts with sort order on a search results page.
* @public
* @param {Object} data Event data object. Should have label property.
* @example
   wto._trackProductSortOrder({label:"sort order option selected"});
*/
WebTracker.prototype._trackProductSortOrder = function(data)
{
   var wto = this,
       category = "Product Search", action = "Search Result Sort Order",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};
/**
* Records a 'View Product' event. Event details: category = "View Product". Should be recorded on a product detail page.
* @public
* @param {Object} data Event data object. Should have action and label properties.
* @example
    wto._trackProductView({ action:"product category", label:"product info" });
*/
WebTracker.prototype._trackProductView = function(data)
{
   var wto = this,
       category = "View Product", 
       action = data.action || "", label = data.label || "";

   wto.trackEvent(category, action, label);
};
/**
* Records a 'Redeem Coupon' event. Event details: category = "Checkout", action = "Redeem Coupon".
* Should be recorded when a user supplies a coupon code when purchasing an item.
* @public
* @param {Object} data Event data object. Should have label property.
* @example
   wto._trackRedeemCoupon({ label:"[coupon code]" });
*/
WebTracker.prototype._trackRedeemCoupon = function(data)
{
   var wto = this,
       category = "Checkout", action = "Redeem Coupon",
       label = data.label || "";

   wto.trackEvent(category, action, label);
};
/**
* Records a 'Search - Add to Cart' event. Event category = "Search - Add to Cart".
* @public
* @param {Object} data Event data object. Should have action, label and value properties.
* @example
   wto._trackSearchProductAdd({action:"[product category]", label:"[product info]", value:[quantity]});
*/
WebTracker.prototype._trackSearchProductAdd = function(data)
{
   var wto = this,
       category = "Search - Add to Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0;

   wto.trackEvent(category, action, label, value);
};
/**
* Records a 'Checkout/View Cart' event. Event details: category = "Checkout", action = "View Cart".
* To be recorded when a user views their shopping cart.
* @public
*/
WebTracker.prototype._trackViewCart = function()
{
   var wto = this,
       category = "Checkout", action = "View Cart";

   wto.trackEvent(category, action);
};
/**
* Trims leading and trailing whitespace.
* @private
* @param {String} val String value to trim.
* @return {String} Trimmed string.
*/
WebTracker.prototype._trim = function(val) 
{
   return val.replace(/^\s+|\s+$/g, '');
};

// native extensions
/**
* @description Tests whether the string contains the supplied substring.
* @param {String} subStr The substring to search for
* @return {String} true if the string contains the substring
*/
String.prototype.contains = function(subStr)
{
   var containsSubStr = false;
   containsSubStr = !( this.indexOf(subStr)<0 );

   return containsSubStr;
};
/**
* @description Tests whether the string is a match for the supplied regex.
* @param {Regex} re The regular expression to test for
* @return {String} true if the string is a match
*/
String.prototype.isMatch = function(re)
{
   var theRe = re || "",
       isMatch = false;

   if( theRe instanceof RegExp )
   {
      isMatch = theRe.test(this);
   }

   return isMatch;
};
/**
* @description Trims leading and trailing whitespace.
* @return {String} Trimmed string
*/
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