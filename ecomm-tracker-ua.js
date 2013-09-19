// version 1.0.1 :: 2013-05

var wt;

/**
* @description Responsible for defining config and creating a new WebTracker object.
*/
function trackerInit()
{
   var config = {
         debug: true,
         trackerName: "ga",
         gaAccounts: {
	         prod: 'UA-xxxxxxxx-1',
	         dev: 'UA-xxxxxxxx-0'
         },
         customvars: {
         },
         domain: "localtest.pc"
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
         trackerName: "ga",
         gaAccounts: {
	         prod: 'UA-xxxxxxxx-1',
	         dev: 'UA-xxxxxxxx-0'
         },
         customvars: {
         },
         domain: "some.domain.com"
      };
*/
function WebTracker(config)
{
   var dochost = document.location.hostname,
       docpath = document.location.pathname.toLowerCase(),
       domain = "", uaAcc = "",
       isDev = false,
       _config = {
            gaAccounts: {
		         prod: 'UA-xxxxxxxx-1',
		         dev: 'UA-xxxxxxxx-0'
		      },
            debug: false,
            trackerName: "ga",
            customvars: {},
		      domain: "website.com"
         };

   if( config && typeof config=="object" )
   {
      for( p in config )
      {
         _config[p] = config[p];
      }
   }

   isDev = !( _config.domain!="none" && dochost.contains(_config.domain) );
   uaAcc = ( !isDev && !_config.debug )? _config.gaAccounts['prod'] : _config.gaAccounts['dev'];
   domain = ( _config.domain && _config.domain!="none" && dochost.contains(_config.domain) )? _config.domain : dochost;

   this.debug = _config.debug;
   this.domain = domain;
   this.docpath = docpath;
   this.customvars = _config.customvars;
   this.trackerName = _config.trackerName;

   this._loadAnalyticsJs();

   if( _config.debug && typeof window[_config.trackerName]!='undefined' ) // configure tracker for debug
   {
      var tracker = window[_config.trackerName];
      tracker('create', uaAcc, {'cookieDomain': domain});

      this.trackPageview();
   }
};
/**
* @description Performs any inisitalisation to support tracking.
* Much tagging is likely conditional to specific parts of the website, so you'll likely have code in the init function such as:
* @example
   if( docpath.contains('/search') )
   {
      instance.tagSearchResults();
      instance.checkForNoSearchResults();
   }
*/
WebTracker.prototype.init = function()
{
   var instance = this,
       docpath = instance.docpath,
       docref = document.referrer || "";

   // add in tagging initialisation
   jQuery(document).ready(function() {
      
   });
};
/**
* @description Performs a check for zero search results. (Should only execute on a search results page.) If a zero search result is found
* then make an appropriate call to _trackProductSearchNoResults.
* @public
*/
WebTracker.prototype.checkForNoSearchResults = function()
{
   var instance = this,
       label = "", data = { action:"", label:"", value:0 };

};
/**
* @description Sets a custom variable.
* @param {String} cvName Name of the custom variable object
* @param {String} cvVal Value to set
* @public
*/
WebTracker.prototype.setCustomVar = function(cvName, cvVal)
{
   var instance = this,
       cvar = {}, 
       cName = cvName || "", cVal = cvVal || "";
   
   try{
      cvar = instance.customvars[cName];
      instance._setCustomVar({ slot: cvar.slot, name: cvar.name, value: cVal, scope: cvar.scope });
   } catch(err) {}
};
/**
* @description Tags elements for add to cart tracking. Appropriate elements should be identified and event handlers added that include
* call to _trackProductAdd.
* @public
*/
WebTracker.prototype.tagAddToCart = function()
{
   var instance = this,
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
   var instance = this,
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
   var instance = this;

};
/**
* @description Tags search results. i.e. performs any required tagging of search results.
* @public
*/
WebTracker.prototype.tagSearchResults = function()
{
   var instance = this,
       action = "", page = "";

};
/**
* @description Tracks an event in GA.
* @param {String} evCat The event category (required).
* @param {String} evAction The event action (required).
* @param {String} evLbl The event label.
* @param {Integer} evVal The event value.
* @param {Bool} nonInt true if event should be non-interavtive (won't impact bounce rate).
* @public
*/
WebTracker.prototype.trackEvent = function(evCat, evAction, evLbl, evVal)
{
   var instance = this,
       evCategory = evCat || "", evAction = evAction || "", evLabel = evLbl || "", 
       evValue = evVal || 0,
       nonint = ( typeof nonInt!='undefined' )? !!nonInt : false,
       evData = { 
         category: evCategory, 
         action: evAction, 
         label: evLabel, 
         value: evValue, 
         nonint: nonint 
       };
   
   try{
      instance._trackEvent(evData);
   } catch(err) {}
};
/**
* @description Tracks an event in GA and sets a timeout to navigate to the link href
* @param {Object} linkEl Object representing a DOM anchor element.
* @param {String} evCat The event category (required).
* @param {String} evAction The event action (required).
* @param {String} evLbl The event label.
* @param {Integer} evVal The event value.
* @param {Bool} nonInt true if event should be non-interavtive (won't impact bounce rate).
* @public
*/
WebTracker.prototype.trackEventTimeout = function(linkEl, evCat, evAction, evLbl, evVal, nonInt)
{
   var instance = this,
       url = linkEl.href || "";

   instance.trackEvent(evCat, evAction, evLbl, evVal, nonInt);

   if( url )
      setTimeout(function(){ document.location.href = url; }, 300);
};
/**
* @description Tracks a pageview in GA.
* @param {String} page The page path to set as the recorded pageview (defaults to current URL).
* @public
*/
WebTracker.prototype.trackPageview = function(page)
{
   var instance = this, 
       page = page || "",
       pd = { page: page };
   
   try{
      instance._trackPageview(pd);
   } catch(err) {}
};
/**
* @description Checks if any custom variable setting is required.
* @public
*/
WebTracker.prototype._checkCustomVar = function()
{
   var instance = this,
       docpath = instance.docpath, 
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
* @param {String} paramName The name of the parameter to find.
* @return {String} The query parameter value if found.
*/
WebTracker.prototype._getHashParam = function(paramName)
{
   var paramName = paramName || "", params = "", paramValue = "",
       paramRePattern = "(?:\\#|\\&){param_name}=([^\\&$]+)",
       paramRe = null, m = null;
   
   if( paramName )
   {
      paramRePattern = paramRePattern.replace("{param_name}", paramName);
      paramRe = new RegExp(paramRePattern);
      params = document.location.hash;

      if( paramRe.test(params) )
      {
         m = params.match(paramRe);
         
         if( m!=null && m.length>1 )
            paramValue = m[1];
      }
   }

   return paramValue;
};
/**
* Retrieves a query parameter from the document URL
* @param {String} paramName The name of the parameter to find.
* @return {String} The query parameter value if found.
*/
WebTracker.prototype._getParam = function(paramName)
{
   var paramName = paramName || "", qs = "", paramValue = "",
       paramRePattern = "(?:\\?|\\&){param_name}=([^\\&$]+)",
       paramRe = null, m = null;
   
   if( paramName )
   {
      paramRePattern = paramRePattern.replace("{param_name}", paramName);
      paramRe = new RegExp(paramRePattern);
      qs = document.location.search;

      if( paramRe.test(qs) )
      {
         m = qs.match(paramRe);
         
         if( m!=null && m.length>1 )
            paramValue = m[1];
      }
   }

   return paramValue;
};
/**
* Loads the analytics.js script if it is not already present.
*/
WebTracker.prototype._loadAnalyticsJs = function()
{
   try {
      var sl = document.getElementsByTagName('script');
      for(var a = 0, slCount = sl.length; a < slCount; a++) {
         if( sl[a].src.indexOf('google-analytics.com/analytics.js') > 0 )
         return;
      }
   } catch (err) { }
   
   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
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

   //_gaq.push(['_setCustomVar', slot, name, value, scope]);
   // todo: to be replaced with custom dimensions/metrics

   if( this.debug )
      this._log("_setCustomVar: " + slot + ", " + name + ", " + value + ", " + scope);
};
/**
* Records a 'Checkout/Complete Checkout' event. Event details: category = "Checkout", action = "Complete Checkout".
* @public
*/
WebTracker.prototype._trackCheckoutComplete = function()
{
   var instance = this,
       category = "Checkout", action = "Complete Checkout",
       data = {
         category: category, 
         action: action, 
         nonint: true 
       };

   instance._trackEvent(data);
};
/**
* Records a 'Checkout/Start Checkout' event. Event details: category = "Checkout", action = "Start Checkout".
* @public
*/
WebTracker.prototype._trackCheckoutStart = function()
{
   var instance = this,
       category = "Checkout", action = "Start Checkout",
       data = {
         category: category, 
         action: action, 
         nonint: true 
       };

   instance._trackEvent(data);
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
   var instance = this,
       category = "Cross Sell", action = data.action || "",
       label = data.label || "",
       data = {
         category: category, 
         action: action, 
         label: label, 
         nonint: true 
       };

   instance._trackEvent(data);
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
   var instance = this,
       tracker = window[instance.trackerName],
       category = data.category || "", action = data.action || "", label = data.label || "", value = data.value || 0
       nonint = ( typeof data.nonint!='undefined' )? !!data.nonint : false;

   tracker('send', 'event', {
      'eventCategory': category,
      'eventAction': action,
      'eventLabel': label,
      'eventValue': value,
      'nonInteraction': nonint
   });

   if( this.debug )
      this._log(">send -> event: " + category + "--" + action + "--" + label + "--" + value + "--" + nonint);
};
/**
* Records a 'Out of Stock' event. Event details: category = "Out of Stock".
* e.g. to be recorded on a product view page where a product is out of stock.
* @public
* @param {Object} data Event data object. Should have action and label properties.
* @example
   instance._trackOutOfStock({ action:"Add Reminder", label:"[product info]" });
*/
WebTracker.prototype._trackOutOfStock = function(data)
{
   var instance = this,
       category = "Out of Stock", action = data.action || "",
       label = data.label || "",
       data = {
         category: category, 
         action: action, 
         label: label, 
         nonint: true 
       };

   instance._trackEvent(data);
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
   var instance = this,
       tracker = window[instance.trackerName],
       page = ( !!data )? data.page || "" : "";
   
   if( !!page )
      tracker('send', 'pageview', { 'page': page });
   else
      tracker('send', 'pageview');

   if( this.debug )
      this._log("send -> pageview: " + page);
};
/**
* @description Records a 'Print Order' event. Event details: category = "Ordering", action = "Print Order".
* @public
*/
WebTracker.prototype._trackPrintOrder = function()
{
   var instance = this,
       category = "Ordering", action = "Print Order",
       data = {
         category: category, 
         action: action, 
         nonint: true 
       };

   instance._trackEvent(data);
};
/**
* Records an 'Add to Cart' event. Event details: category = "Add to Cart".
* @public
* @param {Object} data Event data object. Should have action, label and value properties.
* @example
   instance._trackProductAdd({action:"[product category]", label:"[product info]", value:[quantity]});
*/
WebTracker.prototype._trackProductAdd = function(data)
{
   var instance = this,
       category = "Add to Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0,
       data = {
         category: category, 
         action: action, 
         label: label, 
         value: value,
         nonint: true 
       };

   instance._trackEvent(data);
};
/**
* Records a 'Remove from Cart' event. Event details: category = "Remove from Cart".
* @public
* @param {Object} data Event data object. Should have action, label and properties.
* @example
   instance._trackProductRemove({action:"[product category/action]", label:"[product info]", value:[total amount rounded]});
*/
WebTracker.prototype._trackProductRemove = function(data)
{
   var instance = this,
       category = "Remove from Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0,
       data = {
         category: category, 
         action: action, 
         label: label, 
         value: value,
         nonint: true 
       };

   instance._trackEvent(data);
};
/**
* Records a 'Product searches with 0 results' event. Event details: category = "Product Search", action = "Searches with 0 Results".
* @public
* @param {Object} data Event data object. Should have label property.
* @example
   instance._trackProductSearchNoResults({label:"[search term]"});
*/
WebTracker.prototype._trackProductSearchNoResults = function(data)
{
   var instance = this,
       category = "Product Search", action = "Searches with 0 Results",
       label = data.label || "",
       data = {
         category: category, 
         action: action, 
         label: label, 
         nonint: true 
       };

   instance._trackEvent(data);
};
/**
* Records a 'Product search selected sort order' event. Event details: category = "Product Search", action = "Search Result Sort Order".
* Should be recorded when user interacts with sort order on a search results page.
* @public
* @param {Object} data Event data object. Should have label property.
* @example
   instance._trackProductSortOrder({label:"sort order option selected"});
*/
WebTracker.prototype._trackProductSortOrder = function(data)
{
   var instance = this,
       category = "Product Search", action = "Search Result Sort Order",
       label = data.label || "",
       data = {
         category: category, 
         action: action, 
         label: label, 
         nonint: true 
       };

   instance._trackEvent(data);
};
/**
* Records a 'View Product' event. Event details: category = "View Product". Should be recorded on a product detail page.
* @public
* @param {Object} data Event data object. Should have action and label properties.
* @example
    instance._trackProductView({ action:"product category", label:"product info" });
*/
WebTracker.prototype._trackProductView = function(data)
{
   var instance = this,
       category = "View Product", 
       action = data.action || "", label = data.label || "",
       data = {
         category: category, 
         action: action, 
         label: label, 
         nonint: true 
       };

   instance._trackEvent(data);
};
/**
* Records a 'Redeem Coupon' event. Event details: category = "Checkout", action = "Redeem Coupon".
* Should be recorded when a user supplies a coupon code when purchasing an item.
* @public
* @param {Object} data Event data object. Should have label property.
* @example
   instance._trackRedeemCoupon({ label:"[coupon code]" });
*/
WebTracker.prototype._trackRedeemCoupon = function(data)
{
   var instance = this,
       category = "Checkout", action = "Redeem Coupon",
       label = data.label || "",
       data = {
         category: category, 
         action: action, 
         label: label, 
         nonint: true 
       };

   instance._trackEvent(data);
};
/**
* Records a 'Search - Add to Cart' event. Event category = "Search - Add to Cart".
* @public
* @param {Object} data Event data object. Should have action, label and value properties.
* @example
   instance._trackSearchProductAdd({action:"[product category]", label:"[product info]", value:[quantity]});
*/
WebTracker.prototype._trackSearchProductAdd = function(data)
{
   var instance = this,
       category = "Search - Add to Cart", 
       action = data.action || "", label = data.label || "", value = data.value || 0,
       data = {
         category: category, 
         action: action, 
         label: label, 
         value: value,
         nonint: true 
       };

   instance._trackEvent(data);
};
/**
* Records a 'Checkout/View Cart' event. Event details: category = "Checkout", action = "View Cart".
* To be recorded when a user views their shopping cart.
* @public
*/
WebTracker.prototype._trackViewCart = function()
{
   var instance = this,
       category = "Checkout", action = "View Cart",
       data = {
         category: category, 
         action: action, 
         nonint: true 
       };

   instance._trackEvent(data);
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

trackerInit();