chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		
		var NS = NS || {} ;

		NS.Downloader = function () {
		};

		NS.Downloader.prototype = function () {
			//private variables

			var getWallURL = function (oldUrl)
			{
				var newUrl = oldUrl.replace(/thumb/g,"wallpaper");
				return newUrl;
			},
			downloadUrl = function (downloadUrl)
				{

					if(downloadUrl)
					{
						var a = document.createElement('a');
						a.href = downloadUrl;
						a.download = downloadUrl; // Filename
						a.click();  
							
						}
					else {
						console.log(chrome.runtime.lastError);
					}
			},
			urlExists = function (url, callback){
			  $.ajax({
			    type: 'HEAD',
			    url: url,
			    statusCode: {
			      200: function (response) {
			         callback(true);
			      },		      
			      404: function (response) {
			        callback(false);
			      }
			   }
			  });
			},

			getPngUrl = function (url, callback)
			{
				var newUrl = url.replace(".jpg", ".png");
				return newUrl;
			},

			detectMouseenter = function () {
				$('.file, .lazy, .show').mouseenter(function() {
					$(this).addClass('download_wall');
				});
				return 1;
			},
			detectMouseleave = function () {
				$('.file, .lazy, .show').mouseleave(function() {
					$(this).removeClass('download_wall');
				});
			};
			
			//public variables
			return {
				getWallURL : getWallURL,
				downloadUrl : downloadUrl,
				urlExists : urlExists,
				getPngUrl : getPngUrl,
				detectMouseenter : detectMouseenter,
				detectMouseleave : detectMouseleave
				
			};
		}();

		$(document).ready(function () {
			
			var downloader = new NS.Downloader();
			downloader.detectMouseenter();
			downloader.detectMouseleave();

		 

			
			$(document).keypress(function(keyEvent) {
			  	var code = keyEvent.keyCode || keyEvent.which;
		    		if (code === 100) {
		    			var url = $('.download_wall').attr('src');
		    			console.log(url);
		    			var newUrl = downloader.getWallURL(url)
		    			downloader.urlExists(newUrl, function(exists){
							if(false == exists)
								newUrl = downloader.getPngUrl(newUrl);
								console.log(newUrl);
								downloader.downloadUrl(newUrl);	
						});
					}
		  	});

			//To mitigate the lazy loading.
		  	$(document).bind('DOMSubtreeModified',function() {
				constructObject();

			});
		});

		function constructObject(){
			var downloader = new NS.Downloader();
			downloader.detectMouseenter();
			downloader.detectMouseleave();
		}	

	}
	}, 6);
});

