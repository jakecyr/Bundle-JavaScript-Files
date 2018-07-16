// Prevent this file from being bundled
// INCLUDE == FALSE

(function(){
	var sourceFile = $('[data-source]').data('source');

	compileFiles(sourceFile, function(files){
		downloadString(files, 'text/javascript', 'compiled.js');
	});

	function downloadString(text, fileType, fileName) {
		var blob = new Blob([text], { type: fileType });
		var a = document.createElement('a');
		a.download = fileName;
		a.href = URL.createObjectURL(blob);
		a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
	}
	function loadTargetHtmlFile(fileName, callback){
		$.get(fileName, callback);
	}
	function loadJsFile(fileName, index, callback){
		jQuery.get(fileName, {}, function(res){
			callback(res, index);
		}, 'text');
	}
	function compileFiles(htmlFileName, callback){
		var files = [];

		loadTargetHtmlFile(htmlFileName, function(html){
			var parsedHtml = $.parseHTML(html, null, true);
			var scriptTags = $(parsedHtml).filter('script[src]')
			var scriptTagsLength = scriptTags.length;
			var i = 0;
			var loadedFiles = 0;

			for(i; i < scriptTagsLength; i++){
				var currentScript = scriptTags[i].src;

				if(currentScript && currentScript !== ''){
					var index = i;

					loadJsFile(currentScript, index, function(jsCode, fileIndex){
						if(!jsCode.includes('INCLUDE == FALSE')){
							files[fileIndex] = jsCode;
						}

						loadedFiles++;

						if(loadedFiles == scriptTagsLength){
							callback(files.join('\n'));
						}
					})
				}
			}
		})
	}
})();
