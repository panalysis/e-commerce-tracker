Panalysis e-commerce tracking library
-------------------------------------
This JavaScript library is a framework for implementing a system of event tracking for Google Analytics within an e-commerce website.

This tracking library is not complete as is, but offers a framework for implementing tracking of key e-commerce activities.
To complete the tracking library implementation, you'll need to tag those parts of the website that are involved in those key activities.

Within this framework, the required tagging should happen as part of the init method which should then call any required tagging methods
that will do that actual work of tagging elements on the page to record events. A few key tagging methods have been included, e.g. tagAddToCart.

An implementation of the tagAddToCart might look something like the following (where the jQuery object is $j):

WebTracker.prototype.tagAddToCart = function()
{
   var wto = this,
       action = "Not Specified", 
       productInfo = [];

   if( !!$j("h1#product-category").length )
      action = $j("h1#product-category").text();

   $j("#add-to-cart-btn").click(function(ev) {
      var data = { Action:action, Label:"", Value:1 };
      productInfo[0] = $j("span.product-id").text();
      productInfo[1] = $j("span.product-name").text();
      data.Label = productInfo.join("-");
      
      wto._trackProductAdd(data);
   });
};

Much tagging is likely conditional to specific parts of the website, so you'll likely have code in the init function such as:

   if( docpath.contains('/search') )
   {
      wto.tagSearchResults();
      wto.checkForNoSearchResults();
   }

Note that the e-commerce tracking library is expected to operate in a context where jQuery is available.

Once implementation is complete, you can install the script by including it after the normal Google analytics tracking code. e.g.

<script type="text/javascript">
   var _gaq = _gaq || [];
   _gaq.push(['_setAccount', 'UA-xxxxxxxx-1']);
   // other settings
   _gaq.push(['_trackPageview']);
   
   (function() {
   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
   })();
</script>
<script type="text/javascript" src="/path_to/ecomm-tracker.js"></script>
