$(document).ready(function() {

	$("form").on("submit", function(event) {
	    // Prevents the form from submitting
	    event.preventDefault();

	    function getRandomInt (min, max) {
	    	return Math.floor(Math.random() * (max - min + 1)) + min;
	    }

	    //year is passed via the user input
	    var year = $("#year").val();

   		//month is randomly generated
   		var month = getRandomInt(1,12);
   		var monthStr = month<10?"0"+month:month;

			//lame logic for end of month
			var eom = month==2?28:30;

			var beginDateStr = year + "-" + monthStr + "-01";
			var endDateStr = year + "-" + monthStr + "-" + eom;

			var PRIV_KEY = "c5edf009cb46985abc80f1a169e9c52a10cbb424";
			var API_KEY = "a91ac412c6a820c514060548c2d83935";


			var url = "http://gateway.marvel.com/v1/public/comics?limit=10&format=comic&noVariants=true&formatType=comic&dateRange="+beginDateStr+"%2C"+endDateStr+"&apikey="+API_KEY;

			var ts = new Date().getTime();
			var hash = CryptoJS.MD5(ts + PRIV_KEY + API_KEY);
			var combinedUrl = url+"&ts="+ts+"&hash="+hash;

	    // var combinedUrl = url +'&limit=5'+ '&ts=' + ts + "&apikey=" +  API_KEY + '&hash=' + hash;

	    console.log(combinedUrl);

	    //perform your actions within the ajax 'success' function
	    // do a forEach loop over the resulting array data.data.results to get access
	    // to the thumbnail object and store that in an images array
	    // then do a regular for loop up to 5 and build the image sources
	    // and append them to the page with jQuery.

	    $.ajax({
	    	url: combinedUrl,
	    	crossDomain: true,
	    	success: function(data){
	    		console.log(data);
	    		var images = [];
	    		var links = [];
	    		data.data.results.forEach(function(el){
	    			if(el.thumbnail.path.indexOf("image_not_available") === -1 && el.urls.length > 0 && el.urls[0].type == "detail" ){
	    				images.push(el.thumbnail);
	    				links.push(el.urls[0].url);
	    			}

	    		});
	    		for(i = 0; i < 6; i++) {
	    			var className = ".card" + (i + 1);
	    			$(className).children()[0].href = links[i];
	    			$(className).children().children()[0].src = images[i].path + "." + images[i].extension;
	    		}
				}

			});
	  });

});
